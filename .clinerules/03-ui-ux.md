# UI/UX Rules

## Quality bar
- Every section must state (in a code comment or docs) what user question it answers and what
  action it enables. A section that answers neither is removed, not restyled.
- Maximum one primary CTA visible per viewport; secondary CTAs use ghost/outline variants.
- When a section looks weak: fix hierarchy, spacing, typography, or composition first.
  Adding gradients/shadows to weak sections is prohibited.

## Hierarchy & typography
- One `h1` per page. Section headings use the `SectionHeading` primitive — never raw `<h2>`
  with ad-hoc classes.
- Type sizes come from the token scale (`text-display`, `text-hero`, `text-section`,
  `text-subheading`, `text-body`, `text-small`, `text-caption` via Tailwind theme).
- Body line-length ≤ 68ch. Paragraphs > 3 sentences get split or summarized.
- No centered walls of text; body blocks over 2 lines align left unless inside a deliberate
  centered composition.

## Tokens only
- Colors, spacing, radii, shadows, and z-index come from the theme tokens defined in
  `src/styles/globals.css`. Raw values (`#3b82f6`, `px-[13px]`, `shadow-[0_1px_2px]`) are
  lint-blocking style violations; extending the token set is the correct move when a value is
  genuinely missing.

## Interaction
- Every interactive element has: hover state, focus-visible ring (token `ring-focus`),
  and a disabled state where applicable.
- Clickable cards make the whole card clickable with a single unambiguous link;
  nested interactive elements stay outside the link hitbox.
- Forms show inline validation on blur/step-change, never only on submit.
- Empty states explain what was expected and offer the next action.
