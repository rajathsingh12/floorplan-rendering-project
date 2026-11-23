/**
 * ============================================================================
 * FINANCIALS & COST COMPARISON DATA — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * HOW TO UPDATE ONCE THE REQUESTER SENDS FINAL COST & COMPARISON FIGURES:
 * 1. Change `FINANCIAL_DATA_STATUS` below from 'PENDING_REQUESTER_DATA' to 'CONFIRMED'.
 * 2. Update `OPTION_SUMMARIES` (totalCapex, timelineEstimate).
 * 3. Fill in `baseCost`, `fullCost`, and `variance` inside `COST_COMPARISON_ROWS`.
 */

export type FinancialDataStatus = 'PENDING_REQUESTER_DATA' | 'CONFIRMED';

export const FINANCIAL_DATA_STATUS: FinancialDataStatus = 'PENDING_REQUESTER_DATA';

export const FINANCIAL_META = {
  targetEnvelope: '₹5–6 Crore',
  footprint: '~20,000+ sq. ft.',
  activeZones: '08 Active Zones',
  pendingNotice: 'INDICATIVE STRUCTURE // FINAL FIGURES PENDING REQUESTER QUOTE',
  confirmedNotice: 'VERIFIED BOQ SUMMARY // SUBJECT TO FINAL SITE SURVEY',
};

export type ComparisonViewMode = 'side-by-side' | 'base' | 'full';

export interface BuildoutOptionSummary {
  id: 'base' | 'full';
  badge: string;
  title: string;
  subtitle: string;
  totalCapex: string;
  timelineEstimate: string;
  revenuePillars: string;
  structuralNote: string;
  includedZones: string[];
  excludedOrDeferred: string[];
}

export const OPTION_SUMMARIES: Record<'base' | 'full', BuildoutOptionSummary> = {
  base: {
    id: 'base',
    badge: 'OPTION A // CORE SCOPE',
    title: 'Base Sanctuary Plan',
    subtitle: '3-Bay Fitness Pavilion, Bali Café, Atelier Salon, Contrast Recovery & Screened Core.',
    totalCapex: 'TBD — Awaiting Quote',
    timelineEstimate: 'TBD (5–6 Months)',
    revenuePillars: 'Gym · Pilates · Salon · Café · Recovery',
    structuralNote: 'Minimal slab load; north crown finished as a landscaped Bali sun deck.',
    includedZones: [
      'South 3-Bay Pavilion (Gym, Pilates, Group Studio)',
      'Wrap-Around Bali Café & Espresso Bar',
      'The Atelier Luxury Salon & Contrast Recovery Suite',
      'East Palm Promenade & Screened Mechanical Core',
    ],
    excludedOrDeferred: [
      'North Semicircular Infinity Pool (deferred)',
      '2-Lane Terracotta EPDM Sky Running Track (deferred)',
    ],
  },
  full: {
    id: 'full',
    badge: 'OPTION B // FLAGSHIP VISION',
    title: 'Full Sanctuary + Pool & Sky Track',
    subtitle: 'Complete rendered vision adding the North Infinity Pool and 2-lane Terracotta Sky Track.',
    totalCapex: 'TBD (~₹5–6 Cr Envelope)',
    timelineEstimate: 'TBD (7–9 Months)',
    revenuePillars: 'Flagship Club · Pool Deck · Track · Salon · Café',
    structuralNote: 'Requires structural slab certification for the north pool basin prior to civil works.',
    includedZones: [
      'All Base Sanctuary Zones (Fitness, Café, Salon, Recovery)',
      'Semicircular North Infinity Pool with Vanishing Edge',
      '2-Lane Terracotta EPDM Perimeter Sky Running Track',
      'Frameless Glass Balustrades & Screened Utility Core',
    ],
    excludedOrDeferred: [
      'Central-Left Mechanical Core remains strictly non-usable',
    ],
  },
};

export interface CostComparisonRow {
  id: string;
  code: string;
  category: string;
  scopeDetail: string;
  baseCost: string;
  fullCost: string;
  variance: string;
  highlightInFull?: boolean;
}

