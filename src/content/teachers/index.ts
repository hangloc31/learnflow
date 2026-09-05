import { teacherSchema, type Teacher } from "@/types/content";

/**
 * Section 08 — teachers.
 * ⚠️ TODO(content): Every profile below is a PLACEHOLDER with invented names.
 * Replace with real, consented teacher profiles and verifiable credentials.
 * NEVER publish these as real people.
 */
const teachers: Teacher[] = [
  {
    slug: "placeholder-nguyen-thi-mai",
    name: "Nguyễn Thị Mai",
    role: "Giáo viên chủ nhiệm chương trình Mầm non & Tiểu học",
    specialization: "Phương pháp giảng dạy tiếng Anh cho trẻ em",
    credentials: ["CELTA", "TODO(content): bổ sung bằng cấp thực tế"],
    philosophy:
      "Trẻ học tốt nhất khi được vui chơi có mục đích — mỗi buổi học là một trải nghiệm ngôn ngữ mới.",
    placeholder: true,
  },
  {
    slug: "placeholder-tran-quoc-bao",
    name: "Trần Quốc Bảo",
    role: "Giáo viên luyện thi IELTS",
    specialization: "IELTS Writing & Speaking",
    credentials: ["IELTS 8.5 (TODO(content): xác thực)", "TODO(content): bổ sung"],
    philosophy: "Điểm cao đến từ hiểu đề và luyện tập có phản hồi — không đến từ mẹo vặt.",
    placeholder: true,
  },
  {
    slug: "placeholder-sarah-j",
    name: "Sarah J. (placeholder)",
    role: "Giáo viên bản ngữ",
    specialization: "Giao tiếp & Phát âm",
    credentials: ["TEFL/TESOL (TODO(content): xác thực)"],
    philosophy: "Tự tin đến khi học viên quên mất mình đang nói tiếng Anh.",
    placeholder: true,
  },
  {
    slug: "placeholder-le-hong-phuc",
    name: "Lê Hồng Phúc",
    role: "Giáo viên THCS & THPT",
    specialization: "Ngữ pháp & Kỹ năng viết học thuật",
    credentials: ["TODO(content): bổ sung bằng cấp thực tế"],
    philosophy: "Nắm chắc nền tảng, điểm số sẽ tự đến theo.",
    placeholder: true,
  },
];

teachers.forEach((t, i) => {
  if (!teacherSchema.safeParse(t).success) {
    throw new Error(`teachers[${i}] "${t.slug}" failed validation`);
  }
});

export const teacherList: Teacher[] = teachers;

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return teacherList.find((t) => t.slug === slug);
}
