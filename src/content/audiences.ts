import { audienceSchema, type Audience } from "@/types/content";

/** Selector options for "Bạn đang tìm chương trình cho ai?" — Section 02. */
const audiences: Audience[] = [
  {
    id: "preschool",
    label: "Bé 4–6 tuổi",
    description: "Làm quen tiếng Anh tự nhiên qua bài hát, trò chơi và câu chuyện.",
    recommendedProgramSlugs: ["preschool"],
  },
  {
    id: "primary",
    label: "Học sinh tiểu học",
    description: "Nền tảng vững theo chuẩn Cambridge YLE, tự tin đọc – viết – nói.",
    recommendedProgramSlugs: ["primary"],
  },
  {
    id: "secondary",
    label: "Học sinh THCS",
    description: "Vượt trội chương trình học ở trường, giao tiếp thành thạo ở mức A2–B1.",
    recommendedProgramSlugs: ["secondary"],
  },
  {
    id: "highschool",
    label: "Học sinh THPT",
    description: "Chinh phục chứng chỉ quốc tế và điểm số trên trường.",
    recommendedProgramSlugs: ["highschool", "ielts"],
  },
  {
    id: "adults",
    label: "Người lớn đi làm",
    description: "Tiếng Anh dùng được ngay trong công việc và cuộc sống.",
    recommendedProgramSlugs: ["adults", "online"],
  },
  {
    id: "ielts",
    label: "Luyện thi IELTS",
    description: "Chiến lược làm bài và luyện tập có mục tiêu band điểm.",
    recommendedProgramSlugs: ["ielts"],
  },
  {
    id: "online",
    label: "Học online",
    description: "Lớp học trực tuyến tương tác cao, học mọi lúc mọi nơi.",
    recommendedProgramSlugs: ["online"],
  },
];

audiences.forEach((a, i) => {
  if (!audienceSchema.safeParse(a).success) {
    throw new Error(`audiences[${i}] "${a.id}" failed validation`);
  }
});

export const audienceList: Audience[] = audiences;
