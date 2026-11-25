import {
  Compass,
  Eye,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  Sun,
  Sunset,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PLAN_H, PLAN_W, ZONE_ANCHORS } from '../data/siteplan';
import { SPATIAL_ZONES, type SpatialZone } from '../data/zones';

export type LightingMode = 'twilight' | 'golden';
export type CameraPresetId = 'signature' | 'north' | 'east' | 'south' | 'eye' | 'top';

interface OrbitMaquetteProps {
  selected: SpatialZone;
  onSelectZone: (zone: SpatialZone) => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  focusTrigger?: number;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Face3D {
  pts: Vec3[];
  fill: string;
  stroke?: string;
  alpha?: number;
  zoneId?: string;
  isRoof?: boolean;
  emissive?: number;
  layer: number;
  cullBackface?: boolean;
}

interface Line3D {
  a: Vec3;
  b: Vec3;
  color: string;
  width?: number;
  zoneId?: string;
  isRoof?: boolean;
  animatedWater?: boolean;
}

interface CameraState {
  yaw: number;
  pitch: number;
  zoom: number;
  tx: number;
  ty: number;
  tz: number;
}

const CX = 394;
const CY = 705;

const toWorld = (px: number, py: number, pz = 0): Vec3 => ({
  x: px - CX,
  y: py - CY,
  z: pz,
});

export const CAMERA_PRESETS: Record<CameraPresetId, { label: string; cam: CameraState }> = {
  signature: {
    label: 'Signature 3/4',
    cam: { yaw: -0.95, pitch: 0.57, zoom: 0.99, tx: 6, ty: 18, tz: 6 },
  },
  north: {
    label: 'North Crown',
    cam: { yaw: -0.62, pitch: 0.52, zoom: 1.72, tx: 0, ty: -395, tz: 18 },
  },
  east: {
    label: 'East Spine',
    cam: { yaw: -1.24, pitch: 0.54, zoom: 1.62, tx: 145, ty: -25, tz: 20 },
  },
  south: {
    label: 'South Arena',
    cam: { yaw: -0.58, pitch: 0.52, zoom: 1.56, tx: 0, ty: 415, tz: 22 },
  },
  eye: {
    label: 'Low Elevation',
    cam: { yaw: -0.88, pitch: 0.31, zoom: 1.24, tx: 18, ty: 15, tz: 18 },
  },
  top: {
    label: 'Top Blueprint',
    cam: { yaw: -1.5708, pitch: 1.5, zoom: 1.02, tx: 0, ty: 10, tz: 0 },
  },
};

const ZONE_ELEVATION: Record<string, number> = {
  pool: 26,
  cafe: 68,
  salon: 70,
  recovery: 64,
  promenade: 36,
  mep: 86,
  track: 26,
  'group-class': 78,
  pilates: 78,
  gym: 78,
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function computeNormal(pts: Vec3[]): Vec3 {
  if (pts.length < 3) return { x: 0, y: 0, z: 1 };
  const u = {
    x: pts[1].x - pts[0].x,
    y: pts[1].y - pts[0].y,
    z: pts[1].z - pts[0].z,
  };
  const v = {
    x: pts[2].x - pts[0].x,
    y: pts[2].y - pts[0].y,
    z: pts[2].z - pts[0].z,
  };
  const nx = u.y * v.z - u.z * v.y;
  const ny = u.z * v.x - u.x * v.z;
  const nz = u.x * v.y - u.y * v.x;
  const len = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / len, y: ny / len, z: nz / len };
}

function shadeColor(
  hex: string,
  normal: Vec3,
  mode: LightingMode,
  emissive = 0,
  highlighted = false,
): string {
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) return hex;
  const [r, g, b] = hexToRgb(hex);
  const sun: Vec3 =
    mode === 'golden'
      ? { x: -0.55, y: -0.36, z: 0.75 }
      : { x: -0.32, y: 0.44, z: 0.84 };
  const dot = Math.max(0, normal.x * sun.x + normal.y * sun.y + normal.z * sun.z);
  const rim = Math.max(0, -normal.x * 0.4 + normal.y * 0.5 + normal.z * 0.2) * 0.12;
  const ambient = mode === 'golden' ? 0.56 : 0.36;
  const diffuse = mode === 'golden' ? 0.48 : 0.38;
  const glow = emissive * (mode === 'twilight' ? 0.62 : 0.22);
  const light = Math.min(1.32, ambient + dot * diffuse + rim + glow);

  let nr = Math.round(r * light);
  let ng = Math.round(g * light);
  let nb = Math.round(b * light);

  if (mode === 'golden') {
    nr = Math.min(255, Math.round(nr * 1.05 + 7));
    ng = Math.min(255, Math.round(ng * 1.01 + 2));
  } else if (emissive > 0.22) {
    nr = Math.min(255, Math.round(nr + 46 * emissive));
    ng = Math.min(255, Math.round(ng + 29 * emissive));
    nb = Math.min(255, Math.round(nb + 9 * emissive));
  }

  if (highlighted) {
    nr = Math.min(255, Math.round(nr * 0.74 + 208 * 0.32));
    ng = Math.min(255, Math.round(ng * 0.74 + 168 * 0.32));
    nb = Math.min(255, Math.round(nb * 0.74 + 104 * 0.32));
  }

  return `rgb(${Math.max(0, Math.min(255, nr))},${Math.max(0, Math.min(255, ng))},${Math.max(0, Math.min(255, nb))})`;
}

/** True building silhouette in plan pixel space (768 x 1376). */
function buildSilhouettePolygon(): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 22; i++) {
    const a = Math.PI + (i / 22) * Math.PI;
    pts.push([400 + Math.cos(a) * 128, 178 + Math.sin(a) * 128]);
  }
  pts.push([548, 178], [548, 238], [588, 238], [588, 302], [625, 302], [625, 600]);
  for (let i = 1; i <= 16; i++) {
    const a = -Math.PI / 2 + (i / 16) * Math.PI;
    pts.push([625 + Math.cos(a) * 86, 686 + Math.sin(a) * 86]);
  }
  pts.push(
    [650, 772],
    [650, 940],
    [698, 940],
    [698, 1312],
    [90, 1312],
    [90, 775],
    [128, 775],
    [128, 385],
    [180, 385],
    [180, 305],
    [215, 305],
    [215, 240],
    [250, 240],
    [250, 178],
  );
  return pts;
}

/** Add ambient ground contact shadow footprint. */
function addShadowPad(faces: Face3D[], x: number, y: number, w: number, h: number, z = 1.05, pad = 6) {
  faces.push({
    pts: [
      toWorld(x - pad + 4, y - pad + 5, z),
      toWorld(x + w + pad + 4, y - pad + 5, z),
      toWorld(x + w + pad + 4, y + h + pad + 5, z),
      toWorld(x - pad + 4, y + h + pad + 5, z),
    ],
    fill: '#080706',
    alpha: 0.38,
    layer: 1.06,
  });
}

/** Add an extruded 3D box with outward-pointing normals for accurate lighting & optional backface culling. */
function addBox(
  faces: Face3D[],
  x: number,
  y: number,
  w: number,
  h: number,
  z0: number,
  z1: number,
  opts: {
    topColor: string;
    sideColor?: string;
    stroke?: string;
    alpha?: number;
    zoneId?: string;
    isRoof?: boolean;
    emissive?: number;
    layer?: number;
    skipTop?: boolean;
    shadowAt?: number;
  },
) {
  if (opts.shadowAt !== undefined) {
    addShadowPad(faces, x, y, w, h, opts.shadowAt, 5);
  }
  const side = opts.sideColor ?? opts.topColor;
  const p00 = toWorld(x, y, z0);
  const p10 = toWorld(x + w, y, z0);
  const p11 = toWorld(x + w, y + h, z0);
  const p01 = toWorld(x, y + h, z0);

  const q00 = toWorld(x, y, z1);
  const q10 = toWorld(x + w, y, z1);
  const q11 = toWorld(x + w, y + h, z1);
  const q01 = toWorld(x, y + h, z1);

  const isTranslucent = (opts.alpha ?? 1) < 0.95;
  const common = {
    stroke: opts.stroke,
    alpha: opts.alpha,
    zoneId: opts.zoneId,
    isRoof: opts.isRoof,
    emissive: opts.emissive,
    layer: opts.layer ?? 2,
    cullBackface: !isTranslucent && !opts.isRoof,
  };

  // Outward-facing clockwise screen winding (+X right, +Y down) & right-handed outward normals:
  faces.push(
    { pts: [q10, q00, p00, p10], fill: side, ...common }, // North (-Y)
    { pts: [q11, q10, p10, p11], fill: side, ...common }, // East  (+X)
    { pts: [q01, q11, p11, p01], fill: side, ...common }, // South (+Y)
    { pts: [q00, q01, p01, p00], fill: side, ...common }, // West  (-X)
  );

  if (!opts.skipTop) {
    faces.push({
      pts: [q00, q10, q11, q01],
      fill: opts.topColor,
      ...common,
    });
  }
}

