"use client";

import { outro } from "@/data/content";
import { mulberry32 } from "@/lib/motion";
import { useScene } from "@/lib/useScene";

import styles from "./Outro.module.css";

/** Ridge line across the full width: a few octaves of seeded noise. */
function ridge(seed: number, base: number, amplitude: number, roughness: number): string {
  const rand = mulberry32(seed);
  const phases = [rand() * 6, rand() * 6, rand() * 6];
  const points: string[] = [];
  for (let x = 0; x <= 1600; x += 16) {
    const t = x / 1600;
    const y =
      base -
      amplitude *
        (0.55 * Math.sin(t * 5.2 + phases[0]) +
          0.3 * Math.sin(t * 13 + phases[1]) * roughness +
          0.15 * Math.sin(t * 31 + phases[2]) * roughness +
          (rand() - 0.5) * 0.12 * roughness);
    points.push(`${x},${y.toFixed(1)}`);
  }
  return `M0,900 L${points.join(" L")} L1600,900 Z`;
}

const LAYERS = [
  { d: ridge(11, 470, 150, 1), fill: "url(#outro-far)" },
  { d: ridge(23, 560, 90, 0.8), fill: "url(#outro-mid)" },
  { d: ridge(37, 690, 40, 0.4), fill: "url(#outro-meadow)" },
  { d: ridge(41, 800, 22, 0.3), fill: "#6f9a3f" },
];

/** A procedural alpine meadow under one oversized line of type. */
export function Outro() {
  const ref = useScene<HTMLElement>(({ scrub, q, reduced }) => {
    if (reduced) return;
    const layers = q(`.${styles.scene} path`);
    const [line] = q(`.${styles.line}`);
    const tl = scrub({ start: "top bottom", end: "bottom bottom" });
    layers.forEach((layer, index) => tl.fromTo(layer, { y: 60 + index * 40 }, { y: 0, duration: 1 }, 0));
    tl.fromTo(line, { yPercent: 35, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6 }, 0.3);
  });

  return (
    <section ref={ref} className={styles.section} aria-label={outro.line}>
      <svg className={styles.scene} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="outro-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f9ad6" />
            <stop offset="0.6" stopColor="#9ed2ec" />
            <stop offset="1" stopColor="#e9f4f4" />
          </linearGradient>
          <linearGradient id="outro-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9c7d3" />
            <stop offset="1" stopColor="#7d91a3" />
          </linearGradient>
          <linearGradient id="outro-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7f8f84" />
            <stop offset="1" stopColor="#4f6a52" />
          </linearGradient>
          <linearGradient id="outro-meadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a6c46a" />
            <stop offset="1" stopColor="#7ea64a" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#outro-sky)" />
        <g className={styles.clouds}>
          <ellipse cx="300" cy="170" rx="180" ry="34" fill="#fff" opacity="0.7" />
          <ellipse cx="1180" cy="120" rx="240" ry="40" fill="#fff" opacity="0.6" />
          <ellipse cx="820" cy="230" rx="140" ry="22" fill="#fff" opacity="0.45" />
        </g>
        {LAYERS.map((layer) => (
          <path key={layer.d.slice(0, 24)} d={layer.d} fill={layer.fill} />
        ))}
      </svg>
      <p className={styles.line} aria-hidden="true">
        {outro.line}
      </p>
    </section>
  );
}
