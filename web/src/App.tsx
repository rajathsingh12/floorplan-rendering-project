import { useEffect, useState, useCallback } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { SilhouetteMiniMap } from './components/SilhouetteMiniMap';
import { HeroSection } from './components/HeroSection';
import { MasterplanSection } from './components/MasterplanSection';
import { SouthFitnessSection } from './components/SouthFitnessSection';
import { EastCorridorSection } from './components/EastCorridorSection';
import { NorthDeckSection } from './components/NorthDeckSection';
import { InvestmentSection } from './components/InvestmentSection';
import { CHAPTERS, type ChapterId } from './data/zones';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('vision');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('pool');
  const [hudHighlightedZone, setHudHighlightedZone] = useState<string | null>(null);

  // Support direct hash links (e.g. /#masterplan, /#investment) on initial page load
  useEffect(() => {
    const hashId = window.location.hash.replace('#', '');
    if (!hashId) return;
    const target = document.getElementById(hashId);
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  // Scroll-synced chapter observer for Top Progress Bar & Floating Silhouette Mini-Map
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('data-chapter') as ChapterId | null;
          if (id) {
            setActiveChapter(id);
            setHudHighlightedZone(null);
          }
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToChapter = useCallback((id: ChapterId) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleMiniMapZoneClick = useCallback(
    (zoneId: string, chapterId: ChapterId) => {
      setSelectedZoneId(zoneId);
      setHudHighlightedZone(zoneId);
      scrollToChapter(chapterId);
    },
    [scrollToChapter],
  );

  const handleMasterplanZoneSelect = useCallback((zoneId: string) => {
    setSelectedZoneId(zoneId);
    setHudHighlightedZone(zoneId);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#1F1D1A]">
      <HeaderNav activeChapter={activeChapter} onNavigate={scrollToChapter} />

      <main>
        <HeroSection onNavigate={scrollToChapter} />

        <MasterplanSection
          selectedZoneId={selectedZoneId}
          onSelectZone={handleMasterplanZoneSelect}
          onJumpToChapter={scrollToChapter}
        />

        <SouthFitnessSection />

        <EastCorridorSection />

        <NorthDeckSection />

        <InvestmentSection />
      </main>

      <SilhouetteMiniMap
        activeChapter={activeChapter}
        highlightedZoneId={hudHighlightedZone}
        onSelectZone={handleMiniMapZoneClick}
      />
    </div>
  );
}
