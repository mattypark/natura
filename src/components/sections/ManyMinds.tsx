"use client";

import { manyMinds } from "@/data/content";
import { useScene } from "@/lib/useScene";

import styles from "./ManyMinds.module.css";

/**
 * Two lines of display type. The ring drops in from above, slides across the
 * words and settles dead centre, ready to rush the camera into the orbit.
 */
export function ManyMinds() {
  const ref = useScene<HTMLElement>(({ scrub, ring, q, reduced }) => {
    ring([
      { at: 0, pose: { x: 0.04, y: -0.62, size: 0.36, rx: 0.2, ry: 0.4, rz: 0, finish: 0, glow: 0, sensor: 0, spin: 0, opacity: 1 } },
      { at: 0.45, pose: { x: 0, y: -0.15, size: 0.42, rx: 0.05, ry: 0.1 } },
      { at: 0.75, pose: { x: -0.18, y: 0.08, size: 0.34, rx: 0, ry: 0 } },
      { at: 1, pose: { x: 0, y: 0, size: 0.9, rx: 0, ry: 0, rz: 0 } },
    ]);

    if (reduced) return;
    const lines = q(`.${styles.line}`);
    scrub()
      .fromTo(lines[0], { xPercent: 8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3 }, 0)
      .fromTo(lines[1], { xPercent: -8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3 }, 0.08)
      .to(lines, { opacity: 0.18, filter: "blur(10px)", scale: 0.96, duration: 0.25 }, 0.75);
  });

  return (
    <section ref={ref} className={styles.section} aria-label={`${manyMinds.lineOne} ${manyMinds.lineTwo}`}>
      <div className={styles.stage}>
        <p className={styles.type} aria-hidden="true">
          <span className={`${styles.line} ${styles.one}`}>{manyMinds.lineOne}</span>
          <span className={`${styles.line} ${styles.two}`}>{manyMinds.lineTwo}</span>
        </p>
      </div>
    </section>
  );
}
