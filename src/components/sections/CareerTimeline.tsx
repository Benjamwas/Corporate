import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, MapPinIcon } from 'lucide-react';
import { experienceRoles } from '../../data/experience';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../utils/cn';

export function CareerTimeline() {
  const [activeId, setActiveId] = useState(experienceRoles[0].id);
  const active = experienceRoles.find((role) => role.id === activeId) ?? experienceRoles[0];

  return (
    <section aria-labelledby="career-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <SectionHeading
          id="career-heading"
          title={
          <>
              A Career Built Across
              <span className="block font-normal text-ink-muted">Research, Policy & Practice.</span>
            </>
          }
          lede="Five roles across three countries — each one adding a different lens on how environmental evidence gets used." />
        

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="relative">
            <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
            {experienceRoles.map((role) => {
              const isActive = role.id === activeId;
              return (
                <li key={role.id} className="relative pl-8">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 top-[1.55rem] h-[15px] w-[15px] rounded-full border-2 transition-colors duration-200',
                      isActive ? 'border-accent bg-accent' : 'border-line bg-canvas'
                    )} />
                  
                  <button
                    type="button"
                    onClick={() => setActiveId(role.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'w-full rounded-3xl px-4 py-4 text-left transition-colors duration-200 ease-premium',
                      isActive ? 'bg-accent/10' : 'hover:bg-ink/[0.04]'
                    )}>
                    
                    <span className="flex items-baseline justify-between gap-3">
                      <span
                        className={cn(
                          'font-display text-[15.5px] font-semibold leading-snug',
                          isActive ? 'text-accent' : 'text-ink'
                        )}>
                        
                        {role.role}
                      </span>
                      <span className="shrink-0 text-[12px] tabular-nums text-ink-subtle">{role.period}</span>
                    </span>
                    <span className="mt-1 block text-[13px] text-ink-muted">{role.organisation}</span>
                  </button>
                </li>);

            })}
          </ol>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}>
                
                <GlassCard strong className="overflow-hidden">
                  <img src={active.image} alt="" aria-hidden="true" className="h-44 w-full object-cover sm:h-52" />
                  <div className="p-7">
                    <p className="text-[11.5px] tracking-[0.16em] text-accent">{active.focus.toUpperCase()}</p>
                    <h3 className="mt-3 font-display text-[22px] font-semibold leading-snug text-ink">
                      {active.role}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-ink-muted">{active.organisation}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-[13px] text-ink-subtle">
                      <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {active.location} · {active.period}
                    </p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {active.highlights.map((highlight) =>
                      <li key={highlight} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-muted">
                          <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                          {highlight}
                        </li>
                      )}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>);

}