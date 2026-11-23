export type ChapterId =
  | 'vision'
  | 'masterplan'
  | 'south-fitness'
  | 'east-corridor'
  | 'north-deck'
  | 'investment';

export type ZoneSector = 'north' | 'east' | 'core' | 'south';

export interface ChapterMeta {
  id: ChapterId;
  code: string;
  label: string;
  shortLabel: string;
  theme: 'light' | 'dark' | 'sand';
  activeZoneIds: string[];
  elevationNote: string;
}

export interface SpatialZone {
  id: string;
  pinLabel: string;
  mapCode: string;
  name: string;
  wing: string;
  sector: ZoneSector;
  chapterId: ChapterId;
  accent: string;
  roleTag: string;
  summary: string;
  highlights: string[];
  materials: string[];
  /** Percentage coordinates on /renders/isometric-approved.png (16:9) */
  isoCoords: { x: number; y: number };
  /** Percentage coordinates on /renders/masterplan-approved.png (9:16) */
  planCoords: { x: number; y: number };
  isExcluded?: boolean;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'vision',
    code: '00',
    label: 'Vision',
    shortLabel: '00 VISION',
    theme: 'light',
    activeZoneIds: [
      'pool',
      'cafe',
      'salon',
      'recovery',
      'promenade',
      'track',
      'group-class',
      'pilates',
      'gym',
    ],
    elevationNote: 'ROOFTOP OVERVIEW // ~20,000+ SQ. FT.',
  },
  {
    id: 'masterplan',
    code: '01',
    label: 'Masterplan',
    shortLabel: '01 MASTERPLAN',
    theme: 'light',
    activeZoneIds: [
      'pool',
      'cafe',
      'salon',
      'recovery',
      'promenade',
      'track',
      'group-class',
      'pilates',
      'gym',
    ],
    elevationNote: 'ALL 08 ACTIVE ZONES + SCREENED CORE',
  },
  {
    id: 'south-fitness',
    code: '02',
    label: 'South Fitness',
    shortLabel: '02 SOUTH FITNESS',
    theme: 'dark',
    activeZoneIds: ['track', 'group-class', 'pilates', 'gym'],
    elevationNote: 'SOUTH SLAB // TRACK · GYM · PILATES · CLASSES',
  },
  {
    id: 'east-corridor',
    code: '03',
    label: 'East Bridge & Core',
    shortLabel: '03 EAST CORRIDOR',
    theme: 'sand',
    activeZoneIds: ['recovery', 'promenade', 'mep'],
    elevationNote: 'EAST PROMENADE · RECOVERY · SCREENED MEP',
  },
  {
    id: 'north-deck',
    code: '04',
    label: 'North Deck',
    shortLabel: '04 NORTH DECK',
    theme: 'light',
    activeZoneIds: ['pool', 'cafe', 'salon'],
    elevationNote: 'NORTH CROWN // INFINITY POOL · CAFÉ · SALON',
  },
  {
    id: 'investment',
    code: '05',
    label: 'Investment',
    shortLabel: '05 INVESTMENT',
    theme: 'light',
    activeZoneIds: [
      'pool',
      'cafe',
      'salon',
      'recovery',
      'promenade',
      'track',
      'group-class',
      'pilates',
      'gym',
    ],
    elevationNote: 'ECOSYSTEM · COST COMPARISON · ROADMAP',
  },
];

