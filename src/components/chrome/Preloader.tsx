"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import { brand, intro } from "@/data/content";
import { startIntro } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/motion";

import styles from "./Preloader.module.css";

/** Show the "taking longer" note if fonts and the scene aren't ready by then. */
const SLOW_AFTER_MS = 6000;

/**
 * Lagoon-blue curtain: the wordmark writes in, a pen stroke underlines it,
 * then the curtain lifts away and the page starts.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [slow, setSlow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    document.documentElement.dataset.intro = "playing";

    if (prefersReducedMotion()) {
      document.documentElement.dataset.intro = "done";
      startIntro();
      setGone(true);
      return;
    }

    const slowTimer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    const word = root.querySelector(`.${styles.word}`);
    const stroke = root.querySelector<SVGPathElement>(`.${styles.stroke} path`);
    const length = stroke?.getTotalLength() ?? 0;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(word, { opacity: 0, y: 14, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" })
      .fromTo(stroke, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.35)
      .to(root, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "+=0.35")
      .add(() => {
        document.documentElement.dataset.intro = "done";
        startIntro();
      }, "-=0.55")
      .add(() => setGone(true));

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      window.clearTimeout(slowTimer);
      setSlow(false);
      tl.play();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(slowTimer);
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className={styles.root} role="status" aria-live="polite">
      <span className="sr-only">{intro.loading}</span>
      <div className={styles.mark} aria-hidden="true">
        <span className={styles.word}>{brand.legal}</span>
        <svg className={styles.stroke} viewBox="0 0 120 16" preserveAspectRatio="none">
          <path d="M2 10 C 24 15, 48 3, 72 8 S 108 12, 118 4" />
        </svg>
      </div>
      {slow && (
        <div className={styles.slow}>
          <p>{intro.slow}</p>
          <button type="button" onClick={() => window.location.reload()}>
            {intro.retry}
          </button>
        </div>
      )}
    </div>
  );
}
