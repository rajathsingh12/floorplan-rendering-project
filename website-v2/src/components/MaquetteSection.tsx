import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Ban, ChevronDown, ChevronUp, Crosshair } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ZONE_CHAPTER } from '../data/chapters';
import { SPATIAL_ZONES, type SpatialZone } from '../data/zones';
import { hud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { lockScroll, scrollToId } from '../lib/scroll';
import { OrbitMaquette } from './OrbitMaquette';
import { Eyebrow, MaskLine, Reveal } from './Primitives';

export function MaquetteSection() {
  const [selected, setSelected] = useState<SpatialZone>(SPATIAL_ZONES[0]);
  const [fullscreen, setFullscreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).has('maquetteFull');
    }
    return false;
  });
  const [cardOpen, setCardOpen] = useState<boolean>(true);
  const [focusTrigger, setFocusTrigger] = useState<number>(0);

  const pickZone = (z: SpatialZone, fly = false) => {
    setSelected(z);
    hud.setFocus('maquette', [z.id]);
    if (fly) setFocusTrigger((n) => n + 1);
  };

  useEffect(() => {
    lockScroll(fullscreen);
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [fullscreen]);

  return (
    <section
      id="maquette"
      data-chapter="maquette"
      className="relative border-t hairline bg-obsidian py-28 text-travertine md:py-36"
    >
      {/* Editorial Section Header */}
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow index="04" className="text-brass">
              Interactive 3D Maquette // True Building Silhouette
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.9rem,6.6vw,7.2rem)]">
              <MaskLine>Orbit the entire</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                sanctuary in 3D.
              </MaskLine>
            </h2>
          </div>

          <Reveal className="lg:col-span-4 lg:justify-self-end">
            <p className="max-w-md text-sm leading-relaxed text-stone">
              Extruded 1:1 from our pixel-traced satellite footprint — inspect the flush north
              infinity weir, single curved east balcony, screened mechanical core, and 3-bay south
              arena from any azimuth or elevation.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 eyebrow text-[9.5px] text-brass">
              <span className="rounded-full border border-brass/35 bg-basalt px-3 py-1">
                360° REAL-TIME ORBIT
              </span>
              <span className="rounded-full border border-brass/35 bg-basalt px-3 py-1">
                X-RAY ROOF CUTAWAY
              </span>
              <span className="rounded-full border border-brass/35 bg-basalt px-3 py-1">
                08 ZONES + MEP
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Expansive Full-Width 3D Architectural Stage */}
      <div
        className={
          fullscreen
            ? 'fixed inset-0 z-[90] flex flex-col bg-[#0B0A08]'
            : 'mx-auto mt-10 max-w-[1720px] px-3 sm:px-6 md:px-10'
        }
      >
        <div
          className={
            fullscreen
              ? 'relative flex-1 overflow-hidden'
              : 'relative h-[clamp(640px,82vh,920px)] w-full overflow-hidden rounded-[8px] border border-brass/25 bg-[#0B0A08] shadow-[0_32px_90px_rgba(0,0,0,0.75)]'
          }
        >
          <OrbitMaquette
            selected={selected}
            onSelectZone={(z) => pickZone(z, false)}
            fullscreen={fullscreen}
            onToggleFullscreen={() => setFullscreen((v) => !v)}
            focusTrigger={focusTrigger}
          />

          {/* Floating Collapsible Zone Spec Overlay (Desktop/Tablet inside expansive bottom-left space) */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-40 hidden max-w-[360px] md:block">
            <div className="pointer-events-auto overflow-hidden rounded-[6px] border border-travertine/15 bg-obsidian/88 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3 border-b hairline px-4 py-3">
                <div className="min-w-0">
                  <p className="eyebrow text-[9px] text-brass">
                    ZONE {selected.pinLabel} // {selected.mapCode} · {selected.wing}
                  </p>
                  <h3 className="display truncate text-2xl text-travertine">{selected.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCardOpen((v) => !v)}
                  aria-expanded={cardOpen}
                  aria-label={cardOpen ? 'Minimize zone details' : 'Expand zone details'}
                  className="rounded-full border hairline p-1.5 text-stone transition-colors hover:border-brass hover:text-travertine"
                >
                  {cardOpen ? (
                    <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.25} />
                  ) : (
                    <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.25} />
                  )}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {cardOpen && (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="px-4 pb-4 pt-3"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 eyebrow text-[8.5px] ${
                        selected.isExcluded
                          ? 'border-stone/40 text-stone'
                          : 'border-brass/50 text-brass'
                      }`}
                    >
                      {selected.isExcluded && <Ban className="h-3 w-3" strokeWidth={1.25} />}
                      {selected.roleTag}
                    </span>

                    <p className="mt-2.5 text-xs leading-relaxed text-stone">{selected.summary}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {selected.materials.map((m) => (
                        <span
                          key={m}
                          className="rounded-full border hairline bg-charcoal/80 px-2.5 py-0.5 eyebrow text-[8.5px] text-travertine/80"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2 border-t hairline pt-3">
                      <button
                        type="button"
                        onClick={() => setFocusTrigger((n) => n + 1)}
                        className="inline-flex items-center gap-1.5 eyebrow text-[9.5px] text-brass hover:text-travertine"
                      >
                        <Crosshair className="h-3.5 w-3.5" strokeWidth={1.25} />
                        Focus in 3D
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (fullscreen) setFullscreen(false);
                          window.setTimeout(
                            () => scrollToId(ZONE_CHAPTER[selected.id]),
                            fullscreen ? 120 : 0,
                          );
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brass px-3.5 py-1.5 eyebrow text-[9.5px] text-obsidian transition-opacity hover:opacity-90"
                      >
                        Visit Chapter
                        <ArrowUpRight className="h-3 w-3" strokeWidth={1.25} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Full-Width 10-Zone Spatial Dock */}
        <div
          className={
            fullscreen
              ? 'border-t hairline bg-obsidian px-4 py-3'
              : 'mt-4'
          }
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
            {SPATIAL_ZONES.map((z) => {
              const active = selected.id === z.id;
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => pickZone(z, true)}
                  className={`flex min-h-[76px] flex-col justify-between rounded-[4px] border p-2.5 text-left transition-all ${
                    active
                      ? 'border-brass bg-brass text-obsidian shadow-md'
                      : 'border-travertine/12 bg-basalt/85 text-travertine hover:border-brass/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                    <span className={active ? 'font-semibold text-obsidian' : 'text-brass'}>
                      {z.pinLabel}
                    </span>
                    <span className="truncate opacity-65">{z.mapCode}</span>
                  </div>
                  <p className="mt-2 text-pretty break-words text-[11.5px] font-medium leading-snug">
                    {z.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile-only Inspector Summary Card (keeps mobile 3D touch canvas 100% unobstructed) */}
      <div className="mx-auto mt-4 max-w-[1720px] px-3 sm:px-6 md:hidden">
        <div className="rounded-[6px] border hairline bg-charcoal p-4">
          <div className="flex items-center justify-between eyebrow text-[9.5px] text-brass">
            <span>
              ZONE {selected.pinLabel} // {selected.mapCode}
            </span>
            <span className="text-stone">{selected.wing}</span>
          </div>
          <h3 className="display mt-1 text-2xl text-travertine">{selected.name}</h3>
          <p className="mt-2 text-xs leading-relaxed text-stone">{selected.summary}</p>
          <div className="mt-3 flex items-center justify-between border-t hairline pt-3">
            <button
              type="button"
              onClick={() => setFocusTrigger((n) => n + 1)}
              className="eyebrow text-[9.5px] text-brass underline underline-offset-4"
            >
              Focus in 3D
            </button>
            <button
              type="button"
              onClick={() => scrollToId(ZONE_CHAPTER[selected.id])}
              className="inline-flex items-center gap-1 rounded-full bg-brass px-3 py-1.5 eyebrow text-[9.5px] text-obsidian"
            >
              Visit Chapter <ArrowUpRight className="h-3 w-3" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
