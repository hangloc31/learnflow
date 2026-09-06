"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, STAGGER_STEP } from "@/lib/motion";
import { ClipboardCheck, Users } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_STEP, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/**
 * Hero visual — real-feeling illustration (docs/asset-inventory.md):
 * swap the file with consented classroom photography later.
 */
export function HeroVisual() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      {/* photo panel */}
      <motion.div
        variants={item}
        className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-soft lg:aspect-[5/4]"
      >
        <Image
          src="/images/hero-kid-teacher.jpg"
          alt="Cô giáo kèm riêng một học viên trong lớp học"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/60 px-2.5 py-1 text-caption font-semibold text-paper backdrop-blur-sm">
          Ảnh minh họa
        </span>

        {/* primary floating card — the 20-minute promise */}
        <motion.div
          variants={item}
          className="absolute bottom-4 left-4 right-4 rounded-[var(--radius-md)] border border-line bg-surface/95 p-4 shadow-lift backdrop-blur-sm sm:right-auto sm:w-64"
        >
          <p className="flex items-center gap-2 text-caption font-semibold uppercase text-accent-strong">
            <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Test đầu vào miễn phí
          </p>
          <p className="mt-1.5 font-display text-body font-semibold text-ink">
            20 phút biết con đang ở đâu
          </p>
          <p className="mt-1 text-small text-muted">Kèm báo cáo điểm mạnh · điểm cần cải thiện</p>
        </motion.div>
      </motion.div>

      {/* class-size chip */}
      <motion.div
        variants={item}
        className="absolute -right-2 top-8 rounded-[var(--radius-md)] border border-line bg-surface px-4 py-3 shadow-soft sm:-right-6"
      >
        <p className="flex items-center gap-2 text-small font-semibold text-teal">
          <Users className="h-4 w-4" aria-hidden="true" />
          Lớp tối đa 12 bạn
        </p>
      </motion.div>
    </motion.div>
  );
}
