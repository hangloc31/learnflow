import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const CATEGORY_LABEL: Record<string, string> = {
  "learning-tips": "Mẹo học tiếng Anh",
  "parent-resources": "Góc phụ huynh",
  ielts: "IELTS",
  "study-abroad": "Du học",
  cambridge: "Cambridge",
  "school-english": "Tiếng Anh trên trường",
  events: "Sự kiện",
  "center-news": "Tin trung tâm",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kiến thức & chia sẻ",
    description:
      "Kinh nghiệm học tiếng Anh thực chiến cho phụ huynh và học viên — từ Cambridge đến IELTS.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const articles = await getArticles();
  const [lead, ...rest] = articles;

  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Kiến thức & chia sẻ"
            title="Góc kiến thức cho phụ huynh và học viên"
            description="Viết bởi đội ngũ giảng dạy — ngắn, thực tế, dùng được ngay."
          />
        </Container>
      </Section>

      <Section tone="soft" className="py-12 lg:py-16">
        <Container>
          {lead ? (
            <Reveal>
              <article className="rounded-[var(--radius-md)] border border-line bg-surface p-7 shadow-soft lg:p-9">
                <Badge variant="accent">{CATEGORY_LABEL[lead.category] ?? lead.category}</Badge>
                <h2 className="mt-4 text-section font-semibold leading-snug text-ink">
                  <Link href={`/blog/${lead.slug}`} className="hover:text-accent-strong">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-prose text-small">{lead.excerpt}</p>
                <p className="mt-5 flex items-center gap-2 text-caption text-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {lead.readingTimeMinutes} phút đọc
                </p>
              </article>
            </Reveal>
          ) : null}

          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <li key={article.slug}>
                <article className="flex h-full flex-col rounded-[var(--radius-md)] border border-line bg-surface p-6 transition-[border-color,box-shadow] hover:border-accent/40 hover:shadow-soft">
                  <p className="text-caption font-semibold uppercase text-muted">
                    {CATEGORY_LABEL[article.category] ?? article.category}
                  </p>
                  <h3 className="mt-2 font-display text-body font-semibold text-ink">
                    <Link href={`/blog/${article.slug}`} className="hover:text-accent-strong">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-small">{article.excerpt}</p>
                  <p className="mt-auto pt-4 text-caption text-muted">
                    {article.readingTimeMinutes} phút đọc
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
