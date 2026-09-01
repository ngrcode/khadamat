import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '@/store/authStore';

const resetAuthStore = () => {
  useAuthStore.setState({
    token: null,
    refreshToken: null,
    userType: null,
    userName: null,
    firstLogin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    _hasHydrated: false,
  });
};

describe('auth store', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetAuthStore();
  });

  it('marks the user as authenticated on login', () => {
    useAuthStore.getState().login();

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().error).toBeNull();
  });

  it('stores user info in Zustand state and localStorage', () => {
    useAuthStore.getState().setUserInfo('admin', 'سارا احمدی', false);

    expect(useAuthStore.getState()).toMatchObject({
      userType: 'admin',
      userName: 'سارا احمدی',
      firstLogin: false,
    });
    expect(window.localStorage.getItem('userType')).toBe('admin');
    expect(window.localStorage.getItem('userName')).toBe('سارا احمدی');
    expect(window.localStorage.getItem('firstLogin')).toBe('false');
  });

  it('clears auth state on logout', () => {
    useAuthStore.getState().login();
    useAuthStore.getState().setUserInfo('admin', 'سارا احمدی', false);

    useAuthStore.getState().logout();

    expect(useAuthStore.getState()).toMatchObject({
      token: null,
      refreshToken: null,
      userType: null,
      userName: null,
      firstLogin: null,
      isAuthenticated: false,
    });
  });

  it('updates loading, error, hydration, and token helper state', () => {
    const store = useAuthStore.getState();

    store.setLoading(true);
    store.setError('خطای ورود');
    store.setHasHydrated(true);
    store.setToken('token-value');
    store.setRefreshToken('refresh-token-value');
    store.checkAndSetTokens('token-value', 'refresh-token-value');

    expect(useAuthStore.getState()).toMatchObject({
      isLoading: true,
      error: 'خطای ورود',
      _hasHydrated: true,
      token: null,
      refreshToken: null,
    });

    useAuthStore.getState().clearError();

    expect(useAuthStore.getState().error).toBeNull();
    expect(useAuthStore.getState().syncTokensToCookies()).toBeUndefined();
  });
});
