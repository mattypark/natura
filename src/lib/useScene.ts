"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type RefObject } from "react";

import { prefersReducedMotion } from "./motion";
import { addRingKeys, type RingKey } from "./ringTrack";

export type SceneTools = {
  section: HTMLElement;
  reduced: boolean;
  /** Scrubbed timeline across the section's sticky range (top→top to bottom→bottom). */
  scrub: (vars?: ScrollTrigger.Vars) => gsap.core.Timeline;
  /** Ring keyframes positioned across a trigger range (defaults to the sticky range). */
  ring: (keys: RingKey[], vars?: ScrollTrigger.Vars) => void;
  q: (selector: string) => HTMLElement[];
};

/**
 * Builds a section's scroll choreography inside a GSAP context, so every
 * tween and trigger is reverted on unmount. Sections are tall wrappers with a
 * CSS `position: sticky` stage inside; the default range is the stretch where
 * that stage is stuck.
 */
export function useScene<T extends HTMLElement>(
  build: (tools: SceneTools) => void | (() => void),
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = prefersReducedMotion();
    const removers: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const range = { trigger: section, start: "top top", end: "bottom bottom" };
      const cleanup = build({
        section,
        reduced,
        q: (selector) => Array.from(section.querySelectorAll<HTMLElement>(selector)),
        scrub: (vars) => gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { ...range, scrub: reduced ? true : 0.6, ...vars } }),
        ring: (keys, vars) => {
          const trigger = ScrollTrigger.create({ ...range, ...vars });
          removers.push(addRingKeys(trigger, keys));
        },
      });
      if (cleanup) removers.push(cleanup);
    }, section);

    return () => {
      removers.forEach((remove) => remove());
      ctx.revert();
    };
    // The build function is static per section; re-running it would rebuild every trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
