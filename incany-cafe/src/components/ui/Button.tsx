import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-hover)] hover:scale-105 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    secondary: 'bg-[var(--surface-elevated)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--accent)] hover:scale-105 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    ghost: 'bg-transparent text-[var(--accent)] hover:bg-[var(--surface-elevated)] hover:text-[var(--accent-hover)]',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const shadowStyles = variant !== 'ghost' ? { boxShadow: 'var(--shadow)' } : undefined;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={shadowStyles}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
}
