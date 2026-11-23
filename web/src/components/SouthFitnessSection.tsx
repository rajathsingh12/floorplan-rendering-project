import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SOUTH_FITNESS_MODULES } from '../data/zones';

export function SouthFitnessSection() {
  const [activeId, setActiveId] = useState<string>(SOUTH_FITNESS_MODULES[0].id);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);

  const activeModule =
    SOUTH_FITNESS_MODULES.find((m) => m.id === activeId) ?? SOUTH_FITNESS_MODULES[0];

  return (
    <section
      id="south-fitness"
      data-chapter="south-fitness"
      className="py-24 md:py-32 bg-[#161614] text-[#F5F1EB] border-b hairline-dark"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b hairline-dark"
        >
          <div className="lg:col-span-7">
            <span className="font-spec text-[11px] text-[#B5583B] block mb-3">
              CHAPTER 02 // SOUTH RECTANGULAR SLAB
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#F5F1EB]">
              Sweat, Steel &amp; Sky.{' '}
              <span className="italic text-[#B8935A]">Encircled in Terracotta.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#F5F1EB]/72 text-base leading-relaxed font-light">
              No neon lighting, no basement ceilings. Three glass-walled, teak-louvered training
              bays—Strength, Reformer Pilates, and Group Classes—sit inside a continuous two-lane
              terracotta EPDM running track overlooking the treetops, scaled for{' '}
              <span className="text-[#F5F1EB] font-normal">400–500 active members</span> without
              crowding.
            </p>
          </div>
        </motion.div>

        {/* Full-Bleed Architectural Canvas with Subtle Scroll Scale */}
        <div
          ref={imageWrapRef}
          className="mt-10 relative w-full aspect-video overflow-hidden border hairline-dark bg-[#1E1D1A]"
        >
          <motion.img
            style={{ scale: imageScale }}
            src="/renders/south-fitness-render.png"
            alt="Eye-level view of the South Fitness Block: terracotta running track, Strength Gym, Reformer Pilates, and Group Classes"
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161614]/82 via-transparent to-transparent pointer-events-none" />

          {/* Architectural Caption Overlay */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div>
              <span className="font-spec text-[9.5px] text-[#B8935A] block">
                PERSPECTIVE // SOUTHEAST CORNER LOOKING NORTHWEST
              </span>
              <p className="font-editorial text-2xl sm:text-3xl text-[#F5F1EB] mt-0.5">
                Right to Left: Strength Gym · Reformer Pilates · Group Classes
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 px-3.5 py-2 bg-[#161614]/75 backdrop-blur-md border border-[#F5F1EB]/15">
              <span className="w-2 h-2 rounded-full bg-[#B5583B]" />
              <span className="font-spec text-[9.5px] text-[#F5F1EB]/85">
                2-LANE EPDM SKY TRACK
              </span>
            </div>
          </div>
        </div>

        {/* Interactive 4-Module Switcher */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 border hairline-dark">
          {/* Left Tab Rail */}
          <div className="lg:col-span-5 divide-y divide-[#F5F1EB]/12 border-b lg:border-b-0 lg:border-r hairline-dark">
            {SOUTH_FITNESS_MODULES.map((mod) => {
              const isActive = mod.id === activeModule.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveId(mod.id)}
                  className={`w-full text-left px-6 py-5 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                    isActive
                      ? 'bg-[#1E1D1A] text-[#F5F1EB]'
                      : 'bg-transparent text-[#F5F1EB]/60 hover:bg-[#1E1D1A]/50 hover:text-[#F5F1EB]'
                  }`}
                >
                  <div>
                    <span
                      className="font-spec text-[9.5px] block"
                      style={{ color: isActive ? mod.accent : 'rgba(245,241,235,0.45)' }}
                    >
                      {mod.index} // {mod.code}
                    </span>
                    <span className="font-editorial text-2xl block mt-1">{mod.title}</span>
                  </div>
                  <span
                    className={`mt-2 w-2 h-2 rounded-full transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{ backgroundColor: mod.accent }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-7 p-7 md:p-10 bg-[#1E1D1A]/65 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-spec text-[10px] block"
                  style={{ color: activeModule.accent }}
                >
                  {activeModule.bayPosition}
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#F5F1EB] mt-2">
                  {activeModule.tagline}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#F5F1EB]/72 leading-relaxed font-light max-w-2xl">
                  {activeModule.description}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 border-t hairline-dark pt-6 gap-6">
                  {activeModule.specs.map((spec) => (
                    <div key={spec.label}>
                      <span className="font-spec text-[9px] text-[#F5F1EB]/48 block">
                        {spec.label}
                      </span>
                      <span className="text-sm text-[#F5F1EB] font-medium block mt-1.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-5 border-t hairline-dark flex flex-wrap items-center justify-between gap-3 text-xs text-[#F5F1EB]/55">
              <span>
                Background acoustic &amp; visual buffer: dark-teak slats &amp; vertical tropical
                living wall screening the mechanical core.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
