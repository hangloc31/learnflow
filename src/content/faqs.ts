import { faqSchema, type Faq } from "@/types/content";

/**
 * Section 13 — FAQ.
 * TODO(content): answers marked placeholder must be reviewed/approved by the center
 * (especially tuition, schedule and trial policy) before launch.
 */
const faqs: Faq[] = [
  {
    id: "faq-age-groups",
    group: "programs",
    question: "Trung tâm nhận học viên từ mấy tuổi?",
    answer:
      "Các chương trình dành cho học viên từ 4 tuổi trở lên, chia theo nhóm mầm non, tiểu học, THCS, THPT và người lớn. Sau khi kiểm tra trình độ, trung tâm sẽ tư vấn lớp phù hợp với độ tuổi và năng lực hiện tại.",
    placeholder: false,
  },
  {
    id: "faq-placement",
    group: "enrollment",
    question: "Kiểm tra trình độ đầu vào có mất phí không?",
    answer:
      "Bài kiểm tra xếp lớp miễn phí, kéo dài khoảng 20–30 phút, kết hợp trò chuyện cùng phụ huynh về mục tiêu học tập. Kết quả được dùng để xếp lớp và thiết kế lộ trình. (TODO(content): xác nhận chính sách với trung tâm)",
    placeholder: true,
  },
  {
    id: "faq-class-size",
    group: "logistics",
    question: "Mỗi lớp có bao nhiêu học viên?",
    answer:
      "Lớp học giới hạn tối đa 12 học viên để đảm bảo mỗi em được phát biểu và được thầy cô theo sát trong buổi học. (TODO(content): xác nhận sĩ số thực tế)",
    placeholder: true,
  },
  {
    id: "faq-tuition",
    group: "enrollment",
    question: "Học phí như thế nào?",
    answer:
      "Học phí tùy thuộc chương trình, số buổi và hình thức học (trung tâm hoặc online). Bạn vui lòng để lại thông tin tư vấn hoặc gọi hotline để nhận bảng phí cập nhật theo lộ trình phù hợp.",
    placeholder: false,
  },
  {
    id: "faq-trial",
    group: "enrollment",
    question: "Có được học thử trước khi đăng ký không?",
    answer:
      "Có. Học viên được đăng ký một buổi học thử miễn phí để trải nghiệm phương pháp và không khí lớp học trước khi quyết định. (TODO(content): xác nhận chính sách học thử)",
    placeholder: true,
  },
  {
    id: "faq-online",
    group: "logistics",
    question: "Có lớp học online không, chất lượng có giữ được không?",
    answer:
      "Có. Lớp online duy trì nhóm nhỏ và giáo trình như lớp trung tâm: học viên vẫn nói nhiều, được chữa lỗi và nhận bài tập phản hồi chi tiết sau mỗi buổi.",
    placeholder: false,
  },
  {
    id: "faq-teachers",
    group: "programs",
    question: "Đội ngũ giáo viên gồm những ai?",
    answer:
      "Giáo viên Việt có chứng chỉ phương pháp giảng dạy tiếng Anh (CELTA/TEFL hoặc tương đương) kết hợp giáo viên bản ngữ cho các lớp giao tiếp và luyện thi. Hồ sơ từng giáo viên được công bố tại trang Đội ngũ giáo viên. (TODO(content): thay bằng mô tả đội ngũ thực tế)",
    placeholder: true,
  },
  {
    id: "faq-schedule",
    group: "logistics",
    question: "Lịch học như thế nào? Có học cuối tuần không?",
    answer:
      "Có các khung giờ buổi tối trong tuần và cuối tuần (Thứ 7, Chủ nhật) cho học sinh đi học trên trường. Lịch cụ thể từng lớp được tư vấn theo thời gian biểu của học viên. (TODO(content): xác nhận lịch thực tế)",
    placeholder: true,
  },
];

faqs.forEach((f, i) => {
  if (!faqSchema.safeParse(f).success) {
    throw new Error(`faqs[${i}] "${f.id}" failed validation`);
  }
});

export const faqList: Faq[] = faqs;
