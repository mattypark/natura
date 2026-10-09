"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

import { onIntro } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/motion";

const NAV_OFFSET = -80;

/** Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: NAV_OFFSET },
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Hold the page still until the preloader lifts.
    lenis.stop();
    const stopListening = onIntro(() => lenis.start());

    return () => {
      stopListening();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
