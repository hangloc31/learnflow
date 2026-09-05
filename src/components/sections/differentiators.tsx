import {
  Globe,
  Target,
  Users,
  MessageCircle,
  Award,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import type { Differentiator } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const ICONS: Record<Differentiator["icon"], LucideIcon> = {
  globe: Globe,
  target: Target,
  users: Users,
  "message-circle": MessageCircle,
  award: Award,
  "line-chart": LineChart,
};

/**
 * Section 04 — why this center. Asymmetric editorial layout:
 * sticky heading column left, stacked differentiators right.
 */
export function Differentiators({ items }: { items: Differentiator[] }) {
  return (
    <Section tone="base" aria-labelledby="differentiators-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="differentiators-title"
              eyebrow="Vì sao chọn chúng tôi"
              title="Một hệ thống giáo dục, không chỉ là những buổi học"
              description="Chúng tôi xây dựng mọi thứ quanh một câu hỏi: điều gì thực sự giúp học viên tiến bộ — và làm tốt điều đó mỗi ngày."
            />
          </div>

          <ol className="divide-y divide-line border-y border-line">
            {items.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={item.id}>
                  <Reveal delay={index * 0.04}>
                    <div className="group flex gap-5 py-7">
                      <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-teal-soft text-teal transition-colors duration-[var(--duration-base)] group-hover:bg-accent-soft group-hover:text-accent-strong">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-subheading font-semibold text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-prose text-small">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
