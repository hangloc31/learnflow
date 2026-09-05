import type { Metadata } from "next";
import { Compass, HeartHandshake, Lightbulb, Users } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getJourneySteps } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConsultationSection } from "@/components/sections/consultation-section";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Về chúng tôi",
    description:
      "Phương pháp giáo dục, đội ngũ và cách chúng tôi đồng hành cùng học viên — làm quen với trung tâm trước khi đến.",
    path: "/about",
  });
}

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Học viên ở trung tâm",
    description:
      "Mọi quyết định về giáo trình, lịch học và phản hồi đều bắt đầu từ câu hỏi: điều gì tốt nhất cho người học này?",
  },
  {
    icon: Lightbulb,
    title: "Hiểu trước, dạy sau",
    description:
      "Không có lộ trình chung cho tất cả. Chúng tôi đánh giá năng lực và mục tiêu trước khi đặt học viên vào lớp.",
  },
  {
    icon: Compass,
    title: "Đo lường minh bạch",
    description:
      "Tiến bộ được ghi nhận theo chặng rõ ràng — phụ huynh thấy được con mình đi được đâu sau mỗi học kỳ.",
  },
  {
    icon: Users,
    title: "Cộng đồng học tập",
    description:
      "Lớp học chỉ là một phần: câu lạc bộ, hoạt động ngoại khóa và sự kiện giúp tiếng Anh sống ngoài sách vở.",
  },
] as const;

export default async function AboutPage() {
  return (
    <>
      <Section tone="base" className="py-12 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow={`Về ${siteConfig.name}`}
            title="Một trung tâm tiếng Anh được xây quanh người học"
            description="Chúng tôi không bán 'buổi học' — chúng tôi thiết kế hành trình. Từ buổi đánh giá đầu tiên đến chứng chỉ trong tay, mỗi chặng đều có người đồng hành và thước đo rõ ràng."
          />
          <div className="mt-10 aspect-[16/8] rounded-[var(--radius-lg)] bg-accent-soft" aria-hidden="true">
            {/* TODO(assets): brand photography — campus, classrooms, team */}
          </div>
          <p className="mt-3 text-caption text-muted">
            Ảnh không khí trung tâm sẽ được cập nhật khi có tư liệu thực tế.
          </p>
        </Container>
      </Section>

      <Section tone="soft" className="py-12 lg:py-16" aria-labelledby="values-title">
        <Container>
          <SectionHeading
            id="values-title"
            eyebrow="Giá trị cốt lõi"
            title="Bốn nguyên tắc chúng tôi làm việc"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li key={value.title}>
                <div className="flex h-full gap-4 rounded-[var(--radius-md)] border border-line bg-surface p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-accent-soft text-accent-strong">
                    <value.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-body font-semibold text-ink">{value.title}</h3>
                    <p className="mt-1.5 text-small">{value.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="base" className="py-12 lg:py-16" aria-labelledby="method-title">
        <Container>
          <SectionHeading
            id="method-title"
            eyebrow="Phương pháp"
            title="Vòng lặp học tập của chúng tôi"
            description="Đúng như lộ trình học viên trải nghiệm — minh bạch để phụ huynh đồng hành."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(await getJourneySteps()).map((step, index) => (
              <li key={step.id} className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
                <p className="font-display text-section font-semibold text-accent/30" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-body font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-small">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ConsultationSection sourcePage="/about" />
    </>
  );
}
