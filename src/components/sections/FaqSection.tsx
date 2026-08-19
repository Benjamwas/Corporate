import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { faqs } from '../../data/faqs';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../utils/cn';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="px-5 py-20">
      <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-heading"
          title={
          <>
              Common
              <span className="block font-normal text-ink-muted">questions.</span>
            </>
          }
          lede="Answers grounded in Dr. Kennedy's professional record." />
        

        <div className="glass overflow-hidden rounded-4xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={faq.question} delay={index * 0.03}>
                <div className={cn('border-line/60', index > 0 && 'border-t')}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-5 p-6 text-left">
                    
                    <span
                      className={cn(
                        'font-display text-[16px] font-medium leading-snug transition-colors duration-200',
                        isOpen ? 'text-accent' : 'text-ink'
                      )}>
                      
                      {faq.question}
                    </span>
                    <PlusIcon
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-200 ease-premium',
                        isOpen && 'rotate-45 text-accent'
                      )}
                      aria-hidden="true" />
                    
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen &&
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden">
                      
                        <p className="px-6 pb-6 text-[14px] leading-relaxed text-ink-muted">{faq.answer}</p>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}