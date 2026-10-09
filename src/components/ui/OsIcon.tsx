import styles from "./OsIcon.module.css";

const BARS = [0.34, 0.62, 0.9, 0.55, 0.78, 0.4, 0.22];

/** The system's app tile: a glossy blue squircle carrying a voice waveform. */
export function OsIcon({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={`${styles.icon} ${className ?? ""}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <span className={styles.bars}>
        {BARS.map((height, index) => (
          <span key={index} style={{ "--h": height, "--i": index } as React.CSSProperties} />
        ))}
      </span>
    </span>
  );
}
