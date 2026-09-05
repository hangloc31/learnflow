"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION_REVEAL, EASE_OUT_EXPO, revealViewport } from "@/lib/motion";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds — keep small; nothing may delay readability beyond 600ms total */
  delay?: number;
}

/**
 * Scroll-triggered entrance: fires once, transform+opacity only.
 * Under prefers-reduced-motion, MotionConfig renders final state instantly.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: DURATION_REVEAL, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
