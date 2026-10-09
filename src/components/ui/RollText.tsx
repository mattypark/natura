import styles from "./RollText.module.css";

/**
 * Two stacked copies of a label, split per letter. On hover of the nearest
 * `[data-roll]` ancestor, each letter slides up in a staggered wave and the
 * second copy rolls into place. Screen readers get the plain label once.
 */
export function RollText({ text }: { text: string }) {
  const letters = Array.from(text);
  const row = (hidden: boolean) => (
    <span className={hidden ? styles.rowClone : styles.row} aria-hidden="true">
      {letters.map((letter, index) => (
        <span key={index} className={styles.letter} style={{ "--i": index } as React.CSSProperties}>
          {letter === " " ? " " : letter}
        </span>
      ))}
    </span>
  );

  return (
    <span className={styles.roll}>
      <span className="sr-only">{text}</span>
      {row(false)}
      {row(true)}
    </span>
  );
}
