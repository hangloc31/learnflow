import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom tailwind-merge config so project tokens merge correctly.
 *
 * The default tailwind-merge treats any `text-*` class as a text color and,
 * because Tailwind v4 uses a non-default config, doesn't know our `@theme` tokens.
 * So `text-body` (a font-size token) was grouped with `text-white` (a color) and
 * silently deleted it. These group definitions teach the merger that `text-<token>`
 * is ambiguous: `body|small|caption` + headings are font sizes, `paper|surface|ink|...`
 * are text colors.
 *
 * Derived from tokens in `src/styles/globals.css` (`@theme`). Keep in sync.
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "hero",
            "section",
            "subheading",
            "body",
            "small",
            "caption",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "paper",
            "surface",
            "ink",
            "ink-soft",
            "muted",
            "line",
            "accent",
            "accent-strong",
            "accent-deep",
            "accent-soft",
            "teal",
            "teal-soft",
            "gold",
            "gold-soft",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
