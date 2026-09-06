import { programSchema, type Program } from "@/types/content";

/**
 * All education programs. Order = display order on /programs and the homepage.
 * TODO(content): verify age ranges, levels and outcomes with the academic team.
 */
const programs: Program[] = [
  {
    slug: "preschool",
    name: "Tiếng Anh Mầm non",
    audienceId: "preschool",
    ageRange: "4–5 tuổi",
    tagline: "Bước đầu làm quen tiếng Anh bằng vui chơi",
    summary:
      "Trẻ tiếp xúc tiếng Anh tự nhiên qua bài hát, trò chơi, kể chuyện và hoạt động vận động — xây dựng phản xạ ngôn ngữ và tình yêu học tập từ sớm.",
    outcomes: [
      "Nhận biết và phát âm đúng âm tiếng Anh cơ bản",
      "Nói được câu đơn về bản thân, gia đình, đồ vật quen thuộc",
      "Tự tin tham gia hoạt động bằng tiếng Anh, không sợ sai",
    ],
    format: "offline",
    levels: ["Pre-A1"],
    curriculumHighlights: [
      "Học qua bài hát, trò chơi và kể chuyện tương tác",
      "Lớp 8–12 bé cùng giáo viên chủ nhiệm cố định",
      "Báo cáo tiến bộ hằng tháng cho phụ huynh",
      "Sân khấu nhỏ cuối học kỳ — bé thuyết trình bằng tiếng Anh",
    ],
    featured: true,
  },
  {
    slug: "primary",
    name: "Tiếng Anh Tiểu học — Cambridge YLE",
    audienceId: "primary",
    ageRange: "6–11 tuổi",
    tagline: "Nền tảng vững vàng theo chuẩn Cambridge",
    summary:
      "Chương trình bám sát khung Cambridge Young Learners (Starters – Movers – Flyers), phát triển đồng đều 4 kỹ năng và chuẩn bị cho các kỳ thi chứng chỉ quốc tế đầu tiên.",
    outcomes: [
      "Đọc hiểu đoạn văn ngắn, viết câu hoàn chỉnh đúng ngữ pháp",
      "Tự tin giao tiếp theo chủ đề quen thuộc hằng ngày",
      "Sẵn sàng đạt chứng chỉ Cambridge YLE (Starters/Movers/Flyers)",
    ],
    format: "offline",
    levels: ["Pre-A1", "A1", "A2"],
    curriculumHighlights: [
      "Giáo trình bám sát Cambridge YLE: Starters → Movers → Flyers",
      "Phonics và đọc hiểu từ tuần đầu tiên",
      "Thi thử chuẩn cấu trúc Cambridge trước mỗi kỳ thật",
      "Hồ sơ học tập cá nhân cập nhật theo từng kỹ năng",
    ],
    featured: true,
  },
  {
    slug: "secondary",
    name: "Tiếng Anh THCS",
    audienceId: "secondary",
    ageRange: "12–15 tuổi",
    tagline: "Vượt trội trên trường, tự tin ngoài đời",
    summary:
      "Kết hợp củng cố chương trình học trên lớp với giao tiếp thực tế, giúp học sinh dẫn đầu điểm số và dùng tiếng Anh thành thạo ở mức A2–B1.",
    outcomes: [
      "Nắm chắc ngữ pháp và từ vựng theo khung A2–B1",
      "Giao tiếp lưu loát trong các tình huống học đường và đời thường",
      "Tự tin thuyết trình và làm việc nhóm bằng tiếng Anh",
    ],
    format: "offline",
    levels: ["A2", "B1"],
    curriculumHighlights: [
      "Song song chương trình trên trường và giao tiếp thực tế",
      "Luyện thuyết trình và thảo luận nhóm mỗi tuần",
      "Kiểm tra đầu vào xếp lớp theo đúng năng lực",
      "Phụ huynh nhận báo cáo tiến bộ định kỳ",
    ],
    featured: false,
  },
  {
    slug: "highschool",
    name: "Tiếng Anh THPT & Thi chứng chỉ",
    audienceId: "highschool",
    ageRange: "16–18 tuổi",
    tagline: "Điểm số cao và hành trang vào tương lai",
    summary:
      "Lộ trình song song: tối ưu kết quả thi trên trường và chuẩn bị các chứng chỉ quốc tế B1–B2 làm nền tảng cho đại học và du học.",
    outcomes: [
      "Chiếm lĩnh kiến thức thi trên trường, nâng điểm ổn định",
      "Đạt trình độ B1–B2 theo khung CEFR",
      "Có hồ sơ chứng chỉ sẵn sàng cho xét tuyển đại học",
    ],
    format: "hybrid",
    levels: ["B1", "B2"],
    curriculumHighlights: [
      "Lộ trình song hành: điểm trên trường + chứng chỉ quốc tế",
      "Luyện đề theo format thi mới của Bộ GD&ĐT",
      "Học thuật: viết luận, thuyết trình, thảo luận sâu",
      "Tư vấn định hướng đại học – du học cho học sinh cuối cấp",
    ],
    featured: false,
  },
  {
    slug: "adults",
    name: "Tiếng Anh Giao tiếp Người lớn",
    audienceId: "adults",
    ageRange: "18+",
    tagline: "Dùng được ngay trong công việc và cuộc sống",
    summary:
      "Lớp học cho người bận rộn: luyện giao tiếp theo tình huống thực tế — công việc, du lịch, phỏng vấn — với giáo viên Việt và bản ngữ.",
    outcomes: [
      "Giao tiếp tự tin trong công việc và tình huống hằng ngày",
      "Viết email, tham gia cuộc họp bằng tiếng Anh lưu loát",
      "Mở rộng từ vựng theo ngành nghề cá nhân",
    ],
    format: "offline",
    levels: ["A2", "B1", "B2"],
    curriculumHighlights: [
      "Tình huống thật: họp, phỏng vấn, đàm phán, du lịch",
      "Lớp buổi tối và cuối tuần cho người bận rộn",
      "Xen kẽ giáo viên Việt và giáo viên bản ngữ",
      "Từ vựng cá nhân hóa theo ngành nghề của lớp",
    ],
    featured: false,
  },
  {
    slug: "ielts",
    name: "Lộ trình IELTS",
    audienceId: "ielts",
    ageRange: "16+",
    tagline: "Chiến lược đúng, luyện tập có mục tiêu",
    summary:
      "Được chẩn đoán trình độ đầu vào, học theo lộ trình band điểm cá nhân hóa với giáo viên luyện thi giàu kinh nghiệm, kiểm tra thử định kỳ.",
    outcomes: [
      "Nắm vững chiến lược làm bài 4 kỹ năng",
      "Quản lý thời gian và áp lực phòng thi thành thạo",
      "Tiến tới band điểm mục tiêu với lộ trình rõ ràng",
    ],
    format: "hybrid",
    levels: ["B1+", "B2", "C1"],
    curriculumHighlights: [
      "Chẩn đoán band đầu vào chi tiết theo 4 kỹ năng",
      "Lộ trình band điểm cá nhân hóa với mốc thi thử cố định",
      "Chữa Writing 1-1 và Speaking mock với phản hồi chi tiết",
      "Kho đề thi thử chuẩn Cambridge/IDP liên tục cập nhật",
    ],
    featured: true,
  },
  {
    slug: "online",
    name: "LearnFlow Online",
    audienceId: "online",
    ageRange: "Mọi lứa tuổi",
    tagline: "Lớp học trực tuyến, tương tác thật",
    summary:
      "Học trực tiếp với giáo viên qua lớp học online tương tác cao: nhóm nhỏ, tài liệu số, bài tập được chấm và phản hồi chi tiết.",
    outcomes: [
      "Học đúng lộ trình như lớp offline, không mất tương tác",
      "Linh hoạt lịch học với giáo trình số hóa",
      "Nhận phản hồi cá nhân hóa sau mỗi buổi học",
    ],
    format: "online",
    levels: ["A1", "A2", "B1", "B2"],
    curriculumHighlights: [
      "Lớp nhóm nhỏ trực tiếp với giáo viên — không phải video ghi sẵn",
      "Tài liệu số, bài tập được chấm và phản hồi sau mỗi buổi",
      "Linh động đổi lịch trong tuần",
      "Kết hợp lớp online và trung tâm khi cần",
    ],
    featured: false,
  },
];

programs.forEach((p, i) => {
  const result = programSchema.safeParse(p);
  if (!result.success) {
    throw new Error(`programs[${i}] "${p.slug}" failed validation: ${result.error.message}`);
  }
});

export const programList: Program[] = programs;

export function getProgramBySlug(slug: string): Program | undefined {
  return programList.find((p) => p.slug === slug);
}
