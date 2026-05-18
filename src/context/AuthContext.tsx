import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lumina_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lumina_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lumina_user');
    }
  }, [user]);

  const login = async (email: string, pass: string) => {
    // Simulating login
    if (email === 'admin@lumina.com' && pass === 'admin123') {
      setUser({ id: '1', name: 'Admin User', email, role: 'admin' });
    } else if (email === 'admin@lumina.com' && pass !== 'admin123') {
      throw new Error('Invalid administration password');
    } else {
      setUser({ id: '2', name: 'John Doe', email, phone: '0712345678', role: 'user' });
    }
  };

  const register = async (data: any) => {
    setUser({ id: Date.now().toString(), name: data.name, email: data.email, phone: data.phone, role: 'user' });
  };

  const logout = () => setUser(null);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
