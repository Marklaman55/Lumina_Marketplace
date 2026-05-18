import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useInstall } from '@/src/context/InstallPromptContext';

export default function PWAInstallBanner() {
  const { canInstall, isInstalled, promptInstall } = useInstall();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!canInstall) return;
    const dismissed = localStorage.getItem('pwa_dismissed') === 'true';
    if (!dismissed) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  if (isInstalled) return null;

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && canInstall && (
        <motion.div
          initial={{ y: 'calc(100% + 1rem)', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 'calc(100% + 1rem)', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[200]"
        >
          <div className="bg-gray-900 rounded-[32px] p-5 md:p-6 shadow-2xl border border-white/5 flex items-center gap-4">
            {/* App Icon */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center shrink-0 shadow-xl">
              <span className="text-white font-black text-xl md:text-2xl italic">L</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-black text-sm md:text-base tracking-tight">
                Get Lumina App
              </h4>
              <p className="text-white/50 font-bold text-[10px] md:text-xs leading-tight mt-0.5">
                Install for faster shopping &amp; exclusive deals
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={promptInstall}
                className="flex items-center gap-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2.5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-amber-900/30 transition-all active:scale-95"
              >
                <Download size={14} />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="p-2.5 text-white/30 hover:text-white/70 rounded-xl transition-colors"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
