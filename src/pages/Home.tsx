import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustStrip } from '../components/home/TrustStrip';
import { PhilosophyFlow } from '../components/home/PhilosophyFlow';
import { ExpertiseGrid } from '../components/sections/ExpertiseGrid';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { CareerTimeline } from '../components/sections/CareerTimeline';
import { GeographySection } from '../components/sections/GeographySection';
import { ResearchSection } from '../components/sections/ResearchSection';
import { PublicationsSection } from '../components/sections/PublicationsSection';
import { EducationSection } from '../components/sections/EducationSection';
import { ToolkitSection } from '../components/sections/ToolkitSection';
import { InsightsSection } from '../components/sections/InsightsSection';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCta } from '../components/sections/FinalCta';
import { ImageBand } from '../components/sections/ImageBand';
import { images } from '../data/images';
import { personSchema, useSeo } from '../utils/seo';

export function Home() {
  useSeo({
    title: 'Dr. Kennedy Ndue Mutua — Climate, Sustainability & Agricultural Economics',
    description:
    'PhD-trained Agricultural Economist and Sustainability Researcher specializing in climate adaptation, environmental assessment, carbon management and evidence-based sustainability strategy.',
    path: '/',
    image: images.portrait,
    schema: personSchema
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <PhilosophyFlow />
      <ExpertiseGrid />
      <ImageBand
        image={images.agriculture}
        kicker="Sustainable agriculture"
        caption="Agricultural systems are where climate policy meets soil, water and livelihoods." />
      
      <ServicesSection />
      <ConsultationCta />
      <CareerTimeline />
      <GeographySection />
      <ImageBand
        image={images.carbon}
        kicker="Carbon & climate"
        caption="Carbon accounting turns an abstract commitment into a number an organization can act on." />
      
      <ResearchSection />
      <PublicationsSection />
      <EducationSection />
      <ToolkitSection />
      <InsightsSection />
      <FaqSection />
      <FinalCta />
    </>);

}