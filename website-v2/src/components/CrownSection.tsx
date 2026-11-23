import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, Sparkles, Waves } from 'lucide-react';
import { useRef, useState } from 'react';
import { hud } from '../lib/hud';
import { Crop, RENDERS } from './Crop';
import { Eyebrow, MaskLine, Reveal } from './Primitives';

interface CrownWing {
  id: 'pool' | 'cafe' | 'salon';
  code: string;
  name: string;
  wing: string;
  tagline: string;
  focus: [number, number];
  zoom: number;
  story: string;
  commercialRole: string;
  specs: { label: string; value: string }[];
}

const WINGS: CrownWing[] = [
  {
    id: 'pool',
    code: 'ZONE 01 // P · NORTH SEMICIRCULAR CROWN',
    name: 'Semicircular Infinity Pool',
    wing: 'Center North Crown',
    tagline: 'Flush vanishing rim inside the north dome.',
    focus: [0.5, 0.54],
    zoom: 1.32,
    story:
      'Travertine-coped lap basin terminating in a flush vanishing edge that merges turquoise water into the emerald canopy.',
    commercialRole: 'Flagship resort anchor driving tier-1 club positioning.',
    specs: [
      { label: 'Edge', value: 'Flush Vanishing Rim' },
      { label: 'Finish', value: 'Turquoise Bali Stone' },
      { label: 'Deck', value: 'Honed Travertine & Teak' },
    ],
  },
  {
    id: 'cafe',
    code: 'ZONE 02 // C · STEPPED PERGOLA WINGS',
    name: 'Wrap-Around Bali Café',
    wing: 'Left & Right Terraces',
    tagline: 'Slatted teak pergolas and glowing rattan pendants.',
    focus: [0.74, 0.44],
    zoom: 1.75,
    story:
      'Symmetrical open-air café decks framing the pool with monolithic travertine espresso bars and shaded communal tables.',
    commercialRole: 'Daily F&B engine serving members, salon guests & 100+ office pros.',
    specs: [
      { label: 'Canopy', value: 'Dual Teak Pergolas' },
      { label: 'Bar', value: 'Honed Travertine' },
      { label: 'Lighting', value: '2700K Rattan Pendants' },
    ],
  },
  {
    id: 'salon',
    code: 'ZONE 03 // S · NORTHWEST PAVILION',
    name: 'The Atelier Luxury Salon',
    wing: 'Northwest Corner',
    tagline: 'Backlit brass arches and whisper-quiet spa acoustics.',
    focus: [0.12, 0.68],
    zoom: 1.9,
    story:
      'Skylit glass-and-teak grooming sanctuary with warm arched mirrors and travertine styling stations.',
    commercialRole: 'High-ticket grooming capturing members and destination clientele.',
    specs: [
      { label: 'Mirrors', value: 'Backlit Brass Arches' },
      { label: 'Shell', value: 'Acoustic Glass & Skylight' },
      { label: 'Yield', value: 'High-Margin Grooming' },
    ],
  },
];

export function CrownSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.07, 1, 1.03]);

  const [selected, setSelected] = useState<CrownWing>(WINGS[0]);
  const [zoomMode, setZoomMode] = useState(false);

  const selectWing = (w: CrownWing) => {
    setSelected(w);
    hud.setFocus('crown', [w.id]);
  };

  return (
    <section
      id="crown"
      data-chapter="crown"
      className="relative border-t hairline bg-obsidian px-5 py-28 text-travertine md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow index="06" className="text-brass">
              The North Crown // Pool · Canopy Café · Atelier Salon
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.9rem,6.8vw,7.4rem)]">
              <MaskLine>Where sweat turns</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                into sanctuary.
              </MaskLine>
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <p className="text-sm leading-relaxed text-stone">
              A vanishing-edge infinity pool framed by symmetrical teak café pergolas and the glass-enclosed
              Atelier Salon.
            </p>
          </Reveal>
        </div>

        {/* Golden Hour North Deck Render */}
        <div ref={ref} className="mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[6px] border hairline bg-basalt">
            {!zoomMode ? (
              <motion.img
                src="/renders/north-deck-render.png"
                alt="Golden-hour eye-level render of the North Stepped Terrace"
                style={{ scale }}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            ) : (
              <Crop
                src={RENDERS.north.src}
                aspect={RENDERS.north.aspect}
                alt={selected.name}
                focus={selected.focus}
                zoom={selected.zoom}
                className="h-full w-full"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 text-travertine md:p-8">
              <div>
                <p className="eyebrow text-[10px] text-brass">FIG. 06 — {selected.code}</p>
                <p className="display mt-1 text-3xl md:text-5xl">{selected.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setZoomMode((v) => !v)}
                className="rounded-full border border-travertine/35 bg-obsidian/75 px-4 py-2 eyebrow text-[10px] text-travertine backdrop-blur-md transition-colors hover:border-brass hover:text-brass"
              >
                {zoomMode ? 'Wide Terrace View' : `Zoom into ${selected.name}`}
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Dark Monograph Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {WINGS.map((w) => {
            const active = w.id === selected.id;
            const Icon = w.id === 'pool' ? Waves : w.id === 'cafe' ? Coffee : Sparkles;
            return (
              <article
                key={w.id}
                onClick={() => selectWing(w)}
                className={`group flex cursor-pointer flex-col justify-between rounded-[6px] border p-6 transition-all duration-500 md:p-8 ${
                  active
                    ? 'border-brass bg-charcoal shadow-xl'
                    : 'border-travertine/12 bg-basalt hover:border-brass/45'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-[10px] text-stone">{w.wing}</span>
                    <Icon className="h-4 w-4 text-brass" strokeWidth={1.25} />
                  </div>

                  <h3 className="display mt-3 text-4xl text-travertine">{w.name}</h3>
                  <p className="mt-1.5 font-serif text-xl italic text-brass">“{w.tagline}”</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{w.story}</p>

                  <div className="mt-4 rounded-[4px] border hairline bg-obsidian/60 p-3">
                    <p className="eyebrow text-[9px] text-brass">Commercial Role</p>
                    <p className="mt-1 text-xs text-travertine/85">{w.commercialRole}</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-2 border-t hairline pt-4">
                  {w.specs.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-2 text-xs">
                      <dt className="eyebrow text-[9px] text-stone">{s.label}</dt>
                      <dd className="font-mono text-[11px] text-travertine">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
