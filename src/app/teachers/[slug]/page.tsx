import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap, Quote } from "lucide-react";
import { getTeacher, getTeachers } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ConsultationSection } from "@/components/sections/consultation-section";

interface TeacherPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const teachers = await getTeachers();
    return teachers.map((teacher) => ({ slug: teacher.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: TeacherPageProps): Promise<Metadata> {
  const { slug } = await params;
  const teacher = await getTeacher(slug);
  if (!teacher) return buildMetadata({ title: "Không tìm thấy giáo viên", description: "Hồ sơ không tồn tại.", path: `/teachers/${slug}` });
  return buildMetadata({
    title: teacher.name,
    description: `${teacher.role} — ${teacher.specialization}`,
    path: `/teachers/${teacher.slug}`,
  });
}

export default async function TeacherPage({ params }: TeacherPageProps) {
  const { slug } = await params;
  const teacher = await getTeacher(slug);
  if (!teacher) notFound();

  return (
    <>
      <Section tone="base" className="py-12 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* portrait placeholder — TODO(assets): consented photo required */}
            <div>
              <div
                className="flex aspect-[4/5] items-center justify-center rounded-[var(--radius-lg)] bg-accent-soft"
                aria-hidden="true"
              >
                <span className="font-display text-display font-semibold text-accent/40">
                  {teacher.name.slice(0, 1)}
                </span>
              </div>
              <p className="mt-3 text-caption text-muted">
                Ảnh chân dung sẽ được cập nhật sau khi có hình ảnh được phép sử dụng.
              </p>
            </div>

            <div>
              {teacher.placeholder ? (
                <Badge variant="neutral">Hồ sơ mẫu — chờ dữ liệu thực tế</Badge>
              ) : null}
              <h1 className="mt-4 text-hero font-semibold text-ink">{teacher.name}</h1>
              <p className="mt-2 text-subheading text-ink-soft">{teacher.role}</p>

              <div className="mt-6">
                <p className="flex items-center gap-2 text-caption font-semibold uppercase text-muted">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Chuyên môn
                </p>
                <p className="mt-2 text-body text-ink">{teacher.specialization}</p>
              </div>

              <div className="mt-6">
                <p className="text-caption font-semibold uppercase text-muted">Chứng chỉ & nền tảng</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {teacher.credentials.map((credential) => (
                    <li key={credential}>
                      <Badge variant="teal">{credential}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              {teacher.philosophy ? (
                <figure className="mt-8 rounded-[var(--radius-md)] border-l-4 border-accent bg-surface p-5">
                  <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
                  <blockquote className="mt-2 font-display text-body italic text-ink">
                    {teacher.philosophy}
                  </blockquote>
                </figure>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/trial">Học thử cùng đội ngũ giáo viên</ButtonLink>
                <ButtonLink href="/teachers" variant="ghost">
                  ← Tất cả giáo viên
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ConsultationSection sourcePage={`/teachers/${teacher.slug}`} leadType="trial" />
    </>
  );
}
