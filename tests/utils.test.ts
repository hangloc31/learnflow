import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn() token-aware class merging", () => {
  it("keeps text-white alongside a text-body font-size token", () => {
    const result = cn("bg-accent-deep text-white shadow-soft", "px-8 py-3 text-body");
    expect(result).toContain("text-white");
    expect(result).toContain("text-body");
  });

  it("keeps text-white alongside a text-small token (active chip case)", () => {
    const result = cn(
      "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-small",
      "border-accent-deep bg-accent-deep text-white",
    );
    expect(result).toContain("text-white");
    expect(result).toContain("text-small");
  });

  it("keeps text-paper on the secondary variant (bg-ink + text-body)", () => {
    const result = cn("bg-ink text-paper hover:bg-ink-soft shadow-soft", "px-6 py-2.5 text-body");
    expect(result).toContain("text-paper");
    expect(result).toContain("text-body");
  });

  it("still lets a later override win (call-site text-paper beats variant text-white)", () => {
    const result = cn("bg-accent-deep text-white", "px-8 py-3 text-body text-paper");
    expect(result).toContain("text-paper");
    expect(result).not.toContain("text-white");
  });

  it("still deduplicates real text *colors*", () => {
    const result = cn("bg-accent text-white", "text-red-500");
    expect(result).not.toContain("text-white");
    expect(result).toContain("text-red-500");
  });
});