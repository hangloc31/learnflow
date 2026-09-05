# Animation Rules

## Principles
- Animation is purposeful (entrance, reveal, feedback, state change) — never decorative loops.
  No bouncing, no infinite floating, no scroll hijacking, no cursor followers.
- Never use animation that blocks interaction or causes layout shift.
- Allowed animated properties: `transform`, `opacity`. Animating `width/height/top/left`
  or triggering layout is prohibited (except `height: auto` accordions via Radix).
- Durations from motion tokens: `fast 150ms`, `base 250ms`, `reveal 500ms`; entrance easing
  `ease-out`; nothing takes longer than 600ms to become fully interactive/readable.

## Implementation
- All motion goes through Framer Motion inside client islands; plain CSS transitions are
  preferred for hover/focus states.
- `MotionConfig reducedMotion="user"` wraps the app so `prefers-reduced-motion: reduce`
  disables non-essential motion globally; count-ups render their final value instantly
  under reduced motion.
- Scroll-triggered reveals fire once (`viewport={{ once: true, margin: '-80px' }}`), stagger
  children ≤ 60ms apart, and never re-trigger on scroll back.
- Under reduced motion or with JS disabled, all content must be visible and functional.
