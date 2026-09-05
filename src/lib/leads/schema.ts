import { z } from "zod";

/**
 * Shared lead payload schema — single source of truth used by the client form,
 * the API route and tests (.clinerules/12-forms.md).
 */
export const leadTypeSchema = z.enum(["consultation", "trial", "placement", "contact"]);
export type LeadType = z.infer<typeof leadTypeSchema>;

export const preferredFormatSchema = z.enum(["offline", "online", "hybrid", "undecided"]);

export const leadPayloadSchema = z.object({
  type: leadTypeSchema,
  /** selector/step answers as display labels */
  audience: z.string().min(1, "Vui lòng chọn đối tượng học").max(80),
  ageGroup: z.string().min(1, "Vui lòng chọn độ tuổi / trình độ").max(80),
  goal: z.string().min(1, "Vui lòng chọn mục tiêu học").max(200),
  preferredFormat: preferredFormatSchema,
  programInterest: z.string().max(120).optional().or(z.literal("")),
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\s.-]{9,15}$/, "Số điện thoại chưa hợp lệ"),
  email: z.string().trim().email("Email chưa hợp lệ").max(120),
  message: z.string().max(1000).optional().or(z.literal("")),
  sourcePage: z.string().max(200).default("/"),
  /** honeypot — bots fill it, humans never see it; must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;
