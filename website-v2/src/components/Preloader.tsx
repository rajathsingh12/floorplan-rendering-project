import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SILHOUETTE, ZONE_PATHS } from '../data/siteplan';
import { EASE } from '../lib/motion';
import { RENDERS } from './Crop';

const MIN_MS = 1200;
const MAX_MS = 2200;

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const isAutomated =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || window.location.search.includes('instant'));
    if (reduce || isAutomated) {
      onDone();
      return;
    }
    let raf = 0;
    let loaded = false;
    let finished = false;
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded = true;
    };
    img.src = RENDERS.north.src;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(1, elapsed / MIN_MS);
      const ok = loaded || elapsed > MAX_MS;
      const shown = ok ? pct : Math.min(pct, 0.92);
      setCount(Math.round(shown * 100));
      if (shown >= 1 && !finished) {
        finished = true;
        window.setTimeout(onDone, 220);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  return (
    <motion.div
      onClick={onDone}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col justify-between bg-obsidian p-6 text-travertine md:p-10"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.95, ease: EASE }}
      aria-label="Loading the Rooftop Sanctuary"
      role="status"
    >
      <div className="flex items-start justify-between eyebrow text-travertine/60">
        <span>Rooftop Concept Proposal</span>
        <span className="hidden sm:inline">~20,000+ sq. ft. // 08 zones</span>
      </div>

      <div className="flex flex-1 items-center justify-center py-8">
        <svg viewBox="70 34 650 1290" className="h-[46vh] w-auto" aria-hidden>
          <motion.path
            d={SILHOUETTE}
            fill="none"
            stroke="#B8935A"
            strokeWidth={4}
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
          />
          {Object.entries(ZONE_PATHS).map(([id, d], i) => (
            <motion.path
              key={id}
              d={d}
              fillRule="evenodd"
              fill="#F5F1EB"
              stroke="#F5F1EB"
              strokeWidth={2}
              initial={{ fillOpacity: 0, strokeOpacity: 0 }}
              animate={{ fillOpacity: id === 'mep' ? 0.02 : 0.06, strokeOpacity: 0.35 }}
              transition={{ duration: 0.45, delay: 0.45 + i * 0.05 }}
            />
          ))}
        </svg>
      </div>

      <div className="flex items-end justify-between">
        <p className="display text-4xl italic md:text-6xl">The Rooftop Sanctuary</p>
        <p className="font-mono text-3xl tabular-nums text-brass md:text-5xl">
          {String(count).padStart(3, '0')}
        </p>
      </div>
    </motion.div>
  );
}
