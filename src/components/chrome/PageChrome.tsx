"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { waitlist } from "@/data/content";

import { Pill } from "../ui/Pill";
import styles from "./PageChrome.module.css";

/** How far down (in viewports) before the floating waitlist pill appears. */
const FLOAT_AFTER = 0.8;

/**
 * Fixed page furniture: the warm ambient light behind everything, the thin
 * scroll-progress rail on the right edge, and the floating waitlist pill.
 */
export function PageChrome() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const thumb = thumbRef.current;
    const float = floatRef.current;
    if (!thumb || !float) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      thumb.style.transform = `translateY(${progress * (window.innerHeight - 16 - thumb.offsetHeight)}px)`;
      const showFloat = window.scrollY > window.innerHeight * FLOAT_AFTER && progress < 0.985;
      float.dataset.visible = String(showFloat);
    };

    update();
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.warm} />
        <span className={styles.cool} />
      </div>
      <div className={styles.rail} aria-hidden="true">
        <div ref={thumbRef} className={styles.thumb} />
      </div>
      <div ref={floatRef} className={styles.float} data-visible="false">
        <Pill label={waitlist.floating} href={waitlist.href} />
      </div>
    </>
  );
}
