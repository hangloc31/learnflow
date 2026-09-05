# Asset Inventory & Image System

No generic stock fills gaps: every image slot has a defined purpose, and placeholders are
clearly abstract (never implying real students/teachers). Replace via `TODO(assets):` flags.

| Slot | Location | Size / crop | Requirements | Status |
|---|---|---|---|---|
| Hero visual | homepage hero | 4:5 portrait-ish, focal center | Real classroom energy, one learner + teacher moment, warm light, no posed stock | `hero-placeholder.svg` (abstract) |
| Program images ×7 | program cards + detail hero | 3:2 | Age-appropriate learning context per program | placeholder SVGs |
| Teacher portraits | teacher cards/profile | 1:1 | Consented portraits, neutral background, no fake names | monogram placeholders |
| Classroom photography | classroom section collage | mixed 4:5 / 1:1 / 3:2 | Candid activity: speaking, games, projects, collaboration | placeholder SVGs |
| Event images ×4 | events section + detail | 3:2 | Outdoor/experiential moments, STEAM, trips | placeholder SVGs |
| Article thumbnails | knowledge hub | 3:2 | Editorial-abstract or topic illustration | placeholder SVGs |
| OG image | `public/og` | 1200×630 | Brand lockup + tagline | `TODO(assets)` |

## Rules
- Photography direction: warm, candid, real classrooms; diverse learners; no stock-smile
  boardroom shots; no obviously-minor identifiable faces without guardian consent + release.
- All raster images ship via `next/image` with `sizes`; SVG placeholders may render inline.
- Alt text: descriptive for content images; `alt=""` for decorative.
