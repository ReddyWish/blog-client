import { Link } from 'react-router';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          Demo
        </Link>
        <nav className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Button>Sign In</Button>
        </nav>
      </div>
    </header>
  );
}
