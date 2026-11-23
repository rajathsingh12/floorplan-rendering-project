import Lenis from 'lenis';

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ autoRaf: true, lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

export function scrollToY(y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, { duration: immediate ? 0 : 1.6, immediate });
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  scrollToY(y, immediate);
}

export function lockScroll(lock: boolean) {
  if (lenis) {
    if (lock) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}
