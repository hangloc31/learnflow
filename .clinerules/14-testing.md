# Testing Rules

## Stack & commands
- Vitest + `@vitejs/plugin-react` + jsdom + Testing Library. `npm test` must pass in CI-style
  runs (`vitest run`, no watch). `npm run typecheck` (`tsc --noEmit`) gates every change.

## Required coverage (minimum bar)
- `src/lib/leads/schema.ts`: every field validation rule, valid/invalid payloads.
- `/api/leads` route: rejects invalid/oversized/honeypot payloads; persists valid ones
  (adapter mocked or `console` adapter asserted); returns typed errors.
- Consultation form: step gating (cannot advance with invalid step), full happy path,
  failure state rendering.
- Program selector: audience choice filters recommended programs.
- FAQ accordion, testimonial carousel, mobile menu: open/close/keyboard operability.

## Conventions
- Tests live beside the subject (`foo.tsx` → `foo.test.tsx`) or under `tests/` for API-level
  suites; name files `<subject>.test.tsx|ts`.
- Query by role/label/name (Testing Library philosophy) — tests must model how users find UI.
- No snapshot tests of full components; assert behavior and accessible semantics.
- Server components/content loaders: unit-test the data functions, not JSX output.
