import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { useMediaQuery } from '../lib/hud';
import { EASE } from '../lib/motion';
import { RENDERS } from './Crop';
import { MaskLine } from './Primitives';

/**
 * Ch. 00 — Arrival (Dark Obsidian Portal).
 */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isMd = useMediaQuery('(min-width: 768px)');
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const w0 = isMd ? 30 : 78;
  const h0 = isMd ? 66 : 50;
  const wv = useTransform(p, [0, 0.66], [w0, 100]);
  const hv = useTransform(p, [0, 0.66], [h0, 100]);
  const rv = useTransform(p, [0, 0.6], [w0 / 2, 0]);
  const width = useMotionTemplate`${wv}vw`;
  const height = useMotionTemplate`${hv}vh`;
  const borderRadius = useMotionTemplate`${rv}vw ${rv}vw 0px 0px`;
  const imgScale = useTransform(p, [0, 0.8], [1.24, 1]);

  const leftX = useTransform(p, [0, 0.5], ['0vw', '-16vw']);
  const rightX = useTransform(p, [0, 0.5], ['0vw', '16vw']);
  const wordsOpacity = useTransform(p, [0.05, 0.38], [1, 0]);
  const chromeOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const scrim = useTransform(p, [0.55, 0.9], [0.15, 0.9]);
  const captionOpacity = useTransform(p, [0.68, 0.88], [0, 1]);
  const captionY = useTransform(p, [0.68, 0.9], [40, 0]);

  return (
    <section
      id="arrival"
      data-chapter="arrival"
      ref={ref}
      data-print-static
      className="relative h-[280vh] bg-obsidian text-travertine"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Radial warm brass ambient glow behind portal */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(200,162,100,0.13),transparent_62%)]"
        />

        {/* Eyebrow */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          className="absolute inset-x-0 top-20 z-10 text-center md:top-28"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
            className="eyebrow text-stone"
          >
            Rooftop Concept Proposal <span className="mx-2 text-brass">//</span> ~20,000+ Sq. Ft.
          </motion.p>
        </motion.div>

        {/* Mobile title */}
        <motion.h1
          style={{ opacity: wordsOpacity }}
          className="absolute inset-x-0 top-[22vh] z-10 px-6 text-center display text-[15vw] text-travertine md:hidden"
        >
          <MaskLine play={ready} delay={0.1}>
            A Living
          </MaskLine>
          <MaskLine play={ready} delay={0.2} className="italic text-brass">
            Sanctuary
          </MaskLine>
        </motion.h1>

        {/* Arched doorway */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          style={{ width, height, borderRadius }}
          className="absolute inset-x-0 bottom-0 mx-auto overflow-hidden border border-brass/30 bg-basalt shadow-[0_0_90px_rgba(0,0,0,0.85)] will-change-[width,height]"
        >
          <motion.img
            src={RENDERS.north.src}
            alt="Golden-hour eye-level view of the North Deck: semicircular infinity pool, Bali café pergolas and the Atelier salon"
            style={{ scale: imgScale }}
            className="h-full w-full object-cover object-[50%_58%]"
            draggable={false}
          />
          <motion.div
            style={{ opacity: scrim }}
            className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent"
          />
          <motion.div
            style={{ opacity: captionOpacity, y: captionY }}
            className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-6 text-travertine md:flex-row md:items-end md:p-14"
          >
            <div>
              <p className="eyebrow text-brass">North Crown // Golden Hour</p>
              <h2 className="display mt-2 text-[clamp(3.4rem,8.5vw,9rem)] italic">Above the canopy.</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-travertine/75">
              Eight active zones — sky track, glass fitness bays, contrast recovery, Bali café, atelier salon
              and vanishing-edge pool.
            </p>
          </motion.div>
        </motion.div>

        {/* Desktop flanking headline */}
        <motion.h1
          style={{ opacity: wordsOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[46vh] z-10 hidden md:block"
        >
          <motion.span
            style={{ x: leftX }}
            className="absolute right-[calc(50%+17vw)] display text-right text-[7.2vw] text-travertine"
          >
            <MaskLine play={ready} delay={0.12}>
              A Living
            </MaskLine>
          </motion.span>
          <motion.span
            style={{ x: rightX }}
            className="absolute left-[calc(50%+17vw)] display text-[7.2vw] italic text-brass"
          >
            <MaskLine play={ready} delay={0.22}>
              Sanctuary
            </MaskLine>
          </motion.span>
        </motion.h1>

        <motion.p
          style={{ opacity: wordsOpacity, x: rightX }}
          className="absolute left-[calc(50%+17.4vw)] top-[calc(46vh+8.8vw)] z-10 hidden max-w-[20vw] text-sm leading-relaxed text-stone md:block"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Fitness, recovery, grooming and botanical dining — united on one rooftop.
          </motion.span>
        </motion.p>

        {/* Corner chrome */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          className="absolute bottom-6 left-6 z-10 hidden eyebrow text-stone md:block md:left-10"
        >
          Modern-Bali Wellness Hub
          <br />
          <span className="text-brass">~₹5–6 Cr Target Envelope</span>
        </motion.div>
        <motion.button
          type="button"
          style={{ opacity: chromeOpacity }}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
          className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 eyebrow text-stone hover:text-travertine md:flex md:right-10"
        >
          Scroll to walk the space
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-brass" strokeWidth={1.25} />
        </motion.button>
      </div>
    </section>
  );
}
