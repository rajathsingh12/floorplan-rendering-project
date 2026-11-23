import { useState } from 'react';
import { ZONE } from '../data/chapters';
import { hud } from '../lib/hud';
import { Eyebrow, MaskLine, Reveal } from './Primitives';
import { SitePlan } from './SitePlan';

interface RitualMoment {
  time: string;
  period: string;
  title: string;
  zoneIds: string[];
  audience: string;
  narrative: string;
  revenueStream: string;
}

const MOMENTS: RitualMoment[] = [
  {
    time: '06:30',
    period: 'DAWN',
    title: 'Sunrise Laps & Sky Track Intervals',
    zoneIds: ['track', 'gym', 'group-class'],
    audience: 'Founding Club Members',
    narrative: 'Morning intervals on the terracotta loop and strength sessions in the east glass bay.',
    revenueStream: 'Core Annual Memberships',
  },
  {
    time: '09:30',
    period: 'MORNING',
    title: 'Reformer Pilates & Post-Session Espresso',
    zoneIds: ['pilates', 'recovery', 'cafe'],
    audience: 'Boutique Studio & Office Pros',
    narrative: 'Skylit reformer sessions flow through contrast recovery straight into the Bali Café.',
    revenueStream: 'Class Packs + Morning F&B',
  },
  {
    time: '13:00',
    period: 'MIDDAY',
    title: 'Canopy Lunches & Poolside Meetings',
    zoneIds: ['cafe', 'pool', 'promenade'],
    audience: '100+ In-Building Professionals',
    narrative: 'Shaded teak pergolas turn quiet midday gym hours into high-margin botanical dining.',
    revenueStream: 'Corporate Dining & Day Passes',
  },
  {
    time: '16:30',
    period: 'GOLDEN HOUR',
    title: 'The Atelier Grooming & Salon Rituals',
    zoneIds: ['salon', 'cafe', 'pool'],
    audience: 'Destination Grooming Clientele',
    narrative: 'Backlit brass arches illuminate bespoke hair and spa rituals with café table service.',
    revenueStream: 'High-Margin Salon Tickets',
  },
  {
    time: '19:30',
    period: 'TWILIGHT',
    title: 'Evening Strength, Sauna & Balcony Lounge',
    zoneIds: ['gym', 'track', 'recovery', 'promenade'],
    audience: 'Executive Evening Crowd',
    narrative: '2700K bollards light the track before cedar sauna sessions and curved balcony drinks.',
    revenueStream: 'Peak Retention & Social Spend',
  },
];

export function RitualSection() {
  const [idx, setIdx] = useState(0);
  const current = MOMENTS[idx];

  const selectMoment = (i: number) => {
    setIdx(i);
    hud.setFocus('ritual', MOMENTS[i].zoneIds);
  };

  return (
    <section
      id="ritual"
      data-chapter="ritual"
      className="relative border-t hairline bg-basalt px-5 py-28 text-travertine md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow index="07" className="text-brass">
              A Day in the Sanctuary // 16-Hour Utilization
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.8rem,6.4vw,7rem)]">
              <MaskLine>No dead hours</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                from dawn to dusk.
              </MaskLine>
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <p className="text-sm leading-relaxed text-stone">
              Uniting fitness, botanical dining, and grooming keeps the roof generating yield across every
              daypart.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="divide-y divide-travertine/12 border-y hairline">
              {MOMENTS.map((m, i) => {
                const active = i === idx;
                return (
                  <button
                    key={m.time}
                    type="button"
                    onClick={() => selectMoment(i)}
                    className={`group grid w-full gap-4 py-5 text-left transition-colors sm:grid-cols-12 sm:items-baseline ${
                      active ? 'text-travertine' : 'text-stone hover:text-travertine'
                    }`}
                  >
                    <div className="flex items-baseline gap-3 sm:col-span-3">
                      <span className={`font-mono text-lg ${active ? 'text-brass' : 'text-stone'}`}>
                        {m.time}
                      </span>
                      <span className="eyebrow text-[9px]">{m.period}</span>
                    </div>

                    <div className="sm:col-span-9">
                      <p
                        className={`display text-3xl transition-transform duration-500 group-hover:translate-x-1.5 md:text-4xl ${
                          active ? 'italic text-brass' : ''
                        }`}
                      >
                        {m.title}
                      </p>
                      {active && (
                        <div className="mt-2.5 space-y-2.5">
                          <p className="max-w-xl text-sm text-stone">{m.narrative}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-brass px-3 py-1 eyebrow text-[9px] text-obsidian">
                              {m.revenueStream}
                            </span>
                            <span className="rounded-full border hairline bg-obsidian px-3 py-1 eyebrow text-[9px] text-travertine/80">
                              {m.audience}
                            </span>
                            {m.zoneIds.map((zid) => (
                              <span
                                key={zid}
                                className="rounded-full border hairline px-2.5 py-0.5 font-mono text-[10px] text-stone"
                              >
                                {ZONE[zid]?.pinLabel} · {ZONE[zid]?.mapCode}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col items-center justify-between rounded-[6px] border hairline bg-charcoal p-6 md:p-8">
              <div className="flex w-full items-center justify-between eyebrow text-[10px] text-stone">
                <span className="text-brass">ACTIVE @ {current.time}</span>
                <span>{current.period}</span>
              </div>

              <SitePlan active={current.zoneIds} className="my-5 h-[300px] w-auto" />

              <div className="w-full border-t hairline pt-4 text-center">
                <p className="eyebrow text-[9px] text-brass">{current.revenueStream}</p>
                <p className="mt-1 font-serif text-2xl italic text-travertine">{current.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
