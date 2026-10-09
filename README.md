# natura

A component-for-component layout and motion study of [natura.inc](https://natura.inc), built
as a reusable template. Same sections in the same order, the same scroll choreography, the
same type scale and spacing, rebuilt from scratch.

**What is not copied:** Natura's name, logo, copy, photography, film, 3D models, character
art and licensed fonts. The brand here is a placeholder (**Sylva**, ring **Cue**, earbuds
**Murmur**, **SylvaOS**, companion **sprout**), every string is original, and every visual is
procedural: a lathed Three.js ring, canvas "bokeh room" stand-ins for footage, SVG agent and
app tiles, CSS laptop / phone / lock screen, and an SVG alpine outro. The page is marked
`noindex` and the footer says it is a design study.

## Run it

```bash
npm install
npm run dev        # http://localhost:4340
npm run build      # production build
npm run typecheck
```

## Re-skin it

| To change | Edit |
|---|---|
| Every word on the page | `src/data/content.ts` |
| Palette, type scale, gutters, easings | `:root` in `src/app/globals.css` |
| Fonts | `src/app/layout.tsx` (Newsreader for display, Figtree for text) |
| Real photos / film | pass `src` to any `<MediaSlot>` (`.mp4` plays muted and looped) |
| Agent tiles | `src/components/ui/AgentGlyph.tsx` |
| The ring's look | `src/components/ring/buildRing.ts` |

## How the page moves

- **One ring for the whole page.** `RingStage` mounts a fixed WebGL canvas and lazy-loads
  `ringScene.ts`. Sections never animate the ring directly; they drop pose keyframes on a
  shared scroll track (`src/lib/ringTrack.ts`), and the stage samples that track every frame.
  The ring is therefore continuous across sections and correct after a mid-page reload.
- **Sticky stages.** Each chapter section is a tall wrapper with a `position: sticky` stage.
  `useScene` (`src/lib/useScene.ts`) builds its GSAP timeline scrubbed across the stuck range
  and reverts everything on unmount.
- **Lenis** drives scrolling through GSAP's ticker so ScrollTrigger stays in sync.
- Ring sizes are authored for landscape; `ringFit()` shrinks them on portrait screens.

## Sections (in page order)

| Component | What it does |
|---|---|
| `Preloader` | Lagoon curtain, wordmark blurs in, pen stroke underlines it, curtain lifts |
| `Nav` | Wordmark, glass mega-menu (Hardware / Software), letter-roll waitlist pill; hides on scroll down |
| `Hero` | Warm room, ring rushes the camera into a white bloom, cream page underneath |
| `RingFeatures` | Two chapters around the ring (titanium → pearl finish, listening glow) + film teaser |
| `SensorStory` | Ring tips to show its sensors; leader lines track the live 3D windows; pulse / sleep / steps charts |
| `ManyMinds` | Two lines of display type the ring slides across |
| `AgentOrbit` | Ring's hole clip-reveals a turning circle of agent tiles; centre swaps ring → laptop → phone |
| `Gallery` | Horizontal scene track, cards swing as they pass centre, floating agent replies |
| `OsReveal` | Agent folder → wordmark sweep with app icon → icon + ring pairing → word-by-word sentence |
| `LaunchFilm` | Inset card opens to full frame, giant title, play dialog |
| `Connections` | Cloud of brand-free app tiles folds into the system icon |
| `Answers` | Earbuds card, lock-screen Live Activity, teal in-app card with three phones |
| `Faq` | Numbered accordion |
| `Cta` | Dark card with validated email form + honeypot |
| `Footer`, `Outro` | Lagoon footer, procedural meadow under one line of type |

Measurements taken from the reference live in `docs/DESIGN-REFS.md`.
