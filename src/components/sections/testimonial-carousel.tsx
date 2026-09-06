"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const ROLE_LABEL: Record<Testimonial["authorRole"], string> = {
  parent: "Phụ huynh",
  student: "Học viên",
  alumnus: "Cựu học viên",
};

/**
 * Section 10 — testimonials. Layered editorial layout on desktop
 * (active quote + selectable list), simple swipe-free controls on mobile.
 * No autoplay; fully keyboard-operable (04-accessibility).
 */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const count = testimonials.length;
  const current = testimonials[active];
  if (!current) return null;

  const prev = () => setActive((a) => (a - 1 + count) % count);
  const next = () => setActive((a) => (a + 1) % count);

  return (
    <Section tone="soft" aria-labelledby="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Ba mẹ kể lại"
          title="Thay đổi nhỏ ở nhà, ba mẹ thấy đầu tiên"
          description="Những câu chuyện minh họa định dạng — đang được thay bằng chia sẻ thật có sự đồng ý."
        />

        <div
          className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
          role="group"
          aria-roledescription="carousel"
          aria-label="Câu chuyện của phụ huynh và học viên"
        >
          {/* active quote */}
          <figure
            className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-7 shadow-soft lg:p-10"
            aria-live="polite"
          >
            <Quote className="h-8 w-8 text-accent" aria-hidden="true" />
            <blockquote className="mt-5 font-display text-subheading leading-relaxed text-ink">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-5">
              <p className="font-semibold text-ink">{current.authorName.replace(" (placeholder)", "")}</p>
              <p className="mt-1 text-small text-muted">
                {ROLE_LABEL[current.authorRole]}
                {current.learnerAge ? ` · ${current.learnerAge} tuổi` : ""} · {current.program}
              </p>
              {current.outcome ? (
                <p className="mt-2 inline-flex rounded-full bg-teal-soft px-3 py-1 text-caption font-semibold text-teal">
                  {current.outcome}
                </p>
              ) : null}
            </figcaption>

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Câu chuyện trước"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Câu chuyện tiếp theo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="ml-2 text-small text-muted" aria-hidden="true">
                {active + 1} / {count}
              </p>
            </div>
          </figure>

          {/* selectable story list (desktop) / dot-free list (mobile: horizontal scroll) */}
          <ul className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Chọn câu chuyện">
            {testimonials.map((testimonial, index) => {
              const selected = index === active;
              return (
                <li key={testimonial.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={selected ? "true" : undefined}
                    className={`min-h-11 w-64 rounded-[var(--radius-md)] border p-4 text-left transition-colors duration-[var(--duration-fast)] lg:w-full ${
                      selected
                        ? "border-accent bg-accent-soft/60"
                        : "border-line bg-surface hover:border-accent/40"
                    }`}
                  >
                    <p className="text-small font-semibold text-ink">{testimonial.authorName.replace(" (placeholder)", "")}</p>
                    <p className="mt-0.5 text-caption text-muted">
                      {ROLE_LABEL[testimonial.authorRole]} · {testimonial.program}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {testimonials.some((t) => t.placeholder) ? (
          <p className="mt-6 text-caption text-muted">
            Một số câu chuyện đang chờ xác nhận với phụ huynh — nội dung thật sẽ thay thế dần, có sự đồng ý.
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
