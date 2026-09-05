import type { Variants } from "framer-motion";

/**
 * Motion tokens (docs/design-system.md → Motion). Durations in seconds for Framer Motion;
 * the CSS-side tokens (150/250/500ms) live in globals.css. Keep the numbers in sync.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION_REVEAL = 0.5;
export const STAGGER_STEP = 0.06;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION_REVEAL, ease: EASE_OUT_EXPO } },
};

export function stagger(delayChildren = 0, staggerChildren = STAGGER_STEP): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };
}

/** Scroll-reveal viewport config: fire once, slightly before entering. */
export const revealViewport = { once: true, margin: "-80px" } as const;
