"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { brand, nav, waitlist } from "@/data/content";
import clsx from "@/lib/clsx";

import { Pill } from "../ui/Pill";
import { ProductGlyph } from "../ui/ProductGlyph";
import { RollText } from "../ui/RollText";
import styles from "./Nav.module.css";

const HIDE_AFTER = 120;
const PANEL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fixed top bar: wordmark, two product menus that open a glass panel, and the
 * waitlist pill. It tucks away while scrolling down and returns on the way up.
 */
export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [sheet, setSheet] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > HIDE_AFTER);
      if (goingDown) setOpen(null);
      lastY.current = y;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const openGroup = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };
  const activeGroup = nav.groups.find((group) => group.label === open);

  return (
    <nav
      className={clsx(styles.nav, hidden && !sheet && styles.hidden)}
      aria-label="Main navigation"
      onMouseLeave={scheduleClose}
    >
      <div className={styles.bar}>
        <a href="#top" className={styles.wordmark} data-roll>
          <RollText text={brand.legal} />
        </a>

        <ul className={styles.groups}>
          {nav.groups.map((group) => (
            <li key={group.label}>
              <button
                type="button"
                className={clsx(styles.groupButton, open === group.label && styles.groupActive)}
                aria-expanded={open === group.label}
                aria-controls="nav-panel"
                onMouseEnter={() => openGroup(group.label)}
                onFocus={() => openGroup(group.label)}
                onClick={() => setOpen(open === group.label ? null : group.label)}
              >
                {group.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Pill label={waitlist.label} href={waitlist.href} />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={sheet}
            aria-label={sheet ? "Close menu" : "Open menu"}
            onClick={() => setSheet((value) => !value)}
          >
            <span className={clsx(styles.burger, sheet && styles.burgerOpen)} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeGroup && (
          <m.div
            id="nav-panel"
            key="panel"
            className={styles.panel}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.38, ease: PANEL_EASE }}
            onMouseEnter={() => openGroup(activeGroup.label)}
          >
            <p className={styles.panelLabel}>{activeGroup.label}</p>
            <ul className={styles.panelList}>
              {activeGroup.items.map((item, index) => (
                <m.li
                  key={item.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + index * 0.05, duration: 0.4, ease: PANEL_EASE }}
                >
                  <a href={item.href} className={styles.panelItem} onClick={() => setOpen(null)}>
                    <span className={styles.panelGlyph}>
                      <ProductGlyph glyph={item.glyph} />
                    </span>
                    <span>
                      <span className={styles.panelName}>{item.name}</span>
                      <span className={styles.panelBlurb}>{item.blurb}</span>
                    </span>
                  </a>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <m.div
            key="sheet"
            className={styles.sheet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {nav.groups.map((group) => (
              <div key={group.label} className={styles.sheetGroup}>
                <p className={styles.panelLabel}>{group.label}</p>
                {group.items.map((item) => (
                  <a key={item.name} href={item.href} className={styles.panelItem} onClick={() => setSheet(false)}>
                    <span className={styles.panelGlyph}>
                      <ProductGlyph glyph={item.glyph} />
                    </span>
                    <span>
                      <span className={styles.panelName}>{item.name}</span>
                      <span className={styles.panelBlurb}>{item.blurb}</span>
                    </span>
                  </a>
                ))}
              </div>
            ))}
            <Pill label={waitlist.label} href={waitlist.href} size="md" onClick={() => setSheet(false)} />
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
