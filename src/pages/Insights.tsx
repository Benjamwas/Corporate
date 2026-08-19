import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { insightCategories, insights } from '../data/insights';
import { images } from '../data/images';
import { cn } from '../utils/cn';
import { personSchema, useSeo } from '../utils/seo';

export function Insights() {
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? insights : insights.filter((item) => item.category === category);
  const [lead, ...rest] = filtered;

  useSeo({
    title: 'Insights — Ideas for a Changing Planet',
    description:
    'Essays on climate adaptation, sustainable agriculture, carbon markets, ESG, life cycle assessment, renewable energy, environmental policy and sustainable healthcare.',
    path: '/insights',
    image: images.carbon,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="Insights"
        title={
        <>
            Ideas for a
            <span className="block font-normal text-ink-muted">Changing Planet.</span>
          </>
        }
        lede="Writing on how environmental evidence gets made, read and used — across climate, agriculture, carbon, energy and healthcare sustainability."
        crumbs={[{ label: 'Insights' }]}>
        
        <div className="flex flex-wrap gap-2">
          {insightCategories.map((item) =>
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={cn(
              'rounded-full px-4 py-2 text-[12.5px] transition-colors duration-200 ease-premium',
              category === item ?
              'bg-accent text-accent-contrast' :
              'glass text-ink-muted hover:text-accent'
            )}>
            
              {item}
            </button>
          )}
        </div>
      </PageHeader>

      <section className="px-5 py-14" aria-label="Articles">
        <div className="mx-auto max-w-content">
          {!lead &&
          <GlassCard className="p-8 text-center">
              <p className="text-[14.5px] text-ink-muted">
                No articles in this category yet. Choose another topic or check back soon.
              </p>
            </GlassCard>
          }

          {lead &&
          <Reveal>
              <GlassCard strong className="overflow-hidden">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[240px]">
                    <img
                    src={lead.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover" />
                  
                  </div>
                  <div className="p-8 sm:p-10">
                    <p className="text-[11.5px] tracking-[0.14em] text-accent">
                      {lead.category.toUpperCase()}
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.3rem)] font-semibold leading-tight tracking-tightest text-ink">
                      {lead.title}
                    </h2>
                    <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">{lead.excerpt}</p>
                    <p className="mt-7 text-[12.5px] text-ink-subtle">
                      {lead.readTime} · {lead.status}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          }

          {rest.length > 0 &&
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) =>
            <Reveal key={article.slug} delay={index * 0.05} className="h-full">
                  <GlassCard className="flex h-full flex-col overflow-hidden">
                    <img src={article.image} alt="" aria-hidden="true" className="h-40 w-full object-cover" />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[11.5px] tracking-[0.12em] text-accent">
                        {article.category.toUpperCase()}
                      </p>
                      <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug text-ink">
                        {article.title}
                      </h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                        {article.excerpt}
                      </p>
                      <p className="mt-auto pt-5 text-[12px] text-ink-subtle">
                        {article.readTime} · {article.status}
                      </p>
                    </div>
                  </GlassCard>
                </Reveal>
            )}
            </div>
          }
        </div>
      </section>

      <ConsultationCta />
    </>);

}