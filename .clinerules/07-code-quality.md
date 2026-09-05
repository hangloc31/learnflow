# Code Quality Rules

## Naming
- Components/Types: `PascalCase`. Functions/variables: `camelCase`. Content files: `kebab-case`.
- Booleans read as predicates: `isLoading`, `hasError`, `canSubmit`. Event handlers: `handleX`.
- Names state intent: `studentCount`, not `data`; `audienceOptions`, not `arr`.

## Duplication & abstraction
- The same JSX structure appearing 3+ times with variant data becomes a component with props.
- The same style cluster appearing 3+ times becomes a token or a `cva` variant.
- No speculative abstraction: extract only on the third real occurrence, or when two call
  sites already agree. No "utils" module containing one function used once.

## Functions & files
- Exported functions ≤ 40 lines; component files ≤ 200 lines (see `02-components.md`).
- Early returns over nested conditionals; no deeply nested ternaries.
- No commented-out code, no dead exports, no `console.log` in committed code
  (allowed in `console` adapter implementations, clearly named).

## Error handling
- Content loaders validate with Zod and throw descriptive errors including the file path.
- API routes return typed JSON errors `{ error: { code, message } }` — never raw exception text.
- Async UI states must handle: loading, error, and empty — visible to the user, not only logged.
