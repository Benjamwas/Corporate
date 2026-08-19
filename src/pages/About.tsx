import React from 'react';
import { images } from '../data/images';
import { profile, trustStats } from '../data/profile';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { PhilosophyFlow } from '../components/home/PhilosophyFlow';
import { EducationSection } from '../components/sections/EducationSection';
import { ToolkitSection } from '../components/sections/ToolkitSection';
import { GeographySection } from '../components/sections/GeographySection';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { ImageBand } from '../components/sections/ImageBand';
import { personSchema, useSeo } from '../utils/seo';

const narrative = [
'Dr. Kennedy Ndue Mutua works at the point where environmental science has to become a decision. Trained as an agricultural economist, he spent his doctoral years in Hungary studying economics and regional science, then carried that training into European research programmes, local government climate work and healthcare sustainability in the United Kingdom.',
'The thread across eight years of practice is evidence. Whether the question is the footprint of a poultry production system, the emissions of a council housing stock, the sustainability of a clinical pathway or the land-use implications of a biomass feedstock, the method is the same: define the system honestly, gather the data, assess the impact and report what the evidence can and cannot support.',
'That discipline is what organizations are buying when they ask for advisory support — not a position, but a defensible basis for the position they are about to take.'];


export function About() {
  useSeo({
    title: 'About Dr. Kennedy Ndue Mutua — Agricultural Economist & Sustainability Researcher',
    description:
    'The professional story behind eight years of climate adaptation, environmental assessment, carbon management and agricultural sustainability research across Kenya, Hungary and the United Kingdom.',
    path: '/about',
    image: images.portrait,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="About"
        title={
        <>
            Evidence. Sustainability.
            <span className="block font-normal text-ink-muted">Impact.</span>
          </>
        }
        lede={profile.intro}
        crumbs={[{ label: 'About' }]} />
      

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <GlassCard strong className="overflow-hidden rounded-[2.25rem] p-3">
              <img
                src={images.portrait}
                alt={`Portrait of ${profile.name}`}
                className="aspect-[4/5] w-full rounded-[1.85rem] object-cover" />
              
            </GlassCard>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {trustStats.slice(0, 2).map((stat) =>
              <GlassCard key={stat.label} className="rounded-3xl p-4">
                  <p className="font-display text-[1.6rem] font-semibold leading-none tracking-tightest text-ink">
                    {stat.display ?? `${stat.count}${stat.suffix ?? ''}`}
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-ink-muted">{stat.label}</p>
                </GlassCard>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-tight tracking-tightest text-ink">
              Science that informs decisions.
            </h2>
            <div className="mt-6 space-y-5">
              {narrative.map((paragraph) =>
              <p key={paragraph.slice(0, 24)} className="text-[15.5px] leading-relaxed text-ink-muted">
                  {paragraph}
                </p>
              )}
            </div>
            <dl className="mt-9 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-[11.5px] tracking-[0.14em] text-ink-subtle">CURRENT ROLE</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink">
                  Sustainability Analyst, Centre for Sustainable Healthcare, Oxford
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] tracking-[0.14em] text-ink-subtle">BASED IN</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink">{profile.baseLocation}</dd>
              </div>
              <div>
                <dt className="text-[11.5px] tracking-[0.14em] text-ink-subtle">DOCTORATE</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink">
                  PhD, Economics &amp; Regional Science, Széchenyi István University
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] tracking-[0.14em] text-ink-subtle">WORKING LANGUAGES OF PRACTICE</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink">
                  Research, policy analysis, environmental assessment
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <ImageBand
        image={images.field}
        kicker="Field research"
        caption="Assessment starts with the system as it actually is — not as the reporting template describes it." />
      
      <PhilosophyFlow />
      <EducationSection />
      <ToolkitSection />
      <GeographySection />
      <ConsultationCta />
    </>);

}