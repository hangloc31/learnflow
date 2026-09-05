"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Statistic } from "@/types/content";

const formatter = new Intl.NumberFormat("vi-VN");

/** Count-up: animates once when visible; renders instantly under prefers-reduced-motion. */
export function CountUpStatistic({ statistic }: { statistic: Statistic }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduced.current) {
      setDisplay(statistic.value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * statistic.value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, statistic.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatter.format(display)}
      {statistic.suffix ?? ""}
    </span>
  );
}
