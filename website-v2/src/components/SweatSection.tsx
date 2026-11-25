import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Flame, ShieldCheck, Users, Volume2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { SOUTH_FITNESS_MODULES, type FitnessModule } from '../data/zones';
import { hud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { Crop, RENDERS } from './Crop';
import { Eyebrow, MaskLine, Reveal } from './Primitives';

const MODULE_CAMERA: Record<string, { focus: [number, number]; zoom: number }> = {
  track: { focus: [0.58, 0.78], zoom: 1.18 },
  gym: { focus: [0.62, 0.54], zoom: 1.45 },
  pilates: { focus: [0.36, 0.54], zoom: 1.65 },
  'group-class': { focus: [0.22, 0.52], zoom: 1.75 },
};

export function SweatSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.03]);

  const [activeMod, setActiveMod] = useState<FitnessModule>(SOUTH_FITNESS_MODULES[0]);
  const [cameraLock, setCameraLock] = useState(false);

  const selectModule = (m: FitnessModule) => {
    setActiveMod(m);
    hud.setFocus('sweat', [m.zoneId]);
  };

  const cam = MODULE_CAMERA[activeMod.id] ?? { focus: [0.5, 0.5], zoom: 1 };

  return (
    <section
      id="sweat"
      data-chapter="sweat"
      className="relative border-t hairline bg-obsidian px-5 py-28 text-travertine md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow index="05" className="text-brass">
              Sweat &amp; Strength // South Rectangular Slab
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.9rem,6.8vw,7.4rem)] text-travertine">
              <MaskLine>Three glass bays.</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                Encircled by sky.
              </MaskLine>
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <p className="text-sm leading-relaxed text-stone">
              Strength, Reformer Pilates, and Group Movement inside a charcoal-steel and teak pavilion —
              looped by a 2-lane terracotta running track.
            </p>
          </Reveal>
        </div>

        {/* Full-bleed twilight render */}
        <div ref={heroRef} className="mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[6px] border hairline bg-basalt">
            {!cameraLock ? (
              <motion.img
                src="/renders/south-fitness-render.png"
                alt="Twilight render of the South 3-Bay Fitness Pavilion and perimeter running track"
                style={{ scale: imgScale }}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            ) : (
              <Crop
                src={RENDERS.south.src}
                aspect={RENDERS.south.aspect}
                alt={activeMod.title}
                focus={cam.focus}
                zoom={cam.zoom}
                className="h-full w-full"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-8">
              <div>
                <p className="eyebrow text-[10px] text-brass">FIG. 05 — {activeMod.code}</p>
                <p className="display mt-1 text-3xl text-travertine md:text-5xl">{activeMod.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setCameraLock((v) => !v)}
                className="rounded-full border border-travertine/30 bg-obsidian/75 px-4 py-2 eyebrow text-[10px] text-travertine backdrop-blur-md transition-colors hover:border-brass hover:text-brass"
              >
                {cameraLock ? 'Wide View' : `Zoom into ${activeMod.title}`}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive 4-Module Switcher */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="divide-y divide-travertine/12 border-y hairline">
              {SOUTH_FITNESS_MODULES.map((m) => {
                const isSelected = m.id === activeMod.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectModule(m)}
                    className="group flex w-full items-baseline justify-between gap-4 py-4 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className={`font-mono text-xs ${isSelected ? 'text-brass' : 'text-stone'}`}>
                        {m.index}
                      </span>
                      <div>
                        <p
                          className={`display text-3xl transition-transform duration-500 group-hover:translate-x-1.5 md:text-4xl ${
                            isSelected ? 'italic text-travertine' : 'text-travertine/60'
                          }`}
                        >
                          {m.title}
                        </p>
                        <p className="eyebrow text-[9px] text-stone">{m.bayPosition}</p>
                      </div>
                    </div>
                    <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-brass' : 'bg-travertine/15'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMod.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex h-full flex-col justify-between rounded-[6px] border hairline bg-charcoal p-6 md:p-9"
              >
                <div>
                  <div className="flex items-center justify-between eyebrow text-[10px] text-brass">
                    <span>{activeMod.code}</span>
                    <span>{activeMod.bayPosition}</span>
                  </div>
                  <h3 className="display mt-3 text-4xl text-travertine md:text-5xl">{activeMod.title}</h3>
                  <p className="mt-2 font-serif text-2xl italic text-brass">“{activeMod.tagline}”</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone">{activeMod.description}</p>
                </div>

                <dl className="mt-8 grid gap-4 border-t hairline pt-5 sm:grid-cols-3">
                  {activeMod.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="eyebrow text-[9px] text-stone">{s.label}</dt>
                      <dd className="mt-1 font-mono text-xs text-travertine">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact 4-Badge Spec Strip */}
        <div className="mt-12 grid gap-4 border-t hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, label: '400–500 Member Cap', sub: 'Zero peak-hour crowding' },
            { icon: Volume2, label: 'Acoustic Glazing', sub: 'Isolated studio bays' },
            { icon: Flame, label: '2700K Warm LED', sub: 'No harsh neon lighting' },
            { icon: ShieldCheck, label: 'Frameless Balustrade', sub: 'Unbroken canopy views' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3.5 rounded-[4px] border hairline bg-basalt p-4">
              <item.icon className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.25} />
              <div>
                <p className="eyebrow text-[10px] text-travertine">{item.label}</p>
                <p className="text-xs text-stone">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
