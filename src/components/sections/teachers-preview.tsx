import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import type { Teacher } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

/** Monogram placeholder until consented portraits exist (docs/asset-inventory.md). */
function Monogram({ name }: { name: string }) {
  const initials = name
    .replace("(placeholder)", "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-body font-semibold text-paper"
    >
      {initials}
    </span>
  );
}

export interface TeachersPreviewProps {
  teachers: Teacher[];
  /** listing-page mode: no "view all" link, custom copy */
  viewAllHref?: string | null;
  eyebrow?: string;
  title?: string;
  description?: string;
}

/** Section 08 — teachers. Humanized, credential-honest (placeholder-flagged content). */
export function TeachersPreview({
  teachers,
  viewAllHref = "/teachers",
  eyebrow = "Thầy cô của con",
  title = "Người theo sát con từng buổi",
  description = "Giáo viên có chứng chỉ phương pháp quốc tế, lớp tối đa 12 bạn nên thầy cô nhớ điểm mạnh — điểm cần cải thiện của từng con.",
}: TeachersPreviewProps) {
  return (
    <Section tone="base" aria-labelledby="teachers-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="teachers-title" eyebrow={eyebrow} title={title} description={description} />
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="inline-flex min-h-11 items-center gap-1.5 self-start text-small font-semibold text-accent-strong hover:text-accent"
            >
              Tất cả giáo viên
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <Reveal key={teacher.slug} delay={Math.min(index * 0.05, 0.2)} className="h-full">
              <article className="flex h-full flex-col rounded-[var(--radius-md)] border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft">
                <div className="flex items-center justify-between">
                  <Monogram name={teacher.name} />
                  {teacher.placeholder ? (
                    <span className="rounded-full border border-dashed border-muted/50 px-2 py-0.5 text-caption text-muted">
                      hồ sơ mẫu
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-body font-semibold text-ink">
                  {teacher.name.replace(" (placeholder)", "")}
                </h3>
                <p className="mt-1 text-small text-muted">{teacher.role}</p>
                <p className="mt-3 flex items-start gap-2 text-small text-ink-soft">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                  {teacher.specialization}
                </p>
                <Link
                  href={`/teachers/${teacher.slug}`}
                  className="mt-auto pt-4 text-small font-semibold text-accent-strong hover:text-accent"
                  aria-label={`Xem hồ sơ giáo viên ${teacher.name.replace(" (placeholder)", "")}`}
                >
                  Xem hồ sơ
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
