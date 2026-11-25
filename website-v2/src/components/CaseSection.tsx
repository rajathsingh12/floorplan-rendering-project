import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Hammer,
  Layers,
  Package,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import {
  COST_COMPARISON_ROWS,
  ESTIMATE_SCHEDULES,
  FINANCIAL_DATA_STATUS,
  FINANCIAL_META,
  NEXT_MILESTONES,
  OPTION_SUMMARIES,
  SHEET_TOTALS,
  SYNERGY_LOOP,
  formatInr,
  formatInrExact,
  getScheduleStats,
  type ComparisonViewMode,
  type EstimateSchedule,
} from '../data/financials';
import { hud } from '../lib/hud';
import { EASE } from '../lib/motion';
import { Eyebrow, MaskLine, Reveal } from './Primitives';
import { SitePlan } from './SitePlan';

const BASE_ZONES = ['cafe', 'salon', 'recovery', 'promenade', 'group-class', 'pilates', 'gym'];
const FULL_ZONES = [
  'pool',
  'cafe',
  'salon',
  'recovery',
  'promenade',
  'track',
  'group-class',
  'pilates',
  'gym',
];

export function CaseSection() {
  const [activeScheduleId, setActiveScheduleId] = useState<EstimateSchedule['id']>('gym');
  const [groupFilter, setGroupFilter] = useState<'all' | 'equipment' | 'interior'>('all');
  const [expandAllRows, setExpandAllRows] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ComparisonViewMode>('side-by-side');
  const [activeOption, setActiveOption] = useState<'base' | 'full'>('full');
  const [soloCase] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).has('soloCase');
    }
    return false;
  });

  const activeSchedule =
    ESTIMATE_SCHEDULES.find((s) => s.id === activeScheduleId) ?? ESTIMATE_SCHEDULES[0];
  const activeStats = getScheduleStats(activeSchedule);
  const maxItemInSchedule = Math.max(...activeSchedule.items.map((i) => i.amountInr), 1);

  const visibleItems = activeSchedule.items.filter((item) =>
    groupFilter === 'all' ? true : item.group === groupFilter,
  );

  const selectSchedule = (s: EstimateSchedule) => {
    setActiveScheduleId(s.id);
    setGroupFilter('all');
    hud.setFocus('case', s.mappedZones);
  };

  const switchOption = (opt: 'base' | 'full') => {
    setActiveOption(opt);
    hud.setFocus('case', opt === 'full' ? FULL_ZONES : BASE_ZONES);
  };

  const optSummary = OPTION_SUMMARIES[activeOption];
  const equipPctGlobal = Math.round((SHEET_TOTALS.equipmentInr / SHEET_TOTALS.totalInr) * 100);
  const interiorPctGlobal = 100 - equipPctGlobal;

  return (
    <section
      id="case"
      data-chapter="case"
      className={
        soloCase
          ? 'fixed inset-0 z-[90] overflow-y-auto bg-obsidian px-5 py-12 text-travertine md:px-10'
          : 'relative border-t hairline bg-obsidian px-5 py-28 text-travertine md:px-10 md:py-40'
      }
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="09" className="text-brass">
              The Investment Case // Itemized Estimates · Options · Roadmap
            </Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.9rem,6.8vw,7.4rem)]">
              <MaskLine>Disciplined scope.</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                Transparent CapEx.
              </MaskLine>
            </h2>
          </div>

          <Reveal className="lg:col-span-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[6px] border border-brass/40 bg-charcoal p-5">
                <p className="eyebrow text-[9.5px] text-brass">Itemized in Sheet So Far</p>
                <p className="display mt-1.5 text-4xl text-travertine md:text-[42px]">
                  {FINANCIAL_META.loggedToDate}
                </p>
                <p className="mt-1.5 font-mono text-[10.5px] text-stone">
                  {FINANCIAL_META.loggedExact} · {SHEET_TOTALS.lineItemCount} items
                </p>
              </div>

              <div className="rounded-[6px] border hairline bg-basalt p-5">
                <p className="eyebrow text-[9.5px] text-stone">Full Concept Envelope</p>
                <p className="display mt-1.5 text-4xl text-brass md:text-[42px]">
                  {FINANCIAL_META.targetEnvelope}
                </p>
                <p className="mt-1.5 font-mono text-[10.5px] text-stone">
                  {FINANCIAL_META.footprint} · {FINANCIAL_META.activeZones}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =================================================================== */}
        {/* 01 // LIVE CAPEX ENVELOPE & ESTIMATES.XLSX BREAKDOWN EXPLORER       */}
        {/* =================================================================== */}
        <div className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow text-stone">01 // DEPARTMENTAL FIT-OUT &amp; EQUIPMENT LEDGER</p>
              <h3 className="display mt-1.5 text-4xl md:text-5xl">
                Itemized <em className="text-brass">estimates.xlsx</em> schedule.
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-brass/35 bg-charcoal px-3.5 py-1.5 eyebrow text-[9px] text-brass">
              <FileSpreadsheet className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
              <span>
                {SHEET_TOTALS.lineItemCount} LINE ITEMS SYNCED · MORE ENTRIES IN PROGRESS
              </span>
            </div>
          </div>

          {/* Stacked CapEx Envelope Progress Meter */}
          <div className="mt-6 rounded-[6px] border hairline bg-basalt p-5 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-2 eyebrow text-[10px] text-travertine">
                <span>CAPEX ALLOCATION AGAINST ₹5–6 CR TARGET ENVELOPE</span>
              </div>
              <span className="font-mono text-xs text-brass">
                ~{SHEET_TOTALS.loggedPctOfEnvelope}% ITEMIZED TO DATE ({FINANCIAL_META.loggedExact})
              </span>
            </div>

            {/* Multi-segment bar */}
            <div className="mt-3 flex h-3.5 w-full overflow-hidden rounded-full border hairline bg-obsidian p-0.5">
              {ESTIMATE_SCHEDULES.map((s) => {
                const st = SHEET_TOTALS.byId[s.id];
                // Share of ₹5.5 Cr midpoint envelope
                const widthPct = Math.max(1.2, (st.totalInr / 5_50_00_000) * 100);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSchedule(s)}
                    style={{ width: `${widthPct}%`, backgroundColor: s.accent }}
                    title={`${s.title}: ${formatInr(st.totalInr)}`}
                    className="h-full first:rounded-l-full transition-opacity hover:opacity-85"
                  />
                );
              })}
              <div
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(200,162,100,0.18) 0px, rgba(200,162,100,0.18) 6px, transparent 6px, transparent 12px)',
                }}
                className="h-full flex-1 rounded-r-full"
                title="Remaining headroom for Rooftop Civil, Pilates Fleet, Pool & Sky Track"
              />
            </div>

            {/* Legend & Split Metrics */}
            <div className="mt-4 grid gap-4 border-t hairline pt-4 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-[9px] text-stone">Machines, Gear &amp; Opening Stock</p>
                <p className="mt-1 font-mono text-sm text-travertine">
                  {formatInr(SHEET_TOTALS.equipmentInr)}{' '}
                  <span className="text-xs text-brass">({equipPctGlobal}% of logged)</span>
                </p>
              </div>
              <div>
                <p className="eyebrow text-[9px] text-stone">Interior, Flooring, HVAC &amp; MEP</p>
                <p className="mt-1 font-mono text-sm text-travertine">
                  {formatInr(SHEET_TOTALS.interiorInr)}{' '}
                  <span className="text-xs text-stone">({interiorPctGlobal}% of logged)</span>
                </p>
              </div>
              <div>
                <p className="eyebrow text-[9px] text-stone">Remaining Civil &amp; Flagship Headroom</p>
                <p className="mt-1 font-mono text-sm text-brass">
                  {SHEET_TOTALS.remainingEnvelopeRange}{' '}
                  <span className="text-xs text-stone">(Sheet entries ongoing)</span>
                </p>
              </div>
            </div>
          </div>

          {/* 4 Interactive Department Selector Cards */}
          <div
            role="tablist"
            aria-label="Estimate schedules from spreadsheet"
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ESTIMATE_SCHEDULES.map((s) => {
              const st = SHEET_TOTALS.byId[s.id];
              const active = s.id === activeSchedule.id;
              const shareOfLogged = ((st.totalInr / SHEET_TOTALS.totalInr) * 100).toFixed(1);
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectSchedule(s)}
                  className={`group flex flex-col justify-between rounded-[6px] border p-4 text-left transition-all ${
                    active
                      ? 'border-brass bg-charcoal shadow-xl ring-1 ring-brass/50'
                      : 'border-travertine/12 bg-basalt/75 hover:border-brass/45 hover:bg-charcoal/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-brass">
                        DEPT {s.code} // {s.sheetTab.toUpperCase()}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] ${
                          s.status === 'LOGGED'
                            ? 'bg-palm/25 text-[#8BC49E]'
                            : 'bg-brass/15 text-brass'
                        }`}
                      >
                        {s.status === 'LOGGED' ? (
                          <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={1.5} />
                        ) : (
                          <Clock className="h-2.5 w-2.5" strokeWidth={1.5} />
                        )}
                        {s.status === 'LOGGED' ? 'LOGGED' : 'PARTIAL'}
                      </span>
                    </div>

                    <h4 className="display mt-2 text-2xl text-travertine">{s.title}</h4>
                  </div>

                  <div className="mt-4 border-t hairline pt-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-lg font-medium text-travertine">
                        {formatInr(st.totalInr)}
                      </span>
                      <span className="font-mono text-[10px] text-stone">
                        {st.itemCount} items · {shareOfLogged}%
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Department Deep-Dive Ledger */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSchedule.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="mt-5 grid gap-6 lg:grid-cols-12"
            >
              {/* Left Column: Department Architecture, Split & Pending Sheet Scope */}
              <div className="flex flex-col justify-between rounded-[6px] border hairline bg-charcoal p-6 lg:col-span-4">
                <div>
                  <div className="flex items-center justify-between eyebrow text-[9.5px] text-stone">
                    <span className="text-brass">SHEET COLUMN: {activeSchedule.sheetTab}</span>
                    <span>{activeSchedule.wing}</span>
                  </div>

                  <h4 className="display mt-2 text-3xl text-travertine md:text-4xl">
                    {activeSchedule.title}
                  </h4>
                  <p className="mt-2.5 text-xs leading-relaxed text-stone">
                    {activeSchedule.summary}
                  </p>

                  {/* Subtotal Callout */}
                  <div className="mt-5 rounded-[5px] border hairline bg-obsidian/70 p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="eyebrow text-[9.5px] text-stone">Department Subtotal</span>
                      <span className="font-mono text-[10px] text-brass">
                        {activeStats.itemCount} LINE ITEMS
                      </span>
                    </div>
                    <p className="display mt-1 text-4xl text-brass">
                      {formatInr(activeStats.totalInr)}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-stone">
                      Exact: {formatInrExact(activeStats.totalInr)}
                    </p>

                    {/* Equipment vs Interior Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between font-mono text-[10px]">
                        <span className="text-travertine">
                          Equipment: {formatInr(activeStats.equipmentInr)} ({activeStats.equipmentPct}%)
                        </span>
                        <span className="text-stone">
                          Interior: {formatInr(activeStats.interiorInr)} ({activeStats.interiorPct}%)
                        </span>
                      </div>
                      <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-basalt">
                        <div
                          style={{ width: `${activeStats.equipmentPct}%` }}
                          className="bg-brass"
                        />
                        <div
                          style={{ width: `${activeStats.interiorPct}%` }}
                          className="bg-[#78A889]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending / Upcoming Sheet Entries Box */}
                <div className="mt-5 rounded-[5px] border border-brass/30 bg-basalt/90 p-4">
                  <div className="flex items-center gap-2 eyebrow text-[9.5px] text-brass">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
                    <span>UPCOMING SHEET ENTRIES / SEPARATE PACKAGES</span>
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-travertine/80">
                    {activeSchedule.pendingItems.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Itemized Line-Item Schedule with Filter Pills & Micro-Bars */}
              <div className="rounded-[6px] border hairline bg-basalt p-5 md:p-6 lg:col-span-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b hairline pb-4">
                  <div>
                    <p className="eyebrow text-[10px] text-brass">
                      ITEMIZED SCHEDULE // {visibleItems.length} SHOWN
                    </p>
                    <p className="mt-0.5 text-xs text-stone">
                      Sorted largest-to-smallest CapEx driver from <code>docs/estimates.xlsx</code>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex rounded-full border hairline bg-obsidian p-1">
                      {(
                        [
                          { id: 'all', label: `All (${activeSchedule.items.length})` },
                          {
                            id: 'equipment',
                            label: `Equipment (${
                              activeSchedule.items.filter((i) => i.group === 'equipment').length
                            })`,
                          },
                          {
                            id: 'interior',
                            label: `Interior (${
                              activeSchedule.items.filter((i) => i.group === 'interior').length
                            })`,
                          },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setGroupFilter(tab.id)}
                          className={`rounded-full px-3 py-1 eyebrow text-[9px] transition-colors ${
                            groupFilter === tab.id
                              ? 'bg-brass text-obsidian'
                              : 'text-stone hover:text-travertine'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {visibleItems.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setExpandAllRows((v) => !v)}
                        className="rounded-full border hairline bg-obsidian px-3 py-1.5 eyebrow text-[9px] text-brass transition-colors hover:border-brass"
                      >
                        {expandAllRows ? 'Compact List' : `Expand All (${visibleItems.length})`}
                      </button>
                    )}
                  </div>
                </div>

                <div
                  data-lenis-prevent
                  className={`mt-4 space-y-2 pr-1 print:max-h-none print:overflow-visible ${
                    expandAllRows ? '' : 'max-h-[460px] overflow-y-auto'
                  }`}
                >
                  {visibleItems.map((item, idx) => {
                    const barWidth = Math.max(
                      3,
                      Math.round((item.amountInr / maxItemInSchedule) * 100),
                    );
                    return (
                      <div
                        key={item.id}
                        className="rounded-[4px] border border-travertine/8 bg-obsidian/65 px-3.5 py-2.5 transition-colors hover:border-brass/35"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] text-stone">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span className="text-xs font-medium text-travertine sm:text-sm">
                                {item.label}
                              </span>
                              {item.qty !== undefined && (
                                <span className="rounded-full border border-brass/40 bg-brass/10 px-2 py-0.5 font-mono text-[9.5px] text-brass">
                                  QTY ×{item.qty}
                                </span>
                              )}
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 eyebrow text-[8.5px] ${
                                  item.group === 'equipment'
                                    ? 'bg-charcoal text-travertine/75'
                                    : 'bg-[#2F4838]/40 text-[#96C7A8]'
                                }`}
                              >
                                {item.group === 'equipment' ? (
                                  <Package className="h-2.5 w-2.5" strokeWidth={1.25} />
                                ) : (
                                  <Hammer className="h-2.5 w-2.5" strokeWidth={1.25} />
                                )}
                                {item.group === 'equipment' ? 'Equip / Stock' : 'Interior / MEP'}
                              </span>
                            </div>
                            {item.note && (
                              <p className="mt-0.5 pl-6 text-[11px] text-stone">{item.note}</p>
                            )}
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="font-mono text-xs font-semibold text-brass sm:text-sm">
                              {formatInr(item.amountInr)}
                            </p>
                            {item.amountInr >= 1_00_000 && (
                              <p className="font-mono text-[9.5px] text-stone">
                                {formatInrExact(item.amountInr)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Proportional CapEx Weight Bar */}
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-charcoal">
                          <div
                            style={{ width: `${barWidth}%` }}
                            className={`h-full rounded-full ${
                              item.group === 'equipment' ? 'bg-brass/80' : 'bg-[#78A889]/80'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =================================================================== */}
        {/* 02 // MODULAR OPTION COMPARISON (BASE VS. FLAGSHIP)                 */}
        {/* =================================================================== */}
        <div className="mt-24">
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
                  activeOption === 'base'
                    ? 'bg-brass text-obsidian'
                    : 'text-stone hover:text-travertine'
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
                  activeOption === 'full'
                    ? 'bg-brass text-obsidian'
                    : 'text-stone hover:text-travertine'
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

              <h4 className="display mt-4 text-4xl text-travertine md:text-5xl">
                {optSummary.title}
              </h4>
              <p className="mt-2 text-sm text-stone">{optSummary.subtitle}</p>

              <div className="mt-5 grid gap-4 border-y hairline py-4 sm:grid-cols-3">
                <div>
                  <p className="eyebrow text-[9px] text-stone">CapEx Posture</p>
                  <p className="mt-1 font-mono text-sm text-brass">{optSummary.totalCapex}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-stone">
                    {optSummary.loggedCapex}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-[9px] text-stone">Build Timeline</p>
                  <p className="mt-1 font-mono text-sm text-travertine">
                    {optSummary.timelineEstimate}
                  </p>
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
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass"
                          strokeWidth={1.5}
                        />
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
                {activeOption === 'full'
                  ? 'Full Flagship Scope (Pool + Track Active)'
                  : 'Core Base Scope'}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 03 // MASTER SANCTUARY ROLLUP & OPTION DELTA TABLE                  */}
        {/* =================================================================== */}
        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-stone">03 // MASTER SANCTUARY ROLLUP &amp; OPTION DELTA</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-charcoal px-3.5 py-1 eyebrow text-[9px] text-brass">
                <Clock className="h-3 w-3" strokeWidth={1.25} />
                {FINANCIAL_DATA_STATUS === 'PARTIAL_SHEET_SYNC'
                  ? FINANCIAL_META.sheetNotice
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
            <table className="w-full min-w-[740px] border-collapse text-left">
              <thead>
                <tr className="border-b hairline bg-charcoal eyebrow text-[10px] text-stone">
                  <th className="py-3.5 pl-5 pr-3">#</th>
                  <th className="px-3 py-3.5">Work Package</th>
                  {(viewMode === 'side-by-side' || viewMode === 'base') && (
                    <th className="px-4 py-3.5">Option A (Base)</th>
                  )}
                  {(viewMode === 'side-by-side' || viewMode === 'full') && (
                    <th className="px-4 py-3.5">Option B (Flagship)</th>
                  )}
                  <th className="py-3.5 pl-3 pr-5 text-right">Sheet Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-travertine/10 text-sm">
                {COST_COMPARISON_ROWS.map((row) => {
                  const pillClass =
                    row.statusTone === 'locked'
                      ? 'bg-palm/25 text-[#90C9A4] border border-palm/50'
                      : row.statusTone === 'partial'
                        ? 'bg-brass/15 text-brass border border-brass/40'
                        : row.statusTone === 'delta'
                          ? 'bg-brass text-obsidian font-semibold'
                          : 'border hairline bg-obsidian text-stone';

                  return (
                    <tr
                      key={row.id}
                      className={row.highlightInFull ? 'bg-brass/[0.08]' : 'hover:bg-charcoal/60'}
                    >
                      <td className="py-3.5 pl-5 pr-3 align-top font-mono text-xs text-brass">
                        {row.code}
                      </td>
                      <td className="px-3 py-3.5 align-top">
                        <p className="font-medium text-travertine">{row.category}</p>
                        <p className="mt-0.5 text-xs text-stone">{row.scopeDetail}</p>
                      </td>
                      {(viewMode === 'side-by-side' || viewMode === 'base') && (
                        <td className="px-4 py-3.5 align-top font-mono text-xs text-travertine/90">
                          {row.baseCost}
                        </td>
                      )}
                      {(viewMode === 'side-by-side' || viewMode === 'full') && (
                        <td className="px-4 py-3.5 align-top font-mono text-xs text-brass">
                          {row.fullCost}
                        </td>
                      )}
                      <td className="py-3.5 pl-3 pr-5 text-right align-top font-mono text-xs">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] ${pillClass}`}>
                          {row.variance}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-brass/35 bg-charcoal/90 font-mono text-xs">
                  <td className="py-4 pl-5 pr-3 text-brass">Σ</td>
                  <td className="px-3 py-4">
                    <p className="font-sans text-sm font-semibold text-travertine">
                      Cumulative Sanctuary CapEx Rollup
                    </p>
                    <p className="mt-0.5 font-sans text-xs text-stone">
                      {SHEET_TOTALS.lineItemCount} itemized rows ({FINANCIAL_META.loggedExact}) +
                      remaining civil &amp; zone entries
                    </p>
                  </td>
                  {(viewMode === 'side-by-side' || viewMode === 'base') && (
                    <td className="px-4 py-4 text-travertine">
                      {FINANCIAL_META.loggedToDate} + Civil
                    </td>
                  )}
                  {(viewMode === 'side-by-side' || viewMode === 'full') && (
                    <td className="px-4 py-4 font-semibold text-brass">
                      {FINANCIAL_META.loggedToDate} → ~₹5–6 Cr
                    </td>
                  )}
                  <td className="py-4 pl-3 pr-5 text-right text-[10px] text-brass">
                    LIVE ROLLUP
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 04 // ECOSYSTEM SYNERGY LOOP & EXECUTION ROADMAP                    */}
        {/* =================================================================== */}
        <div className="mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow text-stone">04 // ECOSYSTEM SYNERGY LOOP</p>
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

        <div className="mt-20">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-stone">05 // EXECUTION ROADMAP</p>
            <Layers className="h-4 w-4 text-brass" strokeWidth={1.25} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {NEXT_MILESTONES.map((m) => (
              <div key={m.phase} className="rounded-[6px] border hairline bg-charcoal p-6">
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
