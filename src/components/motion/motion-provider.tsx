"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Global motion gate — honors prefers-reduced-motion for every Framer Motion island (11-animation). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
