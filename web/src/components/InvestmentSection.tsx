import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Clock,
  FileSpreadsheet,
  Printer,
  Calendar,
  X,
  Info,
} from 'lucide-react';
import {
  COST_COMPARISON_ROWS,
  FINANCIAL_DATA_STATUS,
  FINANCIAL_META,
  NEXT_MILESTONES,
  OPTION_SUMMARIES,
  SYNERGY_LOOP,
  type ComparisonViewMode,
} from '../data/financials';

export function InvestmentSection() {
  const [viewMode, setViewMode] = useState<ComparisonViewMode>('side-by-side');
  const [surveyModalOpen, setSurveyModalOpen] = useState(false);

  const isPending = FINANCIAL_DATA_STATUS === 'PENDING_REQUESTER_DATA';

  return (
    <section
      id="investment"
      data-chapter="investment"
      className="pt-24 md:pt-32 pb-20 bg-[#F5F1EB] text-[#1F1D1A]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b hairline-light"
        >
          <div className="lg:col-span-7">
            <span className="font-spec text-[11px] text-[#B8935A] block mb-3">
              CHAPTER 05 // ECOSYSTEM, COST STUDY &amp; ROADMAP
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1F1D1A]">
              Built as a Business Engine,{' '}
              <span className="italic text-[#2F4838]">Not Just Architecture.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#6B655C] text-base leading-relaxed">
              Four interlocking revenue streams—Fitness, Recovery, Botanical Café, and Luxury
              Salon—share one acquisition funnel and one roof. Below is the structured CapEx
              comparison comparing the Base Sanctuary against the Flagship Pool &amp; Sky Track
              vision.
            </p>
          </div>
        </motion.div>

        {/* Sub-section 1: Cross-Pollination Synergy Loop */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <span className="font-spec text-[10px] text-[#6B655C]">
              01 // THE CROSS-POLLINATION ECOSYSTEM
            </span>
            <span className="font-spec text-[10px] text-[#2F4838] hidden sm:inline">
              ONE ROOF · MULTIPLE HIGH-LTV TOUCHPOINTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border hairline-light divide-y md:divide-y-0 md:divide-x divide-[#1F1D1A]/12 bg-[#EAE3D9]/35">
            {SYNERGY_LOOP.map((node, index) => (
              <div key={node.step} className="p-6 md:p-7 flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-spec text-[10px] text-[#B8935A]">STEP {node.step}</span>
                    {index < SYNERGY_LOOP.length - 1 && (
                      <ArrowRight
                        className="w-3.5 h-3.5 text-[#1F1D1A]/30 hidden lg:block"
                        strokeWidth={1.25}
                      />
                    )}
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1F1D1A]">{node.title}</h3>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-[#F5F1EB] border hairline-light font-spec text-[9px] text-[#2F4838]">
                    {node.metric}
                  </span>
                  <p className="mt-3 text-xs text-[#6B655C] leading-relaxed">{node.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-section 2: Modular Cost & Option Comparison Module */}
        <div className="mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b hairline-light">
            <div>
              <span className="font-spec text-[10px] text-[#6B655C] block mb-2">
                02 // BUILD-OUT SCOPE &amp; COST COMPARISON
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#1F1D1A]">
                Base Sanctuary vs. Flagship Pool &amp; Sky Track
              </h3>
            </div>

            {/* Segmented Mode Switcher */}
            <div
              role="tablist"
              aria-label="Cost comparison view mode"
              className="inline-flex flex-wrap border hairline-light bg-[#EAE3D9]/60 p-1 w-fit"
            >
              {(
                [
                  { id: 'side-by-side', label: 'Side-by-Side' },
                  { id: 'base', label: 'Option A · Base' },
                  { id: 'full', label: 'Option B · Full' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={viewMode === tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`px-3.5 py-2 font-spec text-[10px] transition-colors cursor-pointer ${
                    viewMode === tab.id
                      ? 'bg-[#161614] text-[#F5F1EB]'
                      : 'text-[#6B655C] hover:text-[#1F1D1A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Status Banner (Driven by src/data/financials.ts) */}
          <div
            className={`mt-6 px-4 py-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isPending
                ? 'border-[#B8935A]/45 bg-[#EAE3D9]/65 text-[#1F1D1A]'
                : 'border-[#2F4838]/35 bg-[#2F4838]/10 text-[#2F4838]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-[#B8935A] shrink-0" strokeWidth={1.25} />
              <span className="font-spec text-[9.5px]">
                {isPending ? FINANCIAL_META.pendingNotice : FINANCIAL_META.confirmedNotice}
              </span>
            </div>
            <span className="font-spec text-[9.5px] text-[#6B655C] shrink-0">
              TARGET ENVELOPE: {FINANCIAL_META.targetEnvelope}
            </span>
          </div>

          {/* Option Summary Cards */}
          <div
            className={`mt-6 grid gap-6 ${
              viewMode === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {(viewMode === 'side-by-side'
              ? ([OPTION_SUMMARIES.base, OPTION_SUMMARIES.full] as const)
              : ([OPTION_SUMMARIES[viewMode]] as const)
            ).map((opt) => {
              const isFlagship = opt.id === 'full';
              return (
                <div
                  key={opt.id}
                  className={`border p-7 md:p-8 flex flex-col justify-between ${
                    isFlagship
                      ? 'bg-[#161614] text-[#F5F1EB] border-[#161614]'
                      : 'bg-[#F5F1EB] text-[#1F1D1A] hairline-light'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-current/12">
                      <span
                        className={`font-spec text-[9.5px] ${
                          isFlagship ? 'text-[#B8935A]' : 'text-[#2F4838]'
                        }`}
                      >
                        {opt.badge}
                      </span>
                      <span className="font-spec text-[9.5px] opacity-65">
                        {opt.timelineEstimate}
                      </span>
                    </div>

                    <h4 className="font-editorial text-3xl font-light mt-5">{opt.title}</h4>
                    <p
                      className={`mt-2.5 text-sm leading-relaxed ${
                        isFlagship ? 'text-[#F5F1EB]/72' : 'text-[#6B655C]'
                      }`}
                    >
                      {opt.subtitle}
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-current/12">
                      <div>
                        <span className="font-spec text-[9px] opacity-55 block">
                          ESTIMATED CAPEX
                        </span>
                        <span
                          className={`font-mono text-sm mt-1 block ${
                            isFlagship ? 'text-[#B8935A]' : 'text-[#1F1D1A]'
                          }`}
                        >
                          {opt.totalCapex}
                        </span>
                      </div>
                      <div>
                        <span className="font-spec text-[9px] opacity-55 block">
                          REVENUE PILLARS
                        </span>
                        <span className="text-xs mt-1 block opacity-90">{opt.revenuePillars}</span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2">
                      {opt.includedZones.map((item) => (
                        <li key={item} className="text-xs flex items-start gap-2.5 opacity-90">
                          <Check
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isFlagship ? 'text-[#B8935A]' : 'text-[#2F4838]'
                            }`}
                            strokeWidth={1.5}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t border-current/12 text-xs flex items-start gap-2.5 ${
                      isFlagship ? 'text-[#F5F1EB]/65' : 'text-[#6B655C]'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#B8935A]" strokeWidth={1.25} />
                    <span>{opt.structuralNote}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Architectural BOQ Cost Comparison Table */}
          <div className="mt-8 border hairline-light bg-[#F5F1EB] overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b hairline-light bg-[#EAE3D9]/55">
                  <th className="py-3.5 px-4 font-spec text-[9.5px] text-[#6B655C] w-14">#</th>
                  <th className="py-3.5 px-4 font-spec text-[9.5px] text-[#6B655C]">
                    Architectural Discipline &amp; Scope
                  </th>
                  {(viewMode === 'side-by-side' || viewMode === 'base') && (
                    <th className="py-3.5 px-4 font-spec text-[9.5px] text-[#1F1D1A] text-right">
                      Option A · Base
                    </th>
                  )}
                  {(viewMode === 'side-by-side' || viewMode === 'full') && (
                    <th className="py-3.5 px-4 font-spec text-[9.5px] text-[#2F4838] text-right">
                      Option B · Full
                    </th>
                  )}
                  {viewMode === 'side-by-side' && (
                    <th className="py-3.5 px-4 font-spec text-[9.5px] text-[#B8935A] text-right">
                      Delta / Note
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1D1A]/10">
                {COST_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-[#EAE3D9]/30 ${
                      row.highlightInFull ? 'bg-[#EAE3D9]/25' : ''
                    }`}
                  >
                    <td className="py-4 px-4 font-spec text-[10px] text-[#6B655C] align-top">
                      {row.code}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <span className="block text-sm font-medium text-[#1F1D1A]">
                        {row.category}
                      </span>
                      <span className="block text-xs text-[#6B655C] mt-0.5 leading-relaxed">
                        {row.scopeDetail}
                      </span>
                    </td>
                    {(viewMode === 'side-by-side' || viewMode === 'base') && (
                      <td className="py-4 px-4 font-mono text-xs text-right align-top text-[#6B655C] whitespace-nowrap">
                        {row.baseCost}
                      </td>
                    )}
                    {(viewMode === 'side-by-side' || viewMode === 'full') && (
                      <td
                        className={`py-4 px-4 font-mono text-xs text-right align-top whitespace-nowrap ${
                          row.highlightInFull ? 'text-[#2F4838] font-medium' : 'text-[#1F1D1A]'
                        }`}
                      >
                        {row.fullCost}
                      </td>
                    )}
                    {viewMode === 'side-by-side' && (
                      <td className="py-4 px-4 font-spec text-[9.5px] text-right align-top whitespace-nowrap text-[#B8935A]">
                        {row.variance}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[#1F1D1A]/25 bg-[#EAE3D9]/65">
                  <td colSpan={2} className="py-4 px-4 font-spec text-[10px] text-[#1F1D1A]">
                    TOTAL CONCEPTUAL CAPITAL ENVELOPE
                  </td>
                  {(viewMode === 'side-by-side' || viewMode === 'base') && (
                    <td className="py-4 px-4 font-mono text-xs text-right font-medium text-[#1F1D1A]">
                      {OPTION_SUMMARIES.base.totalCapex}
                    </td>
                  )}
                  {(viewMode === 'side-by-side' || viewMode === 'full') && (
                    <td className="py-4 px-4 font-mono text-xs text-right font-medium text-[#2F4838]">
                      {OPTION_SUMMARIES.full.totalCapex}
                    </td>
                  )}
                  {viewMode === 'side-by-side' && (
                    <td className="py-4 px-4 font-spec text-[9.5px] text-right text-[#6B655C]">
                      AWAITING BOQ
                    </td>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Sub-section 3: Execution Milestones */}
        <div className="mt-20">
          <span className="font-spec text-[10px] text-[#6B655C] block mb-5">
            03 // EXECUTION MILESTONES
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 border hairline-light divide-y md:divide-y-0 md:divide-x divide-[#1F1D1A]/12 bg-[#F5F1EB]">
            {NEXT_MILESTONES.map((step) => (
              <div key={step.phase} className="p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-spec text-[10px] text-[#B8935A]">{step.phase}</span>
                    <span className="inline-flex items-center gap-1.5 font-spec text-[9px] text-[#2F4838]">
                      <Clock className="w-3 h-3" strokeWidth={1.25} />
                      {step.status}
                    </span>
                  </div>
                  <h4 className="font-editorial text-2xl text-[#1F1D1A]">{step.title}</h4>
                  <p className="mt-2.5 text-xs text-[#6B655C] leading-relaxed">
                    {step.deliverables}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Close & Footer CTA */}
        <footer className="mt-20 pt-14 border-t border-[#1F1D1A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-spec text-[10px] text-[#B8935A] block mb-2">
                ARCHITECTURAL SIGN-OFF // THE ROOFTOP SANCTUARY
              </span>
              <h3 className="font-editorial text-3xl sm:text-5xl font-light text-[#1F1D1A]">
                Ready to Walk the Rooftop{' '}
                <span className="italic text-[#2F4838]">In Person?</span>
              </h3>
              <p className="mt-3 text-sm text-[#6B655C] max-w-xl leading-relaxed">
                Next step: complete laser site measurements, confirm structural load allowances for
                the northern infinity basin, and drop the requester&apos;s verified BOQ quotes
                directly into this live investment brief.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3.5 no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#1F1D1A]/25 text-[#1F1D1A] font-spec text-[10.5px] hover:border-[#2F4838] hover:text-[#2F4838] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" strokeWidth={1.25} />
                Download Concept Deck (PDF)
              </button>
              <button
                type="button"
                onClick={() => setSurveyModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#161614] text-[#F5F1EB] font-spec text-[10.5px] hover:bg-[#2F4838] transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.25} />
                Schedule Site Survey
              </button>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t hairline-light flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#6B655C] font-spec text-[9.5px]">
            <span>THE ROOFTOP SANCTUARY // ~20,000+ SQ. FT. MODERN-BALI CONCEPT PITCH</span>
            <span>SPATIALLY LOCKED TO REAL SATELLITE FOOTPRINT · ZERO FABRICATED GEOMETRY</span>
          </div>
        </footer>
      </div>

      {/* Site Survey Briefing Modal */}
      <AnimatePresence>
        {surveyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-50 bg-[#161614]/70 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setSurveyModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#F5F1EB] text-[#1F1D1A] border border-[#1F1D1A]/20 p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b hairline-light">
                <div>
                  <span className="font-spec text-[9.5px] text-[#B8935A] block">
                    PHASE 01 CHECKLIST
                  </span>
                  <h4 className="font-editorial text-3xl font-light mt-1">
                    Site Survey &amp; Structural Audit
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSurveyModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1.5 border hairline-light hover:bg-[#EAE3D9] cursor-pointer"
                >
                  <X className="w-4 h-4" strokeWidth={1.25} />
                </button>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-[#6B655C]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#2F4838] mt-0.5">01</span>
                  <span>
                    Laser total-station measurement of North Dome, East Balcony, Mechanical Core
                    setback, and South Rectangular Slab.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#2F4838] mt-0.5">02</span>
                  <span>
                    Structural engineer live-load &amp; dead-load verification for the North
                    Semicircular Infinity Pool and steel pavilion footings.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#2F4838] mt-0.5">03</span>
                  <span>
                    Insert final requester cost &amp; comparison figures into{' '}
                    <code className="font-mono text-xs text-[#1F1D1A]">
                      web/src/data/financials.ts
                    </code>{' '}
                    to publish the final investor BOQ deck.
                  </span>
                </li>
              </ul>

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSurveyModalOpen(false)}
                  className="px-5 py-2.5 bg-[#161614] text-[#F5F1EB] font-spec text-[10px] hover:bg-[#2F4838] transition-colors cursor-pointer"
                >
                  Close Checklist
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
