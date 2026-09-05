import type { Article } from "@/types/content";

/** Single source of truth for article category display names. */
export const ARTICLE_CATEGORY_LABEL: Record<Article["category"], string> = {
  "learning-tips": "Mẹo học tiếng Anh",
  "parent-resources": "Góc phụ huynh",
  ielts: "IELTS",
  "study-abroad": "Du học",
  cambridge: "Cambridge",
  "school-english": "Tiếng Anh trên trường",
  events: "Sự kiện",
  "center-news": "Tin trung tâm",
};

export const PROGRAM_FORMAT_LABEL: Record<string, string> = {
  offline: "Tại trung tâm",
  online: "Online",
  hybrid: "Offline + Online",
  "one-to-one": "Kèm 1-1",
};
