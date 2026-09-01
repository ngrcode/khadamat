'use client';

import { handleCookie } from '@repo/auth';
import { useAuthStore } from '@/store/authStore';
import { clearAuthToken } from '@/utils/authToken';

const KNOWN_AUTH_COOKIES = ['token', 'refreshToken', 'reshToken'];

const PRESERVED_STORAGE_KEYS = [
  'app-language',
  'khadamat-appearance-v3',
];

const clearDocumentCookies = () => {
  if (typeof document === 'undefined') return;

  const hostname = window.location.hostname;
  const domains = [undefined, hostname, `.${hostname}`];

  const hostParts = hostname.split('.');
  if (hostParts.length >= 2) {
    domains.push(`.${hostParts.slice(-2).join('.')}`);
  }

  const cookieNames = new Set<string>(KNOWN_AUTH_COOKIES);

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (name) cookieNames.add(name);
  });

  cookieNames.forEach((name) => {
    handleCookie({ type: 'removeCookie', key: name, value: '' });

    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
      document.cookie = `${name}=; Max-Age=0; path=/; Secure${domainPart}`;
    });
  });

  clearAuthToken();
};

export async function clearPreLoginSession() {
  if (typeof window === 'undefined') return;

  try {
    useAuthStore.getState().logout();
  } catch {
    // ignore store errors during pre-login cleanup
  }

  try {
    const preserved = PRESERVED_STORAGE_KEYS.reduce<Record<string, string>>(
      (acc, key) => {
        const value = localStorage.getItem(key);
        if (value != null) acc[key] = value;
        return acc;
      },
      {},
    );

    localStorage.clear();

    Object.entries(preserved).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  } catch {
    // ignore
  }

  try {
    sessionStorage.clear();
  } catch {
    // ignore
  }

  clearDocumentCookies();

  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
    });
  } catch {
    // ignore
  }

  clearDocumentCookies();
}
