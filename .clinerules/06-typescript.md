# TypeScript Rules

## Strictness
- `tsconfig` keeps `strict: true`; do not weaken compiler options per-file or globally.
- `any` is forbidden. Use `unknown` + narrowing, generics, or Zod-inferred types. The only
  tolerated escape is a documented `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
  with an linked explanation — expected count in the repo: zero.
- Non-null assertion `!` is forbidden outside test fixtures.

## Types & validation
- Domain content types live in `src/types/content.ts` and are derived from Zod schemas
  (`z.infer`), so runtime validation and compile-time types can never diverge.
- Function parameters and return types are explicit on every exported function.
- Type-only imports use `import type`. `enums` are not used (use union types or `as const`).
- Prefer `satisfies` over annotation when checking object literals against a type.

## Next.js specifics
- Async request APIs (`params`, `searchParams`, `headers`, `cookies`) are awaited and typed.
- Server-only modules (`drizzle`, fs, env parsing) never import into client components;
  enforce with `import 'server-only'` where applicable.
- No `@ts-ignore`. No `// @ts-expect-error` without a reason comment.
