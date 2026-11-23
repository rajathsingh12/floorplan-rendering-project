import { AnimatePresence, motion } from 'framer-motion';
import { CHAPTERS, CHAPTER_MAP, ZONE, ZONE_CHAPTER } from '../data/chapters';
import { useHud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { scrollToId } from '../lib/scroll';
import { SitePlan } from './SitePlan';

/** Floating frosted dark-obsidian HUD mini-map. */
export function SiteRail() {
  const { chapter, focus, menuOpen } = useHud();
  const ch = CHAPTER_MAP[chapter] ?? CHAPTERS[0];
  const zones = focus[chapter] ?? ch.zones;
  const hidden = chapter === 'arrival' || chapter === 'close' || menuOpen;
  const label =
    zones.length === 1 ? ZONE[zones[0]]?.name : zones.length >= 9 ? 'All 08 active zones' : ch.kicker;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.aside
          key="rail"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed bottom-5 right-5 z-40 hidden md:block print:hidden"
          aria-label="Spatial mini-map"
        >
          <div className="w-[148px] rounded-[6px] border border-travertine/15 bg-obsidian/75 p-3 text-travertine shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between eyebrow text-[9px]">
              <span className="text-brass">
                {ch.code} · {ch.label}
              </span>
              <span className="text-stone">N↑</span>
            </div>
            <SitePlan
              active={zones}
              tone="dark"
              className="my-2 h-[184px] w-full"
              strokeScale={1.4}
              onSelect={(id) => scrollToId(ZONE_CHAPTER[id])}
            />
            <div className="relative h-[2.6em] overflow-hidden eyebrow text-[9px] leading-snug text-stone">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={label}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {label}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
