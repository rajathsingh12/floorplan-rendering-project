import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BridgeSection } from './components/BridgeSection';
import { CaseSection } from './components/CaseSection';
import { CloseSection } from './components/CloseSection';
import { CrownSection } from './components/CrownSection';
import { CutawaySection } from './components/CutawaySection';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { MaquetteSection } from './components/MaquetteSection';
import { Nav } from './components/Nav';
import { PlanWalk } from './components/PlanWalk';
import { Preloader } from './components/Preloader';
import { RitualSection } from './components/RitualSection';
import { SiteRail } from './components/SiteRail';
import { SiteTransformation } from './components/SiteTransformation';
import { SweatSection } from './components/SweatSection';
import { useChapterSpy } from './lib/hud';
import { destroyLenis, initLenis } from './lib/scroll';

const shouldSkipPreloader = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('instant') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export default function App() {
  const [ready, setReady] = useState(shouldSkipPreloader);
  useChapterSpy();

  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian text-travertine">
      <div className="grain" aria-hidden />
      <AnimatePresence>{!ready && <Preloader onDone={() => setReady(true)} />}</AnimatePresence>
      <Nav />
      <SiteRail />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <SiteTransformation />
        <PlanWalk />
        <CutawaySection />
        <MaquetteSection />
        <SweatSection />
        <BridgeSection />
        <CrownSection />
        <RitualSection />
        <CaseSection />
      </main>
      <CloseSection />
    </div>
  );
}
