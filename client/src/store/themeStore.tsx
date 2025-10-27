import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeStore {
  isDarkMode: boolean;
}

export const initialState: ThemeStore = {
  isDarkMode: false,
};

export type ThemeActions = {
  toggleTheme: () => void;
};

export type ThemeState = ThemeStore & ThemeActions;

const useThemeStore = create<ThemeState>()(
  persist<ThemeState>(
    (set) => ({
      ...initialState,
      toggleTheme: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme',
    }
  )
);

export default useThemeStore;
