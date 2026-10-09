"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Loads only Motion's DOM animation features. `strict` makes any stray
 * full-size `motion.*` import throw, so the bundle can't quietly regrow.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
