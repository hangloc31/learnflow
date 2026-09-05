import { eventSchema, type EventItem } from "@/types/content";

/**
 * Section 11 — events & activities beyond the classroom.
 * TODO(content): replace with the center's real activity program.
 */
const events: EventItem[] = [
  {
    slug: "english-summer-camp",
    title: "English Summer Camp",
    period: "Mùa hè (placeholder)",
    summary:
      "Trại hè 100% tiếng Anh: thử thách đội nhóm, sân khấu, thí nghiệm STEM bằng tiếng Anh và chuyến dã ngoại cuối khóa.",
    highlights: ["Hoạt động STEM", "Sân khấu kịch tiếng Anh", "Dã ngoại thực hành"],
    placeholder: true,
  },
  {
    slug: "speaking-club",
    title: "Speaking Club hằng tháng",
    period: "Hằng tháng (placeholder)",
    summary:
      "Sân chơi nói chuyện tự do với chủ đề thú vị mỗi tháng, có giáo viên hỗ trợ từ vựng và chữa lỗi nhẹ nhàng.",
    highlights: ["Chủ đề mới mỗi tháng", "Mọi trình độ đều tham gia được", "Miễn phí cho học viên"],
    placeholder: true,
  },
  {
    slug: "steam-workshops",
    title: "STEAM Workshops",
    period: "Theo học kỳ (placeholder)",
    summary:
      "Làm dự án khoa học – công nghệ – nghệ thuật bằng tiếng Anh: robot giấy, thí nghiệm nhỏ, xây dựng mô hình.",
    highlights: ["Học qua làm", "Làm việc nhóm", "Sản phẩm mang về nhà"],
    placeholder: true,
  },
  {
    slug: "cambridge-mock-exam-day",
    title: "Ngày thi thử Cambridge",
    period: "Trước mỗi kỳ thi (placeholder)",
    summary:
      "Thi thử đúng chuẩn đề thật với chấm bài và phản hồi chi tiết, giúp học viên bước vào phòng thi tự nhiên như bước vào lớp.",
    highlights: ["Đề chuẩn Cambridge", "Phản hồi chi tiết từng kỹ năng", "Miễn phí cho học viên đang học"],
    placeholder: true,
  },
];

events.forEach((e, i) => {
  if (!eventSchema.safeParse(e).success) {
    throw new Error(`events[${i}] "${e.slug}" failed validation`);
  }
});

export const eventList: EventItem[] = events;

export function getEventBySlug(slug: string): EventItem | undefined {
  return eventList.find((e) => e.slug === slug);
}
