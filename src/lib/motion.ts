export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Deterministic PRNG so procedural visuals render the same every load. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Runs `onVisible(true|false)` as the element enters and leaves the viewport,
 * so canvases can pause their render loops off-screen.
 */
export function observeVisibility(
  element: Element,
  onVisible: (visible: boolean) => void,
  rootMargin = "100px",
): () => void {
  const observer = new IntersectionObserver(
    ([entry]) => onVisible(entry.isIntersecting),
    { rootMargin },
  );
  observer.observe(element);
  return () => observer.disconnect();
}
