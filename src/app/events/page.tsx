import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getEvents } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const TONES = ["bg-accent-soft", "bg-teal-soft", "bg-gold-soft", "bg-ink"] as const;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Hoạt động & sự kiện",
    description:
      "Trại hè, câu lạc bộ nói, dự án STEAM và ngày thi thử — học tiếng Anh cả ngoài lớp học.",
    path: "/events",
  });
}

export default function EventsPage() {
  const events = getEvents();

  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Hoạt động & sự kiện"
            title="Nơi tiếng Anh trở thành trải nghiệm"
            description="Các hoạt động định kỳ và theo mùa — học viên đang tham gia trung tâm được ưu tiên đăng ký."
          />
        </Container>
      </Section>

      <Section tone="soft" className="py-12 lg:py-16">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {events.map((event, index) => (
              <li key={event.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface shadow-soft">
                  <div className={`${TONES[index % TONES.length]} aspect-[16/7]`} aria-hidden="true">
                    {/* TODO(assets): real activity photography */}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Badge variant="gold">{event.period}</Badge>
                    <h2 className="mt-3 font-display text-subheading font-semibold text-ink">
                      <Link href={`/events/${event.slug}`} className="hover:text-accent-strong">
                        {event.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-small">{event.summary}</p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="mt-auto pt-4 text-small font-semibold text-accent-strong hover:text-accent"
                      aria-label={`Xem chi tiết ${event.title}`}
                    >
                      Chi tiết →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex items-center gap-2 text-caption text-muted">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Lịch cụ thể từng tháng sẽ được cập nhật — liên hệ tư vấn để biết kế hoạch gần nhất.
          </p>
        </Container>
      </Section>
    </>
  );
}
