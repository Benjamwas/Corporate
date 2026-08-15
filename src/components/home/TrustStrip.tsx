import React from 'react';
import { trustStats } from '../../data/profile';
import { Counter, Reveal } from '../ui/Reveal';

export function TrustStrip() {
  return (
    <section aria-label="Credentials at a glance" className="px-5 py-10">
      <div className="glass mx-auto grid max-w-content gap-px overflow-hidden rounded-4xl sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat, index) =>
        <Reveal
          key={stat.label}
          delay={index * 0.06}
          className="border-line/50 p-7 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0 lg:[&:nth-child(even)]:border-l">
          
            <p className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none tracking-tightest text-ink">
              {typeof stat.count === 'number' ?
            <Counter value={stat.count} suffix={stat.suffix ?? ''} /> :

            stat.display
            }
            </p>
            <p className="mt-3 text-[13.5px] font-medium text-ink">{stat.label}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-subtle">{stat.note}</p>
          </Reveal>
        )}
      </div>
    </section>);

}