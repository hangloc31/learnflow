import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const FORMAT_LABEL: Record<Program["format"], string> = {
  offline: "Tại trung tâm",
  online: "Online",
  hybrid: "Offline + Online",
  "one-to-one": "Kèm 1-1",
};

export interface ProgramCardData {
  program: Program;
  /** index drives the intentional visual variation — cards must not repeat (03-ui-ux) */
  index: number;
}

/** Program card with editorial variation by position: featured spans, alternating tone. */
export function ProgramCard({ program, index }: ProgramCardData) {
  const featured = program.featured;
  const alt = index % 3 === 1;
  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)} className={featured ? "md:col-span-2" : ""}>
      <article
        className={`group flex h-full flex-col rounded-[var(--radius-md)] border p-6 transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1 lg:p-8 ${
          featured
            ? "border-ink/15 bg-ink text-paper shadow-soft hover:border-accent/60 md:flex-row md:items-center md:gap-10"
            : alt
              ? "border-line bg-accent-soft/50 hover:border-accent/40 hover:shadow-soft"
              : "border-line bg-surface hover:border-accent/40 hover:shadow-soft"
        }`}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={featured ? "gold" : alt ? "accent" : "neutral"}>
              {program.ageRange}
            </Badge>
            <Badge variant={featured ? "neutral" : "teal"}>{FORMAT_LABEL[program.format]}</Badge>
          </div>
          <h3
            className={`mt-4 font-display text-subheading font-semibold ${
              featured ? "text-paper" : "text-ink"
            }`}
          >
            {program.name}
          </h3>
          <p className={`mt-2 max-w-prose text-small ${featured ? "text-paper/75" : ""}`}>
            {program.tagline}
          </p>
          {featured ? (
            <p className="mt-3 max-w-prose text-small text-paper/60">{program.summary}</p>
          ) : null}
        </div>
        <Link
          href={`/programs/${program.slug}`}
          className={`mt-6 inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start text-small font-semibold md:mt-0 ${
            featured ? "text-gold hover:text-paper" : "text-accent-strong hover:text-accent"
          }`}
          aria-label={`Xem chi tiết chương trình ${program.name}`}
        >
          Chi tiết
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </article>
    </Reveal>
  );
}

/** Section 05 — programs overview with intentional, non-repetitive card composition. */
export function ProgramsShowcase({ programs }: { programs: Program[] }) {
  return (
    <Section tone="soft" aria-labelledby="programs-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow="Chương trình học"
            title="Một lộ trình cho từng chặng đời"
            description="Từ tiếng Anh đầu đời đến IELTS — mỗi chương trình có mục tiêu đầu ra rõ ràng và lộ trình được đo bằng kết quả."
          />
          <ButtonLink href="/programs" variant="ghost" className="self-start">
            Tất cả chương trình
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {programs.map((program, index) => (
            <ProgramCard key={program.slug} program={program} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
