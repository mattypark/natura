# Next session: rebuild the "glide" iPhone prototype animation

Matthew, 2026-10-08: "after you're done with natura … try to copy this animation for apple
iPhone as well, but that's for next session."

Source: https://x.com/lobanovskiy/status/2108242136336601296 (Eddie Lobanovskiy, quoting
@Lord_Rex2's Figma iterations). The post's 22 s video (1920 × 1912) is saved locally at
`nextsessions/ref/iphone-animation/source.mp4`, with one frame every 2 s in `overview/` and a
contact sheet in `overview_sheet1.jpg`. That folder is gitignored; keep it out of the repo.

## What the video shows

A swim-tracking app called "glide", presented as a phone on the right and a chapter rail on
the left (numbered list: Today · Live swim · Complete · Splits, with a progress tick on the
active row and a small pause / "scroll to explore" control under it). The headline on the
left swaps with each chapter in a two-tone serif-less style (dark first line, grey second).

Four screens, joined by a **blur dissolve**: the outgoing screen frosts over (heavy blur, the
active card ghosting through) before the next one resolves.

1. **Today**: segmented Today / Week, a big gradient "aura" card (orange core on blue), three
   pastel stat tiles, a "Morning swim" card with a play button, tab bar.
2. **Live swim**: "Freestyle" header with a red LIVE pill and timer, a pool-lane illustration
   with a swimmer, a huge lap number behind it, 3,124 m distance, a dense dot-matrix stroke
   chart, Pause button and a red stop button.
3. **Complete**: green "streak" pill, a "DONE" lane card with the swimmer, Session complete,
   1:02:40 time, pace and distance, "View splits".
4. **Splits**: orange-to-blue aura card with a dot-matrix "1:34" pace, a per-split dot chart
   with the best split highlighted red, stroke mix bar, black Done button.

## Plan

1. Pull reference frames densely first (every 0.1 s, denser around each transition) into
   `ref/iphone-animation/frames/`, per the screen-recording rule. Time each transition.
2. Native SwiftUI, iOS 26, new folder `~/Downloads/current-projects/appscurrent/<name>`
   (ask Matthew for the name and whether it gets its own repo). Two-session split per his
   rule if it grows past a prototype.
3. Build the four screens as real views with mock data, then the chapter driver: a single
   `@State chapter` advanced by tap / swipe / auto-play, with the blur dissolve as a custom
   `Transition` (blur radius + opacity + slight scale, ~0.6 s, spring).
4. Dot-matrix numerals and charts as `Canvas` drawings; the aura cards as `MeshGradient`.
5. Run on the three simulators, screenshot every screen, send the shots, make a device board.
6. A/B: A = the closest reading (blur dissolve); B = a bolder take (e.g. shared-element
   morph of the big number between screens). Both behind a Debug switch.

## Keep original

Rebuild the structure, layout and motion only. Do **not** reproduce "glide"'s swimmer
character, wordmark, icons or copy: draw an original swimmer (or go abstract, e.g. a lane
of moving dots), name the app something else, and write new headlines.
