"use client";

import { hero } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { MediaSlot } from "../ui/MediaSlot";
import styles from "./Hero.module.css";

const HERO_PALETTE = ["#f3d2a6", "#6e4b35", "#1b120d"] as const;

/**
 * Opening scene: a warm, dim room with the ring floating in it. Scrolling
 * pulls the ring toward the camera into a white bloom, and the room gives
 * way to the cream page underneath.
 */
export function Hero() {
  const ref = useScene<HTMLElement>(({ scrub, ring, q, reduced }) => {
    ring([
      { at: 0, pose: { x: 0.12, y: 0.02, size: 0.66, rx: -0.42, ry: 0.55, rz: 0.2, opacity: 1, spin: 0.22, glow: 0.9, finish: 0 } },
      { at: 0.38, pose: { x: 0, y: 0, size: 1.9, rx: 0.15, ry: 0.15, rz: 0, glow: 0.4 } },
      { at: 0.5, pose: { size: 3.6, opacity: 0, spin: 0 } },
      { at: 0.56, pose: { size: 0.16, rx: 0.2, ry: -0.3 } },
      { at: 0.78, pose: { size: 0.44, opacity: 1, rx: 0.4, ry: -0.7, rz: 0.1, glow: 0 } },
    ]);

    if (reduced) return;
    const [scene] = q(`.${styles.scene}`);
    const [bloom] = q(`.${styles.bloom}`);
    const [copy] = q(`.${styles.copyLayer}`);
    scrub()
      .to(copy, { opacity: 0, y: -24, duration: 0.15 }, 0)
      .to(scene, { scale: 1.12, duration: 0.45 }, 0)
      .fromTo(bloom, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1.6, duration: 0.25 }, 0.25)
      .to(scene, { opacity: 0, duration: 0.05 }, 0.5)
      .to(bloom, { opacity: 0, duration: 0.35 }, 0.55);
  });

  return (
    <section ref={ref} className={styles.hero} id="ring" aria-label={hero.title}>
      <h1 className="sr-only">{hero.title}</h1>
      <div className={styles.stage}>
        <div className={styles.scene}>
          <MediaSlot palette={HERO_PALETTE} seed={7} label="A warm room at dusk" />
        </div>
        <div className={styles.bloom} aria-hidden="true" />
        <div className={styles.copyLayer}>
          <p className={`${styles.copy} ${styles.caption}`}>{hero.caption}</p>
          <p className={`${styles.copy} ${styles.scroll}`} aria-hidden="true">
            <span>{hero.scroll}</span>
            <span className={styles.scrollLine} />
          </p>
        </div>
      </div>
    </section>
  );
}
