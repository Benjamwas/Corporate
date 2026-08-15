import React from 'react';
import { geographies, geographyCards } from '../../data/profile';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const connections = [
{ from: 0, to: 3 },
{ from: 1, to: 3 },
{ from: 2, to: 3 }];


export function GeographySection() {
  return (
    <section aria-labelledby="geography-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <SectionHeading
          id="geography-heading"
          title={
          <>
              Research
              <span className="block font-normal text-ink-muted">Without Borders.</span>
            </>
          }
          lede="Study, research and professional experience across Kenya, Hungary and the United Kingdom, including Horizon 2020 research spanning multiple European countries." />
        

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <GlassCard strong className="relative overflow-hidden p-4 sm:p-6">
              <div
                className="relative aspect-[16/10] w-full rounded-3xl"
                style={{
                  backgroundImage:
                  'radial-gradient(circle, rgb(var(--ink) / 0.16) 1px, transparent 1px)',
                  backgroundSize: '18px 18px'
                }}>
                
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full">
                  
                  {connections.map((connection) =>
                  <line
                    key={`${connection.from}-${connection.to}`}
                    x1={geographies[connection.from].x}
                    y1={geographies[connection.from].y}
                    x2={geographies[connection.to].x}
                    y2={geographies[connection.to].y}
                    stroke="rgb(var(--accent))"
                    strokeOpacity="0.35"
                    strokeWidth="0.25"
                    strokeDasharray="1.5 1.5" />

                  )}
                </svg>

                {geographies.map((place) =>
                <div
                  key={place.country}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}>
                  
                    <div className="glass-strong flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3">
                      <span aria-hidden="true" className="text-[15px] leading-none">
                        {place.flag}
                      </span>
                      <span className="text-[12px] font-medium text-ink">{place.country}</span>
                    </div>
                  </div>
                )}
              </div>

              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {geographies.map((place) =>
                <li key={place.country} className="text-[13px] leading-relaxed text-ink-muted">
                    <span className="text-ink">{place.country}</span> — {place.note}
                  </li>
                )}
              </ul>
            </GlassCard>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {geographyCards.map((card, index) =>
            <Reveal key={card} delay={index * 0.06} className="h-full">
                <GlassCard className="flex h-full items-center rounded-3xl p-5">
                  <p className="font-display text-[15.5px] font-medium leading-snug text-ink">{card}</p>
                </GlassCard>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>);

}