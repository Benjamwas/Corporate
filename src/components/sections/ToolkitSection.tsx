import React from 'react';
import { toolkit } from '../../data/profile';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function ToolkitSection() {
  return (
    <section aria-labelledby="toolkit-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            id="toolkit-heading"
            title={
            <>
                Research
                <span className="block font-normal text-ink-muted">toolkit.</span>
              </>
            }
            lede="The software and methods behind the assessments — from life cycle modelling to qualitative coding and spatial analysis." />
          

          <div className="flex flex-wrap gap-3">
            {toolkit.map((tool, index) =>
            <Reveal key={tool.name} delay={index * 0.035}>
                <div className="glass float-soft-slow rounded-3xl px-5 py-4" style={{ animationDelay: `${index * 0.4}s` }}>
                  <p className="font-display text-[15px] font-semibold text-ink">{tool.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-subtle">{tool.note}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>);

}