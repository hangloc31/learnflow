"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";

/**
 * Sticky mobile CTA — appears below `lg` only, after the hero has scrolled past,
 * and stays out of the way on form-focused routes (05-responsive.md).
 */
const HIDE_ON_ROUTES = ["/trial", "/placement-test", "/contact"];
const SHOW_AFTER_Y = 560;

export function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_Y);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDE_ON_ROUTES.includes(pathname)) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-line bg-paper/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <ButtonLink href="/trial" size="lg" className="flex-1">
          {siteConfig.ctas.trial}
        </ButtonLink>
        <a
          href={siteConfig.contact.phoneHref}
          aria-label={`Gọi hotline ${siteConfig.contact.phone}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
