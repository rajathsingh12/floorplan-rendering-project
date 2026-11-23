export const EASE = [0.22, 1, 0.36, 1] as const;

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
