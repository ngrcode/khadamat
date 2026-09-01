'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { clearPreLoginSession } from '@/utils/clearPreLoginSession';
import {
  readAuthProfile,
  readAuthToken,
  writeAuthToken,
} from '@/utils/authToken';

const hasValidSessionProfile = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  let token = readAuthToken();
  if (token) {
    writeAuthToken(token);
    token = readAuthToken();
  }

  const profile = readAuthProfile();
  return Boolean(token && profile);
};

export function SessionGuard({ children }: { children: ReactNode }) {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const login = useAuthStore((state) => state.login);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    let cancelled = false;

    const validateSession = async () => {
      if (!hasValidSessionProfile()) {
        await clearPreLoginSession();
        window.location.replace('/login');
        return;
      }

      const profile = readAuthProfile();
      if (!profile) {
        await clearPreLoginSession();
        window.location.replace('/login');
        return;
      }

      setUserInfo(profile.userType, profile.userName, profile.firstLogin);
      login();

      if (!cancelled) {
        setReady(true);
      }
    };

    void validateSession();

    return () => {
      cancelled = true;
    };
  }, [hasHydrated, setUserInfo, login]);

  if (!hasHydrated || !ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg,#f3f5f8)]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[rgba(var(--color-primary-rgb),0.2)] border-t-[rgb(var(--color-primary-rgb,#3a1571))]" />
      </div>
    );
  }

  return <>{children}</>;
}
