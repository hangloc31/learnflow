# Form Rules

## Stack & structure
- Forms use React Hook Form + `zodResolver` with a Zod schema as the single source of truth.
- The 5-step consultation flow (audience → age/level → goal → format → contact) validates each
  step before advancing (`trigger(fieldsOfStep)`); the final submit validates everything.
- Progress is visible: step indicator with `aria-current="step"`; going back never loses
  entered data.
- Schemas live beside the form; the lead payload schema in `src/lib/leads/schema.ts` is shared
  by the client form, the API route, and tests.

## UX
- Labels are always visible (no placeholder-as-label). Errors appear inline next to the field,
  in Vietnamese, linked via `aria-describedby`.
- Inputs: 16px font-size minimum (iOS no-zoom), numeric `inputMode` for phone, `autocomplete`
  attributes (`name`, `tel`, `email`).
- Submit shows pending state (`aria-busy`), success state (next action: what happens now),
  and failure state (retry path + hotline fallback) — silence is not a state.

## Submission (adapter contract)
- Components call `submitLead(payload)` from `src/lib/leads` — never `fetch()` to `/api/*`
  directly.
- The API route re-validates with the same Zod schema, applies honeypot + rate limiting, and
  persists via the configured `LeadStorageAdapter` (`database` default, `console` fallback,
  email/CRM stubs behind env vars).
- Never log PII (name/phone/email) — not in adapters, not in route handlers.
