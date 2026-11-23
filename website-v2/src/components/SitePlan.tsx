import { motion } from 'framer-motion';
import { useId } from 'react';
import { MEP_CROSS, SILHOUETTE, ZONE_PATHS } from '../data/siteplan';
import { ZONE, ZONE_TINT } from '../data/chapters';

interface SitePlanProps {
  active?: string[];
  tone?: 'light' | 'dark';
  className?: string;
  onSelect?: (zoneId: string) => void;
  viewBox?: string;
  strokeScale?: number;
  title?: string;
}

/**
 * Schematic true-silhouette site plan rendered in dark obsidian/brass style.
 */
export function SitePlan({
  active = [],
  className = '',
  onSelect,
  viewBox = '70 34 650 1290',
  strokeScale = 1,
  title = 'Rooftop silhouette site plan',
}: SitePlanProps) {
  const uid = useId().replace(/:/g, '');
  const ink = '#F5F1EB';

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={title}>
      <defs>
        <pattern id={`hatch-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="16" stroke={ink} strokeOpacity="0.28" strokeWidth="3" />
        </pattern>
      </defs>

      <path
        d={SILHOUETTE}
        fill={ink}
        fillOpacity={0.035}
        stroke="#C8A264"
        strokeOpacity={0.75}
        strokeWidth={6 * strokeScale}
        strokeLinejoin="round"
      />

      {Object.entries(ZONE_PATHS).map(([id, d]) => {
        const isActive = active.includes(id);
        const zone = ZONE[id];
        const interactive = Boolean(onSelect);
        if (id === 'mep') {
          return (
            <g key={id} opacity={isActive ? 1 : 0.65}>
              <path d={d} fill={`url(#hatch-${uid})`} stroke={ink} strokeOpacity="0.45" strokeWidth={4 * strokeScale} />
              <path d={MEP_CROSS} stroke={ink} strokeOpacity="0.4" strokeWidth={4 * strokeScale} />
            </g>
          );
        }
        return (
          <motion.path
            key={id}
            d={d}
            fillRule="evenodd"
            initial={false}
            animate={{
              fill: isActive ? ZONE_TINT[id] : ink,
              fillOpacity: isActive ? 0.88 : 0.08,
            }}
            transition={{ duration: 0.55 }}
            stroke={ink}
            strokeOpacity={0.32}
            strokeWidth={2.5 * strokeScale}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            onClick={interactive ? () => onSelect?.(id) : undefined}
          >
            <title>{zone?.name}</title>
          </motion.path>
        );
      })}
    </svg>
  );
}
