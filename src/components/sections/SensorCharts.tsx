import { mulberry32 } from "@/lib/motion";

import styles from "./SensorStory.module.css";

/** Small, deterministic sample data so the charts read like a real day. */
const rand = mulberry32(42);
const pulseHours = Array.from({ length: 24 }, (_, hour) => {
  const awake = hour >= 7 && hour <= 22;
  const base = awake ? 62 + Math.sin((hour - 7) / 2.4) * 8 : 52;
  const spread = awake ? 10 + rand() * 26 : 4 + rand() * 6;
  return { low: Math.round(base - spread * 0.35), high: Math.round(base + spread) };
});

const stepHours = Array.from({ length: 24 }, (_, hour) => {
  if (hour < 7 || hour > 22) return 0;
  const commute = hour === 8 || hour === 18 ? 900 : 0;
  return Math.round(120 + rand() * 380 + commute);
});

/** Hypnogram from 11:05 pm to 7:12 am, as [stage, minutes]. 0 awake, 1 REM, 2 light, 3 deep. */
const sleep: [number, number][] = [
  [0, 12], [2, 30], [3, 46], [2, 22], [1, 18], [2, 34], [3, 38], [2, 26], [1, 24],
  [0, 4], [2, 36], [3, 20], [2, 28], [1, 30], [2, 40], [1, 22], [0, 7],
];
const STAGE_NAMES = ["Awake", "REM", "Light", "Deep"];
const STAGE_COLORS = ["#f2a65a", "#7fc9e0", "#4f9fc4", "#2b5f8a"];

const W = 260;
const H = 120;

export function PulseChart() {
  const max = 130;
  const min = 40;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} aria-hidden="true">
      {[120, 80, 40].map((line) => (
        <g key={line}>
          <line x1="0" x2={W - 22} y1={y(line)} y2={y(line)} className={styles.grid} />
          <text x={W} y={y(line) + 3} className={styles.axis} textAnchor="end">
            {line}
          </text>
        </g>
      ))}
      {pulseHours.map((hour, index) => (
        <rect
          key={index}
          x={index * ((W - 26) / 24) + 2}
          y={y(hour.high)}
          width="5"
          height={Math.max(4, y(hour.low) - y(hour.high))}
          rx="2.5"
          className={styles.bar}
          style={{ "--i": index } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

export function SleepChart() {
  const total = sleep.reduce((sum, [, minutes]) => sum + minutes, 0);
  let cursor = 0;
  const rowH = H / 4;
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className={styles.chart} aria-hidden="true">
      {STAGE_NAMES.map((name, stage) => (
        <text key={name} x="0" y={stage * rowH + rowH / 2 + 3} className={styles.axis}>
          {name}
        </text>
      ))}
      {sleep.map(([stage, minutes], index) => {
        const x = 44 + (cursor / total) * (W - 44);
        cursor += minutes;
        const width = (minutes / total) * (W - 44);
        return (
          <rect
            key={index}
            x={x}
            y={stage * rowH + 4}
            width={Math.max(2, width - 1)}
            height={rowH - 8}
            rx="3"
            fill={STAGE_COLORS[stage]}
            className={styles.block}
            style={{ "--i": index } as React.CSSProperties}
          />
        );
      })}
      <text x="44" y={H + 14} className={styles.axis}>
        11 pm
      </text>
      <text x={W} y={H + 14} className={styles.axis} textAnchor="end">
        7 am
      </text>
    </svg>
  );
}

export function StepsChart() {
  const max = 1400;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} aria-hidden="true">
      <line x1="0" x2={W - 30} y1={H - 1} y2={H - 1} className={styles.grid} />
      <text x={W} y={10} className={styles.axis} textAnchor="end">
        1,400
      </text>
      <text x={W} y={H} className={styles.axis} textAnchor="end">
        0
      </text>
      {stepHours.map((steps, index) => {
        const height = Math.max(2, (steps / max) * (H - 8));
        return (
          <rect
            key={index}
            x={index * ((W - 34) / 24) + 2}
            y={H - height}
            width="6"
            height={height}
            rx="2"
            className={styles.bar}
            style={{ "--i": index } as React.CSSProperties}
          />
        );
      })}
    </svg>
  );
}
