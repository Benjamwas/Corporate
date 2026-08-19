import React from 'react';
import { cn } from '../../utils/cn';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  title: React.ReactNode;
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export function SectionHeading({ title, lede, align = 'left', className, id }: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      <h2
        id={id}
        className="font-display text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.05] tracking-tightest text-ink">
        
        {title}
      </h2>
      {lede && <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{lede}</p>}
    </Reveal>);

}