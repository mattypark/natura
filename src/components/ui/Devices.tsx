import { agents, devices } from "@/data/content";

import { AgentGlyph } from "./AgentGlyph";
import styles from "./Devices.module.css";

/** Laptop drawn in CSS, its screen showing the assistant's idle prompt. */
export function Laptop({ className }: { className?: string }) {
  return (
    <div className={`${styles.laptop} ${className ?? ""}`} aria-hidden="true">
      <div className={styles.lid}>
        <div className={styles.screen}>
          <div className={styles.screenSky} />
          <div className={styles.window}>
            <p className={styles.windowTitle}>{devices.laptopTitle}</p>
            <div className={styles.prompt}>
              <span>{devices.laptopPrompt}</span>
              <span className={styles.caret} />
            </div>
            <span className={styles.hold}>{devices.laptopButton}</span>
          </div>
        </div>
      </div>
      <div className={styles.deck}>
        <span className={styles.notch} />
      </div>
    </div>
  );
}

const STATUS_TONE: Record<string, string> = {
  Fixed: "#2aafcc",
  Booked: "#5fa47a",
  Ready: "#f29b38",
  Sent: "#7f6cc9",
  Done: "#2aafcc",
  Queued: "#a39d93",
};

/** Phone drawn in CSS, its screen listing jobs handed to agents. */
export function Phone({ className, rows = devices.phoneRows }: { className?: string; rows?: typeof devices.phoneRows }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`} aria-hidden="true">
      <div className={styles.phoneScreen}>
        <span className={styles.island} />
        <div className={styles.phoneHead}>
          <span className={styles.phoneTime}>9:41</span>
          <span className={styles.phoneTitle}>{devices.phoneTitle}</span>
        </div>
        <ul className={styles.rows}>
          {rows.map((row) => {
            const agent = agents.find((item) => item.id === row.agent);
            return (
              <li key={row.title} className={styles.row}>
                <AgentGlyph id={row.agent} size={22} />
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{row.title}</span>
                  <span className={styles.rowAgent}>{agent?.name}</span>
                </span>
                <span className={styles.chip} style={{ color: STATUS_TONE[row.status] ?? "#2aafcc" }}>
                  {row.status}
                </span>
              </li>
            );
          })}
        </ul>
        <span className={styles.homeBar} />
      </div>
    </div>
  );
}
