# Accessibility Rules

## Semantics & keyboard
- Use native elements first: `button` for actions, `a` for navigation, `label` for inputs,
  `table` for data. Divs must not replace interactive elements.
- All interactive behavior must be operable with keyboard alone. Custom widgets (accordion,
  carousel, tabs, mobile menu) use Radix primitives or implement WAI-ARIA patterns exactly.
- Focus order follows visual order. No positive `tabIndex`. Focus must never be trapped
  except inside an open dialog.
- Skip-to-content link is the first focusable element on every page.

## ARIA
- Icon-only controls require `aria-label`. Decorative icons/images: `aria-hidden="true"` / `alt=""`.
- Carousels: region with `aria-roledescription="carousel"`, labelled slides, working
  Previous/Next buttons, and a non-rotating default (no autoplay).
- Dynamic updates (form status, filter results count) use `aria-live="polite"`.

## Contrast & motion
- Text contrast ≥ 4.5:1 (≥ 3:1 for ≥24px text) against its actual background token.
- `prefers-reduced-motion: reduce` disables entrance/reveal animation globally
  (enforced via `MotionConfig`); content must be fully visible without animation.
- Nothing flashes more than 3 times per second; no motion is a prerequisite for understanding content.

## Forms
- Every input has a programmatic label; errors are linked via `aria-describedby` and
  `aria-invalid`; required fields are marked visually and via `aria-required`.
- Submit buttons keep their label while submitting (`aria-busy`).
