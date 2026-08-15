import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { heroCards, profile } from '../../data/profile';
import { images } from '../../data/images';
import { ActionButton, ActionLink } from '../ui/ActionButton';
import { useUi } from '../../contexts/UiContext';
import { GlassCard } from '../ui/GlassCard';

export function Hero() {
  const { openAssistant } = useUi();
  const reduce = useReducedMotion();

  return (
    <section className="relative px-5" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-content items-center gap-14 py-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10 lg:py-16">
        <div>
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-[12.5px] tracking-[0.14em] text-accent">
            
            {profile.brandLine.toUpperCase()}
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 font-display text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[0.98] tracking-tightest text-ink">
            
            Building Evidence
            <span className="block font-normal text-ink-muted">for a More Sustainable Future.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-ink-muted">
            
            {profile.intro}
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3">
            
            <ActionLink to="/booking" size="lg">
              Book a Consultation
              <ArrowRightIcon className="h-4 w-4" />
            </ActionLink>
            <ActionLink to="/expertise" variant="glass" size="lg">
              Explore My Expertise
            </ActionLink>
            <ActionButton
              variant="quiet"
              size="lg"
              onClick={() => openAssistant()}
              className="px-3">
              
              <SparklesIcon className="h-4 w-4" />
              Start a Conversation
            </ActionButton>
          </motion.div>

          <p className="mt-8 text-[13px] text-ink-subtle">
            {profile.titles.join('  ·  ')}
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 overflow-hidden rounded-[3rem] opacity-70">
            
            <img
              src={images.atmosphere}
              alt=""
              className="h-full w-full scale-125 object-cover blur-[2px]" />
            
          </div>

          <GlassCard strong className="relative overflow-hidden rounded-[2.5rem] p-3">
            <img
              src={images.portrait}
              alt={`Portrait of ${profile.name}`}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
            
          </GlassCard>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
            {heroCards.map((card) =>
            <GlassCard key={card.label} className="rounded-3xl p-3.5">
                <p className="text-[12.5px] font-medium leading-snug text-ink">{card.label}</p>
                <p className="mt-1 text-[11px] text-ink-subtle">{card.detail}</p>
              </GlassCard>
            )}
          </div>

          <FloatingCard className="float-soft -left-8 top-10 hidden lg:block" card={heroCards[0]} />
          <FloatingCard className="float-soft-slow -right-6 top-28 hidden lg:block" card={heroCards[1]} />
          <FloatingCard className="float-soft-slow -left-10 bottom-28 hidden lg:block" card={heroCards[2]} />
          <FloatingCard className="float-soft -right-8 bottom-10 hidden lg:block" card={heroCards[3]} />
        </div>
      </div>
    </section>);

}

interface FloatingCardProps {
  card: {label: string;detail: string;};
  className: string;
}

function FloatingCard({ card, className }: FloatingCardProps) {
  return (
    <div className={`glass-strong absolute w-44 rounded-3xl p-3.5 ${className}`}>
      <p className="text-[12.5px] font-medium leading-snug text-ink">{card.label}</p>
      <p className="mt-1 text-[11px] text-ink-subtle">{card.detail}</p>
    </div>);

}