import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const CATEGORY_LABEL: Record<Article["category"], string> = {
  "learning-tips": "Mẹo học tiếng Anh",
  "parent-resources": "Góc phụ huynh",
  ielts: "IELTS",
  "study-abroad": "Du học",
  cambridge: "Cambridge",
  "school-english": "Tiếng Anh trên trường",
  events: "Sự kiện",
  "center-news": "Tin trung tâm",
};

/**
 * Section 12 — knowledge hub. Editorial: one lead story + compact list.
 */
export function KnowledgeHub({ articles }: { articles: Article[] }) {
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <Section tone="soft" aria-labelledby="knowledge-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="knowledge-title"
            eyebrow="Kiến thức & chia sẻ"
            title="Học tiếng Anh thông minh hơn, mỗi tuần"
            description="Kinh nghiệm thực chiến cho phụ huynh và học viên — viết bởi đội ngũ giảng dạy."
          />
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-1.5 self-start text-small font-semibold text-accent-strong hover:text-accent"
          >
            Tất cả bài viết
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <article className="flex h-full flex-col rounded-[var(--radius-md)] border border-line bg-surface p-7 shadow-soft lg:p-9">
              <Badge variant="accent">{CATEGORY_LABEL[lead.category]}</Badge>
              <h3 className="mt-4 font-display text-section font-semibold leading-snug text-ink">
                <Link href={`/blog/${lead.slug}`} className="transition-colors hover:text-accent-strong">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-prose text-small">{lead.excerpt}</p>
              <p className="mt-auto flex items-center gap-2 pt-6 text-caption text-muted">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {lead.readingTimeMinutes} phút đọc
              </p>
            </article>
          </Reveal>

          <ul className="flex flex-col divide-y divide-line rounded-[var(--radius-md)] border border-line bg-surface">
            {rest.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col gap-1.5 p-5 transition-colors hover:bg-accent-soft/40"
                >
                  <p className="text-caption font-semibold uppercase text-muted">
                    {CATEGORY_LABEL[article.category]}
                  </p>
                  <p className="font-display text-body font-semibold text-ink group-hover:text-accent-strong">
                    {article.title}
                  </p>
                  <p className="text-caption text-muted">{article.readingTimeMinutes} phút đọc</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
