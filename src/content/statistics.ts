import { statisticSchema, type Statistic } from "@/types/content";

/**
 * Trust statistics — Section 03.
 * ⚠️ TODO(content): EVERY value below is a PLACEHOLDER. Replace with verified numbers
 * before launch. Do not publish these as real claims.
 */
const statistics: Statistic[] = [
  { id: "years", label: "Năm kinh nghiệm", value: 12, suffix: "+", placeholder: true },
  { id: "students", label: "Học viên đang theo học", value: 4500, suffix: "+", placeholder: true },
  { id: "teachers", label: "Giáo viên & chuyên gia", value: 60, suffix: "+", placeholder: true },
  { id: "branches", label: "Cơ sở", value: 5, placeholder: true },
  { id: "exams", label: "Thí sinh thi Cambridge", value: 8000, suffix: "+", placeholder: true },
];

statistics.forEach((s, i) => {
  if (!statisticSchema.safeParse(s).success) {
    throw new Error(`statistics[${i}] "${s.id}" failed validation`);
  }
});

export const statisticList: Statistic[] = statistics;
