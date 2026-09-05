# Content & Data Rules

## Separation (hard boundary)
- No user-visible copy (headlines, program names, FAQ text, testimonials, statistics) may be
  hardcoded inside components when it describes business content. Content lives in
  `src/content/*`, is typed by `src/types/content.ts`, and reaches components as props.
- Reusable UI components must not contain page-specific business data when that data can be
  passed as typed props.
- One content module per entity: `programs/`, `teachers/`, `testimonials.ts`, `faqs.ts`,
  `statistics.ts`, `events/`, `articles/`, `site.ts` (brand, contact, CTA copy),
  `navigation.ts`. Every module exports a validated array/object built with its Zod schema.

## Placeholder policy (never fabricate)
- Business facts (student counts, years, results, credentials, addresses, phone numbers) that
  are not real must use `PLACEHOLDER` values and a `TODO(content):` comment describing what
  real data must replace them.
- Placeholder flags may render a visible draft marker when `NEXT_PUBLIC_SHOW_CONTENT_DRAFTS=true`.
- Testimonials, teacher profiles, and outcome claims ship only as clearly-labeled placeholder
  entries; they must never read as claims about real people.

## CMS readiness
- Content modules are the only files that change when real content arrives. If a content
  change requires touching a component, the component API is wrong — fix the seam.
- Content shape must survive a move to a headless CMS: no file-system assumptions in types,
  no JSX inside content files (rich text is structured, e.g. `{ heading, body }` arrays).
