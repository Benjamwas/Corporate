import React from 'react';
import { CalendarCheckIcon, MailIcon, MessageCircleIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { LeadForm } from '../components/LeadForm';
import { FaqSection } from '../components/sections/FaqSection';
import { profile } from '../data/profile';
import { images } from '../data/images';
import { buildWhatsappLink } from '../utils/assistant';
import { useUi } from '../contexts/UiContext';
import { personSchema, useSeo } from '../utils/seo';

export function Contact() {
  const { openAssistant } = useUi();

  useSeo({
    title: 'Contact — Dr. Kennedy Ndue Mutua',
    description:
    'Start a conversation about sustainability strategy, carbon and climate advisory, life cycle assessment, agricultural sustainability or research collaboration.',
    path: '/contact',
    image: images.portrait,
    schema: personSchema
  });

  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
        <>
            Start a
            <span className="block font-normal text-ink-muted">conversation.</span>
          </>
        }
        lede="Tell Kennedy what you are trying to decide and what evidence you already have. Enquiries are read and answered personally."
        crumbs={[{ label: 'Contact' }]} />
      

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-content gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <GlassCard strong className="p-7 sm:p-9">
              <h2 className="font-display text-[19px] font-semibold text-ink">Professional enquiry</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                Your topic and timestamp are attached automatically so nothing gets lost between
                messages.
              </p>
              <div className="mt-7">
                <LeadForm source="Contact form" />
              </div>
            </GlassCard>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.06}>
              <GlassCard className="p-7">
                <h2 className="text-[11.5px] tracking-[0.16em] text-ink-subtle">DIRECT CHANNELS</h2>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-start gap-3 text-[14px] text-ink transition-colors duration-200 hover:text-accent">
                      
                      <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        Email
                        <span className="mt-0.5 block text-[13px] text-ink-muted">{profile.email}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={buildWhatsappLink(profile.whatsapp, profile.defaultWhatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-[14px] text-ink transition-colors duration-200 hover:text-accent">
                      
                      <MessageCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        WhatsApp
                        <span className="mt-0.5 block text-[13px] text-ink-muted">
                          Fastest route for a short question
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/booking"
                      className="flex items-start gap-3 text-[14px] text-ink transition-colors duration-200 hover:text-accent">
                      
                      <CalendarCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        Book a consultation
                        <span className="mt-0.5 block text-[13px] text-ink-muted">
                          Choose a type, date and time
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAssistant()}
                      className="flex items-start gap-3 text-left text-[14px] text-ink transition-colors duration-200 hover:text-accent">
                      
                      <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        Ask Kennedy
                        <span className="mt-0.5 block text-[13px] text-ink-muted">
                          Check fit before you write
                        </span>
                      </span>
                    </button>
                  </li>
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard className="p-7">
                <h2 className="text-[11.5px] tracking-[0.16em] text-ink-subtle">GOOD TO KNOW</h2>
                <ul className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-ink-muted">
                  <li>Based in {profile.baseLocation}; consultations are held remotely.</li>
                  <li>Advisory areas are limited to the expertise shown on this site.</li>
                  <li>Research collaboration and speaking enquiries are welcome.</li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection />
    </>);

}