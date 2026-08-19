import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ResearchSection } from '../components/sections/ResearchSection';
import { PublicationsSection } from '../components/sections/PublicationsSection';
import { ToolkitSection } from '../components/sections/ToolkitSection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { ImageBand } from '../components/sections/ImageBand';
import { images } from '../data/images';
import { personSchema, useSeo } from '../utils/seo';

export function Research() {
  useSeo({
    title: 'Research & Impact — Climate Adaptation, Bioenergy and Agricultural Sustainability',
    description:
    'Research spanning climate adaptation, agricultural sustainability, environmental assessment, corporate sustainability and Horizon 2020 work on low-indirect land use change biomass feedstocks.',
    path: '/research',
    image: images.biomass,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="Research & impact"
        title={
        <>
            Turning research
            <span className="block font-normal text-ink-muted">into evidence.</span>
          </>
        }
        lede="Doctoral and applied research across climate adaptation, agricultural sustainability, environmental assessment, corporate sustainability, carbon and bioenergy, and sustainable transitions."
        crumbs={[{ label: 'Research' }]} />
      
      <ResearchSection />
      <ImageBand
        image={images.europe}
        kicker="European research"
        caption="Horizon 2020 work spanned multiple European countries and a single question: what does the land-use evidence actually support?" />
      
      <PublicationsSection />
      <ToolkitSection />
      <ConsultationCta />
    </>);

}