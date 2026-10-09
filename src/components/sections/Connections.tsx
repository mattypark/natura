"use client";

import { connections } from "@/data/content";
import { mulberry32 } from "@/lib/motion";
import { useScene } from "@/lib/useScene";

import { APP_TILE_IDS, AppTile } from "../ui/AppTile";
import { OsIcon } from "../ui/OsIcon";
import styles from "./Connections.module.css";

/** Seeded scatter so the cloud looks hand-placed but stays identical every load. */
const rand = mulberry32(2026);
const CLOUD = APP_TILE_IDS.map((id, index) => {
  const angle = (index / APP_TILE_IDS.length) * Math.PI * 2 + rand() * 0.4;
  const reach = 0.42 + rand() * 0.5;
  return {
    id,
    // Rounded so server and client print identical style strings.
    x: Math.round(Math.cos(angle) * reach * 4600) / 100,
    y: Math.round(Math.sin(angle) * reach * 4000) / 100,
    depth: 0.55 + rand() * 0.6,
    delay: rand(),
  };
});

/**
 * A loose cloud of everyday apps drifts toward the centre and folds into the
 * system icon, then the line about never opening them lands bottom left.
 */
export function Connections() {
  const ref = useScene<HTMLElement>(({ scrub, q, reduced }) => {
    const tiles = q(`.${styles.tile}`);
    const [icon] = q(`.${styles.icon}`);
    const copy = q(`.${styles.copy} > *`);
    if (reduced) return;

    const tl = scrub();
    tiles.forEach((tile, index) => {
      const spec = CLOUD[index];
      tl.fromTo(
        tile,
        { opacity: 0, scale: spec.depth * 0.6, filter: `blur(${(1.2 - spec.depth) * 8}px)` },
        { opacity: 1, scale: spec.depth, filter: "blur(0px)", duration: 0.12 },
        spec.delay * 0.12,
      ).to(
        tile,
        { left: "50%", top: "50%", scale: 0.1, opacity: 0, duration: 0.3, ease: "power2.in" },
        0.32 + spec.delay * 0.14,
      );
    });
    tl.fromTo(icon, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(1.6)" }, 0.3)
      .to(icon, { scale: 1.08, duration: 0.08, yoyo: true, repeat: 1 }, 0.62)
      .fromTo(copy, { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.1 }, 0.7);
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="connections-title">
      <div className={styles.stage}>
        <ul className={styles.cloud} aria-hidden="true">
          {CLOUD.map((spec) => (
            <li
              key={spec.id}
              className={styles.tile}
              style={{ left: `${50 + spec.x}%`, top: `${50 + spec.y}%`, zIndex: Math.round(spec.depth * 10) }}
            >
              <AppTile id={spec.id} />
            </li>
          ))}
        </ul>
        <OsIcon className={styles.icon} />
        <div className={styles.copy}>
          <h3 id="connections-title" className={styles.title}>
            {connections.title}
          </h3>
          <p className={styles.body}>{connections.body}</p>
        </div>
      </div>
    </section>
  );
}
