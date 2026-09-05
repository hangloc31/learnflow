import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// RTL auto-cleanup needs a global afterEach — disabled via `globals: false`, so register it here.
afterEach(() => {
  cleanup();
});

// Environment defaults for isolated test runs (no .env.local loading in vitest).
process.env.NEXT_PUBLIC_SITE_URL ??= "http://localhost:3000";
process.env.LEADS_STORAGE_ADAPTER ??= "database";
// Fresh per-checkout scratch DB; the schema is (re)validated on first open.
process.env.DATABASE_URL ??= "file:./data/test-leads.db";

// jsdom lacks matchMedia — required by framer-motion islands.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList) as unknown as typeof window.matchMedia;
}

// jsdom lacks pointer-capture APIs — required by Radix UI (accordion trigger clicks).
if (typeof window !== "undefined" && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}
