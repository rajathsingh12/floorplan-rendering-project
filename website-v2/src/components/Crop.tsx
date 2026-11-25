import { motion, type Transition } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { EASE, clamp } from '../lib/motion';

interface CropProps {
  src: string;
  alt: string;
  /** natural width / height of the source image */
  aspect: number;
  /** focal point in 0–1 image space */
  focus: [number, number];
  /** zoom relative to "cover" */
  zoom?: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  transition?: Transition;
}

/**
 * "Camera" crop of a single render: frames any focal point at any zoom and
 * animates smoothly between framings — used to fly across the approved renders
 * without needing extra assets.
 */
export function Crop({
  src,
  alt,
  aspect,
  focus,
  zoom = 1,
  className = '',
  imgClassName = '',
  eager,
  transition,
}: CropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const baseW = Math.max(w, h * aspect);
  const imgW = baseW * zoom;
  const imgH = imgW / aspect;
  const x = clamp(w / 2 - focus[0] * imgW, w - imgW, 0);
  const y = clamp(h / 2 - focus[1] * imgH, h - imgH, 0);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {w > 0 && (
        <motion.img
          src={src}
          alt={alt}
          draggable={false}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute left-0 top-0 max-w-none select-none ${imgClassName}`}
          initial={{ x, y, width: imgW, height: imgH }}
          animate={{ x, y, width: imgW, height: imgH }}
          transition={transition ?? { duration: 1.3, ease: EASE }}
        />
      )}
    </div>
  );
}

const BASE_URL = import.meta.env.BASE_URL;

export const RENDERS = {
  iso: { src: `${BASE_URL}renders/isometric-approved.png`, aspect: 1376 / 768 },
  plan: { src: `${BASE_URL}renders/masterplan-approved.png`, aspect: 768 / 1376 },
  north: { src: `${BASE_URL}renders/north-deck-render.png`, aspect: 1376 / 768 },
  south: { src: `${BASE_URL}renders/south-fitness-render.png`, aspect: 1376 / 768 },
  satellite: { src: `${BASE_URL}renders/map-view.png`, aspect: 848 / 1920 },
} as const;
