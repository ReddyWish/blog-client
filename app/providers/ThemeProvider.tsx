import {
  useEffect,
  useState,
  type ReactNode,
  use,
  useLayoutEffect,
} from 'react';
import { setItem, getItem } from '~/lib/localStorage';
import { createContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeContext = createContext<ThemeProviderState>({
  theme: 'system',
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-theme',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(getItem(storageKey) ?? defaultTheme);

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      setItem(storageKey, systemTheme);
      return;
    }

    root.classList.add(theme);
    setItem(storageKey, theme);
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
