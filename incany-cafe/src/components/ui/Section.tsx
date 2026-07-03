import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'surface' | 'elevated';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
}

export default function Section({
  id,
  children,
  className = '',
  background = 'default',
  spacing = 'lg',
  containerWidth = 'default',
}: SectionProps) {
  const backgroundStyles: Record<string, string> = {
    default: 'bg-background',
    surface: 'bg-surface',
    elevated: 'bg-surface-elevated',
  };

  const spacingStyles: Record<string, string> = {
    sm: 'py-10 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-12 sm:py-16 lg:py-20',
    xl: 'py-14 sm:py-20 lg:py-24 xl:py-32',
  };

  const containerWidthStyles: Record<string, string> = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <section
      id={id}
      className={`${backgroundStyles[background]} ${spacingStyles[spacing]} ${className}`}
    >
      <div className={`${containerWidthStyles[containerWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
