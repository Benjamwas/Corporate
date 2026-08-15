import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  kicker: string;
  title: React.ReactNode;
  lede: string;
  crumbs: {label: string;to?: string;}[];
  children?: React.ReactNode;
}

export function PageHeader({ kicker, title, lede, crumbs, children }: PageHeaderProps) {
  return (
    <header className="px-5 pt-6">
      <div className="mx-auto max-w-content">
        <Breadcrumbs items={crumbs} />
        <Reveal>
          <p className="text-[11.5px] tracking-[0.16em] text-accent">{kicker.toUpperCase()}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-tightest text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-ink-muted">{lede}</p>
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </header>);

}