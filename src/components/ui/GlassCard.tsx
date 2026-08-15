import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  as?: 'div' | 'article' | 'section' | 'li' | 'aside';
}

export function GlassCard({ children, className, strong = false, as = 'div' }: GlassCardProps) {
  const Tag = as;
  return (
    <Tag className={cn(strong ? 'glass-strong' : 'glass', 'rounded-4xl', className)}>{children}</Tag>);

}