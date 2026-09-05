import type { Metadata } from "next";
import { CalendarCheck, CircleCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConsultationSection } from "@/components/sections/consultation-section";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Đăng ký học thử miễn phí",
    description:
      "Trải nghiệm một buổi học thật trước khi quyết định — đặt lịch học thử miễn phí cho bé, học sinh và người lớn.",
    path: "/trial",
  });
}

const TRIAL_INCLUDES = [
  "Một buổi học thử trong lớp phù hợp trình độ",
  "Trò chuyện ngắn với giáo viên sau buổi học",
  "Phản hồi ban đầu về điểm mạnh cần phát triển",
  "Không áp lực đăng ký — quyết định hoàn toàn thuộc về bạn",
] as const;

export default function TrialPage() {
  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Học thử miễn phí"
            title="Trải nghiệm một buổi học thật — trước khi quyết định"
            description="Học thử không phải buổi 'biểu diễn' cho phụ huynh xem, mà là một buổi học bình thường trong lớp phù hợp — để bạn thấy đúng không khí lớp học của chúng tôi."
          />
          <ul className="mt-8 space-y-3">
            {TRIAL_INCLUDES.map((item) => (
              <li key={item} className="flex gap-3">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <p className="text-small text-ink-soft">{item}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex items-center gap-2 rounded-[var(--radius-md)] border border-teal/25 bg-teal-soft/60 p-4 text-small text-ink-soft">
            <CalendarCheck className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
            Sau khi nhận thông tin, chúng tôi sẽ gọi lại để xếp lớp học thử phù hợp nhất trong
            vòng 24 giờ làm việc.
          </p>
        </Container>
      </Section>

      <ConsultationSection
        sourcePage="/trial"
        leadType="trial"
        title="Đặt lịch học thử"
        description="Điền 5 bước nhanh — chúng tôi sẽ gọi lại để xác nhận lớp và thời gian."
      />
    </>
  );
}
