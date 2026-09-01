'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '../store';
import { handleLocalStorage } from '../storage/localStorage';

interface AuthContextType {
  tokenValue: string | null;
  setTokenValue: (t: string | null) => void;
  logout: () => void;
  isAuthLoading: boolean;
  setAuthLoading: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokenValue, setTokenValue] = useState<string | null>(null);
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setTokenValue(isAuthenticated ? 'authenticated' : null);
  }, [isAuthenticated]);

  const logout = async () => {
    setAuthLoading(true);

    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      storeLogout();
      handleLocalStorage({ type: 'clearLocalStorage' });
    }

    setTokenValue(null);
    setAuthLoading(true);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{ tokenValue, setTokenValue, logout, isAuthLoading, setAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
