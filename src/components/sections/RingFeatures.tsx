"use client";

import { useRef } from "react";

import { filmTeaser, ringFeatures } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { MediaSlot } from "../ui/MediaSlot";
import styles from "./RingFeatures.module.css";

const FILM_PALETTE = ["#f0c79a", "#7a2f22", "#1d0f0b"] as const;

/**
 * The ring holds centre stage while two short chapters trade places around
 * it: the button, then the mic and light. A film teaser waits bottom right.
 */
export function RingFeatures() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const ref = useScene<HTMLElement>(({ scrub, ring, q, reduced }) => {
    ring([
      { at: 0, pose: { x: 0, y: 0.02, size: 0.62, rx: 0.32, ry: -0.75, rz: 0.12, opacity: 1, spin: 0, finish: 0, glow: 0 } },
      { at: 0.4, pose: { rx: 0.18, ry: -0.35, rz: 0.06 } },
      { at: 0.55, pose: { rx: -0.25, ry: 0.85, rz: -0.18, finish: 1, glow: 1 } },
      { at: 0.95, pose: { rx: -0.2, ry: 1.05, rz: -0.12, finish: 1, glow: 0.6 } },
    ]);

    const chapters = q(`.${styles.chapter}`);
    if (reduced) return;
    const tl = scrub();
    chapters.forEach((chapter, index) => {
      const lines = chapter.querySelectorAll("[data-line]");
      const start = index * 0.5;
      tl.fromTo(lines, { opacity: 0, y: 28, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.03, duration: 0.12 }, start + 0.02);
      if (index < chapters.length - 1) {
        tl.to(lines, { opacity: 0, y: -20, filter: "blur(6px)", stagger: 0.02, duration: 0.1 }, start + 0.38);
      }
    });
  });

  const openFilm = () => dialogRef.current?.showModal();

  return (
    <section ref={ref} className={styles.section} aria-label="Cue ring features">
      <div className={styles.stage}>
        {ringFeatures.map((feature) => (
          <article key={feature.id} className={styles.chapter}>
            <div className={styles.titleCol}>
              <p className="eyebrow" data-line>
                {feature.eyebrow}
              </p>
              <h2 className={`h2 ${styles.title}`} data-line>
                {feature.title}
              </h2>
            </div>
            <p className={`lead ${styles.body}`} data-line>
              {feature.body}
            </p>
          </article>
        ))}

        <button type="button" className={styles.teaser} onClick={openFilm} aria-label={`${filmTeaser.label}: ${filmTeaser.title}`}>
          <span className={styles.teaserMedia}>
            <MediaSlot palette={FILM_PALETTE} seed={21} />
          </span>
          <span className={styles.teaserTitle}>{filmTeaser.title}</span>
          <span className={styles.teaserPlay} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.teaserLabel}>{filmTeaser.label}</span>
        </button>
      </div>

      <dialog ref={dialogRef} className={styles.dialog} aria-label={filmTeaser.dialogTitle}>
        <div className={styles.dialogFrame}>
          <MediaSlot palette={FILM_PALETTE} seed={22} />
          <p className={styles.dialogNote}>{filmTeaser.dialogBody}</p>
        </div>
        <form method="dialog">
          <button type="submit" className={styles.dialogClose}>
            {filmTeaser.close}
          </button>
        </form>
      </dialog>
    </section>
  );
}
