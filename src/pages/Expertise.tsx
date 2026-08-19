import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ExpertiseGrid } from '../components/sections/ExpertiseGrid';
import { ToolkitSection } from '../components/sections/ToolkitSection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { FaqSection } from '../components/sections/FaqSection';
import { ImageBand } from '../components/sections/ImageBand';
import { images } from '../data/images';
import { personSchema, useSeo } from '../utils/seo';

export function Expertise() {
  useSeo({
    title: 'Expertise — Life Cycle Assessment, Carbon, Climate & Agricultural Economics',
    description:
    'Core competencies spanning life cycle assessment, climate adaptation, agricultural economics, carbon accounting, environmental impact assessment, ESG strategy, renewable energy and research analytics.',
    path: '/expertise',
    image: images.research,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="Expertise"
        title={
        <>
            Nine competencies,
            <span className="block font-normal text-ink-muted">one method.</span>
          </>
        }
        lede="Each area below is grounded in doctoral training, peer-reviewed research and applied work in European research programmes, local government and healthcare sustainability."
        crumbs={[{ label: 'Expertise' }]} />
      
      <ExpertiseGrid showHeading={false} />
      <ImageBand
        image={images.research}
        kicker="Scientific practice"
        caption="Life cycle assessment, statistical analysis and qualitative evidence, applied to the same question." />
      
      <ToolkitSection />
      <FaqSection />
      <ConsultationCta />
    </>);

}