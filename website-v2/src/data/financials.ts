/**
 * ============================================================================
 * FINANCIALS, ITEMIZED ESTIMATES (`docs/estimates.xlsx`) & OPTION COMPARISON
 * ============================================================================
 *
 * Single source of truth for Chapter 09 (`CaseSection.tsx`).
 * - `ESTIMATE_SCHEDULES` mirrors `docs/estimates.xlsx` cell-for-cell using raw
 *   INR numbers so subtotals, Equipment vs. Interior splits, and percentages
 *   recalculate automatically as additional rows are added to the sheet.
 */

export type FinancialDataStatus = 'PARTIAL_SHEET_SYNC' | 'CONFIRMED';

export const FINANCIAL_DATA_STATUS: FinancialDataStatus = 'PARTIAL_SHEET_SYNC';

export type EstimateGroup = 'equipment' | 'interior';
export type ScheduleStatus = 'LOGGED' | 'IN_PROGRESS';

export interface EstimateLineItem {
  id: string;
  label: string;
  rawSheetLabel: string;
  group: EstimateGroup;
  qty?: number;
  amountInr: number;
  note?: string;
}

export interface EstimateSchedule {
  id: 'gym' | 'salon' | 'cafe' | 'physio';
  code: string;
  sheetTab: string;
  title: string;
  wing: string;
  mappedZones: string[];
  accent: string;
  status: ScheduleStatus;
  statusLabel: string;
  summary: string;
  pendingItems: string[];
  items: EstimateLineItem[];
}

