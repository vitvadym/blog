import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStore {
  isAuth: boolean;
  role: string | null;
  name: string | null;
}

export const initialState: AuthStore = {
  isAuth: false,
  role: null,
  name: null,
};

export type AuthActions = {
  login: (payload: AuthStore) => void;
  logout: () => void;
};

export type AuthState = AuthStore & AuthActions;

const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      ...initialState,
      login: (payload) => set({ ...payload }),
      logout: () => set(initialState),
    }),
    {
      name: 'auth',
    },
  ),
);

export default useAuthStore;
