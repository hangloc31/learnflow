import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import type { Program, Faq, Article } from "@/types/content";

/** Metadata builder — canonical URL, OG and Twitter in one place (.clinerules/09-seo.md). */
export function buildMetadata(options: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = options;
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "vi_VN",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/**
 * Structured data builders. Rule: only emit what the page visibly shows,
 * and never include placeholder business facts (phone/address omitted while TODO).
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    // TODO(content): add address/telephone only after verified business data exists
  };
}

export function courseJsonLd(program: Program): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.name,
    description: program.summary,
    educationalLevel: program.levels.join(", ") || undefined,
    inLanguage: "en",
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function articleJsonLd(article: Article): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    inLanguage: "vi",
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

/** FAQPage schema — only FAQs with reviewed (non-placeholder) answers. */
export function faqJsonLd(faqs: Faq[]): Record<string, unknown> | null {
  const approved = faqs.filter((f) => !f.placeholder);
  if (approved.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: approved.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
