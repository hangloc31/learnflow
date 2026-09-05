"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, STAGGER_STEP } from "@/lib/motion";
import { Sparkles, TrendingUp, MessagesSquare } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_STEP, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/**
 * Hero visual — abstract placeholder composition (docs/asset-inventory.md):
 * TODO(assets): replace with real classroom photography; never implies real students.
 */
export function HeroVisual() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      aria-hidden="true"
    >
      {/* backdrop panel */}
      <motion.div
        variants={item}
        className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-accent-soft sm:aspect-[5/5]"
      >
        <svg viewBox="0 0 400 500" className="h-full w-full" role="presentation">
          <circle cx="320" cy="90" r="140" fill="var(--color-gold-soft)" />
          <circle cx="60" cy="420" r="110" fill="var(--color-teal-soft)" />
          <path d="M0 330 C 120 260, 280 420, 400 320 L 400 500 L 0 500 Z" fill="var(--color-surface)" opacity="0.75" />
          <rect x="52" y="120" width="120" height="8" rx="4" fill="var(--color-accent)" opacity="0.85" />
          <rect x="52" y="144" width="76" height="8" rx="4" fill="var(--color-accent)" opacity="0.45" />
        </svg>

        {/* primary floating card — static after entrance (no infinite float) */}
        <motion.div
          variants={item}
          className="absolute bottom-6 left-6 right-6 rounded-[var(--radius-md)] border border-line bg-surface/95 p-4 shadow-lift backdrop-blur-sm sm:right-auto sm:w-64"
        >
          <p className="flex items-center gap-2 text-caption font-semibold uppercase text-accent-strong">
            <MessagesSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Lớp học đang diễn ra
          </p>
          <p className="mt-1.5 font-display text-body font-semibold text-ink">
            Speaking Club — chủ đề “Giới thiệu công việc”
          </p>
          <p className="mt-1 text-small text-muted">Nhóm 8 học viên · 45 phút</p>
        </motion.div>
      </motion.div>

      {/* outcome chip */}
      <motion.div
        variants={item}
        className="absolute -right-2 top-8 rounded-[var(--radius-md)] border border-line bg-surface px-4 py-3 shadow-soft sm:-right-6"
      >
        <p className="flex items-center gap-2 text-small font-semibold text-teal">
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
          Tiến bộ được đo theo chặng
        </p>
      </motion.div>

      {/* start chip */}
      <motion.div
        variants={item}
        className="absolute -left-2 top-1/3 rounded-full border border-line bg-ink px-4 py-2 text-small font-semibold text-paper shadow-soft sm:-left-6"
      >
        <p className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
          Học thử miễn phí
        </p>
      </motion.div>
    </motion.div>
  );
}
