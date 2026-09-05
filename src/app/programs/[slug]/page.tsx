import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, CircleCheck, GraduationCap } from "lucide-react";
import { getProgram, getPrograms } from "@/lib/content";
import { buildMetadata, courseJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ConsultationSection } from "@/components/sections/consultation-section";

const FORMAT_LABEL: Record<string, string> = {
  offline: "Tại trung tâm",
  online: "Online",
  hybrid: "Offline + Online",
  "one-to-one": "Kèm 1-1",
};

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const programs = await getPrograms();
    return programs.map((program) => ({ slug: program.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program)
    return buildMetadata({
      title: "Không tìm thấy chương trình",
      description: "Chương trình không tồn tại.",
      path: `/programs/${slug}`,
    });
  return buildMetadata({
    title: program.name,
    description: program.summary,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  return (
    <>
      <JsonLd data={courseJsonLd(program)} />

      <Section tone="base" className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{program.ageRange}</Badge>
                <Badge variant="teal">{FORMAT_LABEL[program.format]}</Badge>
                {program.featured ? <Badge variant="gold">Chương trình tiêu biểu</Badge> : null}
              </div>
              <h1 className="mt-5 text-hero font-semibold text-ink">{program.name}</h1>
              <p className="mt-4 max-w-prose text-subheading text-ink-soft">{program.tagline}</p>
              <p className="mt-4 max-w-prose text-body">{program.summary}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/trial" size="lg">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Đăng ký học thử chương trình này
                </ButtonLink>
                <ButtonLink href="#tu-van" variant="ghost" size="lg">
                  Nhận tư vấn lộ trình
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-7 shadow-soft lg:p-8">
              <p className="flex items-center gap-2 text-caption font-semibold uppercase text-accent-strong">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Kết quả đầu ra
              </p>
              <ul className="mt-4 space-y-3">
                {program.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                    <p className="text-small text-ink-soft">{outcome}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <dl className="grid grid-cols-2 gap-4 text-small">
                  <div>
                    <dt className="text-muted">Đối tượng</dt>
                    <dd className="mt-0.5 font-semibold text-ink">{program.ageRange}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Hình thức</dt>
                    <dd className="mt-0.5 font-semibold text-ink">{FORMAT_LABEL[program.format]}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Trình độ</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {program.levels.join(" · ") || "Mọi trình độ"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Học phí</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {/* TODO(content): publish real tuition policy */}
                      Theo lộ trình — tư vấn trực tiếp
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* curriculum preview */}
      {program.curriculumHighlights.length > 0 ? (
        <Section tone="soft" className="py-12 lg:py-16" aria-labelledby="curriculum-title">
          <Container>
            <SectionHeading
              id="curriculum-title"
              eyebrow="Bên trong chương trình"
              title="Điều gì diễn ra trên lớp"
            />
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {program.curriculumHighlights.map((item, index) => (
                <Reveal key={item} delay={Math.min(index * 0.05, 0.2)}>
                  <li className="flex h-full gap-4 rounded-[var(--radius-md)] border border-line bg-surface p-5">
                    <span
                      className="font-display text-section font-semibold text-accent/30"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-small text-ink-soft">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <div id="tu-van">
        <ConsultationSection
          sourcePage={`/programs/${program.slug}`}
          leadType="trial"
          title={`Thử lớp ${program.name}`}
          description="Đăng ký một buổi học thử để trải nghiệm phương pháp trước khi quyết định lộ trình."
        />
      </div>

    </>
  );
}
