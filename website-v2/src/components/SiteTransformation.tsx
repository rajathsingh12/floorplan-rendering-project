import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SILHOUETTE } from '../data/siteplan';
import { EASE } from '../lib/motion';
import { RENDERS } from './Crop';
import { Eyebrow } from './Primitives';

const STEPS = [
  {
    fig: 'FIG. 01 — SATELLITE · AS FOUND',
    kicker: 'As found',
    title: 'Raw rooftop shell.',
    body: 'Stepped Art Deco north crown, single curved east balcony, central chillers, and a wide south slab.',
  },
  {
    fig: 'FIG. 02 — TRUE SILHOUETTE · TRACED',
    kicker: 'True geometry',
    title: 'Traced to the real roof.',
    body: 'Zero generic rectangles — every zone honors the actual building outline and screens the utility core.',
  },
  {
    fig: 'FIG. 03 — MASTERPLAN · REIMAGINED',
    kicker: 'Reimagined',
    title: 'Eight zones. One flow.',
    body: 'South fitness slab, east recovery promenade, and north pool, café, and salon sanctuary.',
  },
];

const STATS = [
  { value: 20000, suffix: '+', label: 'Sq. Ft.', format: (n: number) => n.toLocaleString('en-IN') },
  { value: 8, suffix: '', label: 'Active Zones', format: (n: number) => String(n).padStart(2, '0') },
  { value: 3, suffix: '', label: 'Glass Bays', format: (n: number) => String(n).padStart(2, '0') },
  { value: 1, suffix: '', label: 'Screened Core', format: (n: number) => String(n).padStart(2, '0') },
];

function Counter({ value, suffix, format }: { value: number; suffix: string; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {format(n)}
      {suffix}
    </span>
  );
}

export function SiteTransformation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);

  useMotionValueEvent(p, 'change', (v) => setStep(v < 0.3 ? 0 : v < 0.62 ? 1 : 2));

  const satOpacity = useTransform(p, [0.26, 0.42], [1, 0]);
  const satScale = useTransform(p, [0, 0.42], [1.12, 1]);
  const gridOpacity = useTransform(p, [0.26, 0.42], [0, 1]);
  const draw = useTransform(p, [0.3, 0.6], [0, 1]);
  const lineOpacity = useTransform(p, [0.86, 1], [1, 0.45]);
  const labelOpacity = useTransform(p, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const reveal = useTransform(p, [0.64, 0.92], [100, 0]);
  const clipPath = useMotionTemplate`inset(${reveal}% 0% 0% 0%)`;
  const scanTop = useMotionTemplate`${reveal}%`;
  const scanOpacity = useTransform(p, [0.63, 0.66, 0.9, 0.93], [0, 1, 1, 0]);

  return (
    <section data-chapter="site" className="relative bg-basalt text-travertine">
      <div ref={ref} data-print-static className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen flex-col-reverse items-center justify-center gap-6 px-5 pt-16 md:grid md:grid-cols-[1fr_auto] md:gap-16 md:px-10 lg:gap-28">
          {/* Narrative */}
          <div className="w-full max-w-xl md:justify-self-end">
            <Eyebrow index="01" className="hidden text-brass md:flex">
              The Site Transformation
            </Eyebrow>
            <div className="relative mt-2 min-h-[10.5rem] md:mt-6 md:min-h-[14.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="eyebrow text-brass">{STEPS[step].kicker}</p>
                  <h2 className="display mt-2 text-[clamp(2.4rem,4.8vw,4.8rem)] text-travertine">
                    {STEPS[step].title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-stone md:text-base">
                    {STEPS[step].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-2 flex gap-2">
              {STEPS.map((_, i) => (
                <span key={i} className="h-[2px] flex-1 overflow-hidden bg-travertine/12">
                  <motion.span
                    className="block h-full bg-brass"
                    initial={false}
                    animate={{ scaleX: i <= step ? 1 : 0 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
              ))}
            </div>

            <dl className="mt-8 hidden grid-cols-4 border-t hairline pt-6 md:grid">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="display text-4xl text-travertine lg:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} format={s.format} />
                  </dd>
                  <dt className="mt-1.5 eyebrow text-[10px] text-stone">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Figure */}
          <figure className="relative h-[46vh] shrink-0 md:h-[80vh]">
            <div className="relative aspect-[768/1376] h-full overflow-hidden rounded-[6px] border hairline bg-obsidian shadow-2xl">
              <motion.img
                src={RENDERS.satellite.src}
                alt="Raw satellite view of the existing rooftop"
                style={{ opacity: satOpacity, scale: satScale }}
                className="absolute inset-0 h-full w-full object-cover grayscale-[0.8] contrast-[1.08]"
                loading="lazy"
                draggable={false}
              />
              <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 blueprint-grid" />
              <motion.img
                src={RENDERS.plan.src}
                alt="Approved 2D masterplan of the Rooftop Sanctuary"
                style={{ clipPath }}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
              <svg viewBox="0 0 768 1376" className="absolute inset-0 h-full w-full" aria-hidden>
                <motion.path
                  d={SILHOUETTE}
                  fill="none"
                  stroke="#C8A264"
                  strokeWidth={4}
                  strokeLinejoin="round"
                  style={{ pathLength: draw, opacity: lineOpacity }}
                />
                <motion.g
                  style={{ opacity: labelOpacity }}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="17"
                  letterSpacing="2.5"
                  fill="#F5F1EB"
                >
                  <text x="400" y="128" textAnchor="middle">N. CROWN</text>
                  <text x="690" y="690" textAnchor="end">BALCONY</text>
                  <text x="309" y="775" textAnchor="middle" fill="#C8A264">MEP CORE (EXCL.)</text>
                  <text x="394" y="1140" textAnchor="middle">SOUTH SLAB</text>
                  <path d="M309 640 L309 735 M309 800 L309 900" stroke="#C8A264" strokeDasharray="6 8" strokeWidth="2" />
                </motion.g>
              </svg>
              <motion.div
                style={{ top: scanTop, opacity: scanOpacity }}
                className="pointer-events-none absolute inset-x-0 h-px bg-brass shadow-[0_0_24px_4px_rgba(200,162,100,0.65)]"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4 eyebrow text-[10px] text-stone">
              <span>{STEPS[step].fig}</span>
              <span className="text-brass">N ↑</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
