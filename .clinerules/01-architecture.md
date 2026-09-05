# Architecture Rules

## Framework boundaries
- Next.js App Router with `src/` directory. Routes live in `src/app`, never at project root.
- Server Components are the default. Add `"use client"` only when a component needs at least
  one of: state, event handlers, browser APIs, animation, or form interactivity.
- A `use client` component must be the smallest possible interactive island. Wrap client
  islands in server sections; never mark a whole section client-side when only one control
  is interactive.

## Data flow (one direction only)
```
src/content/* (typed data) → page (server) → section components → ui primitives
```
- Pages fetch/select content from `src/content` via `src/lib/content`.
- Sections receive data as typed props. Sections must not import content modules directly.
- `src/components/ui/*` primitives must never import from `src/content` or `src/lib`.
- Client islands communicate upward only through typed callback props, never via global stores
  (no state library is currently justified).

## Routing
Allowed top-level routes: `/`, `/about`, `/programs`, `/programs/[slug]`, `/teachers`,
`/teachers/[slug]`, `/events`, `/events/[slug]`, `/blog`, `/blog/[slug]`, `/contact`,
`/trial`, `/placement-test`. New routes require updating `sitemap.ts`, `robots.ts` and the
navigation content module in the same change.

- Dynamic segments use `generateStaticParams` for all statically-known slugs.
- Dynamic route `params`/`searchParams` are Promises — always `await` them.
- Shared chrome (header/footer) lives in `src/app/layout.tsx` + `src/components/layout`;
  page-specific layout never duplicates global chrome.

## Modules
- `src/lib/leads` owns lead submission. UI code calls `submitLead()` — never `fetch()` to
  API routes directly from components.
- `src/lib/seo` owns metadata/JSON-LD builders. Pages must not hand-build `<script type="application/ld+json">`.
- `src/lib/utils.ts` exposes `cn()`; no other class-merging helper is allowed.
- No new top-level directory may be created without updating this rule and `/docs/architecture.md`.
