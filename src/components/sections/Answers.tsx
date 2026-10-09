"use client";

import { gsap } from "gsap";

import { agents, answers, devices } from "@/data/content";
import { useScene } from "@/lib/useScene";

import { AgentGlyph } from "../ui/AgentGlyph";
import { Phone } from "../ui/Devices";
import { MediaSlot } from "../ui/MediaSlot";
import { Pill } from "../ui/Pill";
import styles from "./Answers.module.css";

const EAR_PALETTE = ["#dbe9ee", "#9db8c2", "#4b6670"] as const;
const LOCK_PALETTE = ["#d8e6ea", "#8aa3ab", "#3a4b52"] as const;

/** Three places a reply can land: your ears, your lock screen, the app. */
export function Answers() {
  const ref = useScene<HTMLElement>(({ q, reduced }) => {
    if (reduced) return;
    // Each block rises in on its own as it enters, rather than on a shared scrub.
    q("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } },
      );
    });
  });

  const lockAgent = agents.find((agent) => agent.id === answers.lock.activityAgent);

  return (
    <section ref={ref} className={`frame ${styles.section}`} id="answers" aria-labelledby="answers-title">
      <h2 id="answers-title" className={`h2 ${styles.title}`} data-reveal>
        {answers.title}
      </h2>

      <div className={styles.grid}>
        <article className={styles.card} data-reveal>
          <div className={styles.media}>
            <MediaSlot palette={EAR_PALETTE} seed={301} label="Someone listening to a reply" />
            <div className={styles.toast}>
              <AgentGlyph id="sprout" size={28} />
              <div>
                <p className={styles.toastHead}>
                  <strong>{answers.ear.toastAgent}</strong>
                  <span>{answers.ear.toastStatus}</span>
                </p>
                <p className={styles.toastBody}>{answers.ear.toastBody}</p>
              </div>
            </div>
          </div>
          <h3 className={styles.cardTitle}>{answers.ear.title}</h3>
          <p className={styles.cardBody}>{answers.ear.body}</p>
          <Pill label={answers.ear.cta} href="#answers" />
        </article>

        <article className={styles.card} data-reveal>
          <div className={`${styles.media} ${styles.lock}`}>
            <MediaSlot palette={LOCK_PALETTE} seed={302} />
            <div className={styles.lockScreen} aria-hidden="true">
              <p className={styles.lockDate}>{answers.lock.date}</p>
              <p className={styles.lockTime}>{answers.lock.time}</p>
              <div className={styles.activity}>
                <AgentGlyph id={answers.lock.activityAgent} size={30} />
                <div className={styles.activityText}>
                  <p>
                    <strong>{lockAgent?.name}</strong> · {answers.lock.activityTitle}
                  </p>
                  <span className={styles.progress}>
                    <span />
                  </span>
                </div>
                <span className={styles.activityStatus}>{answers.lock.activityStatus}</span>
              </div>
            </div>
          </div>
          <h3 className={styles.cardTitle}>{answers.lock.title}</h3>
          <p className={styles.cardBody}>{answers.lock.body}</p>
          <Pill label={answers.lock.cta} href="#os" />
        </article>

        <article className={styles.app} data-reveal>
          <div className={styles.phones} aria-hidden="true">
            <Phone className={styles.phoneSide} rows={devices.phoneRows.slice(3)} />
            <Phone className={styles.phoneMain} />
            <Phone className={styles.phoneSide} rows={devices.phoneRows.slice(0, 3)} />
          </div>
          <div className={styles.appCopy}>
            <h3 className={`${styles.cardTitle} ${styles.appTitle}`}>{answers.app.title}</h3>
            <p className={styles.appBody}>{answers.app.body}</p>
            <Pill label={answers.app.cta} href="#os" tone="white" />
          </div>
        </article>
      </div>
    </section>
  );
}
