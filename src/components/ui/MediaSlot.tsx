"use client";

import { useEffect, useRef } from "react";

import clsx from "@/lib/clsx";
import { mulberry32 } from "@/lib/motion";

import styles from "./MediaSlot.module.css";

type MediaSlotProps = {
  /** Three colours: light, mid, shadow. Drives the procedural stand-in. */
  palette: readonly [string, string, string] | readonly string[];
  /** Real footage, when there is some. A `.mp4` path plays muted and looped. */
  src?: string;
  seed?: number;
  label?: string;
  className?: string;
};

/**
 * Every photo or film position on the page renders through here. With no
 * `src`, it paints a soft, out-of-focus interior (window light, bokeh, film
 * grain) in the given palette, so the layout reads finished until real
 * footage drops in.
 */
export function MediaSlot({ palette, src, seed = 1, label, className }: MediaSlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (src) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const [light, mid, shadow] = palette;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = Math.max(1, canvas.clientWidth);
      const h = Math.max(1, canvas.clientHeight);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rand = mulberry32(seed);

      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, mid);
      base.addColorStop(1, shadow);
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // A window of daylight somewhere in the upper half.
      const wx = w * (0.15 + rand() * 0.7);
      const daylight = ctx.createRadialGradient(wx, h * 0.25, 0, wx, h * 0.25, Math.max(w, h) * 0.7);
      daylight.addColorStop(0, light);
      daylight.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = daylight;
      ctx.fillRect(0, 0, w, h);

      // Out-of-focus highlights.
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 26; i += 1) {
        const r = (0.02 + rand() * 0.08) * Math.max(w, h);
        const x = rand() * w;
        const y = rand() * h * 0.8;
        const dot = ctx.createRadialGradient(x, y, 0, x, y, r);
        dot.addColorStop(0, light);
        dot.addColorStop(0.7, "rgba(255,255,255,0.04)");
        dot.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = 0.12 + rand() * 0.25;
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floor shadow and vignette.
      ctx.globalCompositeOperation = "multiply";
      const vignette = ctx.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.75);
      vignette.addColorStop(0, "rgba(255,255,255,1)");
      vignette.addColorStop(1, shadow);
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Grain.
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < (w * h) / 90; i += 1) {
        ctx.fillStyle = rand() > 0.5 ? "#fff" : "#000";
        ctx.fillRect(rand() * w, rand() * h, 1, 1);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [palette, seed, src]);

  if (src?.endsWith(".mp4")) {
    return (
      <video className={clsx(styles.media, className)} src={src} autoPlay muted loop playsInline aria-label={label} />
    );
  }
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={clsx(styles.media, className)} src={src} alt={label ?? ""} loading="lazy" decoding="async" />;
  }
  return <canvas ref={canvasRef} className={clsx(styles.media, styles.drift, className)} role="img" aria-label={label} />;
}
