import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ImageBandProps {
  image: string;
  caption: string;
  kicker: string;
  className?: string;
}

export function ImageBand({ image, caption, kicker, className }: ImageBandProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className={cn('px-5 py-10', className)} aria-label={kicker}>
      <div className="mx-auto max-w-content overflow-hidden rounded-4xl">
        <div className="relative h-[38vh] min-h-[240px] w-full overflow-hidden">
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            style={reduce ? undefined : { y }}
            className="absolute inset-0 h-[118%] w-full object-cover" />
          
          <div className="absolute inset-0 bg-sage-900/35" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <p className="text-[11.5px] tracking-[0.16em] text-white/75">{kicker.toUpperCase()}</p>
            <p className="mt-2 max-w-2xl font-display text-[clamp(1.15rem,2.4vw,1.7rem)] font-medium leading-snug text-white">
              {caption}
            </p>
          </div>
        </div>
      </div>
    </section>);

}