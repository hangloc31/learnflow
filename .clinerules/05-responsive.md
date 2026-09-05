# Responsive Design Rules

## Mobile-first authoring
- Base styles target 360px viewport; enhance upward. Never write desktop-first `max-width`
  overrides when a `min-width` enhancement fits.
- Breakpoints (Tailwind defaults): `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
  `md` is the mobile→tablet switch, `lg` the tablet→desktop switch. Design compositions for
  exactly three experience tiers: base, md, lg+.

## Mobile-specific behaviors
- Touch targets ≥ 44×44px for all interactive elements (including icon buttons and carousel dots).
- Navigation collapses to a full-screen Radix Dialog menu below `lg`; the menu traps focus
  correctly and closes on route change.
- Sticky mobile CTA (`MobileCTA`) appears only below `lg`, only after the hero leaves the
  viewport, and never overlaps form submit buttons.
- Horizontal scroll lists: allowed on mobile for cards when a visible affordance exists;
  must remain swipeable without scroll-jacking and degrade to grids at `lg`.
- Hero height on mobile ≤ 70vh; no autoplay media; images use explicit crop-safe
  focal points documented in the asset inventory.

## Content parity
- Mobile may reorder sections for UX, but must not remove sections or CTAs that exist on
  desktop unless documented in the section's purpose comment.
- Forms on mobile: single column, inputs ≥ 44px tall, `font-size ≥ 16px` to prevent iOS zoom,
  numeric keyboards via `inputMode` where relevant.
