# Architecture

LearnFlow is a Next.js 16 App Router application (TypeScript strict, Tailwind CSS v4) for a
modern English education center. The architecture optimizes for: server-first rendering,
content/presentation separation, and a clean seam to a future CMS/CRM.

## Layers

```
src/
├── app/            # Routes only: layouts, pages, API route handlers, sitemap/robots
├── components/     # Presentation. ui/ ← layout/ ← domain sections ← sections/
├── content/        # Typed, Zod-validated business content (the "CMS")
├── lib/            # Framework-agnostic logic: content loader, seo, leads, utils
├── styles/         # globals.css = the design token layer (@theme)
└── types/          # Domain types inferred from Zod schemas
```

## Render model

| Area | Rendering |
|---|---|
| All pages & sections | Server Components (default) |
| Audience/program selector | Client island (state: selected audience) |
| Testimonial carousel | Client island (state: active index) |
| Mobile menu | Client island (Radix Dialog) |
| Consultation form | Client island (RHF state) |
| Reveal/count-up animations | Client islands wrapping server content |

## Data flow

1. `src/content/*` modules define and Zod-validate all business content.
2. `src/lib/content.ts` loads and exposes typed getters (`getPrograms()`, `getTeacher(slug)`…).
3. Pages call getters, pass plain typed props to sections.
4. Sections compose `ui/` primitives. UI primitives never import content or lib.
5. Mutations (lead submission) go client-island → `submitLead()` → `POST /api/leads` →
   adapter (`src/lib/leads/adapters/*`) → SQLite (Drizzle) / console / email stub.

## Key decisions

- **Next.js Route Handler instead of separate backend** — one deployment, server-side
  validation, adapter-swappable storage (decision record: see `docs/development-rules.md`).
- **Drizzle + better-sqlite3** for lead storage; `DATABASE_URL` swaps to Turso/Neon for
  serverless hosts without code changes.
- **Tailwind v4 `@theme` tokens** are the design system single source of truth
  (see `docs/design-system.md`).
- **Content as typed modules** (not CMS yet) — swap to headless CMS by replacing
  `src/lib/content.ts` only (see `docs/content-model.md`).

## Route map

`/` · `/about` · `/programs` · `/programs/[slug]` · `/teachers` · `/teachers/[slug]` ·
`/events` · `/events/[slug]` · `/blog` · `/blog/[slug]` · `/contact` · `/trial` ·
`/placement-test` — all statically generated where content is known (`generateStaticParams`).
