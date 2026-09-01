'use client';

import { useAuthStore } from '../store';

export interface LocalStorageAction {
  type: 'setLocalStorage' | 'getLocalStorage' | 'getLocalStorageParse' | 'removeLocalStorage' | 'clearLocalStorage';
  key?: string;
  item?: string;
}

const TOKEN_KEYS = new Set(['token', 'refreshToken']);
const AUTH_KEYS = ['auth-storage', 'token', 'refreshToken', 'userType', 'userName', 'firstLogin', 'panelMenu'];

const stripTokensFromAuthStorage = (item: string) => {
  try {
    const parsedItem = JSON.parse(item);
    if (parsedItem?.state) {
      delete parsedItem.state.token;
      delete parsedItem.state.refreshToken;
    }
    return JSON.stringify(parsedItem);
  } catch {
    return item;
  }
};

const getAuthStorageValue = () => {
  const authStore = useAuthStore.getState();

  return {
    state: {
      userType: authStore.userType,
      userName: authStore.userName,
      firstLogin: authStore.firstLogin,
      isAuthenticated: authStore.isAuthenticated,
    },
    version: 0,
  };
};

export function handleLocalStorage({ type, key, item }: LocalStorageAction): string | object | null | undefined {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    return null;
  }

  switch (type) {
    case 'setLocalStorage': {
      if (!key || item === undefined) {
        return null;
      }

      if (TOKEN_KEYS.has(key)) {
        localStorage.removeItem(key);
        return null;
      }

      const itemToStore = key === 'auth-storage' ? stripTokensFromAuthStorage(item) : item;
      localStorage.setItem(key, itemToStore);
      return null;
    }

    case 'getLocalStorage': {
      if (!key) {
        return null;
      }

      if (TOKEN_KEYS.has(key)) {
        localStorage.removeItem(key);
        return null;
      }

      if (key === 'auth-storage') {
        return JSON.stringify(getAuthStorageValue());
      }

      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }

    case 'getLocalStorageParse': {
      if (!key) {
        return null;
      }

      if (TOKEN_KEYS.has(key)) {
        localStorage.removeItem(key);
        return null;
      }

      if (key === 'auth-storage') {
        return getAuthStorageValue();
      }

      try {
        const storedItem = localStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : null;
      } catch {
        return null;
      }
    }

    case 'removeLocalStorage': {
      if (!key) {
        return null;
      }

      if (key === 'auth-storage') {
        const authStore = useAuthStore.getState();
        authStore.logout();
      }

      localStorage.removeItem(key);
      return null;
    }

    case 'clearLocalStorage': {
      const authStore = useAuthStore.getState();
      authStore.logout();
      AUTH_KEYS.forEach((storageKey) => localStorage.removeItem(storageKey));
      return null;
    }

    default: {
      return null;
    }
  }
}

export const setToken = (_token?: string | null): void => {
  handleLocalStorage({ type: 'removeLocalStorage', key: 'token' });
};

export const getToken = (): string | null => {
  handleLocalStorage({ type: 'removeLocalStorage', key: 'token' });
  return null;
};

export const removeToken = (): void => {
  handleLocalStorage({ type: 'removeLocalStorage', key: 'token' });
};

export const setRefreshToken = (_refreshToken?: string | null): void => {
  handleLocalStorage({ type: 'removeLocalStorage', key: 'refreshToken' });
};

export const getRefreshToken = (): string | null => {
  handleLocalStorage({ type: 'removeLocalStorage', key: 'refreshToken' });
  return null;
};

export const removeRefreshToken = (): void => {
  handleLocalStorage({ type: 'removeLocalStorage', key: 'refreshToken' });
};

export const getUserInfo = () => {
  const authStore = useAuthStore.getState();
  return {
    userName: authStore.userName,
    userType: authStore.userType,
    firstLogin: authStore.firstLogin,
    isAuthenticated: authStore.isAuthenticated,
  };
};

export const setUserInfo = (userType: string, userName: string, firstLogin: boolean): void => {
  const authStore = useAuthStore.getState();
  authStore.setUserInfo(userType, userName, firstLogin);
};

export const setItem = <T>(key: string, value: T): void => {
  if (TOKEN_KEYS.has(key)) {
    handleLocalStorage({ type: 'removeLocalStorage', key });
    return;
  }

  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

  if (key === 'userName' || key === 'userType') {
    const authStore = useAuthStore.getState();
    if (key === 'userName' && authStore.userType) {
      authStore.setUserInfo(authStore.userType, stringValue, authStore.firstLogin || false);
    }
  }

  handleLocalStorage({
    type: 'setLocalStorage',
    key,
    item: stringValue,
  });
};

export const getItem = <T>(key: string): T | null => {
  if (TOKEN_KEYS.has(key)) return null;

  const authStore = useAuthStore.getState();

  if (key === 'userName') return authStore.userName as T;
  if (key === 'userType') return authStore.userType as T;
  if (key === 'firstLogin') return authStore.firstLogin as T;

  const item = handleLocalStorage({ type: 'getLocalStorage', key });
  return item as T | null;
};

export const getParsedItem = <T>(key: string): T | null => {
  if (TOKEN_KEYS.has(key)) return null;

  if (key === 'auth-storage') {
    return getAuthStorageValue() as T;
  }

  const item = handleLocalStorage({ type: 'getLocalStorageParse', key });
  return item as T | null;
};

export const removeItem = (key: string): void => {
  handleLocalStorage({ type: 'removeLocalStorage', key });
};

export const clearStorage = (): void => {
  handleLocalStorage({ type: 'clearLocalStorage' });
};
