import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, MoveHorizontal } from 'lucide-react';
import type { ChapterId } from '../data/zones';

interface HeroSectionProps {
  onNavigate: (id: ChapterId) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [splitPercent, setSplitPercent] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, raw));
    setSplitPercent(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="vision"
      data-chapter="vision"
      className="relative min-h-[min(100vh,980px)] pt-20 pb-12 md:pt-24 md:pb-16 bg-[#F5F1EB] text-[#1F1D1A] border-b hairline-light flex items-center"
    >
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-3 pb-4 border-b hairline-light mb-8">
                <span className="w-2 h-2 rounded-full bg-[#2F4838]" />
                <span className="font-spec text-[11px] text-[#6B655C]">
                  ROOFTOP CONCEPT PROPOSAL // ~20,000+ SQ. FT.
                </span>
              </div>

              <h1 className="font-editorial text-[3.1rem] sm:text-[4.25rem] xl:text-[5.25rem] font-light text-[#1F1D1A] leading-[1.01] tracking-[-0.025em]">
                A Living Sanctuary{' '}
                <span className="italic font-light text-[#2F4838]">Above the City.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base sm:text-lg text-[#6B655C] leading-relaxed font-light">
                Transforming a raw concrete rooftop shell into one continuous Modern-Bali
                wellness destination—uniting high-performance strength &amp; Pilates studios, a
                perimeter sky running track, contrast recovery, a luxury grooming atelier, and an
                open-air café around a semicircular infinity pool.
              </p>

              {/* Architectural Spec Strip */}
              <div className="mt-10 grid grid-cols-3 border-y hairline-light divide-x divide-[#1F1D1A]/12 max-w-xl">
                <div className="py-4 pr-4">
                  <span className="block font-spec text-[10px] text-[#6B655C]">Footprint</span>
                  <span className="block font-editorial text-2xl sm:text-3xl mt-1 text-[#1F1D1A]">
                    20,000+
                  </span>
                  <span className="block font-spec text-[9px] text-[#6B655C] mt-0.5">
                    SQ. FT. ROOFTOP
                  </span>
                </div>
                <div className="py-4 px-4">
                  <span className="block font-spec text-[10px] text-[#6B655C]">Program</span>
                  <span className="block font-editorial text-2xl sm:text-3xl mt-1 text-[#2F4838]">
                    08 Zones
                  </span>
                  <span className="block font-spec text-[9px] text-[#6B655C] mt-0.5">
                    + SCREENED CORE
                  </span>
                </div>
                <div className="py-4 pl-4">
                  <span className="block font-spec text-[10px] text-[#6B655C]">Target Scope</span>
                  <span className="block font-editorial text-2xl sm:text-3xl mt-1 text-[#B8935A]">
                    ₹5–6 Cr
                  </span>
                  <span className="block font-spec text-[9px] text-[#6B655C] mt-0.5">
                    INVESTMENT VISION
                  </span>
                </div>
              </div>

              {/* Action Row */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('masterplan')}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#161614] text-[#F5F1EB] font-spec text-[11px] hover:bg-[#2F4838] transition-colors cursor-pointer"
                >
                  Explore Masterplan
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.25} />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('investment')}
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-[#1F1D1A]/25 text-[#1F1D1A] font-spec text-[11px] hover:border-[#B8935A] hover:text-[#B8935A] transition-colors cursor-pointer"
                >
                  Cost &amp; Option Study
                </button>
              </div>
            </div>

            {/* Scroll Cue */}
            <button
              type="button"
              onClick={() => onNavigate('masterplan')}
              className="mt-12 inline-flex items-center gap-3 text-[#6B655C] hover:text-[#1F1D1A] transition-colors w-fit group cursor-pointer"
            >
              <span className="font-spec text-[10px]">SCROLL TO WALK THE SPACE</span>
              <ArrowDown
                className="w-3.5 h-3.5 text-[#B8935A] group-hover:translate-y-0.5 transition-transform"
                strokeWidth={1.25}
              />
            </button>
          </motion.div>

          {/* Right Column: Interactive Before / After Transformation Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="w-full max-w-[376px]">
              {/* Framing Meta Bar */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-spec text-[10px] text-[#6B655C]">
                  BEFORE // AFTER TRANSFORMATION
                </span>
                <span className="font-spec text-[10px] text-[#B8935A]">DRAG SLIDER ↔</span>
              </div>

              {/* Interactive 9:16 Comparison Viewport */}
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                role="slider"
                tabIndex={0}
                aria-label="Before and after rooftop transformation slider"
                aria-valuemin={4}
                aria-valuemax={96}
                aria-valuenow={Math.round(splitPercent)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') setSplitPercent((v) => Math.max(4, v - 5));
                  if (e.key === 'ArrowRight') setSplitPercent((v) => Math.min(96, v + 5));
                }}
                className="relative w-full aspect-[9/16] overflow-hidden border border-[#1F1D1A]/18 bg-[#161614] select-none touch-none cursor-ew-resize"
              >
                {/* AFTER Layer — Approved Modern-Bali Masterplan */}
                <img
                  src="/renders/masterplan-approved.png"
                  alt="Proposed Modern-Bali Rooftop Sanctuary architectural masterplan"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE Layer — Raw Satellite Concrete Rooftop (visually aligned upright via CSS transform; source file untouched) */}
                <div
                  style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                  className="absolute inset-0 overflow-hidden bg-[#1D201D]"
                >
                  <img
                    src="/renders/map-view.png"
                    alt="Existing raw concrete satellite rooftop shell"
                    draggable={false}
                    className="w-full h-full object-cover object-center grayscale-[42%] contrast-[1.06] brightness-[0.95] -rotate-[6deg] scale-[1.15] translate-x-[0.5%] translate-y-[0.5%]"
                  />
                  {/* Subtle dark blueprint tint on Before side */}
                  <div className="absolute inset-0 bg-[#161614]/15 pointer-events-none" />
                </div>

                {/* Corner Labels */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[#161614]/78 backdrop-blur-md text-[#F5F1EB] font-spec text-[9px] border border-[#F5F1EB]/15 pointer-events-none">
                  EXISTING SHELL
                </div>
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#F5F1EB]/88 backdrop-blur-md text-[#1F1D1A] font-spec text-[9px] border border-[#1F1D1A]/15 pointer-events-none">
                  BALI SANCTUARY
                </div>

                {/* Vertical Brass Divider & Handle */}
                <div
                  style={{ left: `${splitPercent}%` }}
                  className="absolute top-0 bottom-0 z-20 -translate-x-1/2 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-[1.5px] h-full bg-[#B8935A] shadow-[0_0_12px_rgba(184,147,90,0.6)]" />
                  <div className="absolute w-10 h-10 rounded-full bg-[#F5F1EB] border border-[#B8935A] text-[#1F1D1A] shadow-lg flex items-center justify-center">
                    <MoveHorizontal className="w-4 h-4 text-[#1F1D1A]" strokeWidth={1.25} />
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="mt-3 grid grid-cols-3 border hairline-light divide-x divide-[#1F1D1A]/12 bg-[#EAE3D9]/45">
                {[
                  { label: 'Raw Roof', val: 92 },
                  { label: '50 / 50 Split', val: 50 },
                  { label: 'Masterplan', val: 8 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSplitPercent(preset.val)}
                    className="py-2 font-spec text-[9.5px] text-[#6B655C] hover:text-[#1F1D1A] hover:bg-[#EAE3D9] transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
