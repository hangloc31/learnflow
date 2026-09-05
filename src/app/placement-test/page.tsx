import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConsultationSection } from "@/components/sections/consultation-section";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Kiểm tra trình độ miễn phí",
    description:
      "Bài kiểm tra xếp lớp 20–30 phút giúp xác định trình độ hiện tại và lộ trình học phù hợp — miễn phí, không ràng buộc.",
    path: "/placement-test",
  });
}

const PROCESS = [
  {
    title: "Đặt lịch",
    description: "Chọn thời gian phù hợp — tại trung tâm hoặc online.",
  },
  {
    title: "Làm bài kiểm tra",
    description: "20–30 phút: từ vựng, ngữ pháp, đọc hiểu và trò chuyện ngắn cùng giáo viên.",
  },
  {
    title: "Nhận kết quả",
    description: "Xác định trình độ hiện tại theo khung tham chiếu (CEFR).",
  },
  {
    title: "Nhận lộ trình đề xuất",
    description: "Chương trình, lịch học và mục tiêu theo từng chặng — minh bạch, không ràng buộc.",
  },
] as const;

export default function PlacementTestPage() {
  return (
    <>
      <Section tone="base" className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Kiểm tra trình độ"
            title="Biết chính xác trình độ hiện tại — miễn phí"
            description="Không đoán, không cảm tính. Bài kiểm tra ngắn giúp chúng tôi đặt bạn vào đúng lớp ngay từ ngày đầu."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROCESS.map((step, index) => (
              <li key={step.title} className="rounded-[var(--radius-md)] border border-line bg-surface p-5">
                <p className="flex items-center gap-2 text-small font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-caption font-bold text-accent-strong" aria-hidden="true">
                    {index + 1}
                  </span>
                  {step.title}
                </p>
                <p className="mt-2 text-small">{step.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-2 text-small text-muted">
            <ClipboardList className="h-4 w-4 text-accent" aria-hidden="true" />
            Kết quả kiểm tra chỉ dùng để xếp lớp — không ảnh hưởng việc chấp nhận hay từ chối
            học viên.
          </p>
        </Container>
      </Section>

      <ConsultationSection
        sourcePage="/placement-test"
        leadType="placement"
        title="Đặt lịch kiểm tra trình độ"
        description="Điền nhanh 5 bước — chúng tôi xác nhận lịch kiểm tra trong vòng 24 giờ làm việc."
      />
    </>
  );
}
