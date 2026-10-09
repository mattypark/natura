"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { agents, orbitChapters } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { AgentGlyph } from "../ui/AgentGlyph";
import { Laptop, Phone } from "../ui/Devices";
import styles from "./AgentOrbit.module.css";

/** Ring hole radius as a share of viewport height, for a ring of a given size. */
const holeRadius = (size: number) => `${(0.84 * size * 50).toFixed(2)}vh`;
const ENTRY_SIZE = 0.9;
const EXIT_SIZE = 5;
/** Degrees the whole orbit turns across the section. */
const ORBIT_TURN = 110;

/**
 * The page's centrepiece. The ring rushes the camera and its hole opens onto
 * a circle of agent tiles. The circle turns as you scroll while the centre
 * trades the ring for a laptop, then a phone, and the copy either side swaps
 * from "pick your agents" to "they can use your devices".
 */
export function AgentOrbit() {
  const ref = useScene<HTMLElement>(({ scrub, ring, q, reduced, section }) => {
    ring([
      { at: 0, pose: { x: 0, y: 0, size: ENTRY_SIZE, rx: 0, ry: 0, rz: 0, opacity: 1, spin: 0, glow: 0, finish: 0 } },
      { at: 0.1, pose: { size: EXIT_SIZE, opacity: 0 } },
      { at: 0.13, pose: { size: 0.12, rx: 0.3, ry: -0.4 } },
      { at: 0.2, pose: { size: 0.3, opacity: 1, rx: 0.32, ry: -0.2, spin: 0.7, glow: 0.9 } },
      { at: 0.44, pose: { size: 0.3, opacity: 1 } },
      { at: 0.52, pose: { size: 0.08, opacity: 0, spin: 0, glow: 0 } },
    ]);

    const [stage] = q(`.${styles.stage}`);
    const [orbit] = q(`.${styles.orbit}`);
    const [track] = q(`.${styles.track}`);
    const tiles = q(`.${styles.tile}`);
    const [laptop] = q(`.${styles.laptop}`);
    const [phone] = q(`.${styles.phone}`);
    const titles = q(`.${styles.title}`);
    const bodies = q(`.${styles.body}`);

    // The section overlaps the one above by a viewport so the hole can open
    // over it; keep the stage hidden until it is actually stuck in place.
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      onEnter: () => stage.classList.add(styles.live),
      onLeaveBack: () => stage.classList.remove(styles.live),
    });

    if (reduced) {
      stage.style.clipPath = "none";
      return;
    }

    const tl = scrub();
    tl.fromTo(
      stage,
      { clipPath: `circle(${holeRadius(ENTRY_SIZE)} at 50% 50%)` },
      { clipPath: `circle(${holeRadius(EXIT_SIZE)} at 50% 50%)`, ease: "power1.inOut", duration: 0.1 },
      0,
    )
      .fromTo(tiles, { scale: 0.4, opacity: 0, filter: "blur(10px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", stagger: 0.006, duration: 0.08 }, 0.02)
      .fromTo(track, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.12 }, 0.04)
      .fromTo(orbit, { "--turn": "0deg" }, { "--turn": `${ORBIT_TURN}deg`, duration: 0.9 }, 0.1)

      // Chapter one: pick a voice.
      .fromTo(titles[0].children, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.02, duration: 0.07 }, 0.12)
      .fromTo(bodies[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.07 }, 0.15)
      .to(titles[0].children, { opacity: 0, y: -20, filter: "blur(6px)", stagger: 0.015, duration: 0.05 }, 0.45)
      .to(bodies[0], { opacity: 0, y: -16, duration: 0.05 }, 0.45)

      // Chapter two: they work your devices.
      .fromTo(titles[1].children, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.02, duration: 0.07 }, 0.52)
      .fromTo(bodies[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.07 }, 0.55)
      .fromTo(laptop, { opacity: 0, scale: 0.7, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.5)
      .to(laptop, { opacity: 0, scale: 0.85, y: -20, duration: 0.05 }, 0.74)
      .fromTo(phone, { opacity: 0, scale: 0.7, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.77);
  });

  return (
    <section ref={ref} className={styles.section} id="agents" aria-label="Your agents">
      <div className={styles.stage}>
        <div className={styles.orbit} style={{ "--count": agents.length } as React.CSSProperties}>
          <svg className={styles.trackSvg} viewBox="0 0 100 100" aria-hidden="true">
            <circle className={styles.track} cx="50" cy="50" r="49.5" pathLength="1" />
          </svg>
          <ul className={styles.tiles}>
            {agents.map((agent, index) => (
              <li key={agent.id} className={styles.slot} style={{ "--i": index } as React.CSSProperties}>
                <span className={styles.tile} tabIndex={0} aria-label={`${agent.name}, ${agent.role}`}>
                  <AgentGlyph id={agent.id} size="100%" />
                  <span className={styles.tip} aria-hidden="true">
                    <strong>{agent.name}</strong>
                    {agent.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.center}>
            <Laptop className={styles.laptop} />
            <Phone className={styles.phone} />
          </div>
        </div>

        {orbitChapters.map((chapter) => (
          <div key={chapter.id} className={styles.chapter}>
            <h2 className={`h2 ${styles.title}`}>
              {chapter.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className={styles.body}>{chapter.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
