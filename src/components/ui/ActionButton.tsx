import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'glass' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

const base =
'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-premium active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
  'bg-accent text-accent-contrast hover:brightness-110 shadow-[0_10px_24px_-12px_rgb(var(--accent)/0.7)]',
  glass:
  'glass text-ink hover:border-accent/40 hover:text-accent',
  quiet: 'text-ink-muted hover:text-accent'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[15px] py-3.5'
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonProps extends CommonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function ActionButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  type = 'button',
  disabled
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)}>
      
      {children}
    </button>);

}

interface LinkButtonProps extends CommonProps {
  to: string;
}

export function ActionLink({ variant = 'primary', size = 'md', className, children, to }: LinkButtonProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>);

}

interface ExternalLinkProps extends CommonProps {
  href: string;
}

export function ActionExternal({ variant = 'glass', size = 'md', className, children, href }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}>
      
      {children}
    </a>);

}