import { useTheme as useThemeFromContext, Theme } from '@/context/ThemeContext';

export { useThemeFromContext as useTheme };
export type { Theme };

export function useThemeController() {
  const { theme, setTheme, toggleTheme } = useThemeFromContext();
  const isDark = theme === 'dark';

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
  };
}
