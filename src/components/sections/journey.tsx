import { CircleCheck } from "lucide-react";
import type { JourneyStep } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 06 — learning journey: a system, not isolated classes.
 * Horizontal editorial rail on desktop, vertical on mobile.
 */
export function Journey({ steps }: { steps: JourneyStep[] }) {
  return (
    <Section tone="base" aria-labelledby="journey-title">
      <Container>
        <SectionHeading
          id="journey-title"
          eyebrow="Lộ trình học tập"
          title="Từ buổi đánh giá đầu tiên đến mục tiêu của bạn"
          description="Mỗi học viên đi qua cùng một vòng lặp: được thấu hiểu — được dạy đúng — được đo lường — được tiến xa hơn."
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.id} className="relative">
              <Reveal delay={Math.min(index * 0.05, 0.25)}>
                <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft font-display text-body font-semibold text-accent-strong"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  {index < steps.length - 1 ? (
                    <span
                      className="hidden h-px flex-1 bg-line lg:absolute lg:right-[-1.5rem] lg:top-[1.35rem] lg:block lg:w-6"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div>
                    <h3 className="font-display text-body font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-small">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex items-center gap-3 rounded-[var(--radius-md)] border border-teal/25 bg-teal-soft/60 p-5">
          <CircleCheck className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
          <p className="text-small text-ink-soft">
            Bắt đầu bằng <strong>buổi kiểm tra trình độ miễn phí</strong> — kết quả là nền tảng
            cho toàn bộ lộ trình phía sau.
          </p>
        </div>
      </Container>
    </Section>
  );
}
