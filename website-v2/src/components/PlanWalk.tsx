import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Ban } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ZONE } from '../data/chapters';
import { WALK_ORDER, ZONE_ANCHORS, ZONE_PATHS, pct } from '../data/siteplan';
import { hud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { scrollToY } from '../lib/scroll';
import { RENDERS } from './Crop';
import { Eyebrow, MaskLine } from './Primitives';

const STEP_VH = 50;

export function PlanWalk() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [idx, setIdx] = useState(0);
  const n = WALK_ORDER.length;

  useMotionValueEvent(p, 'change', (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));

  const activeId = WALK_ORDER[idx];
  const zone = ZONE[activeId];

  useEffect(() => {
    hud.setFocus('plan', [activeId]);
  }, [activeId]);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    scrollToY(top + ((i + 0.5) / n) * travel);
  };

  return (
    <section id="plan" data-chapter="plan" className="relative border-t hairline bg-obsidian text-travertine">
      <header className="mx-auto max-w-[1400px] px-5 pb-6 pt-24 md:px-10 md:pt-36">
        <Eyebrow index="02" className="text-brass">
          The Masterplan Walk
        </Eyebrow>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(2.8rem,6.8vw,7.4rem)]">
            <MaskLine>North crown</MaskLine>
            <MaskLine delay={0.1} className="italic text-brass">
              to south slab.
            </MaskLine>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            Eight active zones, the palm promenade, and the screened utility core.
          </p>
        </div>
      </header>

      <div ref={ref} data-print-static style={{ height: `${n * STEP_VH + 100}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-5 px-5 pt-16 md:flex-row md:gap-16 md:px-10 lg:gap-24">
          {/* Plan figure */}
          <div className="relative aspect-[768/1376] h-[44vh] shrink-0 overflow-hidden rounded-[6px] border hairline bg-basalt shadow-2xl md:h-[80vh]">
            <img
              src={RENDERS.plan.src}
              alt="Approved masterplan with the active zone highlighted"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <svg viewBox="0 0 768 1376" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <mask id="walk-mask">
                  <rect width="768" height="1376" fill="white" />
                  {Object.entries(ZONE_PATHS).map(([id, d]) => (
                    <motion.path
                      key={id}
                      d={d}
                      fillRule="evenodd"
                      fill="black"
                      initial={false}
                      animate={{ opacity: id === activeId ? 1 : 0 }}
                      transition={{ duration: 0.65, ease: EASE }}
                    />
                  ))}
                </mask>
              </defs>
              <rect width="768" height="1376" fill="#0E0D0B" fillOpacity="0.68" mask="url(#walk-mask)" />
              <motion.path
                key={activeId}
                d={ZONE_PATHS[activeId]}
                fill="none"
                fillRule="evenodd"
                stroke="#C8A264"
                strokeWidth={4}
                strokeDasharray={activeId === 'mep' ? '14 10' : undefined}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </svg>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeId}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={pct(ZONE_ANCHORS[activeId])}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-obsidian shadow-lg md:text-[11px]"
              >
                {zone.pinLabel} · {zone.mapCode}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Zone narrative */}
          <div className="w-full max-w-lg">
            <div className="relative min-h-[14rem] md:min-h-[22rem]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeId}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="eyebrow text-stone">
                    Stop {String(idx + 1).padStart(2, '0')} / {n} <span className="mx-2 text-brass">//</span>{' '}
                    {zone.wing}
                  </p>
                  <h3 className="display mt-2 text-[clamp(2.4rem,4.6vw,4.8rem)] text-travertine">{zone.name}</h3>
                  <p
                    className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 eyebrow text-[10px] ${
                      zone.isExcluded ? 'border-stone/40 text-stone' : 'border-brass/50 text-brass'
                    }`}
                  >
                    {zone.isExcluded && <Ban className="h-3 w-3" strokeWidth={1.25} />}
                    {zone.roleTag}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-stone md:text-base">{zone.summary}</p>
                  <ul className="mt-5 hidden border-t hairline md:block">
                    {zone.highlights.map((h) => (
                      <li key={h} className="flex gap-3 border-b hairline py-2.5 text-sm text-travertine/85">
                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {zone.materials.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border hairline bg-charcoal px-3 py-1 eyebrow text-[9px] text-travertine/80"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <nav aria-label="Plan walk stops" className="mt-5 flex flex-wrap gap-1.5">
              {WALK_ORDER.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`Go to ${ZONE[id].name}`}
                  aria-current={i === idx}
                  className={`h-8 min-w-8 rounded-full border px-2 font-mono text-[10px] transition-colors duration-300 ${
                    i === idx
                      ? 'border-brass bg-brass text-obsidian'
                      : 'border-travertine/15 text-stone hover:border-brass/60 hover:text-travertine'
                  }`}
                >
                  {ZONE[id].pinLabel}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
