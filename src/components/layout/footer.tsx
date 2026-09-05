import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              Learn<span className="text-accent">Flow</span>
            </p>
            <p className="mt-3 max-w-xs text-small">{siteConfig.tagline}.</p>
            <ul className="mt-5 space-y-2.5 text-small">
              <li>
                <a href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-accent">
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 hover:text-accent">
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="text-caption font-semibold uppercase text-muted">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-small text-ink-soft transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-caption text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {2026} {siteConfig.name}. Bảo lưu mọi quyền.
          </p>
          <p>
            {/* Draft notice until real business data is verified — remove at launch (TODO(content)) */}
            Bản nháp nội dung — thông tin liên hệ và số liệu đang chờ xác thực.
          </p>
        </div>
      </Container>
    </footer>
  );
}
