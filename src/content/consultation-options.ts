import { z } from "zod";
import { audienceList } from "@/content/audiences";

/**
 * Consultation-form option data (Steps 1–4). Content-owned so the flow can be
 * tuned without touching the form component (.clinerules/10-content-data.md).
 */

export const audienceOptions: { value: string; label: string; hint?: string }[] = audienceList.map(
  (a) => ({ value: a.label, label: a.label, hint: a.description }),
);

export const ageGroupOptionsByAudience: Record<string, string[]> = {
  "Bé 4–6 tuổi": ["4 tuổi", "5 tuổi", "6 tuổi"],
  "Học sinh tiểu học": ["Lớp 1–2", "Lớp 3–4", "Lớp 5"],
  "Học sinh THCS": ["Lớp 6–7", "Lớp 8–9"],
  "Học sinh THPT": ["Lớp 10", "Lớp 11", "Lớp 12"],
  "Người lớn đi làm": ["18–24 tuổi", "25–35 tuổi", "Trên 35 tuổi"],
  "Luyện thi IELTS": ["Chưa thi IELTS", "Đã có 4.5–5.5", "Đã có 6.0+"],
  "Học online": ["Theo chương trình gợi ý"],
};

export const goalOptions: { value: string; label: string }[] = [
  { value: "Giao tiếp tự tin", label: "Giao tiếp tự tin trong học tập & cuộc sống" },
  { value: "Thi chứng chỉ quốc tế", label: "Thi chứng chỉ quốc tế (Cambridge, IELTS)" },
  { value: "Cải thiện điểm trên trường", label: "Cải thiện điểm tiếng Anh trên trường" },
  { value: "Du học & định cư", label: "Chuẩn bị du học & định cư" },
  { value: "Phát triển nghề nghiệp", label: "Dùng tiếng Anh trong công việc" },
  { value: "Khác", label: "Mục tiêu khác (mô tả thêm ở bước sau)" },
];

export const formatOptions: { value: z.infer<typeof import("@/lib/leads/schema").preferredFormatSchema>; label: string; hint: string }[] = [
  { value: "offline", label: "Học tại trung tâm", hint: "Lớp nhóm nhỏ, tương tác trực tiếp" },
  { value: "online", label: "Học online", hint: "Linh hoạt thời gian, học mọi nơi" },
  { value: "hybrid", label: "Kết hợp cả hai", hint: "Offline + online theo tuần" },
  { value: "undecided", label: "Chưa quyết định", hint: "Nhờ tư vấn giúp" },
];
