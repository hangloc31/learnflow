"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Audience, Program } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface AudienceSelectorProps {
  audiences: Audience[];
  /** slug → program lookup supplied by the server page */
  programs: Program[];
}

const FORMAT_LABEL: Record<Program["format"], string> = {
  offline: "Tại trung tâm",
  online: "Online",
  hybrid: "Offline + Online",
  "one-to-one": "Kèm 1-1",
};

/**
 * Section 02 — the signature interaction: “Bạn đang tìm chương trình cho ai?”
 * ≤ 2 taps from audience to relevant programs. Client island; no backend.
 */
export function AudienceSelector({ audiences, programs }: AudienceSelectorProps) {
  const [selected, setSelected] = useState<Audience["id"] | null>(null);

  const recommended = useMemo(() => {
    if (!selected) return [];
    const audience = audiences.find((a) => a.id === selected);
    if (!audience) return [];
    return audience.recommendedProgramSlugs
      .map((slug) => programs.find((p) => p.slug === slug))
      .filter((p): p is Program => p !== undefined);
  }, [selected, audiences, programs]);

  const resultsId = "audience-selector-results";

  return (
    <Section tone="soft" aria-labelledby="audience-selector-title">
      <Container>
        <SectionHeading
          id="audience-selector-title"
          eyebrow="Bắt đầu từ đúng người"
          title="Bạn đang tìm chương trình cho ai?"
          description="Chọn một đối tượng để xem ngay chương trình phù hợp — hai chạm là có lộ trình."
        />

        <div
          role="group"
          aria-label="Chọn đối tượng học"
          className="mt-8 flex flex-wrap gap-3"
        >
          {audiences.map((audience) => {
            const active = audience.id === selected;
            return (
              <button
                key={audience.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(active ? null : audience.id)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-small font-semibold transition-colors duration-[var(--duration-fast)]",
                  active
                    ? "border-accent-deep bg-accent-deep text-white"
                    : "border-line bg-surface text-ink hover:border-accent hover:text-accent",
                )}
              >
                {active ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
                {audience.label}
              </button>
            );
          })}
        </div>

        <div id={resultsId} aria-live="polite" className="mt-8">
          {selected === null ? (
            <p className="text-small text-muted">
              Chọn đối tượng phía trên để xem gợi ý chương trình.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {recommended.map((program) => (
                <article
                  key={program.slug}
                  className="group flex flex-col rounded-[var(--radius-md)] border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-accent/40 hover:shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-caption font-semibold uppercase text-muted">
                        {program.ageRange}
                      </p>
                      <h3 className="mt-1 font-display text-subheading font-semibold text-ink">
                        {program.name}
                      </h3>
                    </div>
                    <Badge variant="teal">{FORMAT_LABEL[program.format]}</Badge>
                  </div>
                  <p className="mt-3 text-small">{program.tagline}</p>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-small font-semibold text-accent-strong hover:text-accent"
                  >
                    Xem chi tiết chương trình
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ))}
              {recommended.length === 0 ? (
                <p className="text-small text-muted">Chưa có chương trình gợi ý cho đối tượng này.</p>
              ) : null}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
