# Design references

Measured from natura.inc on 2026-10-08 at 1440 × 900 (computed styles via CDP). These are
the numbers the clone is built against; the values live as tokens in `src/app/globals.css`.

## Layout

| Token | Reference | Notes |
|---|---|---|
| Page gutter | `clamp(20px, 6vw, 144px)` | `--gutter` |
| Content frame | `min(84vw, 1420px)` | `--frame`; most sections pad to `(100vw - frame) / 2` |
| Nav height | 74px | fixed, transparent, `z-index: 90` |
| Card radius | `clamp(20px, 1.8vw, 30px)` | `--radius-card` |
| Film radius | `clamp(16px, 1.6vw, 32px)` | `--radius-film` |
| Page height | 35,899px | clone: ~31,700px |

## Colour

| Role | Value |
|---|---|
| Page (panna) | `#F5EEE1` / `rgb(245 238 225)` |
| Ink (antracite) | `#2D2926` / `rgb(45 41 38)` |
| Accent (lagoon) | `#2AAFCC` / `rgb(42 175 204)` |
| Muted text | `#605C55` |
| Nav link | `#686561` |
| Ambient | warm light top right, pale teal bounce along the floor |

## Type

Reference fonts are licensed (Restora display serif, ATC Arquette sans). The clone uses
Newsreader (variable, optical size) and Figtree from Google Fonts.

| Use | Size @1440 | Line height | Tracking | Weight |
|---|---|---|---|---|
| Chapter headline | 55.8px | 0.96 | −0.035em | 400 (clone 300) |
| Orbit headline | 49.5px | 0.96 | −0.035em | 400 |
| Sensor chapter title | 37.4px | 1.06 | −0.025em | 200 |
| Answers headline | 53.1px | 0.98 | −0.036em | 400 |
| FAQ headline | 67.2px | 0.96 | −0.03em | 400 |
| Card title | 28.8px | 1.05 | −0.028em | 400 |
| Lead paragraph | 22px | 1.3 | — | 500 at 80% ink |
| Small body | 13px | 1.5 | — | 300, muted |
| Eyebrow | 11px | 1.5 | 0.16em, uppercase | 400 at 70% ink |
| Nav buttons | 12.5px | — | 0.005em | 300 |
| Waitlist pill | 12.5px, padding 8 × 20 | — | 0.015em | 500 |

## Motion

| Pattern | Reference behaviour | Clone |
|---|---|---|
| Easing | `cubic-bezier(.16, 1, .3, 1)` throughout | `--ease-out` |
| Pill hover | label split per letter, rolls up in a stagger | `RollText` |
| Ring | one persistent 3D ring across the first two thirds of the page | `RingStage` + `ringTrack` |
| Chapter text | blur + rise in, blur + rise out | `filter: blur()` + `y` in each scrub |
| Orbit | ring passes the camera, its hole opens onto the agent circle | `clip-path: circle()` sized to the hole |
| Scroll rail | thin lagoon thumb on the right edge | `PageChrome` |
| Floating CTA | bottom-right pill once past the hero | `PageChrome` |
