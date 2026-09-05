# Component Rules

## Placement
- `src/components/ui/` — generic, reusable primitives (Button, Card, Badge, Container, Input,
  Textarea, SectionHeading). Generic means: no LearnFlow business terms, no content imports,
  fully prop-driven.
- `src/components/layout/` — Header, Footer, SkipLink, MobileCTA, PageShell.
- `src/components/<domain>/` (hero, programs, teachers, testimonials, events, forms, content) —
  domain sections composed from `ui/` primitives.
- `src/components/sections/` — only for homepage-ordered section wrappers.
- A component file exports one primary component. Helpers used by a single component live in
  the same file; helpers used twice move to `src/lib/`.

## Typing
- All props are explicit `type XProps` interfaces — no `React.ComponentProps<any>`,
  no implicit `any`, no `JSX.Element` without need.
- Components that render collections accept typed items, never `data: any[]`.
- Optional props must have defaults or documented behavior when absent.

## Variants
- Multi-variant styling uses `class-variance-authority` (`cva`) with named variants
  (e.g. Button: `variant: primary | secondary | ghost`, `size: sm | md | lg`).
- Never express variants as boolean prop pairs (`isBig`, `isPrimary`) — use union props.
- Variant styling maps to design tokens only (no raw hex, no arbitrary px).

## Size & complexity
- A component file > 200 lines must be split before adding more.
- Max 3 levels of JSX nesting inside a component before extracting a child component.
- No string concatenation for class names — always `cn()`.
- Icons come from `lucide-react` via a single import; icon-only buttons require `aria-label`.
