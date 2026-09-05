import { testimonialSchema, type Testimonial } from "@/types/content";

/**
 * Section 10 — testimonials.
 * ⚠️ TODO(content): EVERY entry is a PLACEHOLDER template with fictional names.
 * Replace with real, consented quotes from actual parents/students. Never publish as-is.
 */
const testimonials: Testimonial[] = [
  {
    id: "placeholder-parent-1",
    authorName: "Chị Minh Anh (placeholder)",
    authorRole: "parent",
    program: "Tiếng Anh Tiểu học — Cambridge YLE",
    learnerAge: 8,
    quote:
      "Sau một học kỳ, con tự chủ động mở sách đọc tiếng Anh mỗi tối thay vì phải nhắc. Điều mình quý nhất là thầy cô phản hồi rất chi tiết sau mỗi tuần học.",
    outcome: "Đạt chứng chỉ Cambridge Movers (TODO(content): xác thực)",
    placeholder: true,
  },
  {
    id: "placeholder-student-1",
    authorName: "Bạn Quốc Khánh (placeholder)",
    authorRole: "student",
    program: "Lộ trình IELTS",
    learnerAge: 17,
    quote:
      "Mình từng rất sợ phần Speaking, nhưng được luyện theo tình huống thật và chữa lỗi từng câu nên vào phòng thi thấy bình thường trở lại.",
    outcome: "IELTS 7.0 (TODO(content): xác thực)",
    placeholder: true,
  },
  {
    id: "placeholder-parent-2",
    authorName: "Anh Tuấn Kiệt (placeholder)",
    authorRole: "parent",
    program: "Tiếng Anh Mầm non",
    learnerAge: 5,
    quote:
      "Con hát tiếng Anh suốt cả tuần và tự nhiên nhận ra con hiểu được đoạn phim hoạt hình không phụ đề. Giờ đi học về con kể chuyện lớp không có hồi kết.",
    placeholder: true,
  },
  {
    id: "placeholder-adult-1",
    authorName: "Bạn Thu Hằng (placeholder)",
    authorRole: "student",
    program: "Tiếng Anh Giao tiếp Người lớn",
    learnerAge: 27,
    quote:
      "Học lớp người lớn mình lo cứ lý thuyết suốt, nhưng ở đây mỗi buổi đều phải nói — email công việc giờ mình viết không cần Google Translate nữa.",
    placeholder: true,
  },
];

testimonials.forEach((t, i) => {
  if (!testimonialSchema.safeParse(t).success) {
    throw new Error(`testimonials[${i}] "${t.id}" failed validation`);
  }
});

export const testimonialList: Testimonial[] = testimonials;
