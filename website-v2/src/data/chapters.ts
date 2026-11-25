import { SPATIAL_ZONES, type SpatialZone } from './zones';

export type ChapterTheme = 'dark';

export interface Chapter {
  id: string;
  code: string;
  label: string;
  kicker: string;
  theme: ChapterTheme;
  zones: string[];
}

const ACTIVE = SPATIAL_ZONES.filter((z) => !z.isExcluded).map((z) => z.id);

export const CHAPTERS: Chapter[] = [
  { id: 'arrival', code: '00', label: 'Arrival', kicker: 'A living sanctuary', theme: 'dark', zones: ACTIVE },
  { id: 'site', code: '01', label: 'The Site', kicker: 'As found → reimagined', theme: 'dark', zones: ACTIVE },
  { id: 'plan', code: '02', label: 'The Plan', kicker: 'Walk all ten zones', theme: 'dark', zones: ACTIVE },
  { id: 'cutaway', code: '03', label: 'The Cutaway', kicker: 'One floorplate', theme: 'dark', zones: ACTIVE },
  { id: 'maquette', code: '04', label: '3D Maquette', kicker: 'Interactive spatial orbit', theme: 'dark', zones: ACTIVE },
  { id: 'sweat', code: '05', label: 'Sweat', kicker: 'South slab & sky track', theme: 'dark', zones: ['track', 'group-class', 'pilates', 'gym'] },
  { id: 'bridge', code: '06', label: 'The Bridge', kicker: 'East spine & screened core', theme: 'dark', zones: ['recovery', 'promenade', 'mep'] },
  { id: 'crown', code: '07', label: 'The Crown', kicker: 'Pool · café · salon', theme: 'dark', zones: ['pool', 'cafe', 'salon'] },
  { id: 'ritual', code: '08', label: 'A Day', kicker: 'Dawn to dusk', theme: 'dark', zones: ACTIVE },
  { id: 'case', code: '09', label: 'The Case', kicker: 'Options · BOQ · roadmap', theme: 'dark', zones: ACTIVE },
  { id: 'close', code: '10', label: 'Close', kicker: 'Next steps', theme: 'dark', zones: ACTIVE },
];

export const CHAPTER_MAP: Record<string, Chapter> = Object.fromEntries(CHAPTERS.map((c) => [c.id, c]));

export const ZONE: Record<string, SpatialZone> = Object.fromEntries(SPATIAL_ZONES.map((z) => [z.id, z]));

export const ZONE_CHAPTER: Record<string, string> = {
  pool: 'crown',
  cafe: 'crown',
  salon: 'crown',
  recovery: 'bridge',
  promenade: 'bridge',
  mep: 'bridge',
  track: 'sweat',
  'group-class': 'sweat',
  pilates: 'sweat',
  gym: 'sweat',
};

/** Lit colour per zone on the dark silhouette mini-map. */
export const ZONE_TINT: Record<string, string> = {
  pool: '#3E8E94',
  track: '#C86849',
  recovery: '#78A889',
  promenade: '#78A889',
  cafe: '#C8A264',
  salon: '#C8A264',
  'group-class': '#C8A264',
  pilates: '#C8A264',
  gym: '#C8A264',
  mep: '#6B655C',
};
