import React from 'react';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { images } from '../../data/images';
import { useUi } from '../../contexts/UiContext';
import { ActionButton, ActionLink } from '../ui/ActionButton';
import { Reveal } from '../ui/Reveal';

export function ConsultationCta() {
  const { openAssistant } = useUi();

  return (
    <section aria-labelledby="consultation-cta-heading" className="px-5 py-16">
      <Reveal className="mx-auto max-w-content">
        <div className="glass-strong relative overflow-hidden rounded-[2.25rem] p-9 sm:p-14">
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40">
            <img src={images.carbon} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="relative max-w-2xl">
            <p className="text-[11.5px] tracking-[0.16em] text-accent">CONSULTATION</p>
            <h2
              id="consultation-cta-heading"
              className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tightest text-ink">
              
              Have a Sustainability Challenge?
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
              Let&apos;s explore the evidence, understand the problem and identify a practical path
              forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="/booking" size="lg">
                Book a Consultation
                <ArrowRightIcon className="h-4 w-4" />
              </ActionLink>
              <ActionButton variant="glass" size="lg" onClick={() => openAssistant()}>
                <SparklesIcon className="h-4 w-4" />
                Chat With the Assistant
              </ActionButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>);

}