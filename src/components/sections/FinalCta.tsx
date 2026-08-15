import React from 'react';
import { ArrowRightIcon, MessageCircleIcon, SparklesIcon } from 'lucide-react';
import { images } from '../../data/images';
import { profile } from '../../data/profile';
import { buildWhatsappLink } from '../../utils/assistant';
import { useUi } from '../../contexts/UiContext';
import { ActionButton, ActionExternal, ActionLink } from '../ui/ActionButton';
import { Reveal } from '../ui/Reveal';

export function FinalCta() {
  const { openAssistant } = useUi();

  return (
    <section aria-labelledby="final-cta-heading" className="px-5 py-16">
      <Reveal className="mx-auto max-w-content">
        <div className="glass-strong relative flex min-h-[70vh] items-center overflow-hidden rounded-[2.5rem] p-9 sm:p-16">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <img src={images.atmosphere} alt="" className="h-full w-full object-cover opacity-45" />
          </div>
          <div className="relative max-w-3xl">
            <p className="text-[11.5px] tracking-[0.16em] text-accent">START WITH A CONVERSATION</p>
            <h2
              id="final-cta-heading"
              className="mt-5 font-display text-[clamp(2.2rem,5.2vw,4rem)] font-semibold leading-[1] tracking-tightest text-ink">
              
              The Future Needs
              <span className="block font-normal text-ink-muted">Better Evidence.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-ink-muted">
              Whether you&apos;re navigating climate risk, sustainability strategy, environmental
              assessment, agricultural transformation or research challenges, start with a conversation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink to="/booking" size="lg">
                Book a Consultation
                <ArrowRightIcon className="h-4 w-4" />
              </ActionLink>
              <ActionButton variant="glass" size="lg" onClick={() => openAssistant()}>
                <SparklesIcon className="h-4 w-4" />
                Ask Kennedy
              </ActionButton>
              <ActionExternal
                variant="quiet"
                size="lg"
                href={buildWhatsappLink(profile.whatsapp, profile.defaultWhatsappMessage)}>
                
                <MessageCircleIcon className="h-4 w-4" />
                Connect on WhatsApp
              </ActionExternal>
            </div>
          </div>
        </div>
      </Reveal>
    </section>);

}