export const COST_COMPARISON_ROWS: CostComparisonRow[] = [
  {
    id: 'civil-structural',
    code: '01',
    category: 'Structural Audit, Waterproofing & Deck Civil',
    scopeDetail: 'Slab load test, multi-layer waterproofing, drainage & travertine/teak substrates',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Pending Quote',
  },
  {
    id: 'south-pavilion',
    code: '02',
    category: 'South 3-Bay Glass & Teak Fitness Pavilion',
    scopeDetail: 'Charcoal steel portals, acoustic glazing, louvered eaves & skylight roof',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'fitness-equipment',
    code: '03',
    category: 'Strength, Reformer Pilates & Studio Fit-Out',
    scopeDetail: 'Matte-black racks, free weights, oak Pilates reformers, sprung timber & rubber floors',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'sky-track',
    code: '04',
    category: 'Perimeter 2-Lane EPDM Sky Running Track',
    scopeDetail: 'Cushioned terracotta EPDM loop, lane markings, glass balustrades & bollards',
    baseCost: '—',
    fullCost: 'TBD',
    variance: '+ Option B Delta',
    highlightInFull: true,
  },
  {
    id: 'infinity-pool',
    code: '05',
    category: 'Semicircular North Infinity Pool & Filtration',
    scopeDetail: 'Vanishing-edge basin inside north dome, Bali stone tile, balancing tank & LEDs',
    baseCost: '—',
    fullCost: 'TBD',
    variance: '+ Option B Delta',
    highlightInFull: true,
  },
  {
    id: 'cafe-kitchen',
    code: '06',
    category: 'Wrap-Around Bali Café & Kitchen',
    scopeDetail: 'Stepped teak pergolas, travertine espresso bar, rattan lighting & kitchen line',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'salon-recovery',
    code: '07',
    category: 'Atelier Salon & Contrast Recovery Suite',
    scopeDetail: 'Northwest glass pavilion, backlit brass arches, cedar sauna & basalt cold plunge',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'mep-landscape',
    code: '08',
    category: 'Core Screening, Tropical Landscape & Lighting',
    scopeDetail: 'Dark-teak louvers around utility core, living green walls, palms & 2700K LEDs',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Pending Quote',
  },
];

export interface SynergyNode {
  step: string;
  title: string;
  metric: string;
  detail: string;
}

export const SYNERGY_LOOP: SynergyNode[] = [
  {
    step: '01',
    title: 'Captive + Destination',
    metric: '100+ Office Pros · 400–500 Cap',
    detail: 'In-building weekday footfall meets high-LTV destination club members.',
  },
  {
    step: '02',
    title: 'South Fitness & Track',
    metric: 'Recurring Core Dues',
    detail: 'Strength, Reformer Pilates, Group Classes, and the sky track anchor daily habits.',
  },
  {
    step: '03',
    title: 'Recovery & Bali Café',
    metric: 'Daily F&B Check',
    detail: 'Sauna, cold plunge, post-workout protein bowls, and all-day espresso meetings.',
  },
  {
    step: '04',
    title: 'The Atelier Salon',
    metric: 'High-Margin Grooming',
    detail: 'Converts club members and corporate tenants into recurring salon rituals.',
  },
];

export interface ProjectMilestone {
  phase: string;
  title: string;
  deliverables: string;
  status: string;
}

export const NEXT_MILESTONES: ProjectMilestone[] = [
  {
    phase: 'PHASE 01',
    title: 'Site Survey & Structural Audit',
    deliverables: 'Laser dimensions, north pool load certification, and parapet inspection.',
    status: 'NEXT STEP',
  },
  {
    phase: 'PHASE 02',
    title: 'Final CAD & Verified BOQ',
    deliverables: 'Lock Option A vs. Option B quotes, waterproofing details, and MEP drawings.',
    status: 'UPCOMING',
  },
  {
    phase: 'PHASE 03',
    title: 'Turnkey Build & Pre-Sale',
    deliverables: 'Phased pavilion fabrication, core screening, fit-out, and founding-member launch.',
    status: 'LAUNCH',
  },
];
