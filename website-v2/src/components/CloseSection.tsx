import { ArrowUp, CalendarCheck, CheckSquare, Printer, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { FINANCIAL_META } from '../data/financials';
import { scrollToId } from '../lib/scroll';
import { ArchMark, Eyebrow, MaskLine } from './Primitives';
import { SitePlan } from './SitePlan';

const SURVEY_CHECKLIST = [
  'Laser dimensions of North Semicircular Crown, Stepped Wings & East Curved Balcony',
  'Structural slab load certification for the North Infinity Pool basin',
  'Waterproofing & acoustic slab audit across the South 3-Bay Fitness Pavilion',
  'MEP boundary check around the Central-Left Chiller Core for louver screening',
  'Lock final requester BOQ across Option A (Base) and Option B (+ Pool & Track)',
];

export function CloseSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const toggleItem = (i: number) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <footer
      id="close"
      data-chapter="close"
      className="relative border-t hairline bg-basalt px-5 pb-16 pt-28 text-travertine md:px-10 md:pt-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow index="09" className="text-brass">
              Investor Close // Next Step
            </Eyebrow>
            <h2 className="display mt-5 text-[clamp(3.2rem,8vw,8.6rem)] text-travertine">
              <MaskLine>Walk the roof</MaskLine>
              <MaskLine delay={0.1} className="italic text-brass">
                with us.
              </MaskLine>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone md:text-base">
              Commission the Phase 01 laser and structural audit to convert approved spatial massing into
              final CAD and verified contractor BOQs.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 print:hidden">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 eyebrow text-[11px] text-obsidian transition-transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={1.25} />
                [ Schedule Site Survey ]
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-3 rounded-full border border-travertine/25 px-7 py-4 eyebrow text-[11px] text-travertine transition-colors hover:border-brass hover:text-brass"
              >
                <Printer className="h-4 w-4" strokeWidth={1.25} />
                [ Download Concept Deck ]
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start lg:col-span-4 lg:items-end">
            <div className="w-full max-w-[250px] rounded-[6px] border hairline bg-obsidian p-6">
              <div className="flex items-center justify-between eyebrow text-[9px] text-stone">
                <span className="text-brass">SILHOUETTE SEAL</span>
                <span>N ↑</span>
              </div>
              <SitePlan
                tone="dark"
                active={[
                  'pool',
                  'cafe',
                  'salon',
                  'recovery',
                  'promenade',
                  'track',
                  'group-class',
                  'pilates',
                  'gym',
                ]}
                className="my-4 h-[220px] w-full"
              />
              <p className="font-mono text-[10px] text-stone">
                {FINANCIAL_META.footprint} · {FINANCIAL_META.targetEnvelope}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t hairline pt-8">
          <div className="flex items-center gap-3">
            <ArchMark className="h-6 w-5 text-brass" />
            <span className="font-serif text-xl text-travertine">
              The Rooftop <em className="text-brass">Sanctuary</em>
            </span>
            <span className="eyebrow text-[9px] text-stone">// DARK MONOGRAPH EDITION V2</span>
          </div>

          <button
            type="button"
            onClick={() => scrollToId('arrival')}
            className="inline-flex items-center gap-2 eyebrow text-[10px] text-stone hover:text-brass print:hidden"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      {/* Dark-Theme Native Dialog Modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby="survey-modal-title"
        className="m-auto w-full max-w-xl rounded-[6px] border border-brass/35 bg-charcoal p-6 text-travertine shadow-2xl md:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-[10px] text-brass">PHASE 01 BRIEF // ON-SITE AUDIT</p>
            <h3 id="survey-modal-title" className="display mt-2 text-4xl text-travertine">
              Site Survey Checklist
            </h3>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="rounded-full border hairline p-2 text-stone hover:border-brass hover:text-travertine"
          >
            <X className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>

        <ul className="mt-5 divide-y divide-travertine/10 border-y hairline">
          {SURVEY_CHECKLIST.map((item, i) => (
            <li key={item} className="py-3">
              <button
                type="button"
                onClick={() => toggleItem(i)}
                className="flex w-full items-start gap-3 text-left text-xs leading-relaxed md:text-sm"
              >
                <CheckSquare
                  className={`mt-0.5 h-4 w-4 shrink-0 ${checked[i] ? 'text-brass' : 'text-stone/40'}`}
                  strokeWidth={1.25}
                />
                <span className={checked[i] ? 'text-travertine' : 'text-stone'}>{item}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              closeModal();
              window.print();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 eyebrow text-[10px] text-obsidian"
          >
            <Printer className="h-3.5 w-3.5" strokeWidth={1.25} />
            Print Brief &amp; Deck
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full border hairline px-5 py-2.5 eyebrow text-[10px] text-stone hover:text-travertine"
          >
            Done
          </button>
        </div>
      </dialog>
    </footer>
  );
}
