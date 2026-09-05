# Design System

Single source of truth: `src/styles/globals.css` (`@theme`). Components may use only token
values; to add a value, extend the theme first.

## Brand concept

**LearnFlow** (placeholder brand — `TODO(brand)`): a modern editorial education brand.
Warm paper surfaces, deep ink typography, one energetic accent (coral), one calm secondary
(teal). Serif display (Lora) over humanist sans (Be Vietnam Pro) — chosen for full, correct
Vietnamese diacritic rendering.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#FAF7F2` | page background |
| `--color-surface` | `#FFFFFF` | raised surfaces |
| `--color-ink` | `#1A2B3C` | headings, primary text |
| `--color-ink-soft` | `#43566B` | body text |
| `--color-muted` | `#6B7A8C` | captions, meta |
| `--color-line` | `#E7E0D4` | hairline borders |
| `--color-accent` | `#E8603C` | primary CTA, highlights |
| `--color-accent-strong` | `#C74B2D` | hover/active accent |
| `--color-accent-soft` | `#FBEAE4` | accent tint backgrounds |
| `--color-teal` | `#177E70` | secondary accent, success |
| `--color-teal-soft` | `#E3F0ED` | teal tint backgrounds |
| `--color-gold` | `#E9A83C` | badge/highlight tertiary |

## Typography scale (clamp-based, fluid)

| Role | Token | Range |
|---|---|---|
| Display | `text-display` | 3rem → 4.75rem |
| Hero | `text-hero` | 2.25rem → 3.5rem |
| Section | `text-section` | 1.875rem → 2.5rem |
| Subheading | `text-subheading` | 1.25rem → 1.5rem |
| Body | `text-body` | 1rem |
| Small | `text-small` | 0.875rem |
| Caption | `text-caption` | 0.75rem, uppercase tracking |

Fonts: `--font-display` (Lora), `--font-sans` (Be Vietnam Pro) via `next/font`, subsets
`latin` + `vietnamese`.

## Space, radius, shadow, layout

- Spacing: Tailwind default 4px scale; section rhythm tokens `section-y` (mobile 4rem /
  desktop 7rem) via `Section` primitive.
- Radius: `--radius-sm 8px` (inputs), `--radius-md 14px` (cards), `--radius-lg 22px`
  (panels), `--radius-full` (pills). Not every box is rounded the same — depth is encoded
  through radius variety, not shadows.
- Shadows (soft, warm): `--shadow-soft` (cards), `--shadow-lift` (hover), `--shadow-panel`
  (modals). Surfaces prefer borders over shadows.
- Container: `--container-max 76rem`, gutters 1.25rem mobile / 2rem desktop (`Container` primitive).
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536.

## Motion tokens

`--duration-fast 150ms` · `--duration-base 250ms` · `--duration-reveal 500ms` ·
`--ease-out` cubic-bezier(0.22, 1, 0.36, 1). All animation respects
`prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.

## Component variants (cva)

- **Button**: `variant: primary | secondary | ghost` × `size: sm | md | lg`; pill radius;
  min touch target 44px; focus ring `--color-accent` offset 2px.
- **Card**: `variant: flat (border only) | raised (border+soft shadow) | interactive (+lift hover)`.
- **Badge**: `variant: accent | teal | gold | neutral`.
- **Section**: padding + optional alternate background tone (`tone: base | soft | inverse`).
- **Input/Textarea/Select**: `radius-sm`, border `line`, focus ring accent, 16px font floor.
