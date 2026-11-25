import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Printer, X } from 'lucide-react';
import { useEffect } from 'react';
import { CHAPTERS, CHAPTER_MAP, ZONE_CHAPTER } from '../data/chapters';
import { hud, useHud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { lockScroll, scrollToId } from '../lib/scroll';
import { ArchMark } from './Primitives';
import { SitePlan } from './SitePlan';

export function Nav() {
  const { chapter, menuOpen } = useHud();
  const ch = CHAPTER_MAP[chapter] ?? CHAPTERS[0];
  const atTop = chapter === 'arrival';
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hud.setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const surface = atTop ? 'bg-transparent' : 'bg-obsidian/75 backdrop-blur-xl border-b hairline';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 print:hidden">
        <motion.div style={{ scaleX }} className="absolute left-0 top-0 z-10 h-[2px] w-full origin-left bg-brass" />
        <div
          className={`flex h-16 items-center justify-between px-5 text-travertine transition-[background-color,border-color] duration-500 md:h-[72px] md:px-10 ${surface}`}
        >
          <button
            type="button"
            onClick={() => scrollToId('arrival')}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <ArchMark className="h-7 w-6 text-brass transition-transform duration-500 group-hover:-translate-y-0.5" />
            <span className="font-serif text-2xl leading-none tracking-tight md:text-[26px]">
              The Rooftop <em className="text-brass">Sanctuary</em>
            </span>
          </button>

          <div className="hidden items-center gap-3 eyebrow md:flex">
            <span className="text-brass">{ch.code}</span>
            <span className="h-px w-8 bg-travertine/25" />
            <span className="relative inline-flex h-[1.5em] min-w-[17rem] overflow-hidden whitespace-nowrap">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ch.id}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute left-0"
                >
                  {ch.label} <span className="text-stone">— {ch.kicker}</span>
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden items-center gap-2 rounded-full px-3 py-2 eyebrow text-stone transition-colors hover:text-travertine lg:inline-flex"
            >
              <Printer className="h-3.5 w-3.5" strokeWidth={1.25} /> Deck PDF
            </button>
            <button
              type="button"
              onClick={() => hud.setMenu(true)}
              className="rounded-full border border-travertine/20 px-4 py-2 eyebrow text-travertine transition-colors hover:border-brass hover:bg-brass hover:text-obsidian"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              Index
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <IndexMenu current={chapter} />}</AnimatePresence>
    </>
  );
}

function IndexMenu({ current }: { current: string }) {
  const go = (id: string) => {
    hud.setMenu(false);
    window.setTimeout(() => scrollToId(id), 420);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Chapter index"
      className="fixed inset-0 z-[60] overflow-y-auto bg-obsidian text-travertine print:hidden"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="flex h-16 items-center justify-between px-5 md:h-[72px] md:px-10">
        <span className="eyebrow text-stone">Index — {CHAPTERS.length} Chapters</span>
        <button
          type="button"
          onClick={() => hud.setMenu(false)}
          className="inline-flex items-center gap-2 rounded-full border border-travertine/25 px-4 py-2 eyebrow hover:bg-brass hover:text-obsidian"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.25} /> Close
        </button>
      </div>

      <div className="grid gap-10 px-5 pb-16 md:grid-cols-[1fr_auto] md:px-10">
        <ol className="border-t hairline">
          {CHAPTERS.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.035 }}
              className="border-b hairline"
            >
              <button
                type="button"
                onClick={() => go(c.id)}
                className="group flex w-full items-baseline gap-5 py-3 text-left md:gap-8 md:py-3.5"
              >
                <span className="eyebrow w-8 text-brass">{c.code}</span>
                <span
                  className={`display text-4xl transition-all duration-500 group-hover:translate-x-3 group-hover:italic md:text-6xl ${
                    current === c.id ? 'italic text-brass' : 'text-travertine'
                  }`}
                >
                  {c.label}
                </span>
                <span className="ml-auto hidden eyebrow text-stone sm:block">{c.kicker}</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-brass opacity-0 transition-opacity group-hover:opacity-100"
                  strokeWidth={1.25}
                />
              </button>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="hidden flex-col items-center gap-4 md:flex"
        >
          <SitePlan
            active={CHAPTER_MAP[current]?.zones}
            className="h-[68vh] w-auto"
            onSelect={(id) => go(ZONE_CHAPTER[id])}
          />
          <p className="eyebrow text-stone">Tap a zone to jump · N ↑</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
