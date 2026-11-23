/**
 * True-silhouette site plan geometry, traced in the pixel space of
 * /renders/masterplan-approved.png (768 × 1376). Because the coordinates
 * match the render, these paths can be laid directly over the masterplan
 * image as highlight masks, or drawn on their own as the HUD mini-map.
 *
 * Silhouette features (never a generic rectangle):
 *  - North semicircular crown (pool) sitting on stepped Art Deco terraces
 *  - Single curved projecting east balcony
 *  - Screened mechanical core (excluded) on the central-left footprint
 *  - Wide south slab carrying the 3-bay pavilion + 2-lane running track
 */

export const PLAN_W = 768;
export const PLAN_H = 1376;

const rect = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y}H${x + w}V${y + h}H${x}Z`;

const roundRect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${
    x + w - r
  } ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

export const SILHOUETTE =
  'M272 178 A128 128 0 0 1 528 178 L548 178 L548 238 L588 238 L588 302 L625 302 L625 600 ' +
  'A92 92 0 0 1 625 772 L650 772 L650 940 L698 940 L698 1312 L90 1312 L90 775 L128 775 ' +
  'L128 385 L180 385 L180 305 L215 305 L215 240 L250 240 L250 178 Z';

export const ZONE_PATHS: Record<string, string> = {
  pool: 'M285 178 A115 115 0 0 1 515 178 L515 192 L445 192 L445 400 L472 400 L472 456 L355 456 L355 192 L285 192 Z',
  cafe:
    'M250 178 L300 178 L300 388 L180 388 L180 305 L215 305 L215 240 L250 240 Z ' +
    'M500 178 L548 178 L548 238 L588 238 L588 302 L620 302 L620 392 L516 392 L516 240 L500 240 Z',
  salon: rect(135, 440, 156, 96),
  recovery: rect(510, 436, 115, 104),
  promenade: 'M500 546 L625 546 L625 600 A92 92 0 0 1 625 772 L650 772 L650 942 L540 942 L540 856 L500 856 Z',
  mep: rect(143, 600, 332, 336),
  track: `${roundRect(100, 950, 590, 352, 96)} ${roundRect(146, 996, 498, 260, 58)}`,
  'group-class': rect(158, 1026, 157, 218),
  pilates: rect(318, 1026, 154, 218),
  gym: rect(475, 1026, 155, 218),
};

/** Cross-out for the excluded mechanical core. */
export const MEP_CROSS = 'M160 618 L458 918 M458 618 L160 918';

/** Label anchor per zone (plan pixel space). */
export const ZONE_ANCHORS: Record<string, { x: number; y: number }> = {
  pool: { x: 400, y: 300 },
  cafe: { x: 566, y: 345 },
  salon: { x: 213, y: 488 },
  recovery: { x: 567, y: 488 },
  promenade: { x: 568, y: 700 },
  mep: { x: 309, y: 768 },
  track: { x: 395, y: 973 },
  'group-class': { x: 236, y: 1135 },
  pilates: { x: 395, y: 1135 },
  gym: { x: 552, y: 1135 },
};

export const pct = (p: { x: number; y: number }) => ({
  left: `${(p.x / PLAN_W) * 100}%`,
  top: `${(p.y / PLAN_H) * 100}%`,
});

/** North → south walking order used by the Plan Walk chapter. */
export const WALK_ORDER = [
  'pool',
  'cafe',
  'salon',
  'recovery',
  'promenade',
  'mep',
  'track',
  'group-class',
  'pilates',
  'gym',
];
