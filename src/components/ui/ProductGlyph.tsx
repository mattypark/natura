type Glyph = "ring" | "pods" | "os" | "sprout";

/** Small line drawings for the menu, one per product. */
export function ProductGlyph({ glyph }: { glyph: Glyph }) {
  switch (glyph) {
    case "ring":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
          <ellipse cx="24" cy="24" rx="15" ry="13" fill="none" stroke="currentColor" strokeWidth="4.5" opacity="0.85" />
          <ellipse cx="24" cy="24" rx="15" ry="13" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <rect x="21.5" y="8.5" width="5" height="3" rx="1.5" fill="#fff" />
        </svg>
      );
    case "pods":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
          <path d="M15 12a7 7 0 0 1 7 7v4a4 4 0 0 1-4 4h-1v11a3 3 0 0 1-6 0V19a7 7 0 0 1 4-7Z" fill="currentColor" opacity="0.85" />
          <path d="M33 12a7 7 0 0 0-7 7v4a4 4 0 0 0 4 4h1v11a3 3 0 0 0 6 0V19a7 7 0 0 0-4-7Z" fill="currentColor" opacity="0.55" />
        </svg>
      );
    case "os":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
          <rect x="4" y="4" width="40" height="40" rx="11" fill="url(#os-glyph)" />
          {[14, 19, 24, 29, 34].map((x, i) => (
            <rect key={x} x={x - 1.5} y={24 - [5, 9, 12, 8, 4][i]} width="3" height={[5, 9, 12, 8, 4][i] * 2} rx="1.5" fill="#fff" />
          ))}
          <defs>
            <linearGradient id="os-glyph" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8fd3ff" />
              <stop offset="1" stopColor="#3d8cf0" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "sprout":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
          <path d="M24 40V24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 26c-9 0-13-5-13-12 8 0 13 4 13 12Z" fill="#7fbf6a" />
          <path d="M24 22c0-7 4-12 13-12 0 8-5 12-13 12Z" fill="#a6d98f" />
        </svg>
      );
  }
}
