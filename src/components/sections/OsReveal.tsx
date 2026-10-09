"use client";

import { kinetic, osReveal, smallRing } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { AgentGlyph } from "../ui/AgentGlyph";
import { OsIcon } from "../ui/OsIcon";
import styles from "./OsReveal.module.css";

const FOLDER_AGENTS = ["sprout", "quill", "nova"];
const MINI_AGENTS = ["atlas", "tally", "echo", "pip"];

/** Splits "*accent* plain" copy into words, flagging the accented ones. */
function kineticWords(text: string) {
  return text.split(" ").map((raw) => ({ word: raw.replaceAll("*", ""), accent: raw.startsWith("*") }));
}

/**
 * Four beats on one sticky stage: the agents gather into a folder tile, the
 * system's name sweeps in with its app icon, icon and ring pair up, and a
 * sentence assembles word by word.
 */
export function OsReveal() {
  const ref = useScene<HTMLElement>(({ scrub, ring, q, reduced }) => {
    ring([
      { at: 0.46, pose: { x: 0.16, y: 0.02, size: 0.12, rx: 0, ry: 0.6, rz: 0, opacity: 0, spin: 0, glow: 0, finish: 0, sensor: 0 } },
      { at: 0.53, pose: { x: 0.1, y: 0.0, size: 0.34, rx: 0.12, ry: 0.25, opacity: 1 } },
      { at: 0.7, pose: { x: 0.1, y: 0.0, size: 0.34, rx: 0.05, ry: -0.1 } },
      { at: 0.78, pose: { x: 0.12, y: -0.28, size: 0.08, rx: 0, ry: 0 } },
      { at: 0.86, pose: { opacity: 0 } },
    ]);

    const [folder] = q(`.${styles.folder}`);
    const [word] = q(`.${styles.wordmark}`);
    const letters = q(`.${styles.wordmark} [data-letter]`);
    const [wordBody] = q(`.${styles.wordBody}`);
    const [icon] = q(`.${styles.icon}`);
    const [pair] = q(`.${styles.pair}`);
    const pairParts = q(`.${styles.pair} [data-line]`);
    const words = q(`.${styles.kinetic} [data-word]`);

    if (reduced) return;

    scrub()
      // Beat 1: the folder.
      .fromTo(folder, { scale: 0.7, opacity: 0, filter: "blur(10px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.06 }, 0)
      .to(folder, { scale: 0.5, opacity: 0, filter: "blur(6px)", duration: 0.06 }, 0.13)

      // Beat 2: the wordmark, with the icon sweeping across it.
      .fromTo(word, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.15)
      .fromTo(letters, { yPercent: 60, opacity: 0, filter: "blur(10px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", stagger: 0.008, duration: 0.07 }, 0.15)
      .fromTo(wordBody, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.05 }, 0.24)
      .fromTo(icon, { xPercent: 260, yPercent: -40, scale: 0.6, opacity: 0 }, { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, duration: 0.14, ease: "power2.out" }, 0.17)
      .to(letters, { yPercent: -40, opacity: 0, filter: "blur(8px)", stagger: 0.005, duration: 0.06 }, 0.38)
      .to(wordBody, { opacity: 0, duration: 0.04 }, 0.38)
      .to(icon, { xPercent: -150, scale: 0.8, duration: 0.1, ease: "power1.inOut" }, 0.4)

      // Beat 3: icon and ring side by side.
      .fromTo(pair, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.46)
      .fromTo(pairParts, { opacity: 0, y: 22, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.012, duration: 0.06 }, 0.47)
      .to(pairParts, { opacity: 0, y: -16, filter: "blur(6px)", stagger: 0.006, duration: 0.05 }, 0.69)
      .to(icon, { xPercent: 0, yPercent: 120, scale: 0.42, opacity: 0, duration: 0.08 }, 0.7)

      // Beat 4: the sentence.
      .fromTo(words, { opacity: 0.08, filter: "blur(8px)", y: 10 }, { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.015, duration: 0.05 }, 0.76);
  });

  return (
    <section ref={ref} className={styles.section} id="os" aria-label={`${osReveal.wordmarkStart}${osReveal.wordmarkEnd}`}>
      <div className={styles.stage}>
        <div className={styles.folder} aria-hidden="true">
          {FOLDER_AGENTS.map((id) => (
            <AgentGlyph key={id} id={id} size="100%" />
          ))}
          <span className={styles.mini}>
            {MINI_AGENTS.map((id) => (
              <AgentGlyph key={id} id={id} size="100%" />
            ))}
          </span>
        </div>

        <div className={styles.wordmark}>
          <h2 className={styles.wordType} aria-label={`${osReveal.wordmarkStart}${osReveal.wordmarkEnd}`}>
            {Array.from(osReveal.wordmarkStart).map((letter, index) => (
              <span key={`s${index}`} data-letter aria-hidden="true">
                {letter}
              </span>
            ))}
            {Array.from(osReveal.wordmarkEnd).map((letter, index) => (
              <span key={`e${index}`} data-letter className="accent" aria-hidden="true">
                {letter}
              </span>
            ))}
          </h2>
          <p className={`small ${styles.wordBody}`}>{osReveal.body}</p>
        </div>

        <div className={styles.iconSlot}>
          <OsIcon className={styles.icon} />
        </div>

        <div className={styles.pair}>
          <div className={styles.pairHead}>
            <p className="eyebrow" data-line>
              {smallRing.eyebrow}
            </p>
            <h3 className={styles.pairTitle}>
              {smallRing.title.map((line) => (
                <span key={line} data-line>
                  {line}
                </span>
              ))}
            </h3>
          </div>
          <p className={`small ${styles.pairBody}`} data-line>
            {smallRing.body}
          </p>
        </div>

        <p className={styles.kinetic}>
          {kineticWords(kinetic).map(({ word, accent }, index) => (
            <span key={index} data-word className={accent ? "accent" : undefined}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
