# Content Model

All business content is typed, Zod-validated, and lives in `src/content/`. The UI renders
content — it never contains it. Migrating to a headless CMS later means replacing the
loaders in `src/lib/content.ts` only.

## Entities

| Entity | Type file | Content module | Notes |
|---|---|---|---|
| Program | `Program` | `content/programs/*.ts` | slug, name, audienceId, ageRange, summary, outcome, format, cta |
| Teacher | `Teacher` | `content/teachers/*.ts` | placeholder profiles — never real credentials |
| Testimonial | `Testimonial` | `content/testimonials.ts` | placeholder entries only |
| Article | `Article` | `content/articles/*.ts` | knowledge hub; category from fixed union |
| Event | `Event` | `content/events/*.ts` | activities beyond classroom |
| Branch | `Branch` | `content/site.ts` | `PLACEHOLDER` address/phone until verified |
| FAQ | `FAQ` | `content/faqs.ts` | groups: enrollment, programs, logistics |
| Statistic | `Statistic` | `content/statistics.ts` | every entry carries `placeholder: true` until verified |
| Audience | `Audience` | `content/audiences.ts` | selector options mapping to program slugs |
| Site config | — | `content/site.ts` | brand, contact, CTA copy, navigation |

## Rules

1. Every module exports data validated by its Zod schema at module load — invalid content
   throws with the file path (fail fast at build time).
2. `TODO(content):` comments mark exactly what real data must replace a placeholder.
3. Rich text is structured (`{ heading, body }[]`), never JSX.
4. Slugs are stable identifiers; changing a slug requires a redirect entry.
5. Vietnamese is the primary language of all user-facing copy; English proper nouns are fine.
   Avoid typography that breaks diacritics (fonts chosen in design system support VN fully).

## Current placeholder inventory (must be replaced before launch)

- [ ] All statistics in `statistics.ts`
- [ ] All teacher profiles in `teachers/`
- [ ] All testimonials in `testimonials.ts`
- [ ] Branch address/phone in `site.ts`
- [ ] FAQ answers reviewed by the center
- [ ] Brand name "LearnFlow" (placeholder)
