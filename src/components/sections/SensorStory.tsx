"use client";

import { gsap } from "gsap";

import { sensorChapters } from "@/data/content";
import { sensorScreen } from "@/lib/ringTrack";
import { useScene } from "@/lib/useScene";

import { MediaSlot } from "../ui/MediaSlot";
import { PulseChart, SleepChart, StepsChart } from "./SensorCharts";
import styles from "./SensorStory.module.css";

/** Which sensor window each feature label points at, per chapter. */
const FEATURE_SENSORS: Record<string, number[]> = {
  cardio: [0, 1],
  recovery: [1, 2],
  activity: [2],
};

const CARD_PALETTES = {
  cardio: ["#c9d3cf", "#43525a", "#1d2427"],
  recovery: ["#e8d7c6", "#8a7466", "#2e2620"],
  activity: ["#cbd8c6", "#4d5c45", "#1c2219"],
} as const;

const CHARTS = { cardio: PulseChart, recovery: SleepChart, activity: StepsChart };

/**
 * Three chapters about what the ring measures. The ring tips forward to show
 * its sensor windows; curved leader lines run from each label to the live
 * on-screen position of the window it describes.
 */
export function SensorStory() {
  const ref = useScene<HTMLElement>(({ scrub, ring, q, reduced, section }) => {
    ring([
      { at: 0, pose: { x: 0.02, y: 0.0, size: 0.6, rx: 0.78, ry: 0.42, rz: -0.25, finish: 0, glow: 0, spin: 0, sensor: 1, opacity: 1 } },
      { at: 0.3, pose: { rx: 0.8, ry: 0.36, rz: -0.18, sensor: 1 } },
      { at: 0.36, pose: { rx: 0.72, ry: 0.2, rz: 0.05, sensor: 2 } },
      { at: 0.63, pose: { rx: 0.74, ry: 0.12, rz: 0.12, sensor: 2 } },
      { at: 0.7, pose: { rx: 0.7, ry: -0.05, rz: 0.35, sensor: 3 } },
      { at: 1, pose: { rx: 0.66, ry: -0.12, rz: 0.42, sensor: 3 } },
    ]);

    const chapters = q(`.${styles.chapter}`);
    const paths = q(`.${styles.leader} path`);
    const dots = q(`.${styles.leader} circle`);

    if (!reduced) {
      const tl = scrub();
      chapters.forEach((chapter, index) => {
        const start = index / chapters.length;
        const parts = chapter.querySelectorAll("[data-line]");
        const card = chapter.querySelector(`.${styles.card}`);
        tl.fromTo(chapter, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, start + 0.01)
          .fromTo(parts, { opacity: 0, y: 18, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.012, duration: 0.06 }, start + 0.01)
          .fromTo(card, { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.08 }, start + 0.04);
        if (index < chapters.length - 1) {
          tl.to(parts, { opacity: 0, y: -14, filter: "blur(5px)", stagger: 0.008, duration: 0.04 }, start + 0.27)
            .to(card, { opacity: 0, y: -30, scale: 0.97, duration: 0.05 }, start + 0.27)
            .to(chapter, { autoAlpha: 0, duration: 0.01 }, start + 0.32);
        }
      });
    } else {
      gsap.set(chapters[0], { autoAlpha: 1 });
    }

    // Leader lines follow the ring every frame while the section is on screen.
    const draw = () => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      let used = 0;
      chapters.forEach((chapter) => {
        const alpha = Number(gsap.getProperty(chapter, "opacity"));
        if (alpha < 0.05 || chapter.style.visibility === "hidden") return;
        const sensorIds = FEATURE_SENSORS[chapter.dataset.chapter ?? ""] ?? [];
        chapter.querySelectorAll<HTMLElement>(`.${styles.featureName}`).forEach((label, index) => {
          const sensor = sensorScreen[sensorIds[index]];
          const path = paths[used];
          const dot = dots[used];
          used += 1;
          if (!sensor || !path || !dot) return;
          const box = label.getBoundingClientRect();
          const x1 = box.right + 16;
          const y1 = box.top + box.height / 2;
          const { x: x2, y: y2 } = sensor;
          const mid = (x1 + x2) / 2;
          path.setAttribute("d", `M${x1 - 120} ${y1} L${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
          path.style.opacity = sensor.facing ? String(alpha) : "0";
          dot.setAttribute("cx", String(x2));
          dot.setAttribute("cy", String(y2));
          dot.style.opacity = sensor.facing ? String(alpha) : "0";
        });
      });
      for (let i = used; i < paths.length; i += 1) {
        paths[i].style.opacity = "0";
        dots[i].style.opacity = "0";
      }
    };
    gsap.ticker.add(draw);
    return () => gsap.ticker.remove(draw);
  });

  return (
    <section ref={ref} className={styles.section} aria-label="What the ring senses">
      <div className={styles.stage}>
        <svg className={styles.leader} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path />
              <circle r="18" />
            </g>
          ))}
        </svg>

        {sensorChapters.map((chapter) => {
          const Chart = CHARTS[chapter.id];
          return (
            <article key={chapter.id} className={styles.chapter} data-chapter={chapter.id}>
              <header className={styles.head}>
                <p className="eyebrow" data-line>
                  {chapter.eyebrow}
                </p>
                <h3 className={styles.title} data-line>
                  {chapter.title}
                </h3>
              </header>

              <ul className={styles.features}>
                {chapter.features.map((feature) => (
                  <li key={feature.name} className={styles.feature}>
                    <p className={styles.featureName} data-line>
                      {feature.name}
                    </p>
                    <p className={styles.featureBody} data-line>
                      {feature.body}
                    </p>
                  </li>
                ))}
              </ul>

              <figure className={styles.card}>
                <div className={styles.cardMedia}>
                  <MediaSlot palette={CARD_PALETTES[chapter.id]} seed={chapter.id.length * 13} />
                </div>
                <figcaption className={styles.cardBody}>
                  <span className={styles.cardTitle}>{chapter.card.title}</span>
                  <span className={styles.cardCaption}>{chapter.card.caption}</span>
                  <span className={styles.cardStat}>
                    {chapter.card.stat} <small>{chapter.card.statLabel}</small>
                  </span>
                  <Chart />
                </figcaption>
              </figure>
            </article>
          );
        })}
      </div>
    </section>
  );
}
