import React from 'react';
import { expertiseAreas } from '../../data/expertise';
import { images } from '../../data/images';
import { resolveIcon } from '../../utils/icons';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

interface ExpertiseGridProps {
  showHeading?: boolean;
}

export function ExpertiseGrid({ showHeading = true }: ExpertiseGridProps) {
  const [featured, ...rest] = expertiseAreas;
  const FeaturedIcon = resolveIcon(featured.icon);

  return (
    <section aria-labelledby="expertise-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        {showHeading &&
        <SectionHeading
          id="expertise-heading"
          title={
          <>
                Nine areas where the
                <span className="block font-normal text-ink-muted">evidence is already deep.</span>
              </>
          }
          lede="Core competencies developed across doctoral research, European research programmes, local government climate work and healthcare sustainability." />

        }

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          <Reveal className="min-w-[80%] snap-start sm:col-span-2 sm:min-w-0">
            <GlassCard strong className="flex h-full flex-col overflow-hidden">
              <div className="relative h-36 shrink-0 sm:h-40">
                <img
                  src={images.research}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover" />
                
              </div>
              <div className="flex flex-1 flex-col p-6">
                <FeaturedIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[22px] font-semibold leading-snug text-ink">
                  {featured.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                  {featured.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {featured.tags.map((tag) =>
                  <span
                    key={tag}
                    className="rounded-full border border-line/70 px-3 py-1 text-[11.5px] text-ink-subtle">
                    
                      {tag}
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {rest.map((area, index) => {
            const Icon = resolveIcon(area.icon);
            return (
              <Reveal
                key={area.slug}
                delay={0.04 * index}
                className="min-w-[80%] snap-start sm:min-w-0">
                
                <GlassCard className="flex h-full flex-col p-6 transition-[border-color,transform] duration-300 ease-premium hover:-translate-y-1 hover:border-accent/35">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-[17px] font-semibold leading-snug text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{area.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {area.tags.map((tag) =>
                    <span
                      key={tag}
                      className="rounded-full border border-line/70 px-2.5 py-1 text-[11px] text-ink-subtle">
                      
                        {tag}
                      </span>
                    )}
                  </div>
                </GlassCard>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}