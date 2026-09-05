# Performance Rules

## Rendering & bundles
- Server Components by default; each `"use client"` island must justify itself in review.
  Animation wrappers are the only common client islands.
- Framer Motion imports from `framer-motion` top-level only in client islands; page sections
  must not transitively import it via shared `ui` primitives.
- No polyfill-style libraries; prefer platform APIs.

## Images
- Always `next/image` with explicit `sizes`, correct `priority` for the LCP image only,
  `alt` text (or `alt=""` for decorative), and intrinsic dimensions via import or props.
- No base64-inline images in source. Placeholder art ships as optimized SVG/PNG in
  `public/images/`, tracked in `docs/asset-inventory.md`.

## Fonts & CSS
- Fonts load via `next/font` (self-hosted, `display: swap`, preloaded subsets `latin` +
  `vietnamese`). No `@import` of Google Fonts CSS. No more than 2 font families, ≤ 4 weights total.
- Layout shift budget: zero avoidable CLS. Reserve dimensions for media, embeds, and dynamic
  content regions.

## Interaction
- Animation runs on `transform`/`opacity` only (see `11-animation.md`).
- Third-party scripts: none without documented consent/privacy review; if ever required, load
  via `next/script` with a strategy, never in `<head>`.
