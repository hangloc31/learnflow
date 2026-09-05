import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Load .env.local manually
const envPath = resolve(__dirname, "../.env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // .env.local not found — use defaults
}

// Import content data
import { siteConfig } from "../src/content/site";
import { audienceList } from "../src/content/audiences";
import { programList } from "../src/content/programs";
import { teacherList } from "../src/content/teachers";
import { testimonialList } from "../src/content/testimonials";
import { articleList } from "../src/content/articles";
import { eventList } from "../src/content/events";
import { faqList } from "../src/content/faqs";
import { statisticList } from "../src/content/statistics";
import { differentiatorList, journeyStepList } from "../src/content/differentiators";

// Raw SQL helper — works with both SQLite and Turso
function stmt(sql: string, params: unknown[] = []): { sql: string; args: unknown[] } {
  return { sql, args: params };
}

async function seed() {
  const { getDb } = await import("../src/lib/leads/db");
  const db = await getDb();

  console.log("Seeding site_config...");
  const configEntries: [string, string][] = [
    ["name", siteConfig.name],
    ["tagline", siteConfig.tagline],
    ["description", siteConfig.description],
    ["url", siteConfig.url],
    ["contact.phone", siteConfig.contact.phone],
    ["contact.phoneHref", siteConfig.contact.phoneHref],
    ["contact.email", siteConfig.contact.email],
    ["contact.address", siteConfig.contact.address],
    ["branches", JSON.stringify(siteConfig.branches)],
    ["ctas", JSON.stringify(siteConfig.ctas)],
  ];
  for (const [key, value] of configEntries) {
    await db.run("INSERT OR REPLACE INTO site_config (key, value) VALUES (?, ?)", [key, value]);
  }
  console.log(`  ${configEntries.length} config entries`);

  console.log("Seeding audiences...");
  for (const a of audienceList) {
    await db.run(
      "INSERT OR REPLACE INTO audiences (id, label, description, recommended_program_slugs) VALUES (?, ?, ?, ?)",
      [a.id, a.label, a.description, JSON.stringify(a.recommendedProgramSlugs)]
    );
  }
  console.log(`  ${audienceList.length} audiences`);

  console.log("Seeding programs...");
  for (const p of programList) {
    await db.run(
      "INSERT OR REPLACE INTO programs (slug, name, audience_id, age_range, tagline, summary, outcomes, format, levels, curriculum_highlights, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [p.slug, p.name, p.audienceId, p.ageRange, p.tagline, p.summary, JSON.stringify(p.outcomes), p.format, JSON.stringify(p.levels), JSON.stringify(p.curriculumHighlights), p.featured ? 1 : 0]
    );
  }
  console.log(`  ${programList.length} programs`);

  console.log("Seeding teachers...");
  for (const t of teacherList) {
    await db.run(
      "INSERT OR REPLACE INTO teachers (slug, name, role, specialization, credentials, philosophy, placeholder) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [t.slug, t.name, t.role, t.specialization, JSON.stringify(t.credentials), t.philosophy, t.placeholder ? 1 : 0]
    );
  }
  console.log(`  ${teacherList.length} teachers`);

  console.log("Seeding testimonials...");
  for (const t of testimonialList) {
    await db.run(
      "INSERT OR REPLACE INTO testimonials (id, author_name, author_role, program, learner_age, quote, outcome, placeholder) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [t.id, t.authorName, t.authorRole, t.program, t.learnerAge ?? null, t.quote, t.outcome ?? null, t.placeholder ? 1 : 0]
    );
  }
  console.log(`  ${testimonialList.length} testimonials`);

  console.log("Seeding articles...");
  for (const a of articleList) {
    await db.run(
      "INSERT OR REPLACE INTO articles (slug, title, category, excerpt, reading_time_minutes, published_at, placeholder, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [a.slug, a.title, a.category, a.excerpt, a.readingTimeMinutes, a.publishedAt, a.placeholder ? 1 : 0, a.body ? JSON.stringify(a.body) : null]
    );
  }
  console.log(`  ${articleList.length} articles from source`);

  // Additional demo articles with body content (for testing article rendering)
  const demoArticles = [
    {
      slug: "phuong-phap-hoc-ielts-writing-hieu-qua",
      title: "Phương pháp học IELTS Writing hiệu quả",
      category: "ielts",
      excerpt: "IELTS Writing không phải là viết nhiều mà là viết đúng trọng tâm. Đây là lộ trình 4 bước giúp bạn cải thiện band điểm Writing hiệu quả.",
      readingTimeMinutes: 8,
      publishedAt: "2026-08-25",
      placeholder: 1,
      body: [
        { type: "heading", level: 2, text: "Hiểu rõ tiêu chí chấm điểm" },
        { type: "paragraph", text: "Giám khảo chấm IELTS Writing theo **4 tiêu chí**: Task Achievement, Coherence & Cohesion, Lexical Resource và Grammatical Range. Hiểu rõ từng tiêu chí giúp bạn biết **cần ưu tiên gì** khi luyện tập." },
        { type: "heading", level: 2, text: "Luyện theo từng kỹ năng" },
        { type: "paragraph", text: "Đừng cố viết cả bài dài ngay từ đầu. Hãy chia nhỏ: luyện *lập dàn ý*, rồi *viết câu đơn*, rồi mới ghép thành đoạn hoàn chỉnh." },
        { type: "list", style: "bullet", items: ["Luyện brainstorm ý tưởng trong 3 phút", "Viết câu chủ đề rõ ràng cho mỗi đoạn", "Sử dụng từ nối để liên kết ý"] },
        { type: "heading", level: 2, text: "Nhận phản hồi chi tiết" },
        { type: "paragraph", text: "Viết mà không có phản hồi khó cải thiện. Hãy nhờ giáo viên chấm bài theo đúng tiêu chí của IELTS. Tham khảo thêm tại [lộ trình IELTS](/programs/ielts)." },
        { type: "divider" },
        { type: "paragraph", text: "Luyện tập đều đặn **30 phút mỗi ngày** còn hiệu quả hơn 3 tiếng cuối tuần." },
      ],
    },
    {
      slug: "tai-sao-tre-nho-hoc-tieng-anh-som",
      title: "Tại sao trẻ nhỏ nên học tiếng Anh sớm?",
      category: "parent-resources",
      excerpt: "Giai đoạn 4–6 tuổi là thời điểm vàng để trẻ tiếp thu ngôn ngữ tự nhiên. Tìm hiểu lợi ích và cách áp dụng hiệu quả tại nhà.",
      readingTimeMinutes: 5,
      publishedAt: "2026-08-22",
      placeholder: 1,
      body: [
        { type: "heading", level: 2, text: "Giai đoạn vàng của não bộ" },
        { type: "paragraph", text: "Trước 6 tuổi, não bộ của trẻ tiếp thu ngôn ngữ mới **một cách tự nhiên**, giống như học tiếng mẹ đẻ — không cần dịch nghĩa hay học ngữ pháp khô khan." },
        { type: "heading", level: 2, text: "Lợi ích rõ rệt" },
        { type: "list", style: "bullet", items: ["Phát âm chuẩn hơn người bắt đầu muộn", "Tự tin giao tiếp tự nhiên, không sợ sai", "Nền tảng vững chắc cho chứng chỉ quốc tế"] },
        { type: "heading", level: 2, text: "Cách áp dụng tại nhà" },
        { type: "paragraph", text: "Không cần ép trẻ học. Hãy cho bé nghe nhạc tiếng Anh, xem hoạt hình phụ đề và chơi trò chơi từ vựng. Tìm hiểu thêm tại [chương trình mầm non](/programs/preschool)." },
      ],
    },
    {
      slug: "kinh-nghiem-chon-lop-tieng-anh-cho-con",
      title: "Kinh nghiệm chọn lớp tiếng Anh cho con",
      category: "learning-tips",
      excerpt: "Chọn đúng lớp không chỉ giúp con tiến bộ nhanh mà còn giữ được hứng thú học tập. Đây là những điều phụ huynh nên cân nhắc.",
      readingTimeMinutes: 6,
      publishedAt: "2026-08-18",
      placeholder: 1,
      body: [
        { type: "heading", level: 2, text: "Xác định mục tiêu rõ ràng" },
        { type: "paragraph", text: "Trước khi chọn lớp, hãy xác định con cần gì: *giao tiếp tự tin*, *luyện chứng chỉ*, hay *cải thiện điểm trên trường*? Mục tiêu khác nhau dẫn tới lớp học khác nhau." },
        { type: "heading", level: 2, text: "Kiểm tra sĩ số lớp" },
        { type: "paragraph", text: "Lớp học **quá đông** khiến con ít có cơ hội phát biểu và giáo viên khó theo sát. Nên chọn lớp tối đa **12 học viên** để đảm bảo chất lượng." },
        { type: "heading", level: 2, text: "Tham khảo chương trình và đội ngũ" },
        { type: "paragraph", text: "Hãy xem xét chương trình học có bám sát chuẩn quốc tế không và đội ngũ giáo viên có chứng chỉ giảng dạy rõ ràng. Tham khảo [chương trình của chúng tôi](/programs)." },
      ],
    },
  ];
  for (const a of demoArticles) {
    await db.run(
      "INSERT OR REPLACE INTO articles (slug, title, category, excerpt, reading_time_minutes, published_at, placeholder, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [a.slug, a.title, a.category, a.excerpt, a.readingTimeMinutes, a.publishedAt, a.placeholder, JSON.stringify(a.body)]
    );
  }
  console.log(`  ${demoArticles.length} demo articles with body`);

  console.log("Seeding events...");
  for (const e of eventList) {
    await db.run(
      "INSERT OR REPLACE INTO events (slug, title, period, summary, highlights, placeholder) VALUES (?, ?, ?, ?, ?, ?)",
      [e.slug, e.title, e.period, e.summary, JSON.stringify(e.highlights), e.placeholder ? 1 : 0]
    );
  }
  console.log(`  ${eventList.length} events`);

  console.log("Seeding faqs...");
  for (const f of faqList) {
    await db.run(
      `INSERT OR REPLACE INTO faqs ("group", id, question, answer, placeholder) VALUES (?, ?, ?, ?, ?)`,
      [f.group, f.id, f.question, f.answer, f.placeholder ? 1 : 0]
    );
  }
  console.log(`  ${faqList.length} faqs`);

  console.log("Seeding statistics...");
  for (const s of statisticList) {
    await db.run(
      "INSERT OR REPLACE INTO statistics (id, label, value, suffix, placeholder) VALUES (?, ?, ?, ?, ?)",
      [s.id, s.label, s.value, s.suffix ?? null, s.placeholder ? 1 : 0]
    );
  }
  console.log(`  ${statisticList.length} statistics`);

  console.log("Seeding differentiators...");
  for (const d of differentiatorList) {
    await db.run(
      "INSERT OR REPLACE INTO differentiators (id, icon, title, description) VALUES (?, ?, ?, ?)",
      [d.id, d.icon, d.title, d.description]
    );
  }
  console.log(`  ${differentiatorList.length} differentiators`);

  console.log("Seeding journey_steps...");
  for (const s of journeyStepList) {
    await db.run(
      "INSERT OR REPLACE INTO journey_steps (id, title, description) VALUES (?, ?, ?)",
      [s.id, s.title, s.description]
    );
  }
  console.log(`  ${journeyStepList.length} journey steps`);

  console.log("\nSeed complete!");
}

seed();
