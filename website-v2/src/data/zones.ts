export type ChapterId =
  | 'vision'
  | 'masterplan'
  | 'south-fitness'
  | 'east-corridor'
  | 'north-deck'
  | 'investment';

export type ZoneSector = 'north' | 'east' | 'core' | 'south';

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

export const SPATIAL_ZONES: SpatialZone[] = [
  {
    id: 'pool',
    pinLabel: '01',
    mapCode: 'P',
    name: 'Semicircular Infinity Pool',
    wing: 'North Crown',
    sector: 'north',
    chapterId: 'north-deck',
    accent: '#3E8E94',
    roleTag: 'SIGNATURE ANCHOR',
    summary: 'Travertine-coped lap basin flowing into a flush vanishing rim inside the north dome.',
    highlights: [
      'Flush vanishing edge confined strictly within the north semicircle',
      'Submerged travertine steps & teak sunbed deck',
    ],
    materials: ['Honed Travertine', 'Bali Stone Tile', 'Burmese Teak'],
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
    accent: '#C8A264',
    roleTag: 'DAILY SOCIAL ENGINE',
    summary: 'Symmetrical open-air teak pergola decks flanking the north crown for espresso and bowls.',
    highlights: [
      'Slatted teak pergolas with warm 2700K rattan pendants',
      'Serves members, salon guests & 100+ in-building professionals',
    ],
    materials: ['Slatted Teak', 'Rattan Pendants', 'Travertine Bar'],
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
    accent: '#C8A264',
    roleTag: 'HIGH-MARGIN GROOMING',
    summary: 'Glass-and-teak northwest pavilion with backlit arched mirrors and serene spa acoustics.',
    highlights: [
      'Skylit glass enclosure with sculpted brass mirror arches',
      'Acoustically isolated yet steps from the café terrace',
    ],
    materials: ['Fluted Teak', 'Brushed Brass', 'Honed Limestone'],
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
    accent: '#78A889',
    roleTag: 'WELLNESS RETENTION',
    summary: 'Timber-slatted cedar sauna and basalt cold plunge at the north pool threshold.',
    highlights: [
      'Dry cedar sauna paired with chilled basalt plunge basin',
      'Bridges the South Fitness slab and North Pool deck',
    ],
    materials: ['Cedar & Teak Slats', 'Volcanic Basalt', '2700K Cove LED'],
    isoCoords: { x: 67.5, y: 27.5 },
    planCoords: { x: 74, y: 35.5 },
  },
  {
    id: 'promenade',
    pinLabel: '05',
    mapCode: 'EAST',
    name: 'East Promenade & Balcony',
    wing: 'East Spine',
    sector: 'east',
    chapterId: 'east-corridor',
    accent: '#78A889',
    roleTag: 'ARCHITECTURAL BRIDGE',
    summary: 'Palm-lined stepping-stone boardwalk opening onto the single curved eastern balcony lounge.',
    highlights: [
      'Celebrates the building’s true single curved eastern balcony',
      'Sensory decompression walk between Sweat and Sanctuary',
    ],
    materials: ['Stepping Limestone', 'Teak Boardwalk', 'Tropical Palms'],
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
    accent: '#C86849',
    roleTag: 'SIGNATURE DIFFERENTIATOR',
    summary: 'Continuous 2-lane cushioned terracotta EPDM track looping the entire south pavilion.',
    highlights: [
      'Shock-absorbent terracotta EPDM with crisp lane markings',
      'Frameless glass balustrades & 2700K bronze bollards',
    ],
    materials: ['Terracotta EPDM', 'Frameless Glass', 'Bronze Bollards'],
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
    accent: '#C8A264',
    roleTag: 'COMMUNITY MOVEMENT',
    summary: 'Sunlit western glass bay with sprung timber flooring for yoga, mobility, and breathwork.',
    highlights: [
      'Unobstructed sprung hardwood deck with zenithal skylight',
      'Sliding glass doors open directly onto the sky track',
    ],
    materials: ['Sprung Teak Deck', 'Charcoal Steel', 'Acoustic Glass'],
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
    accent: '#C8A264',
    roleTag: 'BOUTIQUE STUDIO',
    summary: 'Daylight-washed center bay housing twin rows of handcrafted oak reformer beds.',
    highlights: [
      'High-yield small-group studio under louvered skylights',
      'Full-height acoustic glazing blocks gym barbell noise',
    ],
    materials: ['Oak Reformers', 'Diffused Skylight', 'Warm Plaster'],
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
    accent: '#C8A264',
    roleTag: 'CORE MEMBERSHIP ENGINE',
    summary: 'Obsidian-and-teak strength floor with matte-black racks and warm 2700K linear lighting.',
    highlights: [
      'Sized for 400–500 members without peak-hour crowding',
      'Direct sliding-glass access to the perimeter running track',
    ],
    materials: ['Charcoal Rubber', 'Matte-Black Steel', '2700K Linear LED'],
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
    accent: '#9E9689',
    roleTag: 'EXCLUDED UTILITY ZONE',
    summary: 'Existing chillers remain untouched—screened by tall dark-teak louvers and living green walls.',
    highlights: [
      'Zero guest amenities inside; zero chiller relocation CapEx',
      'Full MEP maintenance access behind botanical screening',
    ],
    materials: ['Dark-Teak Louvers', 'Living Green Wall', 'Service Gates'],
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
    accent: '#C86849',
    tagline: 'Two cushioned EPDM lanes above the tree canopy.',
    description:
      'Loops the entire South Slab with frameless glass balustrades and low 2700K bronze bollards.',
    specs: [
      { label: 'Surface', value: '2-Lane Terracotta EPDM' },
      { label: 'Edge', value: 'Frameless Safety Glass' },
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
    accent: '#C8A264',
    tagline: 'Obsidian stone, matte-black iron, warm linear light.',
    description:
      'Bespoke power racks and free weights over charcoal acoustic rubber, opening straight onto the track.',
    specs: [
      { label: 'Capacity', value: '400–500 Members' },
      { label: 'Flooring', value: 'Charcoal Acoustic Rubber' },
      { label: 'Lighting', value: '2700K Recessed LED' },
    ],
  },
  {
    id: 'pilates',
    index: '03',
    zoneId: 'pilates',
    code: 'CENTER BAY',
    title: 'Reformer Pilates Studio',
    bayPosition: 'Center Glass Bay',
    accent: '#C8A264',
    tagline: 'Zenithal daylight and handcrafted oak reformers.',
    description:
      'Twin reformer rows beneath a translucent skylight roof, acoustically isolated from the gym floor.',
    specs: [
      { label: 'Format', value: 'Boutique Small-Group' },
      { label: 'Roof', value: 'Louvered Skylight' },
      { label: 'Acoustics', value: 'Double-Glazed Partitions' },
    ],
  },
  {
    id: 'group-class',
    index: '04',
    zoneId: 'group-class',
    code: 'WEST BAY // LEFT',
    title: 'Group Classes & Movement',
    bayPosition: 'Left Glass Bay',
    accent: '#C8A264',
    tagline: 'Sprung Burmese teak floor for yoga, mobility & HIIT.',
    description:
      'Unobstructed golden-hour studio with sliding glass walls that open to the perimeter loop.',
    specs: [
      { label: 'Disciplines', value: 'Yoga · Mobility · HIIT' },
      { label: 'Flooring', value: 'Sprung Teak Hardwood' },
      { label: 'Flow', value: 'Indoor-Outdoor Glazing' },
    ],
  },
];
