import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { getArticle, getArticles } from "@/lib/content";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ArticleBody } from "@/components/article-body";

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

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article)
    return buildMetadata({
      title: "Không tìm thấy bài viết",
      description: "Bài viết không tồn tại.",
      path: `/blog/${slug}`,
    });
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />

      <Section tone="base" className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <p className="text-caption font-semibold uppercase text-muted">
            {CATEGORY_LABEL[article.category] ?? article.category}
          </p>
          <h1 className="mt-3 text-section lg:text-hero lg:leading-tight font-semibold text-ink">
            {article.title}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-small text-muted">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {article.readingTimeMinutes} phút đọc
            {article.publishedAt ? ` · ${article.publishedAt}` : ""}
          </p>

          <p className="mt-8 text-subheading text-ink-soft">{article.excerpt}</p>

          {article.body && article.body.length > 0 ? (
            <ArticleBody blocks={article.body} />
          ) : (
            <div className="mt-10 rounded-[var(--radius-md)] border border-dashed border-muted/50 bg-surface p-6 text-center">
              <p className="text-small font-semibold text-ink">Nội dung bài viết đầy đủ</p>
              <p className="mt-1.5 text-small">
                Bài viết này đang dùng dữ liệu mẫu. Thay phần thân bằng nội dung biên tập thực tế
                khi có — kiến trúc và SEO đã sẵn sàng.
              </p>
              <Badge variant="neutral" className="mt-3">
                TODO(content): body content
              </Badge>
            </div>
          )}

          <div className="mt-10 border-t border-line pt-6">
            <ButtonLink href="/blog" variant="ghost">
              ← Tất cả bài viết
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
