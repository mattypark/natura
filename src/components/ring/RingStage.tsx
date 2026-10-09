"use client";

import { useEffect, useRef } from "react";

import styles from "./RingStage.module.css";

/**
 * Fixed full-viewport WebGL layer that renders the page's single ring.
 * Its pose comes from the shared scroll track (see lib/ringTrack.ts); the
 * Three.js scene itself is imported lazily to keep it off the critical path.
 */
export function RingStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let teardown: (() => void) | undefined;
    let cancelled = false;

    import("./ringScene")
      .then(({ mountRingScene }) => {
        if (!cancelled) teardown = mountRingScene(canvas);
      })
      .catch((error: unknown) => console.error("[ring] scene failed to load", error));

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
