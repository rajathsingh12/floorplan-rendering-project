import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '../lib/motion';

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline line that rises out of a mask. `play` overrides in-view triggering. */
export function MaskLine({
  children,
  delay = 0,
  className = '',
  play,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  play?: boolean;
}) {
  const trigger =
    play === undefined
      ? { whileInView: { y: '0%' }, viewport: { once: true, margin: '-6% 0px' } }
      : { animate: { y: play ? '0%' : '115%' } };
  return (
    <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        {...trigger}
        transition={{ duration: 1.15, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Small arch monogram — the Balinese arched-mirror motif used across the site. */
export function ArchMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 30" className={className} aria-hidden fill="none">
      <path d="M2 29V12a10 10 0 0 1 20 0v17" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 29V13.5a5 5 0 0 1 10 0V29" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
      <path d="M0 29h24" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Eyebrow({ index, children, className = '' }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {index && <span>{index}</span>}
      {index && <span className="h-px w-8 bg-current opacity-40" />}
      <span>{children}</span>
    </p>
  );
}
