/**
 * One-shot signal fired when the preloader lifts. Hero motion waits on it so
 * nothing animates underneath the white panel.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let started = false;

export function startIntro(): void {
  if (started) return;
  started = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function onIntro(listener: Listener): () => void {
  if (started) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}
