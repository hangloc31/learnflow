import { differentiatorSchema, journeyStepSchema, type Differentiator, type JourneyStep } from "@/types/content";

/** Section 04 — why this center. TODO(content): confirm class-size promise with academic team. */
const differentiators: Differentiator[] = [
  {
    id: "international-curriculum",
    icon: "globe",
    title: "Chương trình chuẩn quốc tế",
    description:
      "Lộ trình xây dựng theo khung CEFR và tài liệu Cambridge — mỗi cấp học có mục tiêu đầu ra rõ ràng, đo lường được.",
  },
  {
    id: "small-classes",
    icon: "users",
    title: "Lớp học tối đa 12 học viên",
    description:
      "Quy mô nhỏ đảm bảo mỗi học viên được phát biểu, được chữa lỗi và được thầy cô theo sát từng buổi học.",
  },
  {
    id: "personalized-path",
    icon: "target",
    title: "Lộ trình cá nhân hóa",
    description:
      "Kiểm tra trình độ đầu vào, đặt mục tiêu cùng gia đình và thiết kế lộ trình riêng cho từng học viên.",
  },
  {
    id: "real-english",
    icon: "message-circle",
    title: "Tiếng Anh dùng thật",
    description:
      "Dự án, thuyết trình, sân khấu, hoạt động trải nghiệm — học viên dùng tiếng Anh để làm việc có ý nghĩa, không chỉ làm bài tập.",
  },
  {
    id: "progress-tracking",
    icon: "line-chart",
    title: "Tiến bộ minh bạch",
    description:
      "Báo cáo định kỳ cho phụ huynh: điểm mạnh, điểm cần cải thiện và bước tiếp theo — không học 'mù'.",
  },
];

/** Section 06 — learning journey. A system, not isolated classes. */
const journeySteps: JourneyStep[] = [
  {
    id: "discover",
    title: "Khám phá",
    description: "Kiểm tra trình độ và trò chuyện về mục tiêu của bạn để hiểu đúng điểm xuất phát.",
  },
  {
    id: "path",
    title: "Lộ trình riêng",
    description: "Thiết kế lộ trình cá nhân hóa: lớp phù hợp, mục tiêu theo chặng, mốc đo tiến bộ.",
  },
  {
    id: "learn",
    title: "Học trên lớp",
    description: "Học chủ động với lớp quy mô nhỏ: nói nhiều, thực hành nhiều, được chữa lỗi từng người.",
  },
  {
    id: "practice",
    title: "Luyện tập",
    description: "Bài tập tương tác, câu lạc bộ tiếng Anh và hoạt động trải nghiệm giữa các buổi học.",
  },
  {
    id: "measure",
    title: "Đo tiến bộ",
    description: "Kiểm tra định kỳ, thi thử chứng chỉ và báo cáo tiến bộ gửi phụ huynh.",
  },
  {
    id: "grow",
    title: "Bứt phá",
    description: "Chứng chỉ quốc tế, tự tin sử dụng tiếng Anh trong học tập, công việc và cuộc sống.",
  },
];

differentiators.forEach((d, i) => {
  if (!differentiatorSchema.safeParse(d).success) {
    throw new Error(`differentiators[${i}] "${d.id}" failed validation`);
  }
});
journeySteps.forEach((s, i) => {
  if (!journeyStepSchema.safeParse(s).success) {
    throw new Error(`journeySteps[${i}] "${s.id}" failed validation`);
  }
});

export const differentiatorList: Differentiator[] = differentiators;
export const journeyStepList: JourneyStep[] = journeySteps;
