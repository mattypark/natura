import styles from "./AgentGlyph.module.css";

type GlyphSpec = { tile: string; art: React.ReactNode };

/** Original app-tile art for each fictional agent in content.ts. */
const GLYPHS: Record<string, GlyphSpec> = {
  fern: {
    tile: "linear-gradient(150deg, #b9e3c4, #5fa47a)",
    art: (
      <g fill="#fff">
        <path d="M24 40c0-12 1-20 4-27" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${25 + i * 0.6} ${36 - i * 5.2})`}>
            <ellipse cx="-6" cy="0" rx="6" ry="2.4" transform="rotate(-25)" />
            <ellipse cx="6" cy="0" rx="6" ry="2.4" transform="rotate(25)" />
          </g>
        ))}
      </g>
    ),
  },
  tally: {
    tile: "#ffffff",
    art: (
      <g stroke="#2d2926" strokeWidth="2.6" strokeLinecap="round" fill="none">
        {[15, 24, 33].map((y) => (
          <g key={y}>
            <path d={`M11 ${y}l2.6 2.6 4.6-5.2`} stroke="#2aafcc" />
            <path d={`M23 ${y}h14`} />
          </g>
        ))}
      </g>
    ),
  },
  quill: {
    tile: "linear-gradient(160deg, #2c3136, #15181b)",
    art: (
      <g stroke="#9fe6c4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M19 12c-4 0-4 3-4 6s-1 6-4 6c3 0 4 3 4 6s0 6 4 6" />
        <path d="M29 12c4 0 4 3 4 6s1 6 4 6c-3 0-4 3-4 6s0 6-4 6" />
      </g>
    ),
  },
  kite: {
    tile: "linear-gradient(180deg, #a8dcf5, #5ab3e3)",
    art: (
      <g>
        <path d="M27 8l9 11-9 15-9-15z" fill="#fff" />
        <path d="M27 8v26M18 19h18" stroke="#5ab3e3" strokeWidth="1.4" />
        <path d="M27 34c-3 3 2 4-1 7s1 3-2 5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  atlas: {
    tile: "linear-gradient(160deg, #36507a, #1d2d4a)",
    art: (
      <g>
        <circle cx="24" cy="24" r="13" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
        <path d="M24 9l3.5 15L24 39l-3.5-15z" fill="#fff" />
        <path d="M24 9l3.5 15h-7z" fill="#f2a65a" />
        <circle cx="24" cy="24" r="1.8" fill="#1d2d4a" />
      </g>
    ),
  },
  echo: {
    tile: "linear-gradient(160deg, #ff9a7e, #ec5f4a)",
    art: (
      <g stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <circle cx="16" cy="32" r="2.4" fill="#fff" stroke="none" />
        <path d="M16 24a8 8 0 0 1 8 8" />
        <path d="M16 17a15 15 0 0 1 15 15" />
        <path d="M16 10a22 22 0 0 1 22 22" opacity="0.7" />
      </g>
    ),
  },
  nova: {
    tile: "linear-gradient(160deg, #ffd27a, #f29b38)",
    art: (
      <g fill="#fff">
        <path d="M24 8c1.5 9 7 14.5 16 16-9 1.5-14.5 7-16 16-1.5-9-7-14.5-16-16 9-1.5 14.5-7 16-16z" />
        <circle cx="36" cy="12" r="2" />
      </g>
    ),
  },
  moss: {
    tile: "linear-gradient(160deg, #a9b86a, #6c7d3a)",
    art: (
      <g fill="#fff" stroke="#6c7d3a" strokeWidth="1.4">
        {[33, 27, 21, 15].map((y, i) => (
          <ellipse key={y} cx={24 + (i % 2) * 2} cy={y} rx="10" ry="3.6" />
        ))}
      </g>
    ),
  },
  pip: {
    tile: "#ffffff",
    art: (
      <g>
        <path d="M9 29h30l-5 7H14z" fill="#3d8cf0" />
        <path d="M24 10v19H13z" fill="#8fd3ff" />
        <path d="M26 14v15h9z" fill="#3d8cf0" opacity="0.7" />
        <path d="M8 39c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" stroke="#8fd3ff" strokeWidth="1.6" fill="none" />
      </g>
    ),
  },
  juno: {
    tile: "linear-gradient(160deg, #c7b8f0, #7f6cc9)",
    art: (
      <g fill="#fff">
        <path d="M28 10a14 14 0 1 0 10 22 12 12 0 1 1-10-22z" />
        <path d="M34 13l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" />
      </g>
    ),
  },
  orbit: {
    tile: "#ffffff",
    art: (
      <g>
        <circle cx="24" cy="24" r="8" fill="#2aafcc" />
        <ellipse cx="24" cy="24" rx="16" ry="5.5" fill="none" stroke="#2d2926" strokeWidth="2" transform="rotate(-22 24 24)" />
        <circle cx="38" cy="18.5" r="2.2" fill="#f2a65a" />
      </g>
    ),
  },
  sprout: {
    tile: "linear-gradient(160deg, #fff8ea, #f0e3c9)",
    art: (
      <g>
        <path d="M24 40V25" stroke="#5c8a4a" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M24 27c-9 0-13-5-13-12 8 0 13 4 13 12z" fill="#7fbf6a" />
        <path d="M24 23c0-7 4-12 13-12 0 8-5 12-13 12z" fill="#a6d98f" />
        <ellipse cx="24" cy="41" rx="9" ry="2" fill="#d9c7a5" />
      </g>
    ),
  },
};

type AgentGlyphProps = {
  id: string;
  size?: number | string;
  label?: string;
  className?: string;
};

export function AgentGlyph({ id, size = 56, label, className }: AgentGlyphProps) {
  const glyph = GLYPHS[id] ?? GLYPHS.sprout;
  return (
    <span
      className={`${styles.tile} ${className ?? ""}`}
      style={{ background: glyph.tile, width: size, height: typeof size === "number" ? size : undefined }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 48 48" className={styles.art}>
        {glyph.art}
      </svg>
    </span>
  );
}
