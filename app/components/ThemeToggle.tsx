import { useTheme } from '~/providers/ThemeProvider';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
};
