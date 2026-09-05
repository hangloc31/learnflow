import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getBranches } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ConsultationSection } from "@/components/sections/consultation-section";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Liên hệ",
    description:
      "Gọi hotline, email hoặc để lại thông tin — đội ngũ tư vấn sẽ phản hồi trong vòng 24 giờ làm việc.",
    path: "/contact",
  });
}

export default function ContactPage() {
  const branches = getBranches();

  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <h1 className="text-section lg:text-hero font-semibold text-ink">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-4 text-body text-ink-soft">
            Chọn cách liên hệ phù hợp nhất với bạn — hoặc điền biểu mẫu bên dưới, chúng tôi sẽ
            gọi lại.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            <li>
              <a
                href={siteConfig.contact.phoneHref}
                className="flex h-full flex-col gap-2 rounded-[var(--radius-md)] border border-line bg-surface p-5 transition-colors hover:border-accent"
              >
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="text-small font-semibold text-ink">Hotline</span>
                <span className="text-small text-muted">{siteConfig.contact.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex h-full flex-col gap-2 rounded-[var(--radius-md)] border border-line bg-surface p-5 transition-colors hover:border-accent"
              >
                <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="text-small font-semibold text-ink">Email</span>
                <span className="text-small text-muted">{siteConfig.contact.email}</span>
              </a>
            </li>
            <li className="rounded-[var(--radius-md)] border border-line bg-surface p-5">
              <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="mt-2 block text-small font-semibold text-ink">Trung tâm chính</span>
              <span className="mt-0.5 block text-small text-muted">
                {siteConfig.contact.address}
              </span>
            </li>
          </ul>

          {/* TODO(content): replace with verified branch list + maps when available */}
          {branches.length > 1 ? (
            <div className="mt-8">
              <h2 className="text-body font-semibold text-ink">Các cơ sở</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {branches.map((branch) => (
                  <li key={branch.name} className="rounded-[var(--radius-md)] border border-line bg-surface p-5">
                    <p className="text-small font-semibold text-ink">{branch.name}</p>
                    <p className="mt-1 text-small text-muted">{branch.address}</p>
                    <a href={`tel:${branch.phone}`} className="mt-1 inline-block text-small text-accent-strong">
                      {branch.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>

      <ConsultationSection
        sourcePage="/contact"
        leadType="contact"
        title="Gửi yêu cầu tư vấn"
        description="Điền nhanh 5 bước — tư vấn viên sẽ liên hệ trong vòng 24 giờ làm việc."
      />
    </>
  );
}
