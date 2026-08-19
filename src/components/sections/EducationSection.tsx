import React from 'react';
import { GraduationCapIcon } from 'lucide-react';
import { education } from '../../data/publications';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function EducationSection() {
  return (
    <section aria-labelledby="education-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <SectionHeading
          id="education-heading"
          title={
          <>
              Academic
              <span className="block font-normal text-ink-muted">foundations.</span>
            </>
          }
          lede="Twelve years of formal training across agroforestry, agribusiness and economics — in Kenya and Hungary." />
        

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {education.map((record, index) =>
          <Reveal key={record.degree} delay={index * 0.06} className="h-full">
              <GlassCard
              strong={index === 0}
              className="flex h-full flex-col p-7">
              
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-[2.6rem] font-semibold leading-none tracking-tightest text-accent">
                    {record.degree}
                  </span>
                  <GraduationCapIcon className="h-5 w-5 text-ink-subtle" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug text-ink">
                  {record.field}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{record.institution}</p>
                <p className="mt-auto pt-5 text-[12.5px] text-ink-subtle">
                  {record.location} · {record.period}
                </p>
              </GlassCard>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}