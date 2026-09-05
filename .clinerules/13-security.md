# Security Rules

## Trust boundaries
- The client is never trusted: the `/api/leads` route re-validates every payload with the
  shared Zod schema, regardless of client-side validation.
- API routes return only what is needed: `{ ok: true }` or a typed error — no stack traces,
  no internal IDs, no adapter details in responses.

## Secrets & environment
- Secrets live only in `.env.local` (git-ignored). `NEXT_PUBLIC_*` is public by definition —
  never put secrets there. Env access goes through typed getters in `src/lib/env.ts`, never
  `process.env` scattered across files.
- Server-only modules guard with `import 'server-only'`.

## Abuse prevention
- Public POST endpoints require: honeypot field check and per-IP rate limiting
  (documented in-memory implementation; swap for durable store when horizontally scaling).
- Payload size caps enforced by schema (message length, array sizes).

## PII & data care
- The lead form collects personal data (often about minors): no PII in logs, no analytics on
  form fields, no third-party scripts inside form flows. Retention policy is a documented
  TODO for the business.
- Dependencies: no new runtime dependency without a license + maintenance check.
