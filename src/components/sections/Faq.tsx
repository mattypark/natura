"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";

import { brand, faq } from "@/data/content";

import { Pill } from "../ui/Pill";
import styles from "./Faq.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Numbered accordion beside a large heading. One answer open at a time. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className={`frame ${styles.section}`} aria-labelledby={`${baseId}-title`}>
      <div className={styles.head}>
        <h2 id={`${baseId}-title`} className={styles.title}>
          {faq.title}
        </h2>
        <p className={styles.sub}>{faq.sub}</p>
      </div>

      <div className={styles.listCol}>
        <ol className={styles.list}>
          {faq.items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <li key={item.q} className={styles.item}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.qText}>{item.q}</span>
                  <span className={`${styles.plus} ${isOpen ? styles.plusOpen : ""}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      key="panel"
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p>{item.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
        <div className={styles.foot}>
          <a href={`mailto:${brand.email}`} className={styles.more}>
            {faq.more}
          </a>
          <Pill label={faq.ask} href="#waitlist" />
        </div>
      </div>
    </section>
  );
}