/** Add a true extruded 3D cylinder (cooling towers, bollards, bistro tables, palm trunks). */
function addCylinder(
  faces: Face3D[],
  cx: number,
  cy: number,
  r: number,
  z0: number,
  z1: number,
  segs: number,
  opts: {
    topColor: string;
    sideColor?: string;
    stroke?: string;
    zoneId?: string;
    emissive?: number;
    layer?: number;
  },
) {
  const side = opts.sideColor ?? opts.topColor;
  const topPts: Vec3[] = [];
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const x0 = cx + Math.cos(a0) * r;
    const y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    topPts.push(toWorld(x0, y0, z1));

    faces.push({
      pts: [
        toWorld(x1, y1, z1),
        toWorld(x0, y0, z1),
        toWorld(x0, y0, z0),
        toWorld(x1, y1, z0),
      ],
      fill: side,
      stroke: opts.stroke,
      zoneId: opts.zoneId,
      emissive: opts.emissive,
      layer: opts.layer ?? 2,
      cullBackface: true,
    });
  }
  faces.push({
    pts: topPts,
    fill: opts.topColor,
    stroke: opts.stroke,
    zoneId: opts.zoneId,
    emissive: opts.emissive,
    layer: opts.layer ?? 2,
    cullBackface: true,
  });
}

/** Add a sculpted 3D Balinese tropical palm with planter, trunk, and layered frond crown. */
function addPalmTree(faces: Face3D[], cx: number, cy: number, baseZ: number, height: number, zoneId: string) {
  // Basalt stone planter box
  addBox(faces, cx - 9, cy - 9, 18, 18, baseZ, baseZ + 8, {
    topColor: '#3A4A3E',
    sideColor: '#2B2823',
    stroke: 'rgba(200,162,100,0.3)',
    zoneId,
    shadowAt: baseZ,
  });
  // Slender tapered palm trunk
  addCylinder(faces, cx, cy, 3.2, baseZ + 8, baseZ + height - 10, 8, {
    topColor: '#6E5338',
    sideColor: '#5B432C',
    zoneId,
  });
  // Layered botanical canopy tiers
  addCylinder(faces, cx, cy, 16, baseZ + height - 14, baseZ + height - 6, 10, {
    topColor: '#3F6B4E',
    sideColor: '#2F4838',
    stroke: 'rgba(120,168,137,0.35)',
    zoneId,
  });
  addCylinder(faces, cx, cy, 11, baseZ + height - 6, baseZ + height + 2, 10, {
    topColor: '#5C8F6D',
    sideColor: '#3B5E47',
    stroke: 'rgba(120,168,137,0.45)',
    zoneId,
  });
}

function sampleRoundRect(x: number, y: number, w: number, h: number, r: number, segs = 8): [number, number][] {
  const pts: [number, number][] = [];
  const corners = [
    { cx: x + w - r, cy: y + r, a0: -Math.PI / 2, a1: 0 },
    { cx: x + w - r, cy: y + h - r, a0: 0, a1: Math.PI / 2 },
    { cx: x + r, cy: y + h - r, a0: Math.PI / 2, a1: Math.PI },
    { cx: x + r, cy: y + r, a0: Math.PI, a1: (3 * Math.PI) / 2 },
  ];
  for (const c of corners) {
    for (let i = 0; i <= segs; i++) {
      const a = c.a0 + (i / segs) * (c.a1 - c.a0);
      pts.push([c.cx + Math.cos(a) * r, c.cy + Math.sin(a) * r]);
    }
  }
  return pts;
}

