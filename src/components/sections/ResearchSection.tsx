import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { researchThemes } from '../../data/publications';
import { images } from '../../data/images';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const horizonFlow = ['Research', 'Policy Analysis', 'Stakeholder Engagement', 'Climate & Bioenergy Policy'];

export function ResearchSection() {
  return (
    <section aria-labelledby="research-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <SectionHeading
          id="research-heading"
          title={
          <>
              Turning Research
              <span className="block font-normal text-ink-muted">Into Evidence.</span>
            </>
          }
          lede="Research across climate adaptation, agricultural sustainability, environmental assessment, corporate sustainability, carbon and bioenergy, and sustainable transitions." />
        

        <Reveal className="mt-12">
          <GlassCard strong className="overflow-hidden">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[240px]">
                <img
                  src={images.biomass}
                  alt="Bioenergy grass crop in low sunlight"
                  className="absolute inset-0 h-full w-full object-cover" />
                
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-[11.5px] tracking-[0.16em] text-accent">FEATURED RESEARCH</p>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-tightest text-ink">
                  Horizon 2020
                </h3>
                <p className="mt-2 font-display text-[17px] text-ink-muted">
                  Low-Indirect Land Use Change Biomass Feedstocks
                </p>
                <p className="mt-5 text-[14.5px] leading-relaxed text-ink-muted">
                  At the Hungarian Research Institute of Agricultural Economics, Dr. Kennedy led an
                  international research team on this Horizon 2020 project across multiple European
                  countries, connecting field-level evidence to European climate and bioenergy policy.
                </p>

                <ol className="mt-8 space-y-4">
                  {horizonFlow.map((step, index) =>
                  <li key={step} className="flex items-center gap-3">
                      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center" aria-hidden="true">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {index < horizonFlow.length - 1 &&
                      <span className="absolute left-1/2 top-2 h-4 w-px -translate-x-1/2 bg-line" />
                      }
                      </span>
                      <span
                      className={
                      index === horizonFlow.length - 1 ?
                      'text-[14px] font-medium text-ink' :
                      'text-[14px] text-ink-muted'
                      }>
                      
                        {step}
                      </span>
                    </li>
                  )}
                </ol>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchThemes.map((theme, index) =>
          <Reveal key={theme.title} delay={index * 0.04} className="h-full">
              <GlassCard className="flex h-full flex-col rounded-3xl p-6">
                <h3 className="font-display text-[16px] font-semibold leading-snug text-ink">
                  {theme.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{theme.description}</p>
              </GlassCard>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 text-[14px] text-accent transition-opacity duration-200 hover:opacity-80">
            
            See the peer-reviewed record
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>);

}