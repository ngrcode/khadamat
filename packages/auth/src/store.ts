import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  userType: string | null;
  userName: string | null;
  firstLogin: boolean | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;

  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setUserInfo: (userType: string, userName: string, firstLogin: boolean) => void;
  login: () => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  checkAndSetTokens: (tokenValue: string | null, refreshToken: string | null) => void;
  syncTokensToCookies: () => void;
}

const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, value);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      userType: null,
      userName: null,
      firstLogin: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hasHydrated: false,

      setToken: () => {
        set({ token: null, refreshToken: null });
      },

      setRefreshToken: () => {
        set({ refreshToken: null });
      },

      checkAndSetTokens: () => {
        set({ token: null, refreshToken: null });
      },

      setUserInfo: (userType, userName, firstLogin) => {
        set({ userType, userName, firstLogin });
        setLocalStorageItem('userType', String(userType));
        setLocalStorageItem('userName', userName);
        setLocalStorageItem('firstLogin', String(firstLogin));
      },

      login: () => {
        set({
          token: null,
          refreshToken: null,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        set({
          token: null,
          refreshToken: null,
          userType: null,
          userName: null,
          firstLogin: null,
          isAuthenticated: false,
        });
      },

      syncTokensToCookies: () => undefined,
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userType: state.userType,
        userName: state.userName,
        firstLogin: state.firstLogin,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setToken(null);
        state?.setRefreshToken(null);
        state?.setHasHydrated(true);

        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('refreshToken');
        }
      },
    }
  )
);
