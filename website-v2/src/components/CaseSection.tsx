import { Check, Clock, Layers, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
  COST_COMPARISON_ROWS,
  FINANCIAL_DATA_STATUS,
  FINANCIAL_META,
  NEXT_MILESTONES,
  OPTION_SUMMARIES,
  SYNERGY_LOOP,
  type ComparisonViewMode,
} from '../data/financials';
import { hud } from '../lib/hud';
import { Eyebrow, MaskLine, Reveal } from './Primitives';
import { SitePlan } from './SitePlan';

const BASE_ZONES = ['cafe', 'salon', 'recovery', 'promenade', 'group-class', 'pilates', 'gym'];
const FULL_ZONES = ['pool', 'cafe', 'salon', 'recovery', 'promenade', 'track', 'group-class', 'pilates', 'gym'];

export function CaseSection() {
  const [viewMode, setViewMode] = useState<ComparisonViewMode>('side-by-side');
  const [activeOption, setActiveOption] = useState<'base' | 'full'>('full');

  const switchOption = (opt: 'base' | 'full') => {
    setActiveOption(opt);
    hud.setFocus('case', opt === 'full' ? FULL_ZONES : BASE_ZONES);
  };

  const optSummary = OPTION_SUMMARIES[activeOption];

  return (
    <section
      id="case"
      data-chapter="case"
      className="relative border-t hairline bg-obsidian px-5 py-28 text-travertine md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow index="09" className="text-brass">
              The Investment Case // Options · BOQ · Roadmap
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.9rem,6.8vw,7.4rem)]">
              <MaskLine>Disciplined scope.</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                Compounding yield.
              </MaskLine>
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <div className="rounded-[6px] border border-brass/35 bg-charcoal p-5">
              <p className="eyebrow text-[10px] text-brass">Target Concept Envelope</p>
              <p className="display mt-1 text-4xl text-travertine md:text-5xl">
                {FINANCIAL_META.targetEnvelope}
              </p>
              <p className="mt-1.5 font-mono text-[11px] text-stone">
                {FINANCIAL_META.footprint} · {FINANCIAL_META.activeZones}
              </p>
            </div>
          </Reveal>
        </div>

        {/* 1. Synergy Loop */}
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow text-stone">01 // ECOSYSTEM SYNERGY LOOP</p>
            <p className="eyebrow text-[10px] text-brass">100+ OFFICE PROS + 400–500 CLUB MEMBERS</p>
          </div>
          <div className="mt-5 grid border-t hairline sm:grid-cols-2 lg:grid-cols-4">
            {SYNERGY_LOOP.map((node, i) => (
              <div
                key={node.step}
                className={`border-b hairline py-7 ${i > 0 ? 'lg:border-l lg:pl-7' : ''} ${
                  i < 3 ? 'lg:pr-7' : ''
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-brass">STEP {node.step}</span>
                  <span className="text-stone">→</span>
                </div>
                <h3 className="display mt-3 text-3xl text-travertine md:text-4xl">{node.title}</h3>
                <p className="mt-1.5 eyebrow text-[10px] text-palm">{node.metric}</p>
                <p className="mt-2 text-xs leading-relaxed text-stone">{node.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Modular Expansion Study */}
        <div className="mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow text-stone">02 // MODULAR OPTION COMPARISON</p>
              <h3 className="display mt-1.5 text-4xl md:text-5xl">
                Base Sanctuary vs. <em className="text-brass">Flagship Pool &amp; Track</em>
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Buildout option toggle"
              className="inline-flex rounded-full border hairline bg-basalt p-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeOption === 'base'}
                onClick={() => switchOption('base')}
                className={`rounded-full px-4 py-2 eyebrow text-[10px] transition-colors ${
                  activeOption === 'base' ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
                }`}
              >
                Option A · Base
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeOption === 'full'}
                onClick={() => switchOption('full')}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 eyebrow text-[10px] transition-colors ${
                  activeOption === 'full' ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
                }`}
              >
                <Sparkles className="h-3 w-3" strokeWidth={1.25} />
                Option B · + Pool &amp; Track
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="rounded-[6px] border hairline bg-charcoal p-6 md:p-9 lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-brass px-3 py-1 eyebrow text-[9px] text-obsidian">
                  {optSummary.badge}
                </span>
                <span className="font-mono text-xs text-stone">{optSummary.timelineEstimate}</span>
              </div>

              <h4 className="display mt-4 text-4xl text-travertine md:text-5xl">{optSummary.title}</h4>
              <p className="mt-2 text-sm text-stone">{optSummary.subtitle}</p>

              <div className="mt-5 grid gap-4 border-y hairline py-4 sm:grid-cols-3">
                <div>
                  <p className="eyebrow text-[9px] text-stone">Indicative CapEx</p>
                  <p className="mt-1 font-mono text-sm text-brass">{optSummary.totalCapex}</p>
                </div>
                <div>
                  <p className="eyebrow text-[9px] text-stone">Timeline</p>
                  <p className="mt-1 font-mono text-sm text-travertine">{optSummary.timelineEstimate}</p>
                </div>
                <div>
                  <p className="eyebrow text-[9px] text-stone">Revenue Pillars</p>
                  <p className="mt-1 font-mono text-xs text-palm">{optSummary.revenuePillars}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="eyebrow text-[10px] text-travertine">Included Scope</p>
                  <ul className="mt-2.5 space-y-2 text-xs text-travertine/85">
                    {optSummary.includedZones.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="eyebrow text-[10px] text-stone">Deferred &amp; Structural Note</p>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-stone">
                    {optSummary.excludedOrDeferred.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-[4px] border hairline bg-obsidian/60 p-3 text-xs text-stone">
                    <strong className="text-brass">Note:</strong> {optSummary.structuralNote}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-[6px] border hairline bg-basalt p-6 lg:col-span-4">
              <div className="flex w-full items-center justify-between eyebrow text-[10px] text-stone">
                <span className="text-brass">ACTIVE FOOTPRINT</span>
                <span>{activeOption === 'full' ? '09 ZONES' : '07 ZONES'}</span>
              </div>
              <SitePlan
                active={activeOption === 'full' ? FULL_ZONES : BASE_ZONES}
                className="my-4 h-[260px] w-auto"
              />
              <p className="text-center font-mono text-[10px] text-stone">
                {activeOption === 'full' ? 'Full Flagship Scope (Pool + Track Active)' : 'Core Base Scope'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. BOQ Table */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-stone">03 // BILL OF QUANTITIES &amp; OPTION DELTA</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-charcoal px-3.5 py-1 eyebrow text-[9px] text-brass">
                <Clock className="h-3 w-3" strokeWidth={1.25} />
                {FINANCIAL_DATA_STATUS === 'PENDING_REQUESTER_DATA'
                  ? FINANCIAL_META.pendingNotice
                  : FINANCIAL_META.confirmedNotice}
              </div>
            </div>

            <div className="inline-flex rounded-full border hairline bg-basalt p-1">
              {(['side-by-side', 'base', 'full'] as ComparisonViewMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setViewMode(m)}
                  className={`rounded-full px-3.5 py-1.5 eyebrow text-[9px] transition-colors ${
                    viewMode === m ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
                  }`}
                >
                  {m === 'side-by-side' ? 'Side-by-Side' : m === 'base' ? 'Option A' : 'Option B'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto rounded-[6px] border hairline bg-basalt">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b hairline bg-charcoal eyebrow text-[10px] text-stone">
                  <th className="py-3.5 pl-5 pr-3">#</th>
                  <th className="py-3.5 px-3">Work Package</th>
                  {(viewMode === 'side-by-side' || viewMode === 'base') && (
                    <th className="py-3.5 px-4">Option A (Base)</th>
                  )}
                  {(viewMode === 'side-by-side' || viewMode === 'full') && (
                    <th className="py-3.5 px-4">Option B (Flagship)</th>
                  )}
                  <th className="py-3.5 pl-3 pr-5 text-right">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-travertine/10 text-sm">
                {COST_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.id}
                    className={row.highlightInFull ? 'bg-brass/[0.08]' : 'hover:bg-charcoal/60'}
                  >
                    <td className="py-3.5 pl-5 pr-3 align-top font-mono text-xs text-brass">{row.code}</td>
                    <td className="py-3.5 px-3 align-top">
                      <p className="font-medium text-travertine">{row.category}</p>
                      <p className="mt-0.5 text-xs text-stone">{row.scopeDetail}</p>
                    </td>
                    {(viewMode === 'side-by-side' || viewMode === 'base') && (
                      <td className="py-3.5 px-4 align-top font-mono text-xs text-stone">{row.baseCost}</td>
                    )}
                    {(viewMode === 'side-by-side' || viewMode === 'full') && (
                      <td className="py-3.5 px-4 align-top font-mono text-xs text-travertine">
                        {row.fullCost}
                      </td>
                    )}
                    <td className="py-3.5 pl-3 pr-5 text-right align-top font-mono text-xs">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] ${
                          row.highlightInFull
                            ? 'bg-brass text-obsidian'
                            : 'border hairline bg-obsidian text-stone'
                        }`}
                      >
                        {row.variance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Roadmap */}
        <div className="mt-20">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-stone">04 // EXECUTION ROADMAP</p>
            <Layers className="h-4 w-4 text-brass" strokeWidth={1.25} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {NEXT_MILESTONES.map((m) => (
              <div
                key={m.phase}
                className="rounded-[6px] border hairline bg-charcoal p-6"
              >
                <div className="flex items-center justify-between eyebrow text-[10px]">
                  <span className="text-brass">{m.phase}</span>
                  <span className="rounded-full border hairline bg-obsidian px-2.5 py-0.5 text-travertine">
                    {m.status}
                  </span>
                </div>
                <h4 className="display mt-3 text-3xl text-travertine">{m.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-stone">{m.deliverables}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
