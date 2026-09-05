import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getTeachers } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Đội ngũ giáo viên",
    description:
      "Giáo viên Việt với chứng chỉ phương pháp quốc tế kết hợp giáo viên bản ngữ — xem hồ sơ và chuyên môn của từng giáo viên.",
    path: "/teachers",
  });
}

export default function TeachersPage() {
  const teachers = getTeachers();

  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Đội ngũ giáo viên"
            title="Người sẽ đồng hành cùng bạn"
            description="Mỗi giáo viên được tuyển chọn về chuyên môn và phỏng vấn kỹ về cách truyền đạt. Hồ sơ chi tiết tại trang từng giáo viên."
          />
        </Container>
      </Section>

      <Section tone="soft" className="py-12 lg:py-16">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <li key={teacher.slug}>
                <article className="flex h-full flex-col rounded-[var(--radius-md)] border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-body font-semibold text-paper"
                    >
                      {teacher.name.slice(0, 1)}
                    </span>
                    {teacher.placeholder ? (
                      <span className="rounded-full border border-dashed border-muted/50 px-2 py-0.5 text-caption text-muted">
                        hồ sơ mẫu
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-4 font-display text-subheading font-semibold text-ink">
                    <Link href={`/teachers/${teacher.slug}`} className="hover:text-accent-strong">
                      {teacher.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-small text-muted">{teacher.role}</p>
                  <p className="mt-3 flex items-start gap-2 text-small text-ink-soft">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                    {teacher.specialization}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {teacher.credentials.slice(0, 2).map((credential) => (
                      <li key={credential}>
                        <Badge variant="teal">{credential}</Badge>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/teachers/${teacher.slug}`}
                    className="mt-auto pt-4 text-small font-semibold text-accent-strong hover:text-accent"
                    aria-label={`Xem hồ sơ giáo viên ${teacher.name}`}
                  >
                    Hồ sơ chi tiết →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
