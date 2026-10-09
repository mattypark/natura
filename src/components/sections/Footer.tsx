import { brand, footer } from "@/data/content";

import styles from "./Footer.module.css";

const slug = (label: string) => `#${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** Lagoon footer: wordmark and community links left, four link columns right. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`frame ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>{brand.legal}</p>
          <p className={styles.tagline}>{brand.tagline}</p>

          <div className={styles.community}>
            <p className={styles.colTitle}>{footer.community.title}</p>
            <ul className={styles.inline}>
              {footer.community.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <p className={styles.note}>{footer.community.note}</p>
          </div>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className={styles.colTitle}>{column.title}</p>
              <ul className={styles.links}>
                {column.links.map((label) => (
                  <li key={label}>
                    <a href={slug(label)}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.base}>
          <p>
            © {brand.year} {brand.legal}
          </p>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <p>{footer.madeIn}</p>
          <p className={styles.notice}>{brand.studyNotice}</p>
        </div>
      </div>
    </footer>
  );
}
