import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers, Box, Compass, ShieldAlert } from 'lucide-react';
import { SPATIAL_ZONES, type ChapterId, type SpatialZone } from '../data/zones';

interface MasterplanSectionProps {
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
  onJumpToChapter: (id: ChapterId) => void;
}

type PlanViewMode = 'isometric' | 'plan2d' | 'orbit3d';

export function MasterplanSection({
  selectedZoneId,
  onSelectZone,
  onJumpToChapter,
}: MasterplanSectionProps) {
  const [viewMode, setViewMode] = useState<PlanViewMode>('isometric');

  const selectedZone: SpatialZone =
    SPATIAL_ZONES.find((z) => z.id === selectedZoneId) ?? SPATIAL_ZONES[0];

  return (
    <section
      id="masterplan"
      data-chapter="masterplan"
      className="py-24 md:py-32 bg-[#F5F1EB] text-[#1F1D1A] border-b hairline-light"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b hairline-light"
        >
          <div className="max-w-2xl">
            <span className="font-spec text-[11px] text-[#B8935A] block mb-3">
              CHAPTER 01 // MASTER SPATIAL PLAN
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1F1D1A]">
              One Unified Footprint.{' '}
              <span className="italic text-[#2F4838]">Zero Wasted Corners.</span>
            </h2>
            <p className="mt-4 text-[#6B655C] text-base leading-relaxed">
              Every zone is locked directly to the building&apos;s real satellite geometry—from
              the stepped Art Deco north crown and curved eastern balcony down to the three-bay
              south fitness slab and screened central mechanical core. Select any brass pin to
              inspect architectural specifications.
            </p>
          </div>

          {/* 3-Way View Switcher */}
          <div
            role="tablist"
            aria-label="Masterplan view mode"
            className="inline-flex flex-wrap border hairline-light bg-[#EAE3D9]/55 p-1 w-fit"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'isometric'}
              onClick={() => setViewMode('isometric')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 font-spec text-[10px] transition-colors cursor-pointer ${
                viewMode === 'isometric'
                  ? 'bg-[#161614] text-[#F5F1EB]'
                  : 'text-[#6B655C] hover:text-[#1F1D1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" strokeWidth={1.25} />
              3D Cutaway
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'plan2d'}
              onClick={() => setViewMode('plan2d')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 font-spec text-[10px] transition-colors cursor-pointer ${
                viewMode === 'plan2d'
                  ? 'bg-[#161614] text-[#F5F1EB]'
                  : 'text-[#6B655C] hover:text-[#1F1D1A]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" strokeWidth={1.25} />
              2D Masterplan
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'orbit3d'}
              onClick={() => setViewMode('orbit3d')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 font-spec text-[10px] transition-colors cursor-pointer ${
                viewMode === 'orbit3d'
                  ? 'bg-[#161614] text-[#F5F1EB]'
                  : 'text-[#6B655C] hover:text-[#1F1D1A]'
              }`}
            >
              <Box className="w-3.5 h-3.5" strokeWidth={1.25} />
              3D Orbit · Phase 2
            </button>
          </div>
        </motion.div>

        {/* Main Interactive Masterplan Grid */}
        <div className="mt-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Render Canvas with Interactive Brass Hotspot Pins */}
          <div className="xl:col-span-8">
            <AnimatePresence mode="wait">
              {viewMode === 'isometric' && (
                <motion.div
                  key="isometric"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-full aspect-video overflow-hidden border hairline-light bg-[#161614]"
                >
                  <img
                    src="/renders/isometric-approved.png"
                    alt="3D Isometric Cutaway Render of The Rooftop Sanctuary"
                    className="w-full h-full object-cover"
                  />
                  {/* Hotspot Pins Layer */}
                  {SPATIAL_ZONES.map((zone) => {
                    const isSelected = zone.id === selectedZone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => onSelectZone(zone.id)}
                        style={{
                          left: `${zone.isoCoords.x}%`,
                          top: `${zone.isoCoords.y}%`,
                        }}
                        aria-label={`Inspect ${zone.name}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                      >
                        {/* Pulse ring for active pin */}
                        {isSelected && (
                          <span
                            className="absolute -inset-2.5 rounded-full animate-ping opacity-45"
                            style={{ backgroundColor: zone.isExcluded ? '#6B655C' : '#B8935A' }}
                          />
                        )}
                        <span
                          className={`relative flex items-center justify-center h-7 min-w-7 px-1.5 rounded-full font-spec text-[9px] border transition-all duration-300 shadow-md ${
                            isSelected
                              ? 'bg-[#B8935A] text-[#161614] border-[#F5F1EB] scale-115'
                              : zone.isExcluded
                                ? 'bg-[#161614]/82 text-[#F5F1EB]/75 border-[#F5F1EB]/40 hover:border-[#B8935A]'
                                : 'bg-[#161614]/82 text-[#F5F1EB] border-[#B8935A]/80 hover:bg-[#B8935A] hover:text-[#161614]'
                          }`}
                        >
                          {zone.pinLabel}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {viewMode === 'plan2d' && (
                <motion.div
                  key="plan2d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="w-full border hairline-light bg-[#EAE3D9]/50 blueprint-grid p-6 md:p-8 flex justify-center"
                >
                  <div className="relative w-full max-w-[440px] aspect-[9/16] overflow-hidden border border-[#1F1D1A]/20 bg-[#161614] shadow-sm">
                    <img
                      src="/renders/masterplan-approved.png"
                      alt="Top-down 2D architectural masterplan of The Rooftop Sanctuary"
                      className="w-full h-full object-cover"
                    />
                    {SPATIAL_ZONES.map((zone) => {
                      const isSelected = zone.id === selectedZone.id;
                      return (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => onSelectZone(zone.id)}
                          style={{
                            left: `${zone.planCoords.x}%`,
                            top: `${zone.planCoords.y}%`,
                          }}
                          aria-label={`Inspect ${zone.name} on 2D masterplan`}
                          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                        >
                          {isSelected && (
                            <span
                              className="absolute -inset-2.5 rounded-full animate-ping opacity-45"
                              style={{ backgroundColor: zone.isExcluded ? '#6B655C' : '#B8935A' }}
                            />
                          )}
                          <span
                            className={`relative flex items-center justify-center h-6 min-w-6 px-1.5 rounded-full font-spec text-[8.5px] border transition-all shadow-md ${
                              isSelected
                                ? 'bg-[#B8935A] text-[#161614] border-[#F5F1EB] scale-115'
                                : 'bg-[#161614]/82 text-[#F5F1EB] border-[#B8935A]/80 hover:bg-[#B8935A] hover:text-[#161614]'
                            }`}
                          >
                            {zone.pinLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {viewMode === 'orbit3d' && (
                <motion.div
                  key="orbit3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="w-full aspect-video border hairline-light bg-[#EAE3D9]/55 blueprint-grid p-8 md:p-12 flex flex-col items-center justify-center text-center"
                >
                  <span className="px-3 py-1 border border-[#B8935A]/60 text-[#B8935A] font-spec text-[10px] mb-5">
                    PHASE 02 MODULE // BLENDER + MCP READY
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#1F1D1A] max-w-lg">
                    Interactive 3D Massing &amp; Camera Flythrough Slot
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#6B655C] max-w-lg leading-relaxed">
                    Reserved directly for the Phase 2 Blender + Claude MCP greybox export
                    (<code className="font-mono text-xs text-[#2F4838]">.glb</code> orbit viewer
                    or AI dolly loops generated from the approved masterplan &amp; isometric renders).
                  </p>
                  <button
                    type="button"
                    onClick={() => setViewMode('isometric')}
                    className="mt-7 px-5 py-2.5 bg-[#161614] text-[#F5F1EB] font-spec text-[10px] hover:bg-[#2F4838] transition-colors cursor-pointer"
                  >
                    Return to 3D Isometric Cutaway
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Architectural Stamp Note */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#6B655C]">
              <span className="font-spec text-[10px]">
                *CONCEPTUAL MASSING RENDER — SUBJECT TO FINAL SITE SURVEY &amp; EXACT STRUCTURAL
                MEASUREMENTS.
              </span>
              <span className="font-spec text-[10px] text-[#2F4838]">
                CLICK PINS 01–09 OR MEP
              </span>
            </div>
          </div>

          {/* Right Side: Architectural Zone Spec Inspector */}
          <div className="xl:col-span-4 flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedZone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="border hairline-light bg-[#EAE3D9]/45 p-6 md:p-7"
              >
                <div className="flex items-center justify-between gap-3 pb-4 border-b hairline-light">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: selectedZone.accent }}
                    />
                    <span className="font-spec text-[10px] text-[#6B655C]">
                      PIN {selectedZone.pinLabel} // {selectedZone.wing}
                    </span>
                  </div>
                  <span className="font-spec text-[9.5px] px-2 py-0.5 border border-[#1F1D1A]/15 text-[#1F1D1A]">
                    {selectedZone.mapCode}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="font-spec text-[9.5px] text-[#B8935A] block">
                    {selectedZone.roleTag}
                  </span>
                  <h3 className="font-editorial text-3xl font-normal text-[#1F1D1A] mt-1">
                    {selectedZone.name}
                  </h3>
                  <p className="mt-3 text-sm text-[#6B655C] leading-relaxed">
                    {selectedZone.summary}
                  </p>
                </div>

                {selectedZone.isExcluded && (
                  <div className="mt-4 p-3 border border-[#6B655C]/30 bg-[#F5F1EB]/70 flex items-start gap-2.5">
                    <ShieldAlert
                      className="w-4 h-4 text-[#6B655C] shrink-0 mt-0.5"
                      strokeWidth={1.25}
                    />
                    <span className="text-xs text-[#6B655C] leading-relaxed">
                      Excluded non-usable utility footprint preserved untouched to avoid costly
                      rooftop chiller relocation.
                    </span>
                  </div>
                )}

                <ul className="mt-5 space-y-2.5 pt-4 border-t hairline-light">
                  {selectedZone.highlights.map((item) => (
                    <li key={item} className="text-xs text-[#1F1D1A]/85 leading-relaxed flex gap-2.5">
                      <span className="font-mono text-[#B8935A] shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t hairline-light">
                  <span className="block font-spec text-[9px] text-[#6B655C] mb-2">
                    MATERIAL PALETTE
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedZone.materials.map((mat) => (
                      <span
                        key={mat}
                        className="px-2.5 py-1 bg-[#F5F1EB] border hairline-light font-spec text-[9px] text-[#1F1D1A]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onJumpToChapter(selectedZone.chapterId)}
                  className="mt-6 w-full py-3 px-4 bg-[#161614] text-[#F5F1EB] font-spec text-[10px] flex items-center justify-between hover:bg-[#2F4838] transition-colors cursor-pointer"
                >
                  <span>Walk Through This Zone</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.25} />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Compact Architectural Zone Index List */}
            <div className="border hairline-light bg-[#F5F1EB]">
              <div className="px-4 py-2.5 border-b hairline-light flex items-center justify-between">
                <span className="font-spec text-[9.5px] text-[#6B655C]">
                  ZONE DIRECTORY (08 ACTIVE + MEP)
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-[#1F1D1A]/10">
                {SPATIAL_ZONES.map((zone) => {
                  const active = zone.id === selectedZone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => onSelectZone(zone.id)}
                      className={`px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#161614] text-[#F5F1EB]'
                          : 'hover:bg-[#EAE3D9]/65 text-[#1F1D1A]'
                      }`}
                    >
                      <span
                        className={`block font-spec text-[8.5px] ${
                          active ? 'text-[#B8935A]' : 'text-[#6B655C]'
                        }`}
                      >
                        {zone.pinLabel} · {zone.mapCode}
                      </span>
                      <span className="block text-[11px] font-medium truncate mt-0.5">
                        {zone.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
