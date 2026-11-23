import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Eyebrow, Reveal } from './Primitives';

const COPY =
  'Twenty thousand square feet above the canopy. *Sweat* under glass. *Recover* in cedar. *Restore* at the *vanishing* *edge.*';

const PILLARS = [
  {
    index: 'I',
    title: 'Sweat',
    sector: 'South Slab',
    zones: 'Strength Gym · Reformer Pilates · Group Studio · 2-Lane Sky Track',
  },
  {
    index: 'II',
    title: 'Recover',
    sector: 'East Spine',
    zones: 'Cedar Sauna · Basalt Cold Plunge · Palm Promenade · Curved Balcony',
  },
  {
    index: 'III',
    title: 'Restore',
    sector: 'North Crown',
    zones: 'Vanishing-Edge Infinity Pool · Wrap-Around Bali Café · Atelier Salon',
  },
];

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const italic = word.startsWith('*');
  const clean = word.replace(/\*/g, '');
  return (
    <motion.span style={{ opacity }} className={`mr-[0.24em] inline-block ${italic ? 'italic text-brass' : ''}`}>
      {clean}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = COPY.split(' ');

  return (
    <section id="site" data-chapter="site" className="relative bg-obsidian px-5 py-28 text-travertine md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow index="01" className="text-brass">
            The Vision
          </Eyebrow>
          <div className="mt-6 hidden space-y-1.5 border-l hairline pl-4 eyebrow text-[10px] text-stone md:block">
            <p>~20,000+ sq. ft.</p>
            <p>08 active zones</p>
            <p>01 screened core</p>
          </div>
        </div>
        <p
          ref={ref}
          className="display text-[clamp(2.5rem,5.2vw,5.6rem)] leading-[1.02] text-travertine md:col-span-9"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>

      <div className="mx-auto mt-24 grid max-w-[1400px] border-t hairline md:mt-32 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.1}
            className={`group border-b hairline py-8 md:border-b-0 md:py-10 ${i > 0 ? 'md:border-l md:pl-10' : ''} ${
              i < 2 ? 'md:pr-10' : ''
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl italic text-brass">{p.index}</span>
              <span className="eyebrow text-stone">{p.sector}</span>
            </div>
            <h3 className="display mt-5 text-6xl text-travertine transition-transform duration-700 group-hover:translate-x-2 md:text-7xl">
              {p.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">{p.zones}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
