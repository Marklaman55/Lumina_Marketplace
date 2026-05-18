import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface InstallContextType {
  deferredPrompt: Event | null;
  canInstall: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
}

const InstallContext = createContext<InstallContextType>({
  deferredPrompt: null,
  canInstall: false,
  isInstalled: false,
  promptInstall: async () => {},
});

export function InstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const detectInstalled = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIPhoneApp = (window.navigator as any).userAgentData?.platform === 'iPhone'
      && window.navigator.maxTouchPoints > 0;
    const isAndroidApp = document.referrer.includes('android-app://');
    const wasInstalled = sessionStorage.getItem('pwa_installed') === 'true';
    return isStandalone || isIPhoneApp || isAndroidApp || wasInstalled;
  }, []);

  useEffect(() => {
    if (detectInstalled()) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [detectInstalled]);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    try {
      const dp = deferredPrompt as any;
      dp.prompt();
      const { outcome } = await dp.userChoice;
      if (outcome === 'accepted') {
        sessionStorage.setItem('pwa_installed', 'true');
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error('PWA install failed:', err);
    }
  };

  return (
    <InstallContext.Provider value={{ deferredPrompt, canInstall: !!deferredPrompt, isInstalled, promptInstall }}>
      {children}
    </InstallContext.Provider>
  );
}

export function useInstall() {
  return useContext(InstallContext);
}
