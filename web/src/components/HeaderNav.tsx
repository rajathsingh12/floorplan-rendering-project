import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Printer } from 'lucide-react';
import { CHAPTERS, type ChapterId } from '../data/zones';

interface HeaderNavProps {
  activeChapter: ChapterId;
  onNavigate: (id: ChapterId) => void;
}

export function HeaderNav({ activeChapter, onNavigate }: HeaderNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const currentMeta = CHAPTERS.find((c) => c.id === activeChapter) ?? CHAPTERS[0];
  const isDark = currentMeta.theme === 'dark';

  const handleJump = (id: ChapterId) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`no-print fixed top-0 left-0 right-0 z-50 transition-colors duration-500 backdrop-blur-md border-b ${
        isDark
          ? 'bg-[#161614]/82 text-[#F5F1EB] border-[#F5F1EB]/12'
          : 'bg-[#F5F1EB]/84 text-[#1F1D1A] border-[#1F1D1A]/12'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
        {/* Brand Monogram */}
        <button
          type="button"
          onClick={() => handleJump('vision')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <span
            className={`w-7 h-7 border flex items-center justify-center font-spec text-[10px] transition-colors ${
              isDark
                ? 'border-[#B8935A]/60 text-[#B8935A]'
                : 'border-[#1F1D1A]/25 text-[#2F4838] group-hover:border-[#B8935A]'
            }`}
          >
            RS
          </span>
          <div className="leading-none">
            <span className="block font-editorial text-lg tracking-[-0.01em] font-normal">
              The Rooftop Sanctuary
            </span>
            <span
              className={`block font-spec text-[9px] mt-0.5 ${
                isDark ? 'text-[#F5F1EB]/55' : 'text-[#6B655C]'
              }`}
            >
              20,000+ SQ. FT. // CONCEPT PITCH
            </span>
          </div>
        </button>

        {/* Desktop Chapter Progress Rail */}
        <nav aria-label="Pitch chapters" className="hidden lg:flex items-center gap-1">
          {CHAPTERS.map((chapter, idx) => {
            const isActive = chapter.id === activeChapter;
            return (
              <div key={chapter.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleJump(chapter.id)}
                  className={`relative px-2.5 py-1.5 font-spec text-[10px] transition-colors cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'text-[#B8935A]'
                        : 'text-[#1F1D1A]'
                      : isDark
                        ? 'text-[#F5F1EB]/50 hover:text-[#F5F1EB]'
                        : 'text-[#6B655C] hover:text-[#1F1D1A]'
                  }`}
                >
                  {chapter.shortLabel}
                  {isActive && (
                    <motion.span
                      layoutId="active-chapter-underline"
                      className="absolute left-2.5 right-2.5 bottom-0 h-[1.5px] bg-[#B8935A]"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
                {idx < CHAPTERS.length - 1 && (
                  <span
                    className={`w-2.5 h-px ${
                      isDark ? 'bg-[#F5F1EB]/15' : 'bg-[#1F1D1A]/15'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border font-spec text-[10px] transition-colors cursor-pointer ${
              isDark
                ? 'border-[#F5F1EB]/20 text-[#F5F1EB]/85 hover:border-[#B8935A] hover:text-[#B8935A]'
                : 'border-[#1F1D1A]/20 text-[#1F1D1A] hover:border-[#2F4838] hover:bg-[#2F4838] hover:text-[#F5F1EB]'
            }`}
          >
            <Printer className="w-3.5 h-3.5" strokeWidth={1.25} />
            Deck PDF
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle chapter menu"
            className="lg:hidden p-2 border border-current/20 cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" strokeWidth={1.25} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Chapter Drawer */}
      {mobileOpen && (
        <div
          className={`lg:hidden border-t px-5 py-4 flex flex-col gap-2 ${
            isDark
              ? 'bg-[#161614] border-[#F5F1EB]/12 text-[#F5F1EB]'
              : 'bg-[#F5F1EB] border-[#1F1D1A]/12 text-[#1F1D1A]'
          }`}
        >
          {CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => handleJump(chapter.id)}
                className={`text-left py-2 px-2 font-spec text-[11px] flex items-center justify-between border-b border-current/8 cursor-pointer ${
                  isActive ? 'text-[#B8935A]' : 'opacity-75'
                }`}
              >
                <span>{chapter.shortLabel}</span>
                <span className="text-[9px] opacity-60">{chapter.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Brushed Brass Scroll Progress Hairline */}
      <motion.div
        style={{ scaleX }}
        className="h-[1.5px] bg-[#B8935A] origin-left w-full"
      />
    </header>
  );
}
