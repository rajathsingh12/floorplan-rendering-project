import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Tiny external store for the persistent HUD (nav + silhouette rail).
 * Sections publish the active chapter and an optional zone "focus" so the
 * silhouette mini-map can light up exactly where the viewer is standing.
 */
interface HudState {
  chapter: string;
  focus: Record<string, string[] | undefined>;
  menuOpen: boolean;
}

let state: HudState = { chapter: 'arrival', focus: {}, menuOpen: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const hud = {
  get: () => state,
  setChapter(chapter: string) {
    if (state.chapter === chapter) return;
    state = { ...state, chapter };
    emit();
  },
  setFocus(chapter: string, zones?: string[]) {
    const prev = state.focus[chapter];
    if (prev?.join('|') === zones?.join('|')) return;
    state = { ...state, focus: { ...state.focus, [chapter]: zones } };
    emit();
  },
  setMenu(menuOpen: boolean) {
    if (state.menuOpen === menuOpen) return;
    state = { ...state, menuOpen };
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useHud() {
  return useSyncExternalStore(hud.subscribe, hud.get, hud.get);
}

export function useChapterSpy() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) hud.setChapter(e.target.getAttribute('data-chapter') ?? 'arrival');
        });
      },
      { rootMargin: '-49% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}
