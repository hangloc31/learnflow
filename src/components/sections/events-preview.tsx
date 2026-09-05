import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { EventItem } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const TONES = ["bg-accent-soft", "bg-teal-soft", "bg-gold-soft", "bg-ink"] as const;

/**
 * Section 11 — events & activities beyond the classroom.
 * Asymmetric composition: one feature + stacked list. Placeholder tone blocks
 * await real activity photography (TODO(assets)).
 */
export function EventsPreview({ events }: { events: EventItem[] }) {
  const [feature, ...rest] = events;
  if (!feature) return null;

  return (
    <Section tone="base" aria-labelledby="events-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="events-title"
            eyebrow="Hoạt động & sự kiện"
            title="Học tiếng Anh cả ngoài lớp học"
            description="Trại hè, câu lạc bộ, dự án STEAM, thi thử — nơi tiếng Anh trở thành công cụ để trải nghiệm."
          />
          <Link
            href="/events"
            className="inline-flex min-h-11 items-center gap-1.5 self-start text-small font-semibold text-accent-strong hover:text-accent"
          >
            Tất cả hoạt động
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface shadow-soft">
              <div className={`${TONES[0]} aspect-[16/9]`} aria-hidden="true">
                {/* TODO(assets): real event photography */}
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <Badge variant="gold">{feature.period}</Badge>
                <h3 className="mt-3 font-display text-subheading font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-small">{feature.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {feature.highlights.map((h) => (
                    <li key={h} className="rounded-full border border-line px-3 py-1 text-caption text-muted">
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/events/${feature.slug}`}
                  className="mt-auto pt-5 text-small font-semibold text-accent-strong hover:text-accent"
                  aria-label={`Xem chi tiết ${feature.title}`}
                >
                  Chi tiết hoạt động →
                </Link>
              </div>
            </article>
          </Reveal>

          <ul className="flex flex-col gap-5">
            {rest.map((event, index) => (
              <Reveal key={event.slug} delay={Math.min((index + 1) * 0.05, 0.2)} className="h-full">
                <li>
                  <article className="flex h-full gap-5 rounded-[var(--radius-md)] border border-line bg-surface p-5 transition-[border-color,box-shadow] hover:border-accent/40 hover:shadow-soft">
                    <div className={`${TONES[(index + 1) % TONES.length]} w-20 shrink-0 rounded-[var(--radius-sm)]`} aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-caption text-muted">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {event.period}
                      </p>
                      <h3 className="mt-1 font-display text-body font-semibold text-ink">
                        {event.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-small">{event.summary}</p>
                      <Link
                        href={`/events/${event.slug}`}
                        className="mt-2 inline-block text-small font-semibold text-accent-strong hover:text-accent"
                        aria-label={`Xem chi tiết ${event.title}`}
                      >
                        Chi tiết →
                      </Link>
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
