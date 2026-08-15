import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { PublicationsSection } from '../components/sections/PublicationsSection';
import { EducationSection } from '../components/sections/EducationSection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { ActionExternal } from '../components/ui/ActionButton';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { profile } from '../data/profile';
import { images } from '../data/images';
import { personSchema, useSeo } from '../utils/seo';

export function Publications() {
  useSeo({
    title: 'Publications — Peer-Reviewed Research by Dr. Kennedy Ndue Mutua',
    description:
    'Six peer-reviewed publications covering climate change adaptation, agricultural sustainability, environmental assessment and corporate sustainability.',
    path: '/publications',
    image: images.research,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="Publications"
        title={
        <>
            Research that contributes
            <span className="block font-normal text-ink-muted">to the conversation.</span>
          </>
        }
        lede="Six peer-reviewed publications. Individual titles, journals and DOI links are being added — the record below reflects the confirmed topic areas."
        crumbs={[{ label: 'Publications' }]}>
        
        <ActionExternal href={profile.linkedin} size="lg">
          View Publications
          <ExternalLinkIcon className="h-4 w-4" />
        </ActionExternal>
      </PageHeader>

      <PublicationsSection />

      <section className="px-5 pb-6">
        <Reveal className="mx-auto max-w-content">
          <GlassCard className="p-7">
            <h2 className="font-display text-[17px] font-semibold text-ink">On this record</h2>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-muted">
              Publication titles, journal names and DOIs are added as they are confirmed by
              Dr. Kennedy. Each entry supports an external link, so the page becomes a live index of
              the peer-reviewed record rather than a static list.
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <EducationSection />
      <ConsultationCta />
    </>);

}