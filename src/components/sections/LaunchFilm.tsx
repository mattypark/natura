"use client";

import { useRef } from "react";

import { filmTeaser } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { MediaSlot } from "../ui/MediaSlot";
import styles from "./LaunchFilm.module.css";

const FILM_PALETTE = ["#f6c27e", "#8b2e1f", "#140b08"] as const;

/** The launch film as a full-bleed card that opens up from an inset frame. */
export function LaunchFilm() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const ref = useScene<HTMLElement>(({ scrub, q, reduced }) => {
    const [card] = q(`.${styles.card}`);
    const [title] = q(`.${styles.title}`);
    if (reduced) return;
    scrub({ start: "top bottom", end: "top top" })
      .fromTo(card, { scale: 0.62, borderRadius: "48px", yPercent: 10 }, { scale: 1, borderRadius: "28px", yPercent: 0, duration: 1, ease: "power2.out" }, 0)
      .fromTo(title, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 }, 0.5);
  });

  return (
    <section ref={ref} className={styles.section} id="film" aria-label={filmTeaser.dialogTitle}>
      <div className={styles.card}>
        <MediaSlot palette={FILM_PALETTE} seed={88} label={filmTeaser.dialogTitle} />
        <p className={styles.title} aria-hidden="true">
          {filmTeaser.title}
        </p>
        <button type="button" className={styles.play} onClick={() => dialogRef.current?.showModal()}>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
          </svg>
          <span>{filmTeaser.label}</span>
        </button>
      </div>

      <dialog ref={dialogRef} className={styles.dialog} aria-label={filmTeaser.dialogTitle}>
        <div className={styles.dialogFrame}>
          <MediaSlot palette={FILM_PALETTE} seed={89} />
          <p className={styles.dialogNote}>{filmTeaser.dialogBody}</p>
        </div>
        <form method="dialog">
          <button type="submit" className={styles.close}>
            {filmTeaser.close}
          </button>
        </form>
      </dialog>
    </section>
  );
}
