import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { philosophyFlow } from '../../data/profile';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

export function PhilosophyFlow() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="philosophy-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="philosophy-heading"
            title={
            <>
                Where Science
                <span className="block font-normal text-ink-muted">Meets Action.</span>
              </>
            }
            lede="Research on its own does not change a decision. The value comes from carrying it through — from question, to data, to assessment, to strategy, to something that happens on the ground." />
          
          <Reveal delay={0.1} className="max-w-xs lg:text-right">
            <p className="text-[13px] leading-relaxed text-ink-subtle">
              Every engagement follows the same chain of reasoning, so the evidence behind a
              recommendation is always traceable.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-6 top-2 h-[calc(100%-1.5rem)] w-px bg-line lg:left-0 lg:top-3 lg:h-px lg:w-full" />
          
          {!reduce &&
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-[0.6rem] hidden h-1.5 w-1.5 rounded-full bg-accent lg:block"
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} />

          }

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {philosophyFlow.map((item, index) =>
            <motion.li
              key={item.step}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="relative pl-16 lg:pl-0">
              
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas text-[12.5px] font-medium text-accent lg:relative lg:mb-6 lg:h-6 lg:w-6 lg:text-[11px]">
                  {index + 1}
                </span>
                <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">
                  {item.step}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{item.detail}</p>
              </motion.li>
            )}
          </ol>
        </div>
      </div>
    </section>);

}