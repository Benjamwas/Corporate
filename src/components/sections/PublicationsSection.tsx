import React from 'react';
import { ExternalLinkIcon, FileTextIcon } from 'lucide-react';
import { publications, publicationTopics } from '../../data/publications';
import { GlassCard } from '../ui/GlassCard';
import { Counter, Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function PublicationsSection() {
  return (
    <section aria-labelledby="publications-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="publications-heading"
            title={
            <>
                Research That Contributes
                <span className="block font-normal text-ink-muted">to the Conversation.</span>
              </>
            }
            lede="Six peer-reviewed publications across climate change adaptation, agricultural sustainability, environmental assessment and corporate sustainability." />
          
          <Reveal delay={0.08}>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[3.4rem] font-semibold leading-none tracking-tightest text-ink">
                <Counter value={6} />
              </span>
              <span className="max-w-[9rem] text-[13px] leading-snug text-ink-muted">
                Peer-Reviewed Publications
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {publicationTopics.map((topic) =>
          <span
            key={topic}
            className="glass rounded-full px-3.5 py-1.5 text-[12.5px] text-ink-muted">
            
              {topic}
            </span>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((publication, index) =>
          <Reveal key={publication.id} delay={index * 0.04} className="h-full">
              <GlassCard className="flex h-full flex-col rounded-3xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <FileTextIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="text-[11.5px] tracking-[0.1em] text-ink-subtle">
                    {publication.year.toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[16px] font-semibold leading-snug text-ink">
                  {publication.topic}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  {publication.description}
                </p>
                <div className="mt-auto pt-5">
                  <p className="text-[12px] text-ink-subtle">{publication.journalStatus}</p>
                  {publication.link ?
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] text-accent transition-opacity duration-200 hover:opacity-80">
                  
                      View publication
                      <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </a> :

                <p className="mt-2 text-[12.5px] text-ink-subtle">Link to be added</p>
                }
                </div>
              </GlassCard>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}