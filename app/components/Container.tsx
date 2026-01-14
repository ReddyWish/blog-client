type ContainerSize = 'narrow' | 'default' | 'wide' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
}

const widths: Record<ContainerSize, string> = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-full',
};

export function Container({ children, size = 'default' }: ContainerProps) {
  return <div className={`mx-auto px-4 ${widths[size]}`}>{children}</div>;
}
