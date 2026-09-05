import { Award, BookOpenCheck, Trophy } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 09 — student outcomes.
 * ⚠️ Stories are PLACEHOLDER templates (TODO(content)) — never presented as real results.
 */
const OUTCOME_KINDS = [
  {
    icon: Award,
    title: "Chứng chỉ Cambridge",
    description: "Học viên tiểu học đạt Starters → Flyers theo lộ trình, thi thử trước kỳ thật.",
  },
  {
    icon: Trophy,
    title: "Điểm IELTS mục tiêu",
    description: "Lộ trình cá nhân hóa theo band đầu vào, thi thử định kỳ và phản hồi 4 kỹ năng.",
  },
  {
    icon: BookOpenCheck,
    title: "Tiến bộ trên trường",
    description: "Điểm số và sự tự tin trong giờ tiếng Anh ở trường — điều phụ huynh thấy rõ nhất.",
  },
] as const;

export function Outcomes() {
  return (
    <Section tone="inverse" aria-labelledby="outcomes-title">
      <Container>
        <SectionHeading
          id="outcomes-title"
          tone="inverse"
          align="center"
          eyebrow="Kết quả học tập"
          title="Chúng tôi đo thành công bằng kết quả của học viên"
          description="Mỗi lộ trình có mốc đo rõ ràng — chứng chỉ, điểm số, và sự tiến bộ quan sát được hằng tuần."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {OUTCOME_KINDS.map((kind, index) => (
            <Reveal key={kind.title} delay={index * 0.06}>
              <div className="h-full rounded-[var(--radius-md)] border border-paper/15 bg-paper/5 p-7">
                <kind.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-subheading font-semibold text-paper">
                  {kind.title}
                </h3>
                <p className="mt-2 text-small text-paper/70">{kind.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-caption uppercase text-paper/40">
          Câu chuyện kết quả cụ thể sẽ được cập nhật với dữ liệu đã xác minh của học viên.
        </p>
      </Container>
    </Section>
  );
}