function buildDetailedMaquetteScene(): { faces: Face3D[]; lines: Line3D[] } {
  const faces: Face3D[] = [];
  const lines: Line3D[] = [];
  const silPts = buildSilhouettePolygon();

  // ===========================================================================
  // 0. ARCHITECTURAL SUB-ROOF BUILDING PODIUM (z = -82 to z = 0)
  // ===========================================================================
  const podiumBase = -82;
  for (let i = 0; i < silPts.length; i++) {
    const [x0, y0] = silPts[i];
    const [x1, y1] = silPts[(i + 1) % silPts.length];

    // Lower solid limestone massing (-82 to -52)
    faces.push({
      pts: [
        toWorld(x1, y1, podiumBase),
        toWorld(x0, y0, podiumBase),
        toWorld(x0, y0, -52),
        toWorld(x1, y1, -52),
      ],
      fill: '#23201B',
      stroke: 'rgba(200,162,100,0.14)',
      layer: 0,
    });
    // Recessed commercial floor window band (-52 to -22) — subtly lit by office tenants
    faces.push({
      pts: [
        toWorld(x1, y1, -52),
        toWorld(x0, y0, -52),
        toWorld(x0, y0, -22),
        toWorld(x1, y1, -22),
      ],
      fill: '#2F281E',
      stroke: 'rgba(200,162,100,0.22)',
      emissive: 0.28,
      layer: 0,
    });
    // Upper limestone parapet cornice (-22 to 0)
    faces.push({
      pts: [
        toWorld(x1, y1, -22),
        toWorld(x0, y0, -22),
        toWorld(x0, y0, 0),
        toWorld(x1, y1, 0),
      ],
      fill: '#332E27',
      stroke: 'rgba(200,162,100,0.32)',
      layer: 0,
    });
  }

  // Main Roof Structural Slab (z = 0)
  faces.push({
    pts: silPts.map(([x, y]) => toWorld(x, y, 0)),
    fill: '#2A2620',
    stroke: 'rgba(200,162,100,0.52)',
    layer: 1.0,
  });

  // Stepped White Art Deco Crown Parapet Walls (leaving North Semicircle open for flush pool rim!)
  const crownParapets: [[number, number], [number, number]][] = [
    [[128, 385], [180, 385]],
    [[180, 385], [180, 305]],
    [[180, 305], [215, 305]],
    [[215, 305], [215, 240]],
    [[215, 240], [250, 240]],
    [[250, 240], [250, 178]],
    [[250, 178], [280, 178]],
    [[520, 178], [548, 178]],
    [[548, 178], [548, 238]],
    [[548, 238], [588, 238]],
    [[588, 238], [588, 302]],
    [[588, 302], [625, 302]],
  ];
  for (const [[x0, y0], [x1, y1]] of crownParapets) {
    faces.push({
      pts: [
        toWorld(x0, y0, 0),
        toWorld(x1, y1, 0),
        toWorld(x1, y1, 19),
        toWorld(x0, y0, 19),
      ],
      fill: '#EAE2D5',
      stroke: 'rgba(200,162,100,0.42)',
      layer: 2,
    });
  }

  // ===========================================================================
  // 1. NORTH CROWN: TRAVERTINE TERRACE & SEMICIRCULAR INFINITY POOL (`pool`)
  // ===========================================================================
  const northDeckPts: [number, number][] = [];
  for (let i = 0; i <= 20; i++) {
    const a = Math.PI + (i / 20) * Math.PI;
    northDeckPts.push([400 + Math.cos(a) * 125, 178 + Math.sin(a) * 125]);
  }
  northDeckPts.push([516, 470], [292, 470]);
  faces.push({
    pts: northDeckPts.map(([x, y]) => toWorld(x, y, 6)),
    fill: '#DDD3C2',
    stroke: 'rgba(200,162,100,0.42)',
    zoneId: 'pool',
    layer: 1.1,
  });

  // Subtle travertine ashlar stone grid lines on pool terrace
  for (let gy = 210; gy <= 450; gy += 40) {
    lines.push({
      a: toWorld(296, gy, 6.4),
      b: toWorld(510, gy, 6.4),
      color: 'rgba(130,115,92,0.22)',
      width: 0.8,
      zoneId: 'pool',
    });
  }

  // Semicircular Infinity Pool Water Surface (strictly inside north dome + lap basin)
  const poolPts: [number, number][] = [];
  for (let i = 0; i <= 22; i++) {
    const a = Math.PI + (i / 22) * Math.PI;
    poolPts.push([400 + Math.cos(a) * 117, 178 + Math.sin(a) * 117]);
  }
  poolPts.push(
    [517, 190],
    [446, 190],
    [446, 396],
    [476, 396],
    [476, 454],
    [352, 454],
    [352, 190],
    [283, 190],
  );
  faces.push({
    pts: poolPts.map(([x, y]) => toWorld(x, y, 10.5)),
    fill: '#3E8E94',
    stroke: '#8BE0E5',
    zoneId: 'pool',
    emissive: 0.75,
    layer: 1.24,
  });

  // Submerged travertine entry steps in SE shallow shelf
  for (const [stepIdx, sx] of [466, 456, 446].entries()) {
    faces.push({
      pts: [
        toWorld(sx, 398, 10.8),
        toWorld(sx + 9, 398, 10.8),
        toWorld(sx + 9, 452, 10.8),
        toWorld(sx, 452, 10.8),
      ],
      fill: stepIdx === 0 ? '#A8D8DC' : stepIdx === 1 ? '#7EC2C7' : '#58A7AD',
      zoneId: 'pool',
      emissive: 0.5,
      layer: 1.28,
    });
  }

  // Animated shimmering water caustic lines
  for (const wy of [115, 150, 225, 290, 355, 420]) {
    const halfW = wy < 180 ? Math.sqrt(Math.max(0, 110 * 110 - (178 - wy) * (178 - wy))) * 0.72 : 36;
    const cxPool = wy < 180 ? 400 : 399;
    lines.push({
      a: toWorld(cxPool - halfW, wy, 11.1),
      b: toWorld(cxPool + halfW, wy, 11.1),
      color: 'rgba(210, 250, 252, 0.42)',
      width: 1.2,
      zoneId: 'pool',
      animatedWater: true,
    });
  }

  // Flush vanishing-edge waterfall weir + lower catch trough along North Semicircular Crown
  for (let i = 0; i < 22; i++) {
    const a0 = Math.PI + (i / 22) * Math.PI;
    const a1 = Math.PI + ((i + 1) / 22) * Math.PI;
    const x0 = 400 + Math.cos(a0) * 121;
    const y0 = 178 + Math.sin(a0) * 121;
    const x1 = 400 + Math.cos(a1) * 121;
    const y1 = 178 + Math.sin(a1) * 121;
    faces.push({
      pts: [
        toWorld(x1, y1, 0),
        toWorld(x0, y0, 0),
        toWorld(x0, y0, 10.5),
        toWorld(x1, y1, 10.5),
      ],
      fill: '#2E7A80',
      stroke: '#7AD3D8',
      zoneId: 'pool',
      emissive: 0.58,
      layer: 2,
    });
  }

  // Detailed Poolside Teak Sun Loungers (teak base + cream mattress + raised headrest)
  for (const ly of [240, 282, 324, 366]) {
    addBox(faces, 458, ly, 40, 18, 6, 11, {
      topColor: '#8B653D',
      sideColor: '#5D4226',
      zoneId: 'pool',
      shadowAt: 6.2,
    });
    addBox(faces, 460, ly + 1.5, 36, 15, 11, 14, {
      topColor: '#EFE8DC',
      sideColor: '#CFC5B4',
      zoneId: 'pool',
    });
    addBox(faces, 487, ly + 2, 8, 14, 14, 18, {
      topColor: '#F7F3EB',
      sideColor: '#D8CFC0',
      zoneId: 'pool',
    });
  }
  for (const lx of [348, 388, 428]) {
    addBox(faces, lx, 466, 20, 36, 6, 13, {
      topColor: '#EFE8DC',
      sideColor: '#7A5835',
      zoneId: 'pool',
      shadowAt: 6.2,
    });
  }

  // ===========================================================================
  // 2. WRAP-AROUND BALI CAFÉ (`cafe` — Symmetrical Stepped Teak Pergola Wings)
  // ===========================================================================
  const pergolaWings = [
    { x: 252, y: 178, w: 46, h: 66 },
    { x: 216, y: 242, w: 78, h: 64 },
    { x: 182, y: 306, w: 112, h: 82 },
    { x: 502, y: 178, w: 44, h: 62 },
    { x: 512, y: 240, w: 74, h: 62 },
    { x: 516, y: 302, w: 104, h: 88 },
  ];

  for (const w of pergolaWings) {
    // Stepped Burmese teak deck platform
    addBox(faces, w.x, w.y, w.w, w.h, 1, 8, {
      topColor: '#7E5B39',
      sideColor: '#543B22',
      zoneId: 'cafe',
      layer: 1.12,
    });

    // 4 architectural timber columns
    const ps = 5;
    for (const [px, py] of [
      [w.x + 3, w.y + 3],
      [w.x + w.w - ps - 3, w.y + 3],
      [w.x + 3, w.y + w.h - ps - 3],
      [w.x + w.w - ps - 3, w.y + w.h - ps - 3],
    ]) {
      addBox(faces, px, py, ps, ps, 8, 54, {
        topColor: '#916B40',
        sideColor: '#634729',
        zoneId: 'cafe',
      });
    }

    // Perimeter pergola beam frame (cutaway-aware)
    addBox(faces, w.x - 2, w.y - 2, w.w + 4, w.h + 4, 54, 58, {
      topColor: '#AC8252',
      sideColor: '#7C5A34',
      stroke: 'rgba(200,162,100,0.48)',
      alpha: 0.88,
      zoneId: 'cafe',
      isRoof: true,
    });

    // Individual 3D slatted teak pergola rafters
    for (let ry = w.y + 6; ry < w.y + w.h - 4; ry += 11) {
      addBox(faces, w.x, ry, w.w, 3.5, 58, 61, {
        topColor: '#BA8F5C',
        sideColor: '#7D5B34',
        zoneId: 'cafe',
        isRoof: true,
      });
    }

    // Bistro table + warm 2700K rattan pendant lantern
    const midX = w.x + w.w * 0.5;
    const midY = w.y + w.h * 0.5;
    addCylinder(faces, midX, midY, Math.min(w.w, w.h) * 0.2, 8, 20, 10, {
      topColor: '#E5DAC8',
      sideColor: '#9C784C',
      zoneId: 'cafe',
      emissive: 0.45,
    });
    addCylinder(faces, midX, midY, 5.5, 40, 49, 8, {
      topColor: '#F5D598',
      sideColor: '#DDA95C',
      zoneId: 'cafe',
      emissive: 0.95,
    });
  }

  // Honed Travertine Espresso & Smoothie Bar Counter in West Café Wing
  addBox(faces, 194, 344, 72, 16, 8, 25, {
    topColor: '#EAE2D5',
    sideColor: '#C8A264',
    zoneId: 'cafe',
    emissive: 0.55,
  });

  // ===========================================================================
  // 3. THE ATELIER LUXURY SALON (`salon` — Northwest Glass & Fluted-Teak Pavilion)
  // ===========================================================================
  addBox(faces, 135, 440, 156, 96, 1, 8, {
    topColor: '#D2C4AC',
    sideColor: '#7D6D56',
    zoneId: 'salon',
    layer: 1.15,
    shadowAt: 1.05,
  });
  // Fluted teak west privacy wall
  addBox(faces, 135, 440, 9, 96, 8, 58, {
    topColor: '#9B7346',
    sideColor: '#735330',
    zoneId: 'salon',
  });
  // 4 Sculpted Backlit Brass Arched Styling Stations + Salon Chairs
  for (const sx of [158, 192, 226, 260]) {
    addBox(faces, sx, 456, 16, 38, 8, 42, {
      topColor: '#F0D399',
      sideColor: '#C8A264',
      stroke: '#F5F1EB',
      zoneId: 'salon',
      emissive: 0.88,
    });
    addCylinder(faces, sx + 8, 508, 7, 8, 20, 8, {
      topColor: '#3B3630',
      sideColor: '#C8A264',
      zoneId: 'salon',
    });
  }
  // Full-height bronze-mullioned acoustic glass enclosure
  addBox(faces, 135, 440, 156, 96, 8, 58, {
    topColor: '#C8A264',
    sideColor: '#DEC292',
    stroke: 'rgba(200,162,100,0.68)',
    alpha: 0.3,
    zoneId: 'salon',
    emissive: 0.45,
  });
  // Cantilevered teak roof + recessed skylight lantern
  addBox(faces, 130, 435, 166, 106, 58, 64, {
    topColor: '#9C7548',
    sideColor: '#6B4E2C',
    stroke: 'rgba(200,162,100,0.52)',
    zoneId: 'salon',
    isRoof: true,
  });
  addBox(faces, 162, 454, 102, 62, 64, 68, {
    topColor: '#EFE6D5',
    sideColor: '#C8A264',
    alpha: 0.72,
    zoneId: 'salon',
    isRoof: true,
    emissive: 0.65,
  });

  // ===========================================================================
  // 4. CONTRAST RECOVERY SUITE (`recovery` — Northeast Sauna & Cold Plunge)
  // ===========================================================================
  addBox(faces, 510, 436, 115, 104, 1, 8, {
    topColor: '#785838',
    sideColor: '#543C25',
    zoneId: 'recovery',
    layer: 1.15,
    shadowAt: 1.05,
  });
  // Western Red Cedar Dry Sauna Cabin + warm stove glow
  addBox(faces, 514, 442, 54, 92, 8, 54, {
    topColor: '#B88754',
    sideColor: '#8F653B',
    stroke: 'rgba(200,162,100,0.48)',
    zoneId: 'recovery',
    emissive: 0.55,
  });
  // Stepped interior sauna bench visible when roof is cutaway
  addBox(faces, 518, 448, 22, 80, 14, 28, {
    topColor: '#D8A66E',
    sideColor: '#9E6F3E',
    zoneId: 'recovery',
    emissive: 0.65,
  });
  // Volcanic Basalt Cold Plunge Basin + chilled turquoise water
  addBox(faces, 574, 450, 46, 76, 8, 22, {
    topColor: '#252627',
    sideColor: '#1B1C1D',
    stroke: 'rgba(200,162,100,0.4)',
    zoneId: 'recovery',
  });
  addBox(faces, 578, 454, 38, 68, 12, 23, {
    topColor: '#3E8E94',
    sideColor: '#2B696E',
    stroke: '#8BE0E5',
    zoneId: 'recovery',
    emissive: 0.7,
  });
  // Slatted recovery roof trellis
  addBox(faces, 508, 434, 119, 108, 54, 60, {
    topColor: '#8B6843',
    sideColor: '#63482C',
    stroke: 'rgba(200,162,100,0.45)',
    zoneId: 'recovery',
    isRoof: true,
  });

  // ===========================================================================
  // 5. EAST PROMENADE & SINGLE CURVED BALCONY (`promenade`)
  // ===========================================================================
  addBox(faces, 478, 542, 145, 396, 1, 5, {
    topColor: '#694C2F',
    sideColor: '#4A351F',
    zoneId: 'promenade',
    layer: 1.1,
  });

  // Signature Single Curved Projecting East Balcony Floor
  const balconyPts: [number, number][] = [];
  for (let i = 0; i <= 16; i++) {
    const a = -Math.PI / 2 + (i / 16) * Math.PI;
    balconyPts.push([625 + Math.cos(a) * 84, 686 + Math.sin(a) * 84]);
  }
  faces.push({
    pts: balconyPts.map(([x, y]) => toWorld(x, y, 6)),
    fill: '#DDD4C5',
    stroke: '#C8A264',
    zoneId: 'promenade',
    layer: 1.2,
  });

  // Curved frameless safety glass balustrade + brushed-brass handrail on East Balcony
  for (let i = 0; i < 16; i++) {
    const [x0, y0] = balconyPts[i];
    const [x1, y1] = balconyPts[i + 1];
    faces.push({
      pts: [
        toWorld(x1, y1, 6),
        toWorld(x0, y0, 6),
        toWorld(x0, y0, 25),
        toWorld(x1, y1, 25),
      ],
      fill: '#9CC5C9',
      alpha: 0.34,
      stroke: 'rgba(200,162,100,0.55)',
      zoneId: 'promenade',
      layer: 2,
    });
  }
  // Balcony curved lounge seating + round brass fire-pit table
  addCylinder(faces, 666, 686, 18, 6, 14, 12, {
    topColor: '#EAE2D5',
    sideColor: '#C8A264',
    zoneId: 'promenade',
    emissive: 0.55,
  });
  addCylinder(faces, 666, 686, 7, 14, 17, 10, {
    topColor: '#F5C97B',
    sideColor: '#8C673A',
    zoneId: 'promenade',
    emissive: 0.95,
  });

  // 13 Honed Limestone Stepping Pavers along East Spine
  for (let py = 554; py <= 866; py += 26) {
    addBox(faces, 535, py, 46, 16, 5, 8.5, {
      topColor: '#E5DDD0',
      sideColor: '#9E9689',
      zoneId: 'promenade',
      layer: 1.26,
    });
  }

  // Sculpted 3D Balinese Palms along East Promenade & North Crown
  for (const [px, py, h] of [
    [508, 572, 46],
    [604, 580, 42],
    [508, 654, 48],
    [508, 738, 44],
    [508, 822, 48],
    [604, 796, 42],
    [314, 488, 38],
    [492, 488, 38],
  ]) {
    addPalmTree(faces, px, py, 5, h, 'promenade');
  }

  // ===========================================================================
  // 6. SCREENED MECHANICAL CORE (`mep` — Excluded Central-Left Utility Well)
  // ===========================================================================
  addBox(faces, 143, 600, 332, 336, 1, 4, {
    topColor: '#343638',
    sideColor: '#252729',
    zoneId: 'mep',
    layer: 1.1,
    shadowAt: 1.04,
  });

  // Existing rectangular HVAC chillers & air handlers inside utility well
  const chillers = [
    { x: 172, y: 626, w: 96, h: 50, z: 34 },
    { x: 325, y: 628, w: 42, h: 86, z: 30 },
    { x: 252, y: 716, w: 48, h: 114, z: 38 },
    { x: 244, y: 844, w: 72, h: 66, z: 35 },
    { x: 168, y: 838, w: 46, h: 74, z: 32 },
  ];
  for (const u of chillers) {
    addBox(faces, u.x, u.y, u.w, u.h, 4, u.z, {
      topColor: '#6C7075',
      sideColor: '#484B4F',
      stroke: 'rgba(158,150,137,0.36)',
      zoneId: 'mep',
    });
  }
  // Twin Cylindrical Cooling Water Tanks (true 16-sided 3D cylinders!)
  addCylinder(faces, 430, 834, 22, 4, 44, 16, {
    topColor: '#8B9096',
    sideColor: '#585C61',
    stroke: 'rgba(245,241,235,0.28)',
    zoneId: 'mep',
  });
  addCylinder(faces, 430, 890, 22, 4, 44, 16, {
    topColor: '#8B9096',
    sideColor: '#585C61',
    stroke: 'rgba(245,241,235,0.28)',
    zoneId: 'mep',
  });

  // Chiller duct runs
  lines.push(
    { a: toWorld(220, 676, 20), b: toWorld(220, 875, 20), color: 'rgba(180,185,190,0.45)', width: 1.6, zoneId: 'mep' },
    { a: toWorld(220, 875, 20), b: toWorld(408, 875, 20), color: 'rgba(180,185,190,0.45)', width: 1.6, zoneId: 'mep' },
  );

  // Tall Perimeter Dark-Teak Louver Enclosure + Vertical Tropical Living Green Walls (z = 4..78)
  const wt = 13;
  addBox(faces, 143, 600, 332, wt, 4, 78, {
    topColor: '#63472B',
    sideColor: '#355840',
    stroke: 'rgba(120,168,137,0.55)',
    zoneId: 'mep',
  });
  addBox(faces, 143, 936 - wt, 332, wt, 4, 78, {
    topColor: '#63472B',
    sideColor: '#355840',
    stroke: 'rgba(120,168,137,0.55)',
    zoneId: 'mep',
  });
  addBox(faces, 475 - wt, 613, wt, 310, 4, 78, {
    topColor: '#63472B',
    sideColor: '#3B6348',
    stroke: 'rgba(120,168,137,0.58)',
    zoneId: 'mep',
  });
  addBox(faces, 143, 613, wt, 310, 4, 78, {
    topColor: '#63472B',
    sideColor: '#355840',
    stroke: 'rgba(120,168,137,0.55)',
    zoneId: 'mep',
  });

  // Subtle architectural exclusion cross above MEP core
  lines.push(
    { a: toWorld(166, 622, 48), b: toWorld(452, 914, 48), color: 'rgba(200,162,100,0.38)', width: 1.4, zoneId: 'mep' },
    { a: toWorld(452, 622, 48), b: toWorld(166, 914, 48), color: 'rgba(200,162,100,0.38)', width: 1.4, zoneId: 'mep' },
  );

  // ===========================================================================
  // 7. CONTINUOUS 2-LANE PERIMETER SKY RUNNING TRACK (`track` — South Loop)
  // ===========================================================================
  const trackOuter = sampleRoundRect(100, 950, 590, 352, 88, 9);
  const trackMid = sampleRoundRect(123, 973, 544, 306, 70, 9);
  const trackInner = sampleRoundRect(146, 996, 498, 260, 54, 9);

  faces.push({
    pts: trackOuter.map(([x, y]) => toWorld(x, y, 4)),
    fill: '#C86849',
    stroke: 'rgba(245,241,235,0.72)',
    zoneId: 'track',
    emissive: 0.36,
    layer: 1.15,
  });
  faces.push({
    pts: trackInner.map(([x, y]) => toWorld(x, y, 5)),
    fill: '#2A2620',
    stroke: 'rgba(245,241,235,0.62)',
    zoneId: 'track',
    layer: 1.25,
  });

  for (let i = 0; i < trackMid.length; i++) {
    const [x0, y0] = trackMid[i];
    const [x1, y1] = trackMid[(i + 1) % trackMid.length];
    lines.push({
      a: toWorld(x0, y0, 5.6),
      b: toWorld(x1, y1, 5.6),
      color: 'rgba(245,241,235,0.74)',
      width: 1.3,
      zoneId: 'track',
    });
  }

  // Start/finish lane hash marks on south straightaway
  for (const lx of [220, 228, 236]) {
    lines.push({
      a: toWorld(lx, 1258, 5.8),
      b: toWorld(lx, 1300, 5.8),
      color: 'rgba(245,241,235,0.85)',
      width: 1.4,
      zoneId: 'track',
    });
  }

  // Warm 2700K Bronze Light Bollards around track perimeter
  for (const [bx, by] of [
    [104, 1020],
    [104, 1126],
    [104, 1230],
    [220, 1305],
    [395, 1305],
    [570, 1305],
    [686, 1230],
    [686, 1126],
    [686, 1020],
    [570, 947],
    [395, 947],
    [220, 947],
  ]) {
    addCylinder(faces, bx, by, 3.2, 4, 18, 8, {
      topColor: '#F6D594',
      sideColor: '#8C6B3F',
      zoneId: 'track',
      emissive: 0.92,
    });
  }

  // Frameless perimeter safety glass balustrade around South Slab
  const southGlass: [number, number][] = [
    [92, 942],
    [696, 942],
    [696, 1310],
    [92, 1310],
  ];
  for (let i = 0; i < southGlass.length; i++) {
    const [x0, y0] = southGlass[i];
    const [x1, y1] = southGlass[(i + 1) % southGlass.length];
    faces.push({
      pts: [
        toWorld(x1, y1, 0),
        toWorld(x0, y0, 0),
        toWorld(x0, y0, 21),
        toWorld(x1, y1, 21),
      ],
      fill: '#9CC5C9',
      alpha: 0.24,
      stroke: 'rgba(245,241,235,0.38)',
      zoneId: 'track',
      layer: 2,
    });
  }

  // ===========================================================================
  // 8, 9, 10. SOUTH 3-BAY GLASS & TEAK FITNESS PAVILION
  // (`group-class`, `pilates`, `gym`)
  // ===========================================================================
  const bays = [
    {
      id: 'group-class',
      x: 158,
      y: 1026,
      w: 157,
      h: 218,
      floorColor: '#A37648',
      glassColor: '#D8BA88',
    },
    {
      id: 'pilates',
      x: 318,
      y: 1026,
      w: 154,
      h: 218,
      floorColor: '#D2C3AA',
      glassColor: '#E2C99D',
    },
    {
      id: 'gym',
      x: 475,
      y: 1026,
      w: 155,
      h: 218,
      floorColor: '#22211F',
      glassColor: '#C8A264',
    },
  ];

  addShadowPad(faces, 156, 1024, 476, 222, 5.2, 8);

  for (const b of bays) {
    // Studio raised floor platform
    addBox(faces, b.x, b.y, b.w, b.h, 5, 10, {
      topColor: b.floorColor,
      sideColor: '#3B352E',
      zoneId: b.id,
      layer: 1.35,
      emissive: 0.28,
    });

    // Charcoal-steel structural portal columns at bay corners
    for (const [cxp, cyp] of [
      [b.x, b.y],
      [b.x + b.w - 6, b.y],
      [b.x, b.y + b.h - 6],
      [b.x + b.w - 6, b.y + b.h - 6],
    ]) {
      addBox(faces, cxp, cyp, 6, 6, 10, 68, {
        topColor: '#363431',
        sideColor: '#1E1D1B',
        zoneId: b.id,
      });
    }

    if (b.id === 'group-class') {
      // 9 yoga / movement mats on sprung Burmese teak hardwood floor
      for (const mx of [b.x + 24, b.x + 68, b.x + 112]) {
        for (const my of [b.y + 88, b.y + 132, b.y + 176]) {
          addBox(faces, mx, my, 22, 30, 10, 12, {
            topColor: '#5B4634',
            sideColor: '#C8A264',
            zoneId: b.id,
            emissive: 0.35,
          });
        }
      }
      // North brass movement barre / mirror wall glow
      addBox(faces, b.x + 16, b.y + 12, b.w - 32, 6, 10, 52, {
        topColor: '#EAD09D',
        sideColor: '#C8A264',
        zoneId: b.id,
        emissive: 0.72,
      });
    } else if (b.id === 'pilates') {
      // 8 Handcrafted Oak Reformer Pilates Machines (frame + carriage + footbar)
      for (const rx of [b.x + 20, b.x + 88]) {
        for (const ry of [b.y + 82, b.y + 116, b.y + 150, b.y + 184]) {
          addBox(faces, rx, ry, 46, 20, 10, 18, {
            topColor: '#C9A878',
            sideColor: '#7D5E39',
            stroke: 'rgba(30,25,20,0.55)',
            zoneId: b.id,
            emissive: 0.45,
          });
          addBox(faces, rx + 5, ry + 3, 30, 14, 18, 21, {
            topColor: '#2E2C29',
            sideColor: '#1F1E1C',
            zoneId: b.id,
          });
          addBox(faces, rx + 39, ry + 2, 3, 16, 18, 25, {
            topColor: '#E5DFD5',
            sideColor: '#C8A264',
            zoneId: b.id,
          });
        }
      }
    } else if (b.id === 'gym') {
      // 1. North Cardio Row: 3 Sculpted Treadmills facing the North Track
      for (const tx of [b.x + 15, b.x + 61, b.x + 107]) {
        const ty = b.y + 12;
        // Running belt deck + side foot rails
        addBox(faces, tx + 2, ty + 6, 24, 30, 10, 13.5, {
          topColor: '#181817',
          sideColor: '#2E2C29',
          zoneId: b.id,
        });
        addBox(faces, tx, ty + 5, 3, 32, 10, 15, {
          topColor: '#4A4742',
          sideColor: '#2A2825',
          zoneId: b.id,
        });
        addBox(faces, tx + 25, ty + 5, 3, 32, 10, 15, {
          topColor: '#4A4742',
          sideColor: '#2A2825',
          zoneId: b.id,
        });
        // Dual angled front console masts
        addBox(faces, tx + 2, ty + 3, 3, 4, 14, 33, {
          topColor: '#3E3C38',
          sideColor: '#232220',
          zoneId: b.id,
        });
        addBox(faces, tx + 23, ty + 3, 3, 4, 14, 33, {
          topColor: '#3E3C38',
          sideColor: '#232220',
          zoneId: b.id,
        });
        // Side safety handlebars
        addBox(faces, tx + 2, ty + 6, 2.5, 11, 29, 31.5, {
          topColor: '#56534E',
          sideColor: '#C8A264',
          zoneId: b.id,
        });
        addBox(faces, tx + 23.5, ty + 6, 2.5, 11, 29, 31.5, {
          topColor: '#56534E',
          sideColor: '#C8A264',
          zoneId: b.id,
        });
        // Tilted touchscreen console + illuminated display
        addBox(faces, tx + 1, ty, 26, 8, 32, 36, {
          topColor: '#2E3032',
          sideColor: '#1B1A18',
          zoneId: b.id,
        });
        addBox(faces, tx + 4, ty + 1.5, 20, 5, 36, 37, {
          topColor: '#A9DCE0',
          sideColor: '#C8A264',
          zoneId: b.id,
          emissive: 0.85,
        });
      }

      // Center Functional Conditioning Turf Lane
      faces.push({
        pts: [
          toWorld(b.x + 66, b.y + 62, 10.4),
          toWorld(b.x + 88, b.y + 62, 10.4),
          toWorld(b.x + 88, b.y + 204, 10.4),
          toWorld(b.x + 66, b.y + 204, 10.4),
        ],
        fill: '#29382E',
        stroke: 'rgba(200,162,100,0.38)',
        zoneId: b.id,
        layer: 1.38,
      });
      for (let hy = b.y + 80; hy <= b.y + 188; hy += 27) {
        lines.push({
          a: toWorld(b.x + 70, hy, 10.7),
          b: toWorld(b.x + 84, hy, 10.7),
          color: 'rgba(200,162,100,0.5)',
          width: 1,
          zoneId: b.id,
        });
      }

      // 2. West Row — Pin-Loaded Selectorized Strength Machines
      // (a) Lat Pulldown Machine (weight stack tower + overhead boom + wide lat bar + seat)
      addBox(faces, b.x + 13, b.y + 68, 13, 18, 10, 50, {
        topColor: '#C8A264',
        sideColor: '#252422',
        stroke: 'rgba(200,162,100,0.45)',
        zoneId: b.id,
      });
      addBox(faces, b.x + 13, b.y + 74, 32, 6, 47, 51, {
        topColor: '#484540',
        sideColor: '#2A2825',
        zoneId: b.id,
      });
      addBox(faces, b.x + 39, b.y + 67, 3, 20, 36, 38.5, {
        topColor: '#EAE2D5',
        sideColor: '#C8A264',
        zoneId: b.id,
        emissive: 0.45,
      });
      lines.push({
        a: toWorld(b.x + 40.5, b.y + 77, 47),
        b: toWorld(b.x + 40.5, b.y + 77, 38),
        color: 'rgba(235,230,220,0.8)',
        width: 1.2,
        zoneId: b.id,
      });
      addBox(faces, b.x + 30, b.y + 72, 22, 10, 10, 18, {
        topColor: '#36302A',
        sideColor: '#1E1D1B',
        zoneId: b.id,
      });
      addBox(faces, b.x + 28, b.y + 71, 5, 12, 20, 24, {
        topColor: '#2A2724',
        sideColor: '#C8A264',
        zoneId: b.id,
      });

      // (b) Seated Chest Press Machine (weight stack + backrest + dual converging press arms)
      addBox(faces, b.x + 13, b.y + 116, 14, 22, 10, 46, {
        topColor: '#C8A264',
        sideColor: '#252422',
        stroke: 'rgba(200,162,100,0.45)',
        zoneId: b.id,
      });
      addBox(faces, b.x + 29, b.y + 121, 8, 12, 16, 35, {
        topColor: '#3B342D',
        sideColor: '#26221E',
        zoneId: b.id,
      });
      addBox(faces, b.x + 36, b.y + 121, 13, 12, 10, 18, {
        topColor: '#3B342D',
        sideColor: '#1E1D1B',
        zoneId: b.id,
      });
      addBox(faces, b.x + 27, b.y + 115, 22, 3, 28, 37, {
        topColor: '#D6B47C',
        sideColor: '#8F7144',
        zoneId: b.id,
        emissive: 0.4,
      });
      addBox(faces, b.x + 27, b.y + 136, 22, 3, 28, 37, {
        topColor: '#D6B47C',
        sideColor: '#8F7144',
        zoneId: b.id,
        emissive: 0.4,
      });

      // (c) 45-Degree Angled Leg Press Sled (rails + angled footplate + round Olympic plate stacks + seat)
      addBox(faces, b.x + 13, b.y + 166, 42, 24, 10, 14, {
        topColor: '#2C2A27',
        sideColor: '#1A1917',
        zoneId: b.id,
      });
      addBox(faces, b.x + 17, b.y + 169, 15, 18, 18, 34, {
        topColor: '#46433E',
        sideColor: '#C8A264',
        zoneId: b.id,
      });
      addCylinder(faces, b.x + 24, b.y + 165, 5.5, 20, 29, 10, {
        topColor: '#232220',
        sideColor: '#C8A264',
        zoneId: b.id,
      });
      addCylinder(faces, b.x + 24, b.y + 191, 5.5, 20, 29, 10, {
        topColor: '#232220',
        sideColor: '#C8A264',
        zoneId: b.id,
      });
      addBox(faces, b.x + 39, b.y + 170, 15, 16, 14, 23, {
        topColor: '#3B342D',
        sideColor: '#24201C',
        zoneId: b.id,
      });

      // 3. East Row — Dual Cable Functional Trainer + Smith Bench Press Machine
      // (a) Dual-Stack Cable Crossover Machine (twin pulley towers + overhead bridge + bench)
      addBox(faces, b.x + 126, b.y + 64, 14, 14, 10, 54, {
        topColor: '#C8A264',
        sideColor: '#242321',
        stroke: 'rgba(200,162,100,0.45)',
        zoneId: b.id,
      });
      addBox(faces, b.x + 126, b.y + 114, 14, 14, 10, 54, {
        topColor: '#C8A264',
        sideColor: '#242321',
        stroke: 'rgba(200,162,100,0.45)',
        zoneId: b.id,
      });
      addBox(faces, b.x + 127, b.y + 64, 12, 64, 50, 55, {
        topColor: '#45423D',
        sideColor: '#C8A264',
        zoneId: b.id,
        emissive: 0.45,
      });
      lines.push(
        {
          a: toWorld(b.x + 125, b.y + 71, 12),
          b: toWorld(b.x + 125, b.y + 71, 50),
          color: 'rgba(235,230,220,0.75)',
          width: 1.2,
          zoneId: b.id,
        },
        {
          a: toWorld(b.x + 125, b.y + 121, 12),
          b: toWorld(b.x + 125, b.y + 121, 50),
          color: 'rgba(235,230,220,0.75)',
          width: 1.2,
          zoneId: b.id,
        },
      );
      addBox(faces, b.x + 98, b.y + 89, 22, 13, 10, 18.5, {
        topColor: '#3B342D',
        sideColor: '#1E1D1B',
        zoneId: b.id,
      });

      // (b) Guided Smith Bench Press Machine (upright columns + barbell + bumper plates + bench)
      addBox(faces, b.x + 111, b.y + 146, 6, 6, 10, 50, {
        topColor: '#4A4742',
        sideColor: '#232220',
        zoneId: b.id,
      });
      addBox(faces, b.x + 111, b.y + 192, 6, 6, 10, 50, {
        topColor: '#4A4742',
        sideColor: '#232220',
        zoneId: b.id,
      });
      addBox(faces, b.x + 110, b.y + 146, 8, 52, 47, 51, {
        topColor: '#3E3C38',
        sideColor: '#C8A264',
        zoneId: b.id,
      });
      // Olympic barbell + loaded weight plates on both sleeves
      lines.push({
        a: toWorld(b.x + 114, b.y + 140, 27),
        b: toWorld(b.x + 114, b.y + 204, 27),
        color: '#EAE3D5',
        width: 1.8,
        zoneId: b.id,
      });
      addBox(faces, b.x + 109, b.y + 141, 10, 4, 21, 33, {
        topColor: '#232220',
        sideColor: '#C8A264',
        zoneId: b.id,
      });
      addBox(faces, b.x + 109, b.y + 199, 10, 4, 21, 33, {
        topColor: '#232220',
        sideColor: '#C8A264',
        zoneId: b.id,
      });
      addBox(faces, b.x + 98, b.y + 166, 34, 12, 10, 18.5, {
        topColor: '#3B342D',
        sideColor: '#1E1D1B',
        zoneId: b.id,
      });
    }

    // Translucent Acoustic Glass Curtain Walls (z = 10..68)
    addBox(faces, b.x, b.y, b.w, b.h, 10, 68, {
      topColor: b.glassColor,
      sideColor: b.glassColor,
      stroke: 'rgba(200,162,100,0.65)',
      alpha: 0.24,
      zoneId: b.id,
      emissive: 0.42,
    });

    // Overhanging Burmese Teak Roof Slab (south two-thirds, z = 68..74)
    addBox(faces, b.x - 3, b.y + 68, b.w + 6, b.h - 65, 68, 74, {
      topColor: '#8F6940',
      sideColor: '#5E4427',
      stroke: 'rgba(200,162,100,0.52)',
      zoneId: b.id,
      isRoof: true,
    });

    // Zenithal Louvered Skylight Bay (north third, z = 68..73)
    addBox(faces, b.x, b.y, b.w, 68, 68, 73, {
      topColor: '#EAE0CE',
      sideColor: '#9E9689',
      stroke: 'rgba(200,162,100,0.58)',
      alpha: 0.65,
      zoneId: b.id,
      isRoof: true,
      emissive: 0.48,
    });
  }

  return { faces, lines };
}

const SCENE = buildDetailedMaquetteScene();

export function OrbitMaquette({
  selected,
  onSelectZone,
  fullscreen,
  onToggleFullscreen,
  focusTrigger = 0,
}: OrbitMaquetteProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [preset, setPreset] = useState<CameraPresetId>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('preset') as CameraPresetId | null;
      if (p && p in CAMERA_PRESETS) return p;
    }
    return 'signature';
  });
  const [lighting, setLighting] = useState<LightingMode>('twilight');
  const [cutawayRoof, setCutawayRoof] = useState<boolean>(true);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState({ az: 306, el: 33, zoom: '0.99' });

  const targetCamRef = useRef<CameraState>({ ...CAMERA_PRESETS[preset].cam });
  const currentCamRef = useRef<CameraState>({ ...CAMERA_PRESETS[preset].cam });
  const dragRef = useRef<{
    active: boolean;
    lastX: number;
    lastY: number;
    mode: 'orbit' | 'pan';
  }>({ active: false, lastX: 0, lastY: 0, mode: 'orbit' });

  const stateRef = useRef({
    selectedId: selected.id,
    lighting,
    cutawayRoof,
    autoOrbit,
  });

  useEffect(() => {
    stateRef.current = {
      selectedId: selected.id,
      lighting,
      cutawayRoof,
      autoOrbit,
    };
  }, [selected.id, lighting, cutawayRoof, autoOrbit]);

  const applyPreset = (id: CameraPresetId) => {
    setPreset(id);
    targetCamRef.current = { ...CAMERA_PRESETS[id].cam };
  };

  const flyToZone = (zone: SpatialZone) => {
    onSelectZone(zone);
    const anchor = ZONE_ANCHORS[zone.id] ?? { x: CX, y: CY };
    const w = toWorld(anchor.x, anchor.y, ZONE_ELEVATION[zone.id] ?? 30);
    targetCamRef.current = {
      ...targetCamRef.current,
      tx: w.x * 0.72,
      ty: w.y * 0.72,
      tz: 18,
      zoom: Math.max(targetCamRef.current.zoom, 1.48),
    };
  };

  useEffect(() => {
    if (focusTrigger > 0) {
      const anchor = ZONE_ANCHORS[selected.id] ?? { x: CX, y: CY };
      const w = toWorld(anchor.x, anchor.y, ZONE_ELEVATION[selected.id] ?? 30);
      targetCamRef.current = {
        ...targetCamRef.current,
        tx: w.x * 0.72,
        ty: w.y * 0.72,
        tz: 18,
        zoom: Math.max(targetCamRef.current.zoom, 1.48),
      };
    }
  }, [focusTrigger, selected.id]);

  const adjustZoom = (delta: number) => {
    targetCamRef.current.zoom = Math.max(0.65, Math.min(2.6, targetCamRef.current.zoom + delta));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let frameCount = 0;

    const project = (
      p: Vec3,
      cam: CameraState,
      w: number,
      h: number,
    ): { sx: number; sy: number; vz: number; scale: number } => {
      const dx = p.x - cam.tx;
      const dy = p.y - cam.ty;
      const dz = p.z - cam.tz;

      const cosY = Math.cos(cam.yaw);
      const sinY = Math.sin(cam.yaw);
      const rx = dx * cosY - dy * sinY;
      const ry = dx * sinY + dy * cosY;

      const cosP = Math.cos(cam.pitch);
      const sinP = Math.sin(cam.pitch);
      const vx = rx;
      const vy = ry * sinP - dz * cosP;
      const vz = ry * cosP + dz * sinP;

      // Calibrated wide-stage scale so the diagonal 1200x650 building fills ~82% of the stage
      const baseScale = Math.min(w / 1450, h / 820);
      const camDist = 2200;
      const persp = camDist / Math.max(600, camDist - vz * 0.35);
      const s = baseScale * cam.zoom * persp;

      return {
        sx: w * 0.5 + vx * s,
        sy: h * 0.52 + vy * s,
        vz,
        scale: s,
      };
    };

    const render = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const { selectedId, lighting: mode, cutawayRoof: isCutaway, autoOrbit: isOrbiting } =
        stateRef.current;

      if (isOrbiting && !dragRef.current.active) {
        targetCamRef.current.yaw += 0.002;
      }

      const cur = currentCamRef.current;
      const tgt = targetCamRef.current;
      const ease = 0.12;
      cur.yaw += (tgt.yaw - cur.yaw) * ease;
      cur.pitch += (tgt.pitch - cur.pitch) * ease;
      cur.zoom += (tgt.zoom - cur.zoom) * ease;
      cur.tx += (tgt.tx - cur.tx) * ease;
      cur.ty += (tgt.ty - cur.ty) * ease;
      cur.tz += (tgt.tz - cur.tz) * ease;

      // Camera view direction in world space (points FROM scene TOWARD camera eye)
      const sinY = Math.sin(cur.yaw);
      const cosY = Math.cos(cur.yaw);
      const sinP = Math.sin(cur.pitch);
      // Since vz = (dx*sinY + dy*cosY)*cosP + dz*sinP increases AWAY from camera,
      // vector toward camera eye is (-sinY*cosP, -cosY*cosP, -sinP)? Wait:
      // Let's check: at yaw=0, pitch=PI/2 (top-down), sinP=1, cosP=0.
      // Top face normal is (0, 0, +1). We SEE the top face!
      // At yaw=0, pitch=0.5 (looking from South toward North? Let's check: South has dy > 0 -> vy = dy*sinP > 0 (bottom of screen), vz = dy*cosP > 0).
      // Wait: if South is at the bottom of the screen (vy > 0), the camera eye is in the SOUTH (+y) and ABOVE (+z)!
      // Let's verify screen cross product directly in 2D screen space — 2D screen winding is 100% immune to axis conventions!

      // 1. Deep Architectural Stage Atmosphere
      const bgGrad = ctx.createRadialGradient(w * 0.52, h * 0.48, 60, w * 0.5, h * 0.5, w * 0.78);
      if (mode === 'golden') {
        bgGrad.addColorStop(0, '#262019');
        bgGrad.addColorStop(0.6, '#15120E');
        bgGrad.addColorStop(1, '#0C0B09');
      } else {
        bgGrad.addColorStop(0, '#181B20');
        bgGrad.addColorStop(0.6, '#101113');
        bgGrad.addColorStop(1, '#0A0908');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Perspective Architectural Blueprint Datum Grid at z = -82
      ctx.lineWidth = 1;
      ctx.strokeStyle =
        mode === 'golden' ? 'rgba(200, 162, 100, 0.09)' : 'rgba(200, 162, 100, 0.065)';
      const gridRange = 840;
      const gridStep = 120;
      for (let g = -gridRange; g <= gridRange; g += gridStep) {
        const a1 = project({ x: g, y: -gridRange, z: -82 }, cur, w, h);
        const b1 = project({ x: g, y: gridRange, z: -82 }, cur, w, h);
        ctx.beginPath();
        ctx.moveTo(a1.sx, a1.sy);
        ctx.lineTo(b1.sx, b1.sy);
        ctx.stroke();

        const a2 = project({ x: -gridRange, y: g, z: -82 }, cur, w, h);
        const b2 = project({ x: gridRange, y: g, z: -82 }, cur, w, h);
        ctx.beginPath();
        ctx.moveTo(a2.sx, a2.sy);
        ctx.lineTo(b2.sx, b2.sy);
        ctx.stroke();
      }

      // Datum dimension callouts on blueprint plane
      const datumLabels: { text: string; pos: Vec3 }[] = [
        { text: 'NORTH CROWN · INFINITY EDGE', pos: { x: 0, y: -690, z: -82 } },
        { text: 'SOUTH ARENA · 2-LANE SKY TRACK', pos: { x: 0, y: 690, z: -82 } },
        { text: 'EAST CURVED BALCONY', pos: { x: 445, y: -20, z: -82 } },
        { text: 'WEST ATELIER & SCREENED MEP', pos: { x: -435, y: 30, z: -82 } },
      ];
      ctx.font = '500 9.5px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(200, 162, 100, 0.48)';
      ctx.textAlign = 'center';
      for (const dl of datumLabels) {
        const dp = project(dl.pos, cur, w, h);
        ctx.fillText(dl.text, dp.sx, dp.sy);
      }

      // 3. Project & Depth-Sort All 3D Faces
      // Note: vz = ry*cosP + dz*sinP. Since South (+y) has vy = ry*sinP > 0 (closer to viewer at bottom of screen!),
      // LARGER ry means CLOSER to viewer when pitch < PI/2, EXCEPT dz*sinP:
      // Wait — let's check true camera eye ray!
      // On screen:
      //   vx = rx
      //   vy = ry * sinP - dz * cosP  (downward on screen: +ry goes down, +dz goes UP!)
      // Therefore the orthogonal ray pointing TOWARD the viewer (out of the screen!) is:
      //   camDepth = ry * cosP + dz * sinP  (larger = CLOSER to the viewer!! Look: +dz is UP toward top of roof = closer to viewer, and +ry is South foreground = closer to viewer!)
      // WAIT A SECOND! Look at that sign:
      //   Top of roof (+dz) is CLOSER to an overhead viewer than bottom of roof (-dz)!
      //   Foreground (+ry, bottom of screen) is CLOSER to an angled viewer than background (-ry, top of screen)!
      //   In BOTH cases, `vz = ry * cosP + dz * sinP` is LARGER when CLOSER to the viewer!
      //   So back-to-front painter's sort MUST draw SMALLER `vz` FIRST (`a.avgVz - b.avgVz`)!!
      const drawable: {
        f: Face3D;
        projPts: { sx: number; sy: number; vz: number }[];
        avgVz: number;
      }[] = [];

      for (const f of SCENE.faces) {
        const projPts = f.pts.map((pt) => project(pt, cur, w, h));
        if (f.cullBackface && projPts.length >= 3) {
          // Screen-space signed area: for outward-wound faces [q00, q10, q11, q01]:
          // At yaw=0, pitch=PI/2: q00=(0,0), q10=(+w,0), q11=(+w,+h) -> cross = (+w)*(+h) - 0 > 0 when facing viewer!
          const ux = projPts[1].sx - projPts[0].sx;
          const uy = projPts[1].sy - projPts[0].sy;
          const vx2 = projPts[2].sx - projPts[0].sx;
          const vy2 = projPts[2].sy - projPts[0].sy;
          if (ux * vy2 - uy * vx2 <= 0) continue;
        }
        let sumVz = 0;
        for (let i = 0; i < projPts.length; i++) sumVz += projPts[i].vz;
        drawable.push({ f, projPts, avgVz: sumVz / projPts.length });
      }

      drawable.sort((a, b) => {
        if (a.f.layer !== b.f.layer) return a.f.layer - b.f.layer;
        return a.avgVz - b.avgVz;
      });

      const pulse = 0.5 + 0.5 * Math.sin(now * 0.0042);

      for (const item of drawable) {
        const { f, projPts } = item;
        const isSelected = f.zoneId === selectedId;
        let alpha = f.alpha ?? 1;
        if (f.isRoof && isCutaway) {
          alpha *= 0.16;
        }

        const normal = computeNormal(f.pts);
        const fillStyle = shadeColor(f.fill, normal, mode, f.emissive ?? 0, isSelected);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(projPts[0].sx, projPts[0].sy);
        for (let i = 1; i < projPts.length; i++) {
          ctx.lineTo(projPts[i].sx, projPts[i].sy);
        }
        ctx.closePath();
        ctx.fillStyle = fillStyle;
        ctx.fill();

        if (isSelected) {
          ctx.strokeStyle = `rgba(200, 162, 100, ${0.58 + 0.36 * pulse})`;
          ctx.lineWidth = 1.65;
          ctx.stroke();
        } else if (f.stroke) {
          ctx.strokeStyle = f.stroke;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Architectural 3D Linework & Animated Water Shimmer
      const waveOffset = Math.sin(now * 0.0028) * 5;
      for (const ln of SCENE.lines) {
        if (ln.isRoof && isCutaway) continue;
        const aPt = ln.animatedWater ? { ...ln.a, y: ln.a.y + waveOffset } : ln.a;
        const bPt = ln.animatedWater ? { ...ln.b, y: ln.b.y + waveOffset } : ln.b;
        const pa = project(aPt, cur, w, h);
        const pb = project(bPt, cur, w, h);
        ctx.save();
        ctx.strokeStyle =
          ln.zoneId === selectedId ? 'rgba(245, 241, 235, 0.94)' : ln.color;
        ctx.lineWidth = ln.width ?? 1;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Live Rotating Compass Rose in Upper-Right Stage Corner
      if (w >= 640) {
        const compX = w - 48;
        const compY = 86;
        const compR = 22;
        ctx.save();
        ctx.fillStyle = 'rgba(14, 13, 11, 0.72)';
        ctx.strokeStyle = 'rgba(200, 162, 100, 0.32)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(compX, compY, compR + 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // North vector in world is (0, -1) -> rotated by yaw: rx = sinY, ry = -cosY
        const nx = sinY * compR * 0.82;
        const ny = -cosY * compR * 0.82 * Math.max(0.45, sinP);

        ctx.strokeStyle = 'rgba(158, 150, 137, 0.45)';
        ctx.beginPath();
        ctx.moveTo(compX - nx, compY - ny);
        ctx.lineTo(compX + nx, compY + ny);
        ctx.stroke();

        ctx.strokeStyle = '#C8A264';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(compX, compY);
        ctx.lineTo(compX + nx, compY + ny);
        ctx.stroke();

        ctx.fillStyle = '#C8A264';
        ctx.font = '600 8.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('N', compX + nx * 1.18, compY + ny * 1.18);
        ctx.restore();
      }

      // 6. Project 3D Hotspot Pins at 60fps
      for (const z of SPATIAL_ZONES) {
        const btn = pinRefs.current[z.id];
        if (!btn) continue;
        const anchor = ZONE_ANCHORS[z.id] ?? {
          x: (z.planCoords.x / 100) * PLAN_W,
          y: (z.planCoords.y / 100) * PLAN_H,
        };
        const topZ = (ZONE_ELEVATION[z.id] ?? 32) + 18;
        const basePt = project(toWorld(anchor.x, anchor.y, 10), cur, w, h);
        const pinPt = project(toWorld(anchor.x, anchor.y, topZ), cur, w, h);

        const isSel = z.id === selectedId;
        ctx.save();
        ctx.strokeStyle = isSel
          ? 'rgba(200, 162, 100, 0.95)'
          : 'rgba(200, 162, 100, 0.38)';
        ctx.lineWidth = isSel ? 1.75 : 1;
        ctx.beginPath();
        ctx.moveTo(basePt.sx, basePt.sy);
        ctx.lineTo(pinPt.sx, pinPt.sy);
        ctx.stroke();

        ctx.fillStyle = isSel ? '#C8A264' : 'rgba(200, 162, 100, 0.6)';
        ctx.beginPath();
        ctx.arc(basePt.sx, basePt.sy, isSel ? 3.5 : 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        btn.style.transform = `translate3d(${pinPt.sx.toFixed(1)}px, ${pinPt.sy.toFixed(1)}px, 0) translate(-50%, -50%)`;
        btn.style.zIndex = isSel ? '35' : String(Math.max(2, Math.round(15 + pinPt.vz * 0.015)));
      }

      ctx.restore();

      frameCount++;
      if (frameCount % 12 === 0) {
        const azDeg = (((Math.round((cur.yaw * 180) / Math.PI) % 360) + 360) % 360);
        const elDeg = Math.round((cur.pitch * 180) / Math.PI);
        setTelemetry({
          az: azDeg,
          el: elDeg,
          zoom: cur.zoom.toFixed(2),
        });
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setAutoOrbit(false);
    dragRef.current = {
      active: true,
      lastX: e.clientX,
      lastY: e.clientY,
      mode: e.shiftKey || e.button === 2 ? 'pan' : 'orbit',
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;

    if (dragRef.current.mode === 'orbit') {
      targetCamRef.current.yaw += dx * 0.0068;
      targetCamRef.current.pitch = Math.max(
        0.22,
        Math.min(1.52, targetCamRef.current.pitch + dy * 0.006),
      );
    } else {
      const cosY = Math.cos(targetCamRef.current.yaw);
      const sinY = Math.sin(targetCamRef.current.yaw);
      const factor = 1.35 / targetCamRef.current.zoom;
      targetCamRef.current.tx -= (dx * cosY + dy * sinY) * factor;
      targetCamRef.current.ty -= (-dx * sinY + dy * cosY) * factor;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Only zoom with wheel when Ctrl/Cmd is pressed OR in fullscreen mode so vertical page scroll never gets hijacked
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!e.ctrlKey && !e.metaKey && !fullscreen) return;
    e.preventDefault();
    adjustZoom(e.deltaY < 0 ? 0.14 : -0.14);
  };

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-[#0B0A08] text-travertine">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onContextMenu={(e) => e.preventDefault()}
        onWheel={handleWheel}
        aria-label="Interactive 3D architectural maquette of The Rooftop Sanctuary"
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
      />

      {/* 3D Projected Clickable Hotspot Pins */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {SPATIAL_ZONES.map((z) => {
          const active = selected.id === z.id;
          return (
            <button
              key={z.id}
              ref={(el) => {
                pinRefs.current[z.id] = el;
              }}
              type="button"
              onClick={() => flyToZone(z)}
              aria-label={`Inspect 3D zone ${z.pinLabel}: ${z.name}`}
              aria-pressed={active}
              className="pointer-events-auto absolute left-0 top-0 focus:outline-none"
            >
              <span
                className={`flex items-center gap-1.5 rounded-full font-mono text-[10px] tracking-wider transition-all duration-200 ${
                  active
                    ? 'pin-pulse bg-brass px-3 py-1 font-semibold text-obsidian shadow-xl ring-2 ring-travertine'
                    : 'border border-brass/75 bg-obsidian/88 px-2.5 py-1 text-travertine shadow-md hover:scale-105 hover:bg-brass hover:text-obsidian'
                }`}
              >
                <span>{z.pinLabel}</span>
                <span className={active ? 'inline' : 'hidden xl:inline opacity-75'}>
                  · {z.mapCode}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Top HUD Bar: Camera Presets + Lighting / Cutaway / Orbit / Fullscreen */}
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-40 flex flex-wrap items-center justify-between gap-2.5">
        <div className="pointer-events-auto inline-flex flex-wrap items-center gap-1 rounded-full border hairline bg-obsidian/88 p-1.5 shadow-xl backdrop-blur-md">
          {(Object.keys(CAMERA_PRESETS) as CameraPresetId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => applyPreset(id)}
              className={`rounded-full px-3 py-1.5 eyebrow text-[9.5px] transition-colors ${
                preset === id
                  ? 'bg-brass text-obsidian'
                  : 'text-stone hover:text-travertine'
              }`}
            >
              {CAMERA_PRESETS[id].label}
            </button>
          ))}
        </div>

        <div className="pointer-events-auto inline-flex flex-wrap items-center gap-1 rounded-full border hairline bg-obsidian/88 p-1.5 shadow-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLighting((m) => (m === 'twilight' ? 'golden' : 'twilight'))}
            title="Switch between 2700K Twilight and Balinese Golden Hour"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 eyebrow text-[9.5px] text-travertine transition-colors hover:bg-charcoal"
          >
            {lighting === 'twilight' ? (
              <>
                <Sunset className="h-3.5 w-3.5 text-brass" strokeWidth={1.25} />
                <span>2700K Twilight</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-brass" strokeWidth={1.25} />
                <span>Golden Hour</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCutawayRoof((v) => !v)}
            title="Peel back pavilion roofs to inspect studio interiors"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 eyebrow text-[9.5px] transition-colors ${
              cutawayRoof
                ? 'bg-brass/20 text-brass'
                : 'text-stone hover:text-travertine'
            }`}
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={1.25} />
            <span>{cutawayRoof ? 'Roof X-Ray' : 'Solid Roof'}</span>
          </button>

          <button
            type="button"
            onClick={() => setAutoOrbit((v) => !v)}
            title="Toggle 360° turntable rotation"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 eyebrow text-[9.5px] transition-colors ${
              autoOrbit ? 'bg-brass text-obsidian' : 'text-stone hover:text-travertine'
            }`}
          >
            <RotateCw
              className={`h-3.5 w-3.5 ${autoOrbit ? 'animate-spin' : ''}`}
              strokeWidth={1.25}
            />
            <span>Turntable</span>
          </button>

          <button
            type="button"
            onClick={onToggleFullscreen}
            title={fullscreen ? 'Exit Fullscreen Stage' : 'Expand 3D Stage to Fullscreen'}
            className="inline-flex items-center gap-1.5 rounded-full border border-brass/35 px-3 py-1.5 eyebrow text-[9.5px] text-brass transition-colors hover:bg-brass hover:text-obsidian"
          >
            {fullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom-Right HUD Bar: Camera Telemetry & Zoom Controls */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-40 flex flex-wrap items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border hairline bg-obsidian/88 px-3.5 py-1.5 backdrop-blur-md lg:inline-flex">
          <Compass className="h-3.5 w-3.5 text-brass" strokeWidth={1.25} />
          <span className="eyebrow text-[9px] text-stone">
            DRAG ORBIT · SHIFT+DRAG PAN · {fullscreen ? 'SCROLL' : 'CMD+SCROLL'} ZOOM
          </span>
        </div>

        <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border hairline bg-obsidian/88 p-1 shadow-xl backdrop-blur-md">
          <span className="px-2.5 font-mono text-[9.5px] text-stone">
            AZ {telemetry.az}° · EL {telemetry.el}° · {telemetry.zoom}×
          </span>
          <button
            type="button"
            onClick={() => adjustZoom(-0.2)}
            aria-label="Zoom out 3D stage"
            className="rounded-full p-1.5 text-stone hover:bg-charcoal hover:text-travertine"
          >
            <ZoomOut className="h-3.5 w-3.5" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => adjustZoom(0.2)}
            aria-label="Zoom in 3D stage"
            className="rounded-full p-1.5 text-stone hover:bg-charcoal hover:text-travertine"
          >
            <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => applyPreset('signature')}
            aria-label="Reset 3D camera to signature aerial"
            className="rounded-full p-1.5 text-brass hover:bg-charcoal"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
