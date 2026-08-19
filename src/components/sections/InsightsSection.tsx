import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { insights } from '../../data/insights';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function InsightsSection({ limit = 3 }: {limit?: number;}) {
  const shown = insights.slice(0, limit);

  return (
    <section aria-labelledby="insights-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="insights-heading"
            title={
            <>
                Ideas for a
                <span className="block font-normal text-ink-muted">Changing Planet.</span>
              </>
            }
            lede="Short essays on how environmental evidence gets made, read and used." />
          
          <Link
            to="/insights"
            className="inline-flex shrink-0 items-center gap-2 text-[14px] text-accent transition-opacity duration-200 hover:opacity-80">
            
            All insights
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {shown.map((article, index) =>
          <Reveal key={article.slug} delay={index * 0.06} className="h-full">
              <GlassCard className="flex h-full flex-col overflow-hidden">
                <img src={article.image} alt="" aria-hidden="true" className="h-44 w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11.5px] tracking-[0.12em] text-accent">
                    {article.category.toUpperCase()}
                  </p>
                  <h3 className="mt-3 font-display text-[17.5px] font-semibold leading-snug text-ink">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">{article.excerpt}</p>
                  <p className="mt-auto pt-5 text-[12px] text-ink-subtle">
                    {article.readTime} · {article.status}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}