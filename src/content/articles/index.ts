import { articleSchema, type Article } from "@/types/content";

/**
 * Knowledge hub articles (Section 12 + /blog).
 * TODO(content): replace placeholder entries with real editorial content.
 */
const articles: Article[] = [
  {
    slug: "cach-dong-vien-con-hoc-tieng-anh",
    title: "5 cách đồng viên con học tiếng Anh không cần ép",
    category: "parent-resources",
    excerpt:
      "Động lực đến từ trải nghiệm thành công nhỏ hằng ngày, không đến từ la mắng. Đây là 5 cách phụ huynh có thể áp dụng ngay tại nhà.",
    readingTimeMinutes: 5,
    publishedAt: "2026-08-20",
    placeholder: true,
  },
  {
    slug: "ielts-speaking-ky-thuat-tranh-tra-loi-hoc-thuoc",
    title: "IELTS Speaking: tránh trả lời 'học thuộc' như thế nào?",
    category: "ielts",
    excerpt:
      "Giám khảo nhận ra câu trả lời học thuộc ngay từ hai câu đầu. Thay vào đó, hãy luyện khung ý tưởng linh hoạt theo chủ đề.",
    readingTimeMinutes: 7,
    publishedAt: "2026-08-12",
    placeholder: true,
  },
  {
    slug: "cambridge-yle-nen-bat-dau-tu-dau",
    title: "Con nên bắt đầu chứng chỉ Cambridge từ Starters hay Movers?",
    category: "cambridge",
    excerpt:
      "Chọn sai bậc thi khiến con vừa mất tự tin vừa tốn chi phí. Bài viết giúp phụ huynh đọc vị trí hiện tại của con trên khung CEFR.",
    readingTimeMinutes: 6,
    publishedAt: "2026-07-30",
    placeholder: true,
  },
  {
    slug: "hoc-tu-vung-bang-chu-de-khong-bang-list",
    title: "Học từ vựng theo chủ đề tại sao hiệu quả hơn học theo danh sách?",
    category: "learning-tips",
    excerpt:
      "Não bộ ghi nhớ bằng kết nối. Từ vựng đứng trong 'câu chuyện' sẽ sống lâu hơn từ vựng đứng trong bảng 50 dòng.",
    readingTimeMinutes: 4,
    publishedAt: "2026-07-18",
    placeholder: true,
  },
];

articles.forEach((a, i) => {
  if (!articleSchema.safeParse(a).success) {
    throw new Error(`articles[${i}] "${a.slug}" failed validation`);
  }
});

export const articleList: Article[] = articles;

export function getArticleBySlug(slug: string): Article | undefined {
  return articleList.find((a) => a.slug === slug);
}
