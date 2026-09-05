import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPrograms, getAudiences } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProgramCard } from "@/components/sections/programs-showcase";
import { ConsultationSection } from "@/components/sections/consultation-section";
export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Chương trình học",
    description:
      "Các chương trình tiếng Anh từ mầm non đến IELTS và người lớn đi làm — mục tiêu đầu ra rõ ràng, học offline và online.",
    path: "/programs",
  });
}

export default function ProgramsPage() {
  const programs = getPrograms();
  const audiences = getAudiences();

  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Chương trình học"
            title="Chọn lộ trình theo chặng đời của bạn"
            description="Mỗi chương trình có mục tiêu đầu ra, lịch học và hình thức rõ ràng. Chưa chắc chương trình nào phù hợp? Đăng ký tư vấn miễn phí ở cuối trang."
          />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Chương trình theo đối tượng">
            {audiences.map((audience) => (
              <li key={audience.id}>
                <Link
                  href={`#${audience.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 py-2 text-small font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {audience.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {audiences.map((audience) => {
        const items = audience.recommendedProgramSlugs
          .map((slug) => programs.find((p) => p.slug === slug))
          .filter((p) => p !== undefined);
        if (items.length === 0) return null;
        return (
          <Section key={audience.id} id={audience.id} tone="soft" className="scroll-mt-24 py-10 lg:py-14">
            <Container>
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-section font-semibold text-ink">{audience.label}</h2>
                  <p className="mt-1.5 max-w-prose text-small">{audience.description}</p>
                </div>
                <Badge variant="neutral">{items.length} chương trình</Badge>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {items.map((program, index) => (
                  <ProgramCard key={program.slug} program={program} index={index} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section tone="base" className="py-12">
        <Container className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-subheading font-semibold text-ink">
            Chưa chắc chương trình nào phù hợp? Để chúng tôi đề xuất.
          </p>
          <ButtonLink href="#tu-van" size="lg">
            Nhận tư vấn lộ trình
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Container>
      </Section>

      <div id="tu-van">
        <ConsultationSection
          sourcePage="/programs"
          title="Nhận đề xuất lộ trình"
          description="Kể chúng tôi về người học và mục tiêu — đội ngũ chuyên môn sẽ đề xuất chương trình phù hợp nhất."
        />
      </div>
    </>
  );
}