export const SPATIAL_ZONES: SpatialZone[] = [
  {
    id: 'pool',
    pinLabel: '01',
    mapCode: 'P',
    name: 'Semicircular Infinity Pool',
    wing: 'North Crown',
    sector: 'north',
    chapterId: 'north-deck',
    accent: '#2F6E73',
    roleTag: 'SIGNATURE ANCHOR',
    summary:
      'A rectangular travertine-coped lap basin flowing seamlessly into the iconic north semicircular dome as a vanishing infinity edge overlooking the dense tree canopy.',
    highlights: [
      'Flush vanishing infinity rim confined strictly within the north semicircle parapet',
      'Submerged travertine entry steps along the southeast basin edge',
      'Minimalist teak sunbeds and lush southern tropical planter edge',
    ],
    materials: ['Honed Travertine Coping', 'Turquoise Bali Stone Tile', 'Teak Sunbeds'],
    isoCoords: { x: 51.5, y: 15.5 },
    planCoords: { x: 51, y: 15.5 },
  },
  {
    id: 'cafe',
    pinLabel: '02',
    mapCode: 'C',
    name: 'Wrap-Around Bali Café',
    wing: 'North Stepped Wings',
    sector: 'north',
    chapterId: 'north-deck',
    accent: '#B8935A',
    roleTag: 'DAILY REVENUE & SOCIAL ANCHOR',
    summary:
      'Symmetrical open-air artisan café decks stepping cleanly along both flanks of the Art Deco white-plaster north parapet, bridging post-workout recovery, salon hospitality, and office lunch traffic.',
    highlights: [
      'Dark-timber slatted pergolas casting warm striped afternoon shadows',
      'Travertine espresso & protein bar counters with glowing woven rattan pendants',
      'Serves gym members, salon guests, and 100+ in-building office professionals daily',
    ],
    materials: ['Slatted Burmese Teak', 'Woven Rattan Pendants', 'Travertine Bar Counters'],
    isoCoords: { x: 66.5, y: 18 },
    planCoords: { x: 72.5, y: 21.5 },
  },
  {
    id: 'salon',
    pinLabel: '03',
    mapCode: 'S',
    name: 'The Atelier Luxury Salon',
    wing: 'Northwest Wing',
    sector: 'north',
    chapterId: 'north-deck',
    accent: '#B8935A',
    roleTag: 'HIGH-MARGIN GROOMING',
    summary:
      'An enclosed glass-and-teak boutique grooming pavilion tucked into the quiet northwest corner, delivering serene Bali spa acoustics and high-ticket beauty and grooming rituals.',
    highlights: [
      'Floor-to-ceiling frameless glass entrance with overhead architectural skylighting',
      'Sculpted warm-backlit arched mirrors and travertine styling counters',
      'Acoustically isolated from fitness activity while steps from the café terrace',
    ],
    materials: ['Fluted Teak', 'Brushed Brass Arches', 'Honed Limestone'],
    isoCoords: { x: 35, y: 25.5 },
    planCoords: { x: 27, y: 35.5 },
  },
  {
    id: 'recovery',
    pinLabel: '04',
    mapCode: 'R',
    name: 'Contrast Recovery Suite',
    wing: 'Northeast Corridor',
    sector: 'east',
    chapterId: 'east-corridor',
    accent: '#2F4838',
    roleTag: 'WELLNESS RETENTION',
    summary:
      'A serene timber-slatted contrast therapy sanctuary housing dry sauna and cold plunge suites at the threshold where the active east promenade opens onto the tranquil north pool deck.',
    highlights: [
      'Private warm cedar-and-teak sauna & chilled stone plunge bay',
      'Positioned intentionally between the South Fitness Block and North Pool',
      'Elevates membership retention and tier pricing beyond commodity gyms',
    ],
    materials: ['Vertical Teak Slats', 'Volcanic Basalt Plunge', 'Warm 2700K Cove Lighting'],
    isoCoords: { x: 67.5, y: 27.5 },
    planCoords: { x: 74, y: 35.5 },
  },
  {
    id: 'promenade',
    pinLabel: '05',
    mapCode: 'EAST',
    name: 'East Promenade & Curved Balcony',
    wing: 'East Spine',
    sector: 'east',
    chapterId: 'east-corridor',
    accent: '#2F4838',
    roleTag: 'ARCHITECTURAL BRIDGE',
    summary:
      'A palm-lined teak-and-stepping-stone boardwalk connecting the South Fitness slab to the North Terrace, opening onto the building’s iconic curved semicircular eastern balcony.',
    highlights: [
      'Transforms circulation into an atmospheric tropical garden walk',
      'Preserves and celebrates the real semicircular eastern balcony as an outdoor lounge',
      'Creates natural acoustic and visual decompression between Sweat and Sanctuary',
    ],
    materials: ['Stepping Limestone', 'Teak Boardwalk', 'Tropical Palms & Monstera'],
    isoCoords: { x: 75, y: 44 },
    planCoords: { x: 80.5, y: 50.5 },
  },
  {
    id: 'track',
    pinLabel: '06',
    mapCode: 'TRACK',
    name: 'Perimeter Sky Running Track',
    wing: 'South Outer Loop',
    sector: 'south',
    chapterId: 'south-fitness',
    accent: '#B5583B',
    roleTag: 'SIGNATURE DIFFERENTIATOR',
    summary:
      'A continuous two-lane cushioned terracotta EPDM running track looping completely around the South Rectangular Slab, bordered by frameless glass safety balustrades overlooking treetops.',
    highlights: [
      'Two-lane terracotta EPDM shock-absorbent surface with crisp white lane striping',
      'Frameless glass perimeter balustrades preserve unbroken treetop sightlines',
      'Low warm architectural bollards enable safe golden-hour and evening sessions',
    ],
    materials: ['Terracotta EPDM', 'Frameless Laminated Glass', 'Warm Bronze Bollards'],
    isoCoords: { x: 83.5, y: 78.5 },
    planCoords: { x: 86, y: 73.5 },
  },
  {
    id: 'group-class',
    pinLabel: '07',
    mapCode: 'G.CLASS',
    name: 'Group Classes Studio',
    wing: 'South Pavilion · West Bay',
    sector: 'south',
    chapterId: 'south-fitness',
    accent: '#B8935A',
    roleTag: 'COMMUNITY MOVEMENT',
    summary:
      'The sunlit western bay of the south glass-and-teak pavilion, engineered with warm acoustic timber flooring for yoga, mobility, breathwork, and high-energy group programming.',
    highlights: [
      'Open unobstructed hardwood floorplan with natural overhead skylighting',
      'Sliding glass walls open toward the perimeter track for indoor-outdoor flow',
      'Acoustically partitioned from heavy strength equipment in the east bay',
    ],
    materials: ['Engineered Teak Flooring', 'Charcoal Steel Frame', 'Acoustic Glazing'],
    isoCoords: { x: 33, y: 70 },
    planCoords: { x: 31, y: 82.5 },
  },
  {
    id: 'pilates',
    pinLabel: '08',
    mapCode: 'PILATES',
    name: 'Reformer Pilates Studio',
    wing: 'South Pavilion · Center Bay',
    sector: 'south',
    chapterId: 'south-fitness',
    accent: '#B8935A',
    roleTag: 'BOUTIQUE HIGH-YIELD STUDIO',
    summary:
      'A tranquil, daylight-washed center bay outfitted with neat rows of handcrafted wooden reformer machines under a translucent skylight roof.',
    highlights: [
      'Dedicated boutique studio commanding high recurring package revenue',
      'Natural zenithal daylight balanced with louvered timber sun-shading',
      'Direct visual connection across glass partitions while retaining acoustic calm',
    ],
    materials: ['Oak Reformers', 'Translucent Skylight', 'Warm Plaster Walls'],
    isoCoords: { x: 51, y: 70 },
    planCoords: { x: 51, y: 82.5 },
  },
  {
    id: 'gym',
    pinLabel: '09',
    mapCode: 'GYM',
    name: 'Strength & Conditioning Gym',
    wing: 'South Pavilion · East Bay',
    sector: 'south',
    chapterId: 'south-fitness',
    accent: '#161614',
    roleTag: 'CORE MEMBERSHIP ENGINE',
    summary:
      'A moody obsidian-and-teak performance floor outfitted with matte-black power racks, bespoke free weights, high-density charcoal rubber flooring, and warm 2700K architectural linear lighting.',
    highlights: [
      'Supports 400–500 total club members cleanly without peak-hour crowding',
      'Matte-black racks & knurled dumbbells avoid generic neon gym aesthetics',
      'Sliding glass doors open directly onto the terracotta track for hybrid training',
    ],
    materials: ['Charcoal Acoustic Rubber', 'Matte-Black Steel', '2700K Recessed LEDs'],
    isoCoords: { x: 69, y: 70 },
    planCoords: { x: 72, y: 82.5 },
  },
  {
    id: 'mep',
    pinLabel: 'MEP',
    mapCode: 'UTILITY',
    name: 'Screened Mechanical Core',
    wing: 'Central-Left Footprint (Excluded)',
    sector: 'core',
    chapterId: 'east-corridor',
    accent: '#6B655C',
    roleTag: 'EXCLUDED UTILITY ZONE',
    summary:
      'Existing rooftop HVAC chillers and curved mechanical structures remain completely untouched and fully serviceable—screened cleanly around all four sides by tall dark-teak vertical louvers and living tropical green walls.',
    highlights: [
      'Zero guest amenities placed inside the existing utility footprint',
      'Preserves full building MEP access and avoids costly chiller relocation',
      'Vertical living walls + dark-teak slats turn an eyesore into a lush backdrop',
    ],
    materials: ['Dark-Teak Louver Screens', 'Hydroponic Tropical Living Wall', 'Service Access Gate'],
    isoCoords: { x: 42, y: 40 },
    planCoords: { x: 39, y: 55 },
    isExcluded: true,
  },
];

