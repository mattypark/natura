import clsx from "@/lib/clsx";

import styles from "./Pill.module.css";
import { RollText } from "./RollText";

type PillProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  tone?: "lagoon" | "white" | "ghost" | "ink";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
};

/** Rounded call-to-action with the letter-roll hover. Renders a link when given `href`. */
export function Pill({ label, href, onClick, tone = "lagoon", size = "sm", className, type = "button" }: PillProps) {
  const classes = clsx(styles.pill, styles[tone], styles[size], className);
  if (href) {
    return (
      <a href={href} className={classes} data-roll onClick={onClick}>
        <RollText text={label} />
      </a>
    );
  }
  return (
    <button type={type} className={classes} data-roll onClick={onClick}>
      <RollText text={label} />
    </button>
  );
}
