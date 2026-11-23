/**
 * ============================================================================
 * FINANCIALS & COST COMPARISON DATA — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * HOW TO UPDATE ONCE THE REQUESTER SENDS FINAL COST & COMPARISON FIGURES:
 * 1. Change `FINANCIAL_DATA_STATUS` below from 'PENDING_REQUESTER_DATA' to 'CONFIRMED'.
 * 2. Update `PROJECT_BUDGET_HEADLINE` and `OPTION_SUMMARIES` (totalCapex, timeline, roiPayback).
 * 3. Fill in `baseCost`, `fullCost`, and `variance` inside `COST_COMPARISON_ROWS`.
 * 4. No React components need to be touched — the Investment & Comparison UI reads directly from this file.
 */

export type FinancialDataStatus = 'PENDING_REQUESTER_DATA' | 'CONFIRMED';

export const FINANCIAL_DATA_STATUS: FinancialDataStatus = 'PENDING_REQUESTER_DATA';

export const FINANCIAL_META = {
  targetEnvelope: '₹5–6 Crore',
  footprint: '~20,000+ sq. ft.',
  activeZones: '08 Active Zones',
  pendingNotice:
    'INDICATIVE STRUCTURE // FINAL COST & OPTION COMPARISON FIGURES PENDING REQUESTER QUOTE',
  confirmedNotice: 'VERIFIED BOQ SUMMARY // SUBJECT TO FINAL SITE SURVEY & STRUCTURAL AUDIT',
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
    subtitle:
      'Core Gym, Reformer Pilates, Group Classes, Luxury Atelier Salon, Wrap-Around Bali Café, Recovery Suite, East Promenade, and Screened Mechanical Core — with the north terrace finished as a landscaped Bali sun lounge.',
    totalCapex: 'TBD — Awaiting Requester Figure',
    timelineEstimate: 'TBD (Indicative 5–6 Months)',
    revenuePillars: 'Gym Memberships · Pilates · Salon · Café · Recovery',
    structuralNote:
      'Lowest structural slab load; minimal waterproofing complexity on the north crown while keeping future pool/track upgrades modular.',
    includedZones: [
      'South 3-Bay Fitness Pavilion (Gym, Pilates, Group Classes)',
      'Wrap-Around Bali Café & Espresso Bar (North Stepped Wings)',
      'The Atelier Luxury Salon (Northwest Glass Pavilion)',
      'Contrast Recovery Suite + East Promenade & Curved Balcony',
      'Full Dark-Teak Louver & Living Wall Mechanical Core Screening',
    ],
    excludedOrDeferred: [
      'Semicircular North Infinity Pool (deferred to Phase 2 or replaced by sunken lounge)',
      '2-Lane Terracotta EPDM Perimeter Running Track (replaced by stone perimeter walkway)',
    ],
  },
  full: {
    id: 'full',
    badge: 'OPTION B // FLAGSHIP VISION (RENDERED)',
    title: 'Full Sanctuary + Infinity Pool & Sky Track',
    subtitle:
      'The complete visual vision rendered across this pitch — adding the signature semicircular North Infinity Pool and continuous 2-lane terracotta EPDM Sky Running Track for category-defining positioning.',
    totalCapex: 'TBD (Target Envelope ~₹5–6 Cr)',
    timelineEstimate: 'TBD (Indicative 7–9 Months)',
    revenuePillars: 'Flagship Club Tier · Pool Lounge · Track Events · Salon · Café',
    structuralNote:
      'Requires formal structural load certification for the north pool basin and rooftop waterproofing membrane prior to civil works.',
    includedZones: [
      'All Base Sanctuary Zones (3-Bay Fitness, Café, Salon, Recovery, East Balcony)',
      'Semicircular North Infinity Pool with Vanishing Edge & Filtration Plant',
      'Continuous 2-Lane Cushioned Terracotta EPDM Perimeter Sky Running Track',
      'Frameless Perimeter Glass Safety Balustrades & Warm Architectural Bollards',
      'Full Mechanical Core Screening with Living Tropical Green Walls',
    ],
    excludedOrDeferred: [
      'Central-Left Mechanical Core remains strictly non-usable & serviceable',
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
    category: 'Structural Audit, Waterproofing & Civil Base',
    scopeDetail: 'Slab load study, multi-layer terrace waterproofing, drainage slopes & travertine/teak deck substrates',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Pending Quote',
  },
  {
    id: 'south-pavilion',
    code: '02',
    category: 'South 3-Bay Glass & Teak Fitness Pavilion',
    scopeDetail: 'Charcoal steel portals, sliding acoustic glazing, louvered eaves, skylight roof & MEP fit-out',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'fitness-equipment',
    code: '03',
    category: 'Gym, Reformer Pilates & Group Studio Equipment',
    scopeDetail: 'Matte-black strength racks, free weights, wooden Pilates reformers, timber & rubber flooring',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'sky-track',
    code: '04',
    category: 'Perimeter 2-Lane EPDM Sky Running Track',
    scopeDetail: 'Cushioned terracotta EPDM surface, lane striping, glass perimeter balustrades & bronze bollards',
    baseCost: 'Not Included',
    fullCost: 'TBD',
    variance: '+ Option B Delta',
    highlightInFull: true,
  },
  {
    id: 'infinity-pool',
    code: '05',
    category: 'Semicircular North Infinity Pool & Filtration',
    scopeDetail: 'Structural pool shell, vanishing-edge catch channel, Bali stone tiling, pump room & underwater LEDs',
    baseCost: 'Not Included',
    fullCost: 'TBD',
    variance: '+ Option B Delta',
    highlightInFull: true,
  },
  {
    id: 'cafe-kitchen',
    code: '06',
    category: 'Wrap-Around Bali Café & Commercial Kitchen',
    scopeDetail: 'Slatted teak pergolas on both north wings, travertine espresso counters, rattan lighting & kitchen equipment',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'salon-recovery',
    code: '07',
    category: 'Luxury Atelier Salon & Contrast Recovery Suite',
    scopeDetail: 'Northwest glass salon, backlit arched mirrors, styling/wash stations, sauna & cold plunge suite',
    baseCost: 'TBD',
    fullCost: 'TBD',
    variance: 'Equal Scope',
  },
  {
    id: 'mep-landscape',
    code: '08',
    category: 'Mechanical Screening, Landscape & 2700K Lighting',
    scopeDetail: 'Tall dark-teak louver enclosure around utility core, vertical tropical living walls, palms & architectural lighting',
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
    title: 'Captive + Destination Demand',
    metric: '100+ Office Pros · 400–500 Club Cap',
    detail:
      'In-building professionals provide baseline weekday traffic while the flagship Bali aesthetic attracts high-LTV destination members.',
  },
  {
    step: '02',
    title: 'South Fitness & Track',
    metric: 'Recurring Core Membership',
    detail:
      'Three acoustically isolated studios (Strength, Reformer Pilates, Group Classes) + sky track anchor daily morning and evening visits.',
  },
  {
    step: '03',
    title: 'Recovery & Canopy Café',
    metric: 'Daily Ancillary Spend',
    detail:
      'Members transition via the palm-lined East Promenade through contrast therapy straight into post-workout espresso, bowls, and social meetings.',
  },
  {
    step: '04',
    title: 'The Atelier Salon',
    metric: 'High-Margin Grooming Yield',
    detail:
      'Converts fitness regulars and corporate tenants into recurring luxury grooming and spa clientele under a single unified membership.',
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
    title: 'Site Survey & Structural Load Audit',
    deliverables:
      'Exact laser measurements of all rooftop zones, structural engineer certification for north pool load & parapet anchor points.',
    status: 'NEXT STEP',
  },
  {
    phase: 'PHASE 02',
    title: 'Final CAD, MEP Drawings & Verified BOQ',
    deliverables:
      'Lock Base vs. Full option costs with requester quotes, finalize waterproofing, plumbing tie-ins, and architectural lighting schedules.',
    status: 'UPCOMING',
  },
  {
    phase: 'PHASE 03',
    title: 'Turnkey Modern-Bali Build & Pre-Sale Launch',
    deliverables:
      'Phased fabrication of steel/teak pavilions, mechanical core screening, equipment installation, and founding-member preview.',
    status: 'TARGET LAUNCH',
  },
];
