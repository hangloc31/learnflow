"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";

/**
 * Mobile navigation — full-screen Radix dialog, closes on route change
 * (state is derived from the route, no effect needed),
 * native <details> for submenu disclosure (keyboard-safe by default).
 */
export function MobileMenu() {
  // Derived-state close: the dialog is open only for the pathname it was opened on,
  // so navigating closes it automatically without an effect (react-hooks/set-state-in-effect).
  const [openFor, setOpenFor] = useState<string | null>(null);
  const pathname = usePathname();
  const isOpen = openFor !== null && openFor === pathname;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next) => setOpenFor(next ? pathname : null)}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Mở menu điều hướng"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-mobile-menu)] bg-ink/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-x-0 top-0 z-[calc(var(--z-mobile-menu)+1)] max-h-[100dvh] overflow-y-auto rounded-b-[var(--radius-lg)] bg-paper p-6 pb-10 shadow-panel"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title asChild>
              <Link href="/" className="font-display text-lg font-semibold text-ink">
                Learn<span className="text-accent">Flow</span>
              </Link>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Đóng menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Menu chính" className="mt-6">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <details className="group border-b border-line py-1">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-body font-semibold text-ink [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronRight
                          className="h-4 w-4 text-muted transition-transform group-open:rotate-90"
                          aria-hidden="true"
                        />
                      </summary>
                      <ul className="mt-1 space-y-1 pb-2 pl-3">
                        <li>
                          <Link
                            href={item.href}
                            className="flex min-h-11 items-center text-small text-muted"
                          >
                            Tất cả {item.label.toLowerCase()}
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex min-h-11 items-center text-small text-ink-soft"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex min-h-12 items-center border-b border-line text-body font-semibold text-ink"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/trial"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 font-semibold text-white"
            >
              {siteConfig.ctas.trial}
            </Link>
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-line bg-surface px-6 font-semibold text-ink"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
