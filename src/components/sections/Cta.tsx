"use client";

import { useState, type FormEvent } from "react";

import { cta } from "@/data/content";

import { MediaSlot } from "../ui/MediaSlot";
import { Pill } from "../ui/Pill";
import styles from "./Cta.module.css";

const CTA_PALETTE = ["#e9c6a0", "#5a3b2b", "#120c09"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "invalid" | "done";

/**
 * Closing call to action on a dark film card. The form validates the email
 * and carries a hidden honeypot field; there is no backend yet, so a valid
 * entry just confirms in place.
 */
export function Cta() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Bots fill every field; people never see this one.
    if (String(data.get("company") ?? "").length > 0) return;
    const email = String(data.get("email") ?? "").trim();
    setStatus(EMAIL.test(email) ? "done" : "invalid");
  };

  return (
    <section className={styles.section} id="waitlist" aria-labelledby="cta-title">
      <div className={styles.card}>
        <MediaSlot palette={CTA_PALETTE} seed={404} label="A hand wearing the ring" />
        <div className={styles.copy}>
          <h2 id="cta-title" className={styles.title}>
            {cta.title}
          </h2>
          <p className={styles.body}>{cta.body}</p>

          {status === "done" ? (
            <p className={styles.success} role="status">
              {cta.success}
            </p>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate>
              <label htmlFor="cta-email" className="sr-only">
                Email
              </label>
              <input
                id="cta-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={cta.placeholder}
                className={styles.input}
                aria-invalid={status === "invalid"}
                aria-describedby={status === "invalid" ? "cta-error" : undefined}
                onInput={() => status === "invalid" && setStatus("idle")}
              />
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />
              <Pill label={cta.submit} type="submit" />
              {status === "invalid" && (
                <p id="cta-error" className={styles.error} role="alert">
                  {cta.invalid}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
