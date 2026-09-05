# Cline Rules — LearnFlow

This directory contains the enforceable engineering rules for the LearnFlow repository.
Cline loads all `*.md` files here automatically (alphabetical order, numeric prefixes define
reading order). Every rule states a **concrete, checkable behavior** — vague guidance is not a rule.

## Rule index

| File | Scope |
|---|---|
| `01-architecture.md` | App Router structure, server/client component boundaries, data flow |
| `02-components.md` | Component placement, typing, size limits, variant APIs |
| `03-ui-ux.md` | Design quality bar, hierarchy, section purpose, token usage |
| `04-accessibility.md` | WCAG-conscious behavior: keyboard, ARIA, contrast, motion |
| `05-responsive.md` | Mobile-first rules, breakpoints, touch targets, image behavior |
| `06-typescript.md` | Strict typing, `any` policy, Zod boundaries, export typing |
| `07-code-quality.md` | Naming, duplication, dead code, function size |
| `08-performance.md` | Bundle, images, fonts, layout shift, animation perf |
| `09-seo.md` | Metadata, sitemap/robots, headings, structured data |
| `10-content-data.md` | Content/presentation separation, typed content, placeholders |
| `11-animation.md` | Motion tokens, durations, allowed properties, reduced motion |
| `12-forms.md` | RHF + Zod, multi-step validation, lead submission adapter |
| `13-security.md` | Trust boundaries, secrets, rate limiting, PII handling |
| `14-testing.md` | Required test coverage, testing conventions |
| `15-git.md` | Commit conventions, branches, ignored artifacts |

## Rule precedence

1. `.clinerules/` rules override general habit.
2. `/docs/architecture.md`, `/docs/design-system.md`, `/docs/content-model.md`,
   `/docs/ux-principles.md`, `/docs/development-rules.md` explain *why* and *how*.
3. Existing code conventions in `src/` are the reference for new code; improve them via
   explicit refactor, not local exceptions.

## Enforcement checklist (run before declaring any feature complete)

- [ ] `npm run lint` — zero errors
- [ ] `npm run typecheck` — zero errors
- [ ] `npm test` — all tests pass
- [ ] New UI verified at 360px and 1280px widths
- [ ] New interactive UI keyboard-operable with visible focus
- [ ] No raw hex/px values in components (tokens only)
- [ ] No fabricated business facts (stats, credentials, testimonials) — placeholders marked
