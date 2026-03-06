import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  level?: 2 | 3;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  level = 2,
  className = '',
}: SectionHeaderProps) {
  const alignStyles: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;

  // Heading size based on level
  const headingSize = level === 2 
    ? 'text-3xl sm:text-4xl md:text-5xl' 
    : 'text-2xl sm:text-3xl md:text-4xl';

  return (
    <div className={`${alignStyles[align]} mb-12 lg:mb-16 ${className}`}>
      {badge && (
        <span className="inline-block text-sm font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 mb-4">
          {badge}
        </span>
      )}
      <HeadingTag className={`${headingSize} font-heading text-text mb-4`}>
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
