# Git Conventions

## Commits
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`,
  `perf:`, `a11y:`, `content:` — scope optional, e.g. `feat(programs): add selector section`.
- One logical change per commit; content placeholders and code changes are not mixed.
- Never commit: `.env*`, `*.db`/`*.sqlite*` (lead data), `node_modules`, build output,
  temporary scripts. `.env.example` documents every variable with safe sample values.

## Branches & history
- Branch names: `feat/<slug>`, `fix/<slug>`, `chore/<slug>` from `main`.
- History is kept linear-ish and readable; no merge commits from local WIP
  (`git rebase` before PR). Force-push only to own feature branches.
- Every commit passes: lint, typecheck, tests. The repository must be runnable at any commit.

## Review gates (self-review before handing over)
- `npm run lint && npm run typecheck && npm test` green.
- No TODO without an owner context: format `TODO(domain): what needs to happen`.
- New env vars documented in `.env.example` and `docs/development-rules.md`.
