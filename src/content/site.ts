import { z } from "zod";
import { branchSchema } from "@/types/content";
import { env } from "@/lib/env";


/**
 * Site-wide configuration — brand, contact, CTA copy.
 * TODO(content): Replace brand name, hotline, email and address with verified business data.
 */
export const siteConfigSchema = z.object({
  /** TODO(brand): "LearnFlow" is a working name, not a real brand */
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string().url(),
  contact: z.object({
    /** TODO(content): placeholder hotline */
    phone: z.string(),
    phoneHref: z.string(),
    /** TODO(content): placeholder email */
    email: z.string().email(),
    /** TODO(content): placeholder head-office address */
    address: z.string(),
  }),
  branches: z.array(branchSchema).min(1),
  ctas: z.object({
    primary: z.string(),
    secondary: z.string(),
    trial: z.string(),
    consultation: z.string(),
    placementTest: z.string(),
    explorePrograms: z.string(),
    findPath: z.string(),
    contact: z.string(),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse({
  name: "LearnFlow",
  tagline: "Tiếng Anh cho mọi hành trình",
  description:
    "Trung tâm tiếng Anh hiện đại với lộ trình cá nhân hóa theo chuẩn quốc tế — từ bé 4 tuổi đến người lớn, offline và online.",
  url: env.siteUrl,
  contact: {
    phone: "0123 456 789",
    phoneHref: "tel:+84123456789",
    email: "hello@learnflow.example",
    address: "Số 1 Đường Mẫu, Quận 1, TP. Hồ Chí Minh",
  },
  branches: [
    {
      // TODO(content): placeholder branch — replace with verified locations
      name: "Trung tâm chính (placeholder)",
      address: "Số 1 Đường Mẫu, Quận 1, TP. Hồ Chí Minh",
      phone: "0123 456 789",
    },
  ],
  ctas: {
    primary: "Đăng ký tư vấn",
    secondary: "Khám phá chương trình",
    trial: "Đăng ký học thử",
    consultation: "Tư vấn miễn phí",
    placementTest: "Kiểm tra trình độ",
    explorePrograms: "Khám phá chương trình",
    findPath: "Tìm lộ trình phù hợp",
    contact: "Liên hệ",
  },
});