export interface FitnessModule {
  id: string;
  index: string;
  zoneId: string;
  code: string;
  title: string;
  bayPosition: string;
  accent: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const SOUTH_FITNESS_MODULES: FitnessModule[] = [
  {
    id: 'track',
    index: '01',
    zoneId: 'track',
    code: 'PERIMETER LOOP',
    title: 'Terracotta Sky Running Track',
    bayPosition: 'Outer South Perimeter',
    accent: '#B5583B',
    tagline: 'Two cushioned EPDM lanes looping above the urban tree canopy.',
    description:
      'Wraps completely around the South Rectangular Slab with crisp white lane markings, frameless glass balustrades, and warm low-level bollard lighting—turning every warm-up, sprint interval, or sunset jog into a signature rooftop moment.',
    specs: [
      { label: 'Surface', value: '2-Lane Cushioned EPDM' },
      { label: 'Perimeter', value: 'Frameless Glass Balustrade' },
      { label: 'Lighting', value: '2700K Bronze Bollards' },
    ],
  },
  {
    id: 'gym',
    index: '02',
    zoneId: 'gym',
    code: 'EAST BAY // RIGHT',
    title: 'Strength & Conditioning Gym',
    bayPosition: 'Right Glass Bay',
    accent: '#B8935A',
    tagline: 'Obsidian stone, matte-black iron, and warm recessed architectural lighting.',
    description:
      'Engineered to avoid harsh commercial gym lighting. Matte-black power racks, calibrated plates, and knurled dumbbells sit over shock-absorbing charcoal rubber flooring, opening via sliding glass doors straight onto the perimeter track.',
    specs: [
      { label: 'Club Capacity', value: '400–500 Active Members' },
      { label: 'Flooring', value: 'High-Density Charcoal Rubber' },
      { label: 'Atmosphere', value: '2700K Linear Architectural LED' },
    ],
  },
  {
    id: 'pilates',
    index: '03',
    zoneId: 'pilates',
    code: 'CENTER BAY',
    title: 'Reformer Pilates Studio',
    bayPosition: 'Center Glass Bay',
    accent: '#B8935A',
    tagline: 'Sunlit natural timber studio dedicated to high-yield small-group sessions.',
    description:
      'Positioned in the center bay beneath a diffused translucent skylight roof, lined with twin rows of handcrafted wooden reformer machines and separated acoustically from heavy barbell drops.',
    specs: [
      { label: 'Format', value: 'Boutique Small-Group Reformer' },
      { label: 'Daylighting', value: 'Translucent Overhead Skylight' },
      { label: 'Acoustic Isolation', value: 'Full-Height Double Glazing' },
    ],
  },
  {
    id: 'group-class',
    index: '04',
    zoneId: 'group-class',
    code: 'WEST BAY // LEFT',
    title: 'Group Classes & Movement',
    bayPosition: 'Left Glass Bay',
    accent: '#B8935A',
    tagline: 'Warm timber open floorplan for yoga, mobility, HIIT, and breathwork.',
    description:
      'An expansive, unobstructed engineered-teak studio bathed in warm golden-hour sunlight, hosting scheduled morning and evening community classes that drive daily footfall into the Café and Recovery Suite.',
    specs: [
      { label: 'Programming', value: 'Yoga · Mobility · Functional' },
      { label: 'Flooring', value: 'Warm Sprung Timber Deck' },
      { label: 'Ventilation', value: 'Sliding Indoor-Outdoor Doors' },
    ],
  },
];
