import { Ban, CheckCircle2, EyeOff, Trees, Wrench } from 'lucide-react';
import { useState } from 'react';
import { hud } from '../lib/hud';
import { Crop, RENDERS } from './Crop';
import { Eyebrow, MaskLine, Reveal } from './Primitives';

interface BridgeStop {
  id: 'promenade' | 'recovery' | 'mep';
  code: string;
  title: string;
  subtitle: string;
  focus: [number, number];
  zoom: number;
  description: string;
  bullets: string[];
}

const STOPS: BridgeStop[] = [
  {
    id: 'promenade',
    code: 'ZONE 05 // EAST SPINE & CURVED BALCONY',
    title: 'Palm Promenade & Balcony',
    subtitle: 'Open-air decompression walk.',
    focus: [0.74, 0.44],
    zoom: 2.05,
    description:
      'Teak and limestone stepping-stones connect the South Gym to the North Pool, opening onto the single curved eastern balcony lounge.',
    bullets: [
      'Honors the building’s true single curved eastern balcony',
      'Natural acoustic buffer between Sweat and Sanctuary',
    ],
  },
  {
    id: 'recovery',
    code: 'ZONE 04 // NORTHEAST THRESHOLD',
    title: 'Contrast Recovery Suite',
    subtitle: 'Cedar sauna & basalt cold plunge.',
    focus: [0.67, 0.27],
    zoom: 2.35,
    description:
      'Timber-slatted contrast therapy suite positioned where the east boardwalk meets the north infinity pool deck.',
    bullets: [
      'Dry cedar sauna paired with chilled stone plunge basins',
      'Drives premium wellness tier retention',
    ],
  },
  {
    id: 'mep',
    code: 'EXCLUDED CORE // CENTRAL-LEFT FOOTPRINT',
    title: 'Screened Mechanical Core',
    subtitle: 'Zero relocation CapEx. Zero visual intrusion.',
    focus: [0.42, 0.41],
    zoom: 2.0,
    description:
      'Existing chillers remain 100% untouched and serviceable behind tall dark-teak louvers and living tropical green walls.',
    bullets: [
      'Zero guest amenities inside the utility footprint',
      'Saves chiller relocation CapEx while preserving MEP access',
    ],
  },
];

export function BridgeSection() {
  const [active, setActive] = useState<BridgeStop>(STOPS[0]);

  const choose = (s: BridgeStop) => {
    setActive(s);
    hud.setFocus('bridge', [s.id]);
  };

  return (
    <section
      id="bridge"
      data-chapter="bridge"
      className="relative border-t hairline bg-basalt px-5 py-28 text-travertine md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow index="05" className="text-brass">
              The Bridge // East Spine &amp; Screened Core
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.8rem,6.4vw,7rem)]">
              <MaskLine>Engineered around</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                the real roof.
              </MaskLine>
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <p className="text-sm leading-relaxed text-stone">
              A palm-lined eastern boardwalk and contrast recovery suite — while screening the central-left
              mechanical core without moving a single chiller.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left Camera Crop Stage */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] border hairline bg-obsidian">
              <Crop
                src={RENDERS.iso.src}
                aspect={RENDERS.iso.aspect}
                alt={active.title}
                focus={active.focus}
                zoom={active.zoom}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/20" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 text-travertine">
                <div>
                  <p className="eyebrow text-[10px] text-brass">{active.code}</p>
                  <p className="display mt-1 text-3xl md:text-4xl">{active.title}</p>
                </div>
                <span className="rounded-full bg-obsidian/75 px-3 py-1 eyebrow text-[9px] text-stone backdrop-blur-md">
                  {active.zoom.toFixed(2)}× DETAIL CROP
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {STOPS.map((s) => {
                const isCurrent = s.id === active.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => choose(s)}
                    className={`rounded-[4px] border p-3 text-left transition-all ${
                      isCurrent
                        ? 'border-brass bg-brass text-obsidian'
                        : 'border-travertine/12 bg-obsidian/70 text-travertine hover:border-brass/50'
                    }`}
                  >
                    <p className={`eyebrow text-[9px] ${isCurrent ? 'text-obsidian/80' : 'text-brass'}`}>
                      {s.id === 'mep' ? 'EXCLUDED CORE' : s.id.toUpperCase()}
                    </p>
                    <p className="mt-1 line-clamp-1 font-serif text-xl">{s.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col justify-between rounded-[6px] border hairline bg-charcoal p-6 md:p-9 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between eyebrow text-[10px] text-stone">
                <span className="text-brass">{active.code}</span>
                {active.id === 'mep' && (
                  <span className="inline-flex items-center gap-1 rounded-full border hairline bg-obsidian px-2.5 py-0.5 text-stone">
                    <Ban className="h-3 w-3" strokeWidth={1.25} /> Non-Usable
                  </span>
                )}
              </div>

              <h3 className="display mt-3 text-4xl text-travertine md:text-5xl">{active.title}</h3>
              <p className="mt-2 font-serif text-2xl italic text-brass">{active.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone">{active.description}</p>

              <ul className="mt-5 space-y-2.5 border-t hairline pt-4 text-xs leading-relaxed text-travertine/85">
                {active.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.25} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t hairline pt-5">
              <div>
                <EyeOff className="h-4 w-4 text-brass" strokeWidth={1.25} />
                <p className="mt-2 eyebrow text-[9px] text-travertine">Teak Louvers</p>
                <p className="mt-0.5 text-[11px] text-stone">Full perimeter screen</p>
              </div>
              <div>
                <Trees className="h-4 w-4 text-palm" strokeWidth={1.25} />
                <p className="mt-2 eyebrow text-[9px] text-travertine">Living Wall</p>
                <p className="mt-0.5 text-[11px] text-stone">Tropical foliage</p>
              </div>
              <div>
                <Wrench className="h-4 w-4 text-stone" strokeWidth={1.25} />
                <p className="mt-2 eyebrow text-[9px] text-travertine">MEP Access</p>
                <p className="mt-0.5 text-[11px] text-stone">Hidden service gates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
