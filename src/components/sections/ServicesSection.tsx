import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { services } from '../../data/services';
import { resolveIcon } from '../../utils/icons';
import { useUi } from '../../contexts/UiContext';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesSection({ limit }: {limit?: number;}) {
  const { setInterestedService } = useUi();
  const shown = limit ? services.slice(0, limit) : services;

  return (
    <section aria-labelledby="services-heading" className="px-5 py-20">
      <div className="mx-auto max-w-content">
        <SectionHeading
          id="services-heading"
          title={
          <>
              Need Evidence Before
              <span className="block font-normal text-ink-muted">Making the Decision?</span>
            </>
          }
          lede="Advisory work grounded in research practice. Each engagement starts by establishing what is already known, then builds only the evidence the decision actually requires." />
        

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((service, index) => {
            const Icon = resolveIcon(service.icon);
            const body =
            <GlassCard
              className="flex h-full flex-col p-6 transition-[border-color,transform] duration-300 ease-premium hover:-translate-y-1 hover:border-accent/35">
              
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[16.5px] font-semibold leading-snug text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{service.summary}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[12.5px] text-accent">
                  {service.hasDetailPage ? 'View service' : 'Discuss this'}
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </GlassCard>;


            return (
              <Reveal key={service.slug} delay={index * 0.04} className="h-full">
                <Link
                  to={service.hasDetailPage ? `/services/${service.slug}` : '/booking'}
                  onClick={() => setInterestedService(service.title)}
                  className="block h-full">
                  
                  {body}
                </Link>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}