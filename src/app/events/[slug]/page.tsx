import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, CircleCheck } from "lucide-react";
import { getEvent, getEvents } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ConsultationSection } from "@/components/sections/consultation-section";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const events = await getEvents();
    return events.map((event) => ({ slug: event.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event)
    return buildMetadata({
      title: "Không tìm thấy hoạt động",
      description: "Hoạt động không tồn tại.",
      path: `/events/${slug}`,
    });
  return buildMetadata({
    title: event.title,
    description: event.summary,
    path: `/events/${event.slug}`,
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <Badge variant="gold">{event.period}</Badge>
          <h1 className="mt-4 text-hero font-semibold text-ink">{event.title}</h1>
          <p className="mt-4 text-body text-ink-soft">{event.summary}</p>

          <div className="mt-8 aspect-[16/8] rounded-[var(--radius-lg)] bg-accent-soft" aria-hidden="true">
            {/* TODO(assets): real activity photography */}
          </div>

          <h2 className="mt-10 text-section font-semibold text-ink">Điểm nổi bật</h2>
          <ul className="mt-4 space-y-3">
            {event.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <p className="text-small text-ink-soft">{highlight}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 flex items-center gap-2 text-small text-muted">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Thời gian & chi phí cụ thể sẽ được tư vấn trực tiếp — nhiều hoạt động miễn phí cho
            học viên đang học.
          </p>

          <div className="mt-8">
            <ButtonLink href="/contact">Đặt chỗ / hỏi thông tin</ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="soft" className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Bước tiếp theo"
            title="Quan tâm hoạt động này cho con bạn?"
            description="Để lại thông tin — tư vấn viên sẽ chia sẻ lịch chi tiết và điều kiện tham gia."
            align="center"
          />
        </Container>
      </Section>

      <ConsultationSection sourcePage={`/events/${event.slug}`} leadType="contact" />
    </>
  );
}
