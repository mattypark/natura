"use client";

import { gsap } from "gsap";

import { agents, gallery } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { AgentGlyph } from "../ui/AgentGlyph";
import { MediaSlot } from "../ui/MediaSlot";
import styles from "./Gallery.module.css";

/** Max swing, in degrees, of a card as it moves off centre. */
const MAX_TILT = 14;

/**
 * Three everyday moments slide past on a horizontal track. Each scene card
 * swings slightly on its vertical axis as it leaves centre, with the agent's
 * tile pinned to its corner and the exchange floating beside it.
 */
export function Gallery() {
  const ref = useScene<HTMLElement>(({ scrub, q, reduced }) => {
    const [track] = q(`.${styles.track}`);
    const cards = q(`.${styles.card}`);
    const notes = q(`.${styles.note}`);
    if (reduced) return;

    const tilts = cards.map((card) => gsap.quickSetter(card, "rotationY", "deg"));
    const tilt = () => {
      const mid = window.innerWidth / 2;
      cards.forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const offset = (box.left + box.width / 2 - mid) / window.innerWidth;
        tilts[index](gsap.utils.clamp(-MAX_TILT, MAX_TILT, offset * -MAX_TILT * 1.6));
      });
    };

    scrub({ invalidateOnRefresh: true, onUpdate: tilt })
      .fromTo(
        track,
        { x: () => window.innerWidth * 0.35 },
        { x: () => -(track.scrollWidth - window.innerWidth * 0.65), duration: 1 },
        0,
      )
      .fromTo(notes, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.28, duration: 0.12 }, 0.05);
    tilt();
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        {gallery.heading}
      </h2>
      <p className="sr-only">{gallery.sub}</p>
      <div className={styles.stage}>
        <ol className={styles.track}>
          {gallery.scenes.map((scene, index) => {
            const agent = agents.find((item) => item.id === scene.agent);
            return (
              <li key={scene.id} className={styles.item}>
                <figure className={styles.card}>
                  <MediaSlot palette={scene.palette} seed={index * 31 + 5} label={`${agent?.name} scene`} />
                  <AgentGlyph id={scene.agent} size="clamp(44px, 4.4vw, 64px)" className={styles.badge} />
                </figure>
                <article className={styles.note}>
                  <header className={styles.noteHead}>
                    <AgentGlyph id={scene.agent} size={20} />
                    <span className={styles.noteAgent}>{agent?.name}</span>
                    <span className={styles.noteStatus}>Done</span>
                  </header>
                  <p className={styles.noteYou}>
                    <span className="sr-only">You: </span>
                    {scene.you}
                  </p>
                  <p className={styles.noteReply}>
                    <span className="sr-only">{agent?.name}: </span>
                    {scene.reply}
                  </p>
                  <p className={styles.noteDetail}>{scene.detail}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
