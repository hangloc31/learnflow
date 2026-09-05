# SEO Rules

## Metadata
- Every route exports `metadata` (or `generateMetadata` for dynamic routes) with: title,
  description, canonical URL (`metadataBase` set once in the root layout), and Open Graph data.
- Title pattern: `<Page> · <Site>`; the homepage sets the absolute brand title.
- `sitemap.ts` and `robots.ts` are generated from the route list in `src/lib/seo/routes.ts`;
  adding a route without updating them breaks the build.

## Headings & semantics
- Exactly one `h1` per page, descriptive without the brand suffix. Headings descend without
  skipping levels. Landmarks: `header`, `nav`, `main`, `footer` — one `main` per page.

## Structured data (never fabricated)
- JSON-LD is emitted only through `src/lib/seo/structured-data.ts` builders and only for
  content that visibly exists on the page: `EducationalOrganization` (site-wide),
  `Course` (program detail), `Article` (blog detail), `FAQPage` (visible FAQ content),
  `Person` (teacher detail).
- Placeholder business facts (statistics, addresses, phone numbers) must not appear in
  structured data until replaced with verified content.
- Every JSON-LD block is validated in review against Google's Rich Results requirements.
