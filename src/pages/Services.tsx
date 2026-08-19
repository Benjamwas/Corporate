import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { FaqSection } from '../components/sections/FaqSection';
import { images } from '../data/images';
import { professionalServiceSchema, useSeo } from '../utils/seo';

export function Services() {
  useSeo({
    title: 'Consulting Services — Sustainability, Carbon, LCA & Research Advisory',
    description:
    'Advisory areas including sustainability strategy, carbon and climate advisory, life cycle assessment, sustainable agriculture, renewable energy assessment, research and evaluation, and policy advisory.',
    path: '/services',
    image: images.carbon,
    schema: professionalServiceSchema(
      'Sustainability and climate advisory — Dr. Kennedy Ndue Mutua',
      'Evidence-based sustainability, carbon, life cycle assessment and research advisory for organizations.'
    )
  });

  return (
    <>
      <PageHeader
        kicker="Services"
        title={
        <>
            Advisory built on
            <span className="block font-normal text-ink-muted">assessment, not opinion.</span>
          </>
        }
        lede="Eight advisory areas, all grounded in the same professional record. Engagements begin with a consultation to confirm the request fits the evidence base."
        crumbs={[{ label: 'Services' }]} />
      
      <ServicesSection />
      <FaqSection />
      <ConsultationCta />
    </>);

}