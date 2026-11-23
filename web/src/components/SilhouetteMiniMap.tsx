import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Minimize2, Maximize2 } from 'lucide-react';
import { CHAPTERS, SPATIAL_ZONES, type ChapterId } from '../data/zones';

interface SilhouetteMiniMapProps {
  activeChapter: ChapterId;
  highlightedZoneId: string | null;
  onSelectZone: (zoneId: string, chapterId: ChapterId) => void;
}

export function SilhouetteMiniMap({
  activeChapter,
  highlightedZoneId,
  onSelectZone,
}: SilhouetteMiniMapProps) {
  const [expanded, setExpanded] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const chapterMeta = CHAPTERS.find((c) => c.id === activeChapter) ?? CHAPTERS[0];
  const isDark = chapterMeta.theme === 'dark';
  const showHud = activeChapter !== 'vision';

  const isZoneActive = (zoneId: string) => {
    if (hoveredId) return hoveredId === zoneId;
    if (highlightedZoneId) return highlightedZoneId === zoneId;
    return chapterMeta.activeZoneIds.includes(zoneId);
  };

  const activeZoneObj =
    SPATIAL_ZONES.find((z) => z.id === (hoveredId ?? highlightedZoneId)) ?? null;

  const zoneFill = (zoneId: string, activeColor: string, inactiveLight: string, inactiveDark: string) => {
    if (isZoneActive(zoneId)) return activeColor;
    return isDark ? inactiveDark : inactiveLight;
  };

  return (
    <AnimatePresence>
      {showHud && (
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Rooftop spatial mini-map"
          className={`no-print fixed bottom-5 right-5 z-40 transition-colors duration-500 backdrop-blur-xl border ${
            isDark
              ? 'bg-[#161614]/86 text-[#F5F1EB] border-[#F5F1EB]/16 shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
              : 'bg-[#F5F1EB]/88 text-[#1F1D1A] border-[#1F1D1A]/15 shadow-[0_12px_36px_rgba(31,29,26,0.08)]'
          } ${expanded ? 'w-[186px]' : 'w-auto'}`}
        >
      {/* Top Bar */}
      <div
        className={`flex items-center justify-between gap-2.5 px-3 py-2 border-b ${
          isDark ? 'border-[#F5F1EB]/12' : 'border-[#1F1D1A]/12'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#B8935A]" strokeWidth={1.25} />
          <span className="font-spec text-[9px]">
            {expanded ? 'SITE HUD // N↑' : `CH ${chapterMeta.code}`}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? 'Collapse spatial mini-map' : 'Expand spatial mini-map'}
          className="p-0.5 opacity-65 hover:opacity-100 transition-opacity cursor-pointer"
        >
          {expanded ? (
            <Minimize2 className="w-3 h-3" strokeWidth={1.25} />
          ) : (
            <Maximize2 className="w-3 h-3" strokeWidth={1.25} />
          )}
        </button>
      </div>

      {expanded && (
        <div className="p-3">
          {/* True Building Silhouette SVG (Stepped North Dome, Curved East Balcony, Screened Core, West Bump-Out, South 3-Bay + Track) */}
          <svg
            viewBox="0 0 180 308"
            className="w-full h-auto block select-none"
            role="img"
            aria-label="Schematic rooftop silhouette showing North Infinity Pool, Bali Café, Salon, Recovery, Curved East Balcony, Screened Mechanical Core, and South Fitness Track"
          >
            <defs>
              <pattern
                id="mep-hatch"
                width="6"
                height="6"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke={isDark ? 'rgba(245,241,235,0.28)' : 'rgba(31,29,26,0.26)'}
                  strokeWidth="1.2"
                />
              </pattern>
            </defs>

            {/* Outer True Building Silhouette Outline */}
            <path
              d="
                M 54 36
                A 36 28 0 0 1 126 36
                L 136 36 L 136 48
                L 146 48 L 146 62
                L 156 62 L 156 122
                A 21 23 0 0 1 156 168
                L 156 196
                L 168 196 L 168 298
                L 12 298 L 12 196
                L 12 162 L 22 162
                L 22 62 L 34 62
                L 34 48 L 44 48
                L 44 36 Z
              "
              fill={isDark ? 'rgba(245,241,235,0.03)' : 'rgba(234,227,217,0.55)'}
              stroke={isDark ? 'rgba(245,241,235,0.34)' : 'rgba(31,29,26,0.38)'}
              strokeWidth="1.2"
            />

            {/* NORTH POOL (P) — Semicircle Infinity Basin + Lap Channel */}
            <g
              className="cursor-pointer transition-opacity"
              onMouseEnter={() => setHoveredId('pool')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('pool', 'north-deck')}
            >
              <path
                d="
                  M 58 36
                  A 32 24 0 0 1 122 36
                  L 122 40
                  L 103 40
                  L 103 82
                  L 111 82
                  L 111 94
                  L 77 94
                  L 77 40
                  L 58 40 Z
                "
                fill={zoneFill('pool', '#2F6E73', 'rgba(47,110,115,0.22)', 'rgba(47,110,115,0.28)')}
                stroke={isZoneActive('pool') ? '#2F6E73' : 'rgba(47,110,115,0.5)'}
                strokeWidth="1"
              />
              <text
                x="90"
                y="31"
                textAnchor="middle"
                fontSize="7"
                fontFamily="JetBrains Mono, monospace"
                fill={isZoneActive('pool') ? '#F5F1EB' : isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                P · ∞
              </text>
            </g>

            {/* WRAP-AROUND BALI CAFÉ (C Left & Right Stepped Wings) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('cafe')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('cafe', 'north-deck')}
            >
              <path
                d="M 46 40 L 66 40 L 66 78 L 28 78 L 28 65 L 38 65 L 38 51 L 46 51 Z"
                fill={zoneFill('cafe', 'rgba(184,147,90,0.72)', 'rgba(184,147,90,0.2)', 'rgba(184,147,90,0.16)')}
                stroke="#B8935A"
                strokeWidth="0.9"
              />
              <path
                d="M 114 40 L 134 40 L 134 51 L 142 51 L 142 65 L 152 65 L 152 78 L 114 78 Z"
                fill={zoneFill('cafe', 'rgba(184,147,90,0.72)', 'rgba(184,147,90,0.2)', 'rgba(184,147,90,0.16)')}
                stroke="#B8935A"
                strokeWidth="0.9"
              />
              <text
                x="48"
                y="69"
                textAnchor="middle"
                fontSize="6.5"
                fontFamily="JetBrains Mono, monospace"
                fill={isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                C
              </text>
              <text
                x="133"
                y="69"
                textAnchor="middle"
                fontSize="6.5"
                fontFamily="JetBrains Mono, monospace"
                fill={isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                C
              </text>
            </g>

            {/* LUXURY SALON (S — Northwest) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('salon')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('salon', 'north-deck')}
            >
              <rect
                x="25"
                y="82"
                width="38"
                height="24"
                fill={zoneFill('salon', 'rgba(184,147,90,0.85)', 'rgba(184,147,90,0.2)', 'rgba(184,147,90,0.15)')}
                stroke="#B8935A"
                strokeWidth="0.9"
              />
              <text
                x="44"
                y="97"
                textAnchor="middle"
                fontSize="7"
                fontFamily="JetBrains Mono, monospace"
                fill={isZoneActive('salon') ? '#1F1D1A' : isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                S
              </text>
            </g>

            {/* RECOVERY SUITE (R — Northeast) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('recovery')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('recovery', 'east-corridor')}
            >
              <rect
                x="119"
                y="82"
                width="33"
                height="24"
                fill={zoneFill('recovery', '#2F4838', 'rgba(47,72,56,0.2)', 'rgba(47,72,56,0.25)')}
                stroke="#2F4838"
                strokeWidth="0.9"
              />
              <text
                x="135.5"
                y="97"
                textAnchor="middle"
                fontSize="7"
                fontFamily="JetBrains Mono, monospace"
                fill={isZoneActive('recovery') ? '#F5F1EB' : isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                R
              </text>
            </g>

            {/* EXCLUDED MECHANICAL CORE (Hatched Utility Block — Screened) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('mep')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('mep', 'east-corridor')}
            >
              <rect
                x="26"
                y="114"
                width="82"
                height="76"
                fill="url(#mep-hatch)"
                stroke={
                  isZoneActive('mep')
                    ? '#B8935A'
                    : isDark
                      ? 'rgba(245,241,235,0.35)'
                      : 'rgba(31,29,26,0.35)'
                }
                strokeDasharray="3 2"
                strokeWidth="1"
              />
              <text
                x="67"
                y="149"
                textAnchor="middle"
                fontSize="6"
                fontFamily="JetBrains Mono, monospace"
                fill={isDark ? 'rgba(245,241,235,0.72)' : 'rgba(31,29,26,0.68)'}
              >
                UTILITY CORE
              </text>
              <text
                x="67"
                y="159"
                textAnchor="middle"
                fontSize="5.2"
                fontFamily="JetBrains Mono, monospace"
                fill={isDark ? 'rgba(245,241,235,0.5)' : 'rgba(107,101,92,0.85)'}
              >
                (SCREENED)
              </text>
            </g>

            {/* EAST PROMENADE + CURVED PROJECTING BALCONY */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('promenade')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('promenade', 'east-corridor')}
            >
              <path
                d="M 116 112 L 152 112 L 152 124 A 19 21 0 0 1 152 166 L 152 190 L 116 190 Z"
                fill={zoneFill('promenade', 'rgba(47,72,56,0.78)', 'rgba(47,72,56,0.18)', 'rgba(47,72,56,0.22)')}
                stroke="#2F4838"
                strokeWidth="0.9"
              />
              <text
                x="136"
                y="148"
                textAnchor="middle"
                fontSize="5.6"
                fontFamily="JetBrains Mono, monospace"
                fill={isZoneActive('promenade') ? '#F5F1EB' : isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                EAST
              </text>
            </g>

            {/* PERIMETER TERRACOTTA RUNNING TRACK (South Loop) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('track')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('track', 'south-fitness')}
            >
              <rect
                x="19"
                y="204"
                width="142"
                height="86"
                rx="16"
                fill="none"
                stroke={zoneFill('track', '#B5583B', 'rgba(181,88,59,0.4)', 'rgba(181,88,59,0.45)')}
                strokeWidth={isZoneActive('track') ? '6.5' : '5'}
              />
            </g>

            {/* SOUTH 3-BAY PAVILION: G.CLASS | PILATES | GYM */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('group-class')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('group-class', 'south-fitness')}
            >
              <rect
                x="32"
                y="219"
                width="36"
                height="56"
                fill={zoneFill('group-class', 'rgba(184,147,90,0.82)', 'rgba(31,29,26,0.08)', 'rgba(245,241,235,0.12)')}
                stroke={isDark ? 'rgba(245,241,235,0.4)' : 'rgba(31,29,26,0.35)'}
                strokeWidth="0.8"
              />
              <text
                x="50"
                y="250"
                textAnchor="middle"
                fontSize="5.4"
                fontFamily="JetBrains Mono, monospace"
                fill={isZoneActive('group-class') ? '#1F1D1A' : isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                CLASS
              </text>
            </g>

            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('pilates')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('pilates', 'south-fitness')}
            >
              <rect
                x="72"
                y="219"
                width="36"
                height="56"
                fill={zoneFill('pilates', 'rgba(184,147,90,0.82)', 'rgba(31,29,26,0.08)', 'rgba(245,241,235,0.12)')}
                stroke={isDark ? 'rgba(245,241,235,0.4)' : 'rgba(31,29,26,0.35)'}
                strokeWidth="0.8"
              />
              <text
                x="90"
                y="250"
                textAnchor="middle"
                fontSize="5.2"
                fontFamily="JetBrains Mono, monospace"
                fill={isZoneActive('pilates') ? '#1F1D1A' : isDark ? '#F5F1EB' : '#1F1D1A'}
              >
                PILATES
              </text>
            </g>

            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId('gym')}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectZone('gym', 'south-fitness')}
            >
              <rect
                x="112"
                y="219"
                width="36"
                height="56"
                fill={zoneFill('gym', isDark ? '#B8935A' : '#161614', 'rgba(22,22,20,0.22)', 'rgba(245,241,235,0.16)')}
                stroke={isDark ? 'rgba(245,241,235,0.4)' : 'rgba(31,29,26,0.45)'}
                strokeWidth="0.8"
              />
              <text
                x="130"
                y="250"
                textAnchor="middle"
                fontSize="5.8"
                fontFamily="JetBrains Mono, monospace"
                fill={
                  isZoneActive('gym')
                    ? isDark
                      ? '#161614'
                      : '#F5F1EB'
                    : isDark
                      ? '#F5F1EB'
                      : '#1F1D1A'
                }
              >
                GYM
              </text>
            </g>
          </svg>

          {/* Active Zone Readout */}
          <div
            className={`mt-2.5 pt-2 border-t text-left ${
              isDark ? 'border-[#F5F1EB]/12' : 'border-[#1F1D1A]/12'
            }`}
          >
            <p className="font-spec text-[8.5px] text-[#B8935A] truncate">
              {activeZoneObj
                ? `${activeZoneObj.mapCode} // ${activeZoneObj.wing}`
                : `CH ${chapterMeta.code} // ${chapterMeta.label}`}
            </p>
            <p className="text-[11px] font-medium truncate mt-0.5">
              {activeZoneObj ? activeZoneObj.name : 'Click any zone to jump'}
            </p>
          </div>
        </div>
      )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
