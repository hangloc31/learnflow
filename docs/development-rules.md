# Development Rules

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (http://localhost:3000) |
| `npm run build` | Production build (must pass before any handoff) |
| `npm run lint` | ESLint (zero errors policy) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest suite (`vitest run`) |
| `npm run db:push` | Push Drizzle schema to `DATABASE_URL` |

Every change gates on: `lint && typecheck && test` (see `.clinerules/README.md` checklist).

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | prod | `http://localhost:3000` | canonical URLs, sitemap |
| `NEXT_PUBLIC_SHOW_CONTENT_DRAFTS` | no | `false` | render visible draft markers on placeholder content |
| `LEADS_STORAGE_ADAPTER` | no | `database` (falls back to `console` on failure) | lead persistence strategy |
| `DATABASE_URL` | if adapter=database | `file:./data/learnflow.db` | SQLite (swap for Turso/Neon URL in serverless) |
| `RESEND_API_KEY` | no | unset | email notification stub (disabled when unset) |
| `LEAD_NOTIFICATION_EMAIL` | no | unset | destination inbox for lead alerts |

Copy `.env.example` → `.env.local`. Never commit `.env*`. Lead data lives in `data/*.db` —
git-ignored (PII).

## Decision records

1. **Lead storage: Route Handler + SQLite via adapter (2026-09).** No separate backend app.
   Chosen for durability + zero extra infrastructure; adapters allow CRM/email swap by config.
   In-memory rate limiting is acceptable at current scale; revisit when horizontally scaling.
2. **Content as typed modules, not CMS (2026-09).** The center's content volume is small and
   slow-changing; typed modules give CMS-grade safety now, migration seam later
   (`src/lib/content.ts` is the only file to change).
3. **Tailwind v4 `@theme` as the token layer (2026-09).** Avoids a parallel token system;
   design tokens and utility classes cannot drift apart.
4. **Framer Motion limited to client islands (2026-09).** Keeps pages server-rendered;
   animation bundle loads only where used.

## Known limitations

- Rate limiting is in-memory (per-instance). Add a durable store when scaling beyond one instance.
- Image assets are placeholder art with documented requirements (`docs/asset-inventory.md`);
  real photography must not depict identifiable people as students/teachers without consent.
- Search is out of scope for v1; navigation + selector cover discovery.
- No analytics yet — requires a consent/privacy decision by the business.
