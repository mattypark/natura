import type { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One ring is rendered for the whole page. Sections don't animate it
 * directly; they drop keyframes on a shared scroll track, and the ring stage
 * samples the track at the current scroll position every frame. That keeps
 * the ring continuous across section boundaries and correct after a reload
 * halfway down the page.
 */

export type RingPose = {
  /** Centre offset as a fraction of viewport width / height (0 = centre). */
  x: number;
  y: number;
  /** Outer diameter as a fraction of viewport height. */
  size: number;
  rx: number;
  ry: number;
  rz: number;
  opacity: number;
  /** Idle spin around the band's axis, radians per second. */
  spin: number;
  /** 0 = brushed titanium, 1 = pearl ceramic. */
  finish: number;
  /** Listening glow on the band, 0..1. */
  glow: number;
  /** Highlights a sensor window (index + 1), 0 = none. */
  sensor: number;
};

export const HIDDEN_POSE: RingPose = {
  x: 0,
  y: 0,
  size: 0.5,
  rx: 0,
  ry: 0,
  rz: 0,
  opacity: 0,
  spin: 0,
  finish: 0,
  glow: 0,
  sensor: 0,
};

export type RingKey = {
  /** Progress through the owning trigger's range, 0..1. */
  at: number;
  pose: Partial<RingPose>;
};

type Entry = { trigger: ScrollTrigger; keys: RingKey[] };

type ResolvedKey = { y: number; pose: RingPose };

const entries = new Set<Entry>();
let resolved: ResolvedKey[] = [];
let dirty = true;

export function addRingKeys(trigger: ScrollTrigger, keys: RingKey[]): () => void {
  const entry = { trigger, keys };
  entries.add(entry);
  dirty = true;
  return () => {
    entries.delete(entry);
    dirty = true;
  };
}

/** Call after ScrollTrigger refreshes, since pin spacing moves every start/end. */
export function markRingTrackDirty(): void {
  dirty = true;
}

function resolve(): void {
  const flat: { y: number; pose: Partial<RingPose> }[] = [];
  entries.forEach(({ trigger, keys }) => {
    const span = trigger.end - trigger.start;
    keys.forEach((key) => flat.push({ y: trigger.start + span * key.at, pose: key.pose }));
  });
  flat.sort((a, b) => a.y - b.y);

  // Carry unspecified properties forward so each key is a complete pose.
  let carry: RingPose = { ...HIDDEN_POSE };
  resolved = flat.map(({ y, pose }) => {
    carry = { ...carry, ...pose };
    return { y, pose: carry };
  });
  dirty = false;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

const KEYS = Object.keys(HIDDEN_POSE) as (keyof RingPose)[];

/** Pose at an absolute scroll position, eased between the surrounding keys. */
export function sampleRingTrack(scrollY: number, out: RingPose): RingPose {
  if (dirty) resolve();
  if (resolved.length === 0) return Object.assign(out, HIDDEN_POSE);

  const first = resolved[0];
  const last = resolved[resolved.length - 1];
  if (scrollY <= first.y) return Object.assign(out, first.pose);
  if (scrollY >= last.y) return Object.assign(out, last.pose);

  let index = 1;
  while (index < resolved.length && resolved[index].y < scrollY) index += 1;
  const a = resolved[index - 1];
  const b = resolved[index];
  const t = smooth((scrollY - a.y) / Math.max(1, b.y - a.y));

  KEYS.forEach((key) => {
    out[key] = key === "sensor" ? (t < 0.5 ? a.pose.sensor : b.pose.sensor) : a.pose[key] + (b.pose[key] - a.pose[key]) * t;
  });
  return out;
}

/** Live screen positions of the sensor windows, written by the ring stage. */
export type SensorPoint = { x: number; y: number; facing: boolean };

export const sensorScreen: SensorPoint[] = [
  { x: 0, y: 0, facing: false },
  { x: 0, y: 0, facing: false },
  { x: 0, y: 0, facing: false },
];
