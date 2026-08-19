import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { CareerTimeline } from '../components/sections/CareerTimeline';
import { GeographySection } from '../components/sections/GeographySection';
import { EducationSection } from '../components/sections/EducationSection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { ImageBand } from '../components/sections/ImageBand';
import { images } from '../data/images';
import { personSchema, useSeo } from '../utils/seo';

export function Experience() {
  useSeo({
    title: 'Experience — Sustainability, Climate and Research Roles',
    description:
    'Roles at the Centre for Sustainable Healthcare, University of Chester CREST, Wrexham County Borough Council, the Hungarian Research Institute of Agricultural Economics and Discovery Research Centre.',
    path: '/experience',
    image: images.healthcare,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="Experience"
        title={
        <>
            A career built across
            <span className="block font-normal text-ink-muted">research, policy &amp; practice.</span>
          </>
        }
        lede="From fieldwork in Kenya to Horizon 2020 research leadership in Hungary, local government carbon reduction in Wales and healthcare sustainability in Oxford."
        crumbs={[{ label: 'Experience' }]} />
      
      <CareerTimeline />
      <ImageBand
        image={images.healthcare}
        kicker="Sustainable healthcare"
        caption="Health systems are large environmental actors — and precise about the evidence they act on." />
      
      <GeographySection />
      <EducationSection />
      <ConsultationCta />
    </>);

}