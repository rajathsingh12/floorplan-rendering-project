import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Ban, Box, Compass, Layers, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import { ZONE_CHAPTER } from '../data/chapters';
import { SPATIAL_ZONES, type SpatialZone } from '../data/zones';
import { hud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { scrollToId } from '../lib/scroll';
import { Crop, RENDERS } from './Crop';
import { Eyebrow, MaskLine, Reveal } from './Primitives';

type ViewTab = 'iso' | 'closeup' | 'orbit';

export function CutawaySection() {
  const [selected, setSelected] = useState<SpatialZone>(SPATIAL_ZONES[0]);
  const [tab, setTab] = useState<ViewTab>('iso');

  const pickZone = (z: SpatialZone) => {
    setSelected(z);
    hud.setFocus('cutaway', [z.id]);
  };

  return (
    <section
      id="cutaway"
      data-chapter="cutaway"
      className="relative border-t hairline bg-basalt px-5 py-28 text-travertine md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow index="03" className="text-brass">
              The Cutaway // Bird&apos;s-Eye Massing
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.8rem,6.4vw,7rem)]">
              <MaskLine>One unified</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                20,000+ sq. ft. roof.
              </MaskLine>
            </h2>
          </div>

          <Reveal className="md:col-span-5 md:justify-self-end">
            <div
              role="tablist"
              aria-label="Architectural view modes"
              className="inline-flex flex-wrap gap-1.5 rounded-full border hairline bg-obsidian p-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'iso'}
                onClick={() => setTab('iso')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 eyebrow text-[10px] transition-colors ${
                  tab === 'iso' ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
                }`}
              >
                <Layers className="h-3.5 w-3.5" strokeWidth={1.25} />
                3D Cutaway
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'closeup'}
                onClick={() => setTab('closeup')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 eyebrow text-[10px] transition-colors ${
                  tab === 'closeup' ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
                }`}
              >
                {tab === 'closeup' ? (
                  <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                )}
                Zone Zoom
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'orbit'}
                onClick={() => setTab('orbit')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 eyebrow text-[10px] transition-colors ${
                  tab === 'orbit' ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
                }`}
              >
                <Box className="h-3.5 w-3.5" strokeWidth={1.25} />
                3D Orbit · Phase 2
              </button>
            </div>
          </Reveal>
        </div>

        {/* Main Interactive Stage */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* 16:9 Isometric Stage */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[6px] border hairline bg-obsidian shadow-2xl">
              {tab === 'iso' && (
                <>
                  <motion.img
                    key="iso-full"
                    src="/renders/isometric-approved.png"
                    alt="Isometric 3D cutaway of The Rooftop Sanctuary"
                    initial={{ scale: 1.03, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/65 via-transparent to-obsidian/20" />

                  {SPATIAL_ZONES.map((z) => {
                    const active = selected.id === z.id;
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => pickZone(z)}
                        style={{ left: `${z.isoCoords.x}%`, top: `${z.isoCoords.y}%` }}
                        aria-label={`Inspect zone ${z.pinLabel}: ${z.name}`}
                        aria-pressed={active}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      >
                        <span
                          className={`relative flex items-center justify-center rounded-full font-mono text-[10px] tracking-wider transition-all duration-300 ${
                            active
                              ? 'pin-pulse h-9 min-w-9 bg-brass px-2.5 text-obsidian shadow-lg ring-2 ring-travertine'
                              : 'h-7 min-w-7 border border-brass/70 bg-obsidian/85 px-2 text-travertine hover:scale-110 hover:bg-brass hover:text-obsidian'
                          }`}
                        >
                          {z.pinLabel}
                        </span>
                      </button>
                    );
                  })}

                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-travertine/85">
                    <span className="rounded-full bg-obsidian/75 px-3 py-1 eyebrow text-[9px] backdrop-blur-md">
                      FIG. 04 — TAP ANY PIN TO INSPECT
                    </span>
                    <span className="rounded-full bg-obsidian/75 px-3 py-1 eyebrow text-[9px] text-brass backdrop-blur-md">
                      PIN {selected.pinLabel} // {selected.mapCode}
                    </span>
                  </div>
                </>
              )}

              {tab === 'closeup' && (
                <div className="relative h-full w-full">
                  <Crop
                    src={RENDERS.iso.src}
                    aspect={RENDERS.iso.aspect}
                    alt={`Focused camera crop on ${selected.name}`}
                    focus={[selected.isoCoords.x / 100, selected.isoCoords.y / 100]}
                    zoom={2.15}
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-travertine">
                    <div>
                      <p className="eyebrow text-[10px] text-brass">
                        2.15× OPTICAL ZOOM // PIN {selected.pinLabel}
                      </p>
                      <p className="display mt-1 text-3xl md:text-4xl">{selected.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab('iso')}
                      className="rounded-full border border-travertine/30 bg-obsidian/75 px-4 py-2 eyebrow text-[10px] text-travertine backdrop-blur-md hover:bg-brass hover:text-obsidian"
                    >
                      Reset View
                    </button>
                  </div>
                </div>
              )}

              {tab === 'orbit' && (
                <div className="flex h-full w-full flex-col justify-between bg-obsidian p-6 text-travertine md:p-10">
                  <div className="flex items-center justify-between eyebrow text-[10px] text-stone">
                    <span>PHASE 02 // BLENDER + THREE.JS / GLB SLOT</span>
                    <span className="rounded-full border border-brass/40 px-3 py-1 text-brass">READY</span>
                  </div>
                  <div className="my-auto max-w-lg">
                    <Compass className="h-8 w-8 text-brass" strokeWidth={1.25} />
                    <h3 className="display mt-4 text-3xl italic md:text-5xl">
                      Interactive 3D Greybox Slot
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      Reserved for Phase 2 Blender <code>.glb</code> model or flythrough loop.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t hairline pt-4 eyebrow text-[10px] text-stone">
                    <span>TRUE SILHOUETTE · 08 ZONES + MEP</span>
                    <button
                      type="button"
                      onClick={() => setTab('iso')}
                      className="text-brass underline underline-offset-4"
                    >
                      Back to Cutaway →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-3 eyebrow text-[10px] text-stone">
              *CONCEPTUAL MASSING RENDER — SUBJECT TO SITE SURVEY &amp; STRUCTURAL AUDIT.*
            </p>
          </div>

          {/* Zone Spec Inspector Card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.aside
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex h-full flex-col justify-between rounded-[6px] border hairline bg-charcoal p-6 md:p-8"
              >
                <div>
                  <div className="flex items-center justify-between eyebrow text-[10px] text-stone">
                    <span className="text-brass">
                      ZONE {selected.pinLabel} // {selected.mapCode}
                    </span>
                    <span>{selected.wing}</span>
                  </div>

                  <h3 className="display mt-3 text-4xl text-travertine md:text-5xl">{selected.name}</h3>

                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 eyebrow text-[9px] ${
                        selected.isExcluded ? 'border-stone/40 text-stone' : 'border-brass/50 text-brass'
                      }`}
                    >
                      {selected.isExcluded && <Ban className="h-3 w-3" strokeWidth={1.25} />}
                      {selected.roleTag}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-stone">{selected.summary}</p>

                  <ul className="mt-5 space-y-2 border-t hairline pt-4 text-xs leading-relaxed text-travertine/85">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t hairline pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {selected.materials.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border hairline bg-obsidian px-3 py-1 eyebrow text-[9px] text-travertine/80"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setTab(tab === 'closeup' ? 'iso' : 'closeup')}
                      className="eyebrow text-[10px] text-stone underline underline-offset-4 hover:text-travertine"
                    >
                      {tab === 'closeup' ? 'Full Floorplate' : 'Zoom Camera'}
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToId(ZONE_CHAPTER[selected.id])}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 eyebrow text-[10px] text-obsidian transition-opacity hover:opacity-90"
                    >
                      Visit Zone
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} />
                    </button>
                  </div>
                </div>
              </motion.aside>
            </AnimatePresence>
          </div>
        </div>

        {/* 10-Zone Strip */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
          {SPATIAL_ZONES.map((z) => {
            const active = selected.id === z.id;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => pickZone(z)}
                className={`flex flex-col justify-between rounded-[4px] border p-3 text-left transition-all ${
                  active
                    ? 'border-brass bg-brass text-obsidian'
                    : 'border-travertine/12 bg-obsidian/70 text-travertine hover:border-brass/50'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className={active ? 'text-obsidian' : 'text-brass'}>{z.pinLabel}</span>
                  <span className="opacity-65">{z.mapCode}</span>
                </div>
                <p className="mt-2 line-clamp-1 text-xs font-medium">{z.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