/** Format INR cleanly in Indian architectural BOQ notation (Cr / L / ₹xx,xxx). */
export function formatInr(amountInr: number): string {
  if (amountInr >= 1_00_00_000) {
    const cr = amountInr / 1_00_00_000;
    return `₹${cr.toFixed(2)} Cr`;
  }
  if (amountInr >= 1_00_000) {
    const lakhs = amountInr / 1_00_000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2).replace(/0$/, '')} L`;
  }
  return `₹${amountInr.toLocaleString('en-IN')}`;
}

export function formatInrExact(amountInr: number): string {
  return `₹${amountInr.toLocaleString('en-IN')}`;
}

export const ESTIMATE_SCHEDULES: EstimateSchedule[] = [
  {
    id: 'gym',
    code: '01',
    sheetTab: 'Gym',
    title: 'Strength & Conditioning Gym',
    wing: 'South Pavilion · East Bay',
    mappedZones: ['gym'],
    accent: '#C8A264',
    status: 'LOGGED',
    statusLabel: '14 ITEMS LOGGED',
    summary:
      'Commercial strength & cardio machine fleet paired with full acoustic flooring, 15-ton HVAC, custom millwork, mirrors, and electrical distribution.',
    pendingItems: [
      'Reformer Pilates oak bed fleet (Center Bay) & Group Studio props',
    ],
    items: [
      {
        id: 'gym-machines',
        label: 'Commercial Gym & Cardio Machine Fleet',
        rawSheetLabel: 'machine',
        group: 'equipment',
        amountInr: 1_70_00_000,
        note: 'Flagship selectorized, plate-loaded & cardio lineup',
      },
      {
        id: 'gym-flooring',
        label: 'Acoustic Gym & Studio Flooring',
        rawSheetLabel: 'flooring',
        group: 'interior',
        amountInr: 20_00_000,
      },
      {
        id: 'gym-ac',
        label: 'Commercial HVAC / Air Conditioning',
        rawSheetLabel: 'Ac',
        group: 'interior',
        amountInr: 15_00_000,
      },
      {
        id: 'gym-woodwork',
        label: 'Custom Teak Woodwork & Millwork',
        rawSheetLabel: 'wood work',
        group: 'interior',
        amountInr: 10_00_000,
      },
      {
        id: 'gym-elec-main',
        label: 'Primary Electrical & Machine Power',
        rawSheetLabel: 'electrical',
        group: 'interior',
        amountInr: 8_00_000,
        note: 'Main feeder & equipment circuits',
      },
      {
        id: 'gym-mirror',
        label: 'Full-Height Architectural Studio Mirrors',
        rawSheetLabel: 'mirror',
        group: 'interior',
        amountInr: 4_00_000,
      },
      {
        id: 'gym-elec-int',
        label: 'Interior Lighting & Secondary Electrical',
        rawSheetLabel: 'interior · electrical',
        group: 'interior',
        amountInr: 4_00_000,
      },
      {
        id: 'gym-lightboard',
        label: 'Architectural Signage & LED Light Boards',
        rawSheetLabel: 'light board',
        group: 'interior',
        amountInr: 3_50_000,
      },
      {
        id: 'gym-blinds',
        label: 'Solar Glazing Blinds & Shading',
        rawSheetLabel: 'blinds',
        group: 'interior',
        amountInr: 3_00_000,
      },
      {
        id: 'gym-painting',
        label: 'Interior Finishes & Textured Painting',
        rawSheetLabel: 'painting',
        group: 'interior',
        amountInr: 3_00_000,
      },
      {
        id: 'gym-music',
        label: 'Zoned Acoustic Sound & Music System',
        rawSheetLabel: 'music',
        group: 'equipment',
        amountInr: 2_50_000,
      },
      {
        id: 'gym-cam-int',
        label: 'Interior Studio CCTV Network',
        rawSheetLabel: 'interior · camera',
        group: 'interior',
        amountInr: 1_50_000,
      },
      {
        id: 'gym-ventilation',
        label: 'Fresh-Air Make-Up & Exhaust Ventilation',
        rawSheetLabel: 'ventilation',
        group: 'interior',
        amountInr: 1_50_000,
      },
      {
        id: 'gym-cam-entry',
        label: 'Access & Entry Security Cameras',
        rawSheetLabel: 'camera',
        group: 'equipment',
        amountInr: 80_000,
      },
    ],
  },
  {
    id: 'salon',
    code: '02',
    sheetTab: 'Salon/SPA',
    title: 'The Atelier Luxury Salon & Spa',
    wing: 'Northwest Glass Wing',
    mappedZones: ['salon'],
    accent: '#D4B075',
    status: 'LOGGED',
    statusLabel: '24 ITEMS LOGGED',
    summary:
      'Complete turnkey grooming & spa schedule — styling chairs, pedi/mani suites, facial beds, L’Oréal & Kérastase opening inventory, and bespoke interior fit-out.',
    pendingItems: ['Exterior glass pavilion shell covered under Rooftop Civil'],
    items: [
      {
        id: 'salon-products',
        label: 'Opening Retail & Backbar Stock (L’Oréal, Kérastase)',
        rawSheetLabel: 'products(loreal,kerastase',
        group: 'equipment',
        amountInr: 8_00_000,
      },
      {
        id: 'salon-woodwork',
        label: 'Fluted Teak Cabinetry & Styling Millwork',
        rawSheetLabel: 'wood work',
        group: 'interior',
        amountInr: 5_00_000,
      },
      {
        id: 'salon-mirror',
        label: 'Backlit Arched Styling Mirrors',
        rawSheetLabel: 'Interior · mirror',
        group: 'interior',
        amountInr: 3_00_000,
      },
      {
        id: 'salon-ac',
        label: 'Dedicated Salon Climate Control (AC)',
        rawSheetLabel: 'AC',
        group: 'interior',
        amountInr: 3_00_000,
      },
      {
        id: 'salon-elec',
        label: 'Electrical & High-Load Styling Circuits',
        rawSheetLabel: 'electrical',
        group: 'interior',
        amountInr: 2_50_000,
      },
      {
        id: 'salon-cutting-chair',
        label: 'Hydraulic Luxury Cutting Chairs',
        rawSheetLabel: 'cutting chair',
        group: 'equipment',
        qty: 5,
        amountInr: 1_00_000,
      },
      {
        id: 'salon-flooring',
        label: 'Honed Stone & Salon Flooring',
        rawSheetLabel: 'flooring',
        group: 'interior',
        amountInr: 1_00_000,
      },
      {
        id: 'salon-paint',
        label: 'Warm Limewash & Interior Painting',
        rawSheetLabel: 'paint',
        group: 'interior',
        amountInr: 1_00_000,
      },
      {
        id: 'salon-pedi',
        label: 'Luxury Pedicure / Manicure Spa Thrones',
        rawSheetLabel: 'pedi/mani chair',
        group: 'equipment',
        qty: 2,
        amountInr: 80_000,
      },
      {
        id: 'salon-hairwash',
        label: 'Ceramic Reclining Hairwash Stations',
        rawSheetLabel: 'hairwash station',
        group: 'equipment',
        qty: 2,
        amountInr: 80_000,
      },
      {
        id: 'salon-facial-bed',
        label: 'Treatment & Facial Spa Beds',
        rawSheetLabel: 'facial bed',
        group: 'equipment',
        qty: 3,
        amountInr: 70_000,
      },
      {
        id: 'salon-trolleys',
        label: 'Rolling Stylist Instrument Trolleys',
        rawSheetLabel: 'trollys',
        group: 'equipment',
        qty: 10,
        amountInr: 60_000,
      },
      {
        id: 'salon-shears',
        label: 'Professional Brushes, Combs & Japanese Shears',
        rawSheetLabel: 'brush,comb,scissors',
        group: 'equipment',
        amountInr: 50_000,
      },
      {
        id: 'salon-camera',
        label: 'Reception & Salon Security Cameras',
        rawSheetLabel: 'camera',
        group: 'interior',
        amountInr: 50_000,
      },
      {
        id: 'salon-lightboard',
        label: 'Atelier Illuminated Signage Board',
        rawSheetLabel: 'light board',
        group: 'interior',
        amountInr: 50_000,
      },
      {
        id: 'salon-clippers',
        label: 'Wahl Cordless Clipper Sets',
        rawSheetLabel: 'wahl clippers',
        group: 'equipment',
        qty: 4,
        amountInr: 45_000,
      },
      {
        id: 'salon-small-chair',
        label: 'Compact Styling & Makeup Stools',
        rawSheetLabel: 'small cutting chair',
        group: 'equipment',
        qty: 3,
        amountInr: 30_000,
      },
      {
        id: 'salon-iron',
        label: 'Ceramic Flat-Iron Styling Tools',
        rawSheetLabel: 'iron machine',
        group: 'equipment',
        qty: 3,
        amountInr: 30_000,
      },
      {
        id: 'salon-curl',
        label: 'Professional Curling Tong Machines',
        rawSheetLabel: 'curl machine',
        group: 'equipment',
        qty: 3,
        amountInr: 30_000,
      },
      {
        id: 'salon-dryer',
        label: 'High-Velocity Salon Blow Dryers',
        rawSheetLabel: 'head dryer',
        group: 'equipment',
        qty: 5,
        amountInr: 30_000,
      },
      {
        id: 'salon-facial-steam',
        label: 'Ozone Facial Steamer Units',
        rawSheetLabel: 'facial steam',
        group: 'equipment',
        qty: 2,
        amountInr: 25_000,
      },
      {
        id: 'salon-head-steam',
        label: 'Botanical Hair Spa Mist Steamer',
        rawSheetLabel: 'head steam',
        group: 'equipment',
        qty: 1,
        amountInr: 20_000,
      },
      {
        id: 'salon-wax',
        label: 'Temperature-Controlled Wax Heaters',
        rawSheetLabel: 'wax heater',
        group: 'equipment',
        qty: 3,
        amountInr: 15_000,
      },
      {
        id: 'salon-small-pedi',
        label: 'Technician Pedi / Mani Stools',
        rawSheetLabel: 'small pedi/mani chair',
        group: 'equipment',
        qty: 2,
        amountInr: 12_000,
      },
    ],
  },
  {
    id: 'cafe',
    code: '03',
    sheetTab: 'Cafe',
    title: 'Wrap-Around Bali Café & Bar',
    wing: 'North Stepped Pergola Wings',
    mappedZones: ['cafe'],
    accent: '#78A889',
    status: 'IN_PROGRESS',
    statusLabel: '9 ITEMS · ENTRY IN PROGRESS',
    summary:
      'Initial cold-line refrigeration, prep appliances, bar millwork, and electrical logged; espresso machine and outdoor pergola seating entries upcoming.',
    pendingItems: [
      'Commercial 2-group espresso machine & grinder',
      'Outdoor Bali lounge seating, bistro tables & 2700K rattan pendants',
      'Stepped teak pergola canopy framing & travertine bar top',
    ],
    items: [
      {
        id: 'cafe-woodwork',
        label: 'Bar Counter & Back-Bar Woodwork',
        rawSheetLabel: 'interior · wood work',
        group: 'interior',
        amountInr: 2_00_000,
      },
      {
        id: 'cafe-elec',
        label: 'Commercial Bar & Kitchen Electrical',
        rawSheetLabel: 'eletrical',
        group: 'interior',
        amountInr: 2_00_000,
      },
      {
        id: 'cafe-chiller',
        label: 'Commercial Under-Counter Chiller',
        rawSheetLabel: 'chiller',
        group: 'equipment',
        amountInr: 1_00_000,
      },
      {
        id: 'cafe-juicer',
        label: 'Cold-Press Commercial Juicer',
        rawSheetLabel: 'juicer',
        group: 'equipment',
        qty: 1,
        amountInr: 40_000,
      },
      {
        id: 'cafe-showcase',
        label: 'Glass Pastry & Bowl Showcase Chiller',
        rawSheetLabel: 'show case chiller',
        group: 'equipment',
        amountInr: 30_000,
      },
      {
        id: 'cafe-freezer',
        label: 'Commercial Deep Freezer',
        rawSheetLabel: 'deep freezer',
        group: 'equipment',
        qty: 1,
        amountInr: 25_000,
      },
      {
        id: 'cafe-microwave',
        label: 'Heavy-Duty Commercial Microwave',
        rawSheetLabel: 'microwave',
        group: 'equipment',
        qty: 1,
        amountInr: 25_000,
      },
      {
        id: 'cafe-utensils',
        label: 'Barista & Kitchen Prep Utensils',
        rawSheetLabel: 'utensils',
        group: 'equipment',
        amountInr: 20_000,
      },
      {
        id: 'cafe-stove',
        label: 'Commercial Induction / Electric Stove',
        rawSheetLabel: 'electric stove',
        group: 'equipment',
        qty: 1,
        amountInr: 15_000,
      },
    ],
  },
  {
    id: 'physio',
    code: '04',
    sheetTab: 'Physio',
    title: 'Physio, Rehab & Recovery Suite',
    wing: 'Northeast Recovery Threshold',
    mappedZones: ['recovery'],
    accent: '#3E8E94',
    status: 'IN_PROGRESS',
    statusLabel: '9 ITEMS · ENTRY IN PROGRESS',
    summary:
      'Core physiotherapy modalities, 4 treatment beds, and clinical interior fit-out logged; contrast sauna and cold plunge plant entries upcoming.',
    pendingItems: [
      'Cedar dry sauna cabin & heater stove',
      'Chilled volcanic-basalt cold plunge chiller unit',
    ],
    items: [
      {
        id: 'physio-machines',
        label: 'Physiotherapy & Electro-Rehab Modalities',
        rawSheetLabel: 'Machines',
        group: 'equipment',
        amountInr: 1_00_000,
      },
      {
        id: 'physio-beds',
        label: 'Clinical Rehab & Myofascial Treatment Beds',
        rawSheetLabel: 'beds',
        group: 'equipment',
        qty: 4,
        amountInr: 1_00_000,
      },
      {
        id: 'physio-elec',
        label: 'Treatment Room Electrical & Lighting',
        rawSheetLabel: 'electrical',
        group: 'interior',
        amountInr: 50_000,
      },
      {
        id: 'physio-paint',
        label: 'Hygienic Matte Wall Finishes & Paint',
        rawSheetLabel: 'paint',
        group: 'interior',
        amountInr: 50_000,
      },
      {
        id: 'physio-lightboard',
        label: 'Signage & Cove Light Board',
        rawSheetLabel: 'light board',
        group: 'interior',
        amountInr: 40_000,
      },
      {
        id: 'physio-woodwork',
        label: 'Storage & Treatment Room Millwork',
        rawSheetLabel: 'wood work',
        group: 'interior',
        amountInr: 30_000,
      },
      {
        id: 'physio-ac',
        label: 'Dedicated Split Air Conditioning',
        rawSheetLabel: 'Ac',
        group: 'interior',
        amountInr: 25_000,
      },
      {
        id: 'physio-mirror',
        label: 'Posture & Gait Assessment Mirror',
        rawSheetLabel: 'mirror',
        group: 'interior',
        amountInr: 20_000,
      },
      {
        id: 'physio-camera',
        label: 'Corridor Security Camera',
        rawSheetLabel: 'camera',
        group: 'interior',
        amountInr: 20_000,
      },
    ],
  },
];

/** Compute schedule-level & global totals automatically from ESTIMATE_SCHEDULES. */
export function getScheduleStats(schedule: EstimateSchedule) {
  let equipmentInr = 0;
  let interiorInr = 0;
  for (const item of schedule.items) {
    if (item.group === 'equipment') equipmentInr += item.amountInr;
    else interiorInr += item.amountInr;
  }
  const totalInr = equipmentInr + interiorInr;
  return {
    equipmentInr,
    interiorInr,
    totalInr,
    itemCount: schedule.items.length,
    equipmentPct: totalInr > 0 ? Math.round((equipmentInr / totalInr) * 100) : 0,
    interiorPct: totalInr > 0 ? Math.round((interiorInr / totalInr) * 100) : 0,
  };
}

export const SHEET_TOTALS = (() => {
  let totalInr = 0;
  let equipmentInr = 0;
  let interiorInr = 0;
  let lineItemCount = 0;
  const byId: Record<string, ReturnType<typeof getScheduleStats>> = {};

  for (const s of ESTIMATE_SCHEDULES) {
    const st = getScheduleStats(s);
    byId[s.id] = st;
    totalInr += st.totalInr;
    equipmentInr += st.equipmentInr;
    interiorInr += st.interiorInr;
    lineItemCount += st.itemCount;
  }

  const envelopeMidpointInr = 5_50_00_000; // ₹5.5 Cr midpoint of ₹5–6 Cr envelope
  const loggedPctOfEnvelope = Math.round((totalInr / envelopeMidpointInr) * 100);

  return {
    totalInr,
    equipmentInr,
    interiorInr,
    lineItemCount,
    loggedPctOfEnvelope,
    remainingEnvelopeRange: '₹2.11–3.11 Cr',
    byId,
  };
})();

export const FINANCIAL_META = {
  targetEnvelope: '₹5–6 Crore',
  loggedToDate: formatInr(SHEET_TOTALS.totalInr),
  loggedExact: formatInrExact(SHEET_TOTALS.totalInr),
  footprint: '~20,000+ sq. ft.',
  activeZones: '08 Active Zones',
  sheetNotice: `SYNCED WITH ESTIMATES.XLSX · ${SHEET_TOTALS.lineItemCount} LINE ITEMS (${formatInr(
    SHEET_TOTALS.totalInr,
  )}) LOGGED · REMAINING CIVIL & ZONE ENTRIES IN PROGRESS`,
  confirmedNotice: 'VERIFIED BOQ SUMMARY // SUBJECT TO FINAL SITE SURVEY',
};

export type ComparisonViewMode = 'side-by-side' | 'base' | 'full';

export interface BuildoutOptionSummary {
  id: 'base' | 'full';
  badge: string;
  title: string;
  subtitle: string;
  totalCapex: string;
  loggedCapex: string;
  timelineEstimate: string;
  revenuePillars: string;
  structuralNote: string;
  includedZones: string[];
  excludedOrDeferred: string[];
}

export const OPTION_SUMMARIES: Record<'base' | 'full', BuildoutOptionSummary> = {
  base: {
    id: 'base',
    badge: 'OPTION A // CORE SANCTUARY',
    title: 'Base Sanctuary Plan',
    subtitle:
      '3-Bay Fitness Pavilion, Bali Café, Atelier Salon, Physio/Recovery & Screened Core — anchored by ₹2.89 Cr already itemized in estimates.xlsx.',
    totalCapex: `${formatInr(SHEET_TOTALS.totalInr)} Logged + Rooftop Civil`,
    loggedCapex: `${formatInrExact(SHEET_TOTALS.totalInr)} across 4 schedules`,
    timelineEstimate: '5–6 Months (Indicative)',
    revenuePillars: 'Gym · Pilates · Salon · Café · Physio',
    structuralNote: 'Minimal slab load; north crown finished as a landscaped Bali sun lounge.',
    includedZones: [
      `Gym Machines, HVAC, Flooring & Interior (${formatInr(SHEET_TOTALS.byId.gym.totalInr)} logged)`,
      `Atelier Salon & L’Oréal/Kérastase Stock (${formatInr(SHEET_TOTALS.byId.salon.totalInr)} logged)`,
      `Bali Café Cold-Line & Millwork (${formatInr(SHEET_TOTALS.byId.cafe.totalInr)} logged + pergola pending)`,
      `Physio / Recovery Suite (${formatInr(SHEET_TOTALS.byId.physio.totalInr)} logged + sauna/plunge pending)`,
      'South 3-Bay Pavilion Shell, Pilates Fleet & Screened Mechanical Core',
    ],
    excludedOrDeferred: [
      'North Semicircular Infinity Pool (deferred to Phase 2)',
      '2-Lane Terracotta EPDM Sky Running Track (stone perimeter walk instead)',
    ],
  },
  full: {
    id: 'full',
    badge: 'OPTION B // FLAGSHIP VISION',
    title: 'Full Sanctuary + Infinity Pool & Sky Track',
    subtitle:
      'Complete rendered vision uniting the ₹2.89 Cr itemized department fit-out with rooftop civil architecture, the North Infinity Pool, and 2-lane Sky Track.',
    totalCapex: '~₹5–6 Cr Target Envelope',
    loggedCapex: `${formatInr(SHEET_TOTALS.totalInr)} Itemized · ${SHEET_TOTALS.remainingEnvelopeRange} Civil & Flagship Headroom`,
    timelineEstimate: '7–9 Months (Indicative)',
    revenuePillars: 'Flagship Club · Pool Deck · Sky Track · Salon · Café',
    structuralNote:
      'Requires structural slab load certification for the north pool basin prior to civil works.',
    includedZones: [
      `All 4 Itemized Department Schedules (${formatInr(SHEET_TOTALS.totalInr)} logged to date)`,
      'Semicircular North Infinity Pool with Flush Vanishing Edge',
      'Continuous 2-Lane Cushioned Terracotta EPDM Sky Running Track',
      'South 3-Bay Steel/Glass Pavilion, Pilates Fleet & Pergola Canopies',
      'Dark-Teak Louver & Living Green Wall Mechanical Core Screening',
    ],
    excludedOrDeferred: [
      'Central-Left Mechanical Core remains untouched & 100% serviceable',
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
  statusTone: 'locked' | 'partial' | 'pending' | 'delta';
  highlightInFull?: boolean;
}

export const COST_COMPARISON_ROWS: CostComparisonRow[] = [
  {
    id: 'gym-schedule',
    code: '01',
    category: 'Strength & Conditioning Gym Fit-Out',
    scopeDetail:
      '₹1.70 Cr commercial machine fleet + ₹20 L flooring, ₹15 L AC, ₹10 L woodwork, ₹12 L electrical, mirrors & sound (14 sheet items)',
    baseCost: formatInr(SHEET_TOTALS.byId.gym.totalInr),
    fullCost: formatInr(SHEET_TOTALS.byId.gym.totalInr),
    variance: 'Logged in Sheet',
    statusTone: 'locked',
  },
  {
    id: 'salon-schedule',
    code: '02',
    category: 'The Atelier Luxury Salon & Spa',
    scopeDetail:
      'Styling/pedi/wash stations, facial beds, ₹8 L L’Oréal & Kérastase stock + ₹16.5 L mirrors, woodwork, AC & electrical (24 sheet items)',
    baseCost: formatInr(SHEET_TOTALS.byId.salon.totalInr),
    fullCost: formatInr(SHEET_TOTALS.byId.salon.totalInr),
    variance: 'Logged in Sheet',
    statusTone: 'locked',
  },
  {
    id: 'cafe-schedule',
    code: '03',
    category: 'Wrap-Around Bali Café & Bar',
    scopeDetail:
      '₹2.55 L chillers, freezer, juicer & prep gear + ₹4.00 L bar woodwork & electrical logged; espresso & pergola seating being added',
    baseCost: `${formatInr(SHEET_TOTALS.byId.cafe.totalInr)} + Pending`,
    fullCost: `${formatInr(SHEET_TOTALS.byId.cafe.totalInr)} + Pending`,
    variance: 'Partial in Sheet',
    statusTone: 'partial',
  },
  {
    id: 'physio-recovery',
    code: '04',
    category: 'Physio, Rehab & Contrast Recovery',
    scopeDetail:
      '₹2.00 L rehab machines & 4 beds + ₹2.35 L room fit-out logged; cedar sauna & basalt cold-plunge units being added',
    baseCost: `${formatInr(SHEET_TOTALS.byId.physio.totalInr)} + Pending`,
    fullCost: `${formatInr(SHEET_TOTALS.byId.physio.totalInr)} + Pending`,
    variance: 'Partial in Sheet',
    statusTone: 'partial',
  },
  {
    id: 'pilates-group',
    code: '05',
    category: 'Reformer Pilates & Group Movement Bays',
    scopeDetail: '8 handcrafted oak Reformer Pilates beds, sprung hardwood deck & studio props',
    baseCost: 'To Be Entered',
    fullCost: 'To Be Entered',
    variance: 'Sheet Pending',
    statusTone: 'pending',
  },
  {
    id: 'rooftop-civil',
    code: '06',
    category: 'Rooftop Civil Pavilions, Waterproofing & MEP Screen',
    scopeDetail:
      '3-bay glass/steel superstructure, terrace waterproofing, East Promenade & dark-teak/living-wall chiller screening',
    baseCost: 'Site Audit Quote',
    fullCost: 'Site Audit Quote',
    variance: 'Civil Package',
    statusTone: 'pending',
  },
  {
    id: 'sky-track',
    code: '07',
    category: 'Perimeter 2-Lane EPDM Sky Running Track',
    scopeDetail: 'Cushioned terracotta EPDM stadium loop, lane markings, glass balustrades & 2700K bollards',
    baseCost: '—',
    fullCost: 'Option B Quote',
    variance: '+ Option B Delta',
    statusTone: 'delta',
    highlightInFull: true,
  },
  {
    id: 'infinity-pool',
    code: '08',
    category: 'Semicircular North Infinity Pool & Filtration',
    scopeDetail: 'Flush vanishing-edge basin inside north crown, Bali stone tile, balancing tank & underwater LEDs',
    baseCost: '—',
    fullCost: 'Option B Quote',
    variance: '+ Option B Delta',
    statusTone: 'delta',
    highlightInFull: true,
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
    title: 'Physio & Bali Café',
    metric: 'Daily Recovery & F&B',
    detail: 'Clinical rehab, contrast recovery, post-workout bowls, and all-day espresso meetings.',
  },
  {
    step: '04',
    title: 'The Atelier Salon',
    metric: 'High-Margin Grooming',
    detail: 'Converts club members and corporate tenants into recurring salon & spa rituals.',
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
    title: 'Complete Sheet Entries & Site Audit',
    deliverables:
      'Finalize remaining Café, Pilates, Sauna/Plunge & Rooftop Civil entries alongside structural pool load certification.',
    status: 'IN PROGRESS',
  },
  {
    phase: 'PHASE 02',
    title: 'Final CAD & Contractor BOQ Lock',
    deliverables: 'Lock Option A vs. Option B turnkey contracts, waterproofing specs, and MEP tie-ins.',
    status: 'UPCOMING',
  },
  {
    phase: 'PHASE 03',
    title: 'Turnkey Build & Founding Pre-Sale',
    deliverables: 'Phased pavilion fabrication, chiller screening, equipment commissioning, and member preview.',
    status: 'LAUNCH',
  },
];
