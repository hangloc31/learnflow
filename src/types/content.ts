import { z } from "zod";

/**
 * Domain content schemas — the contract between content modules and the UI.
 * Types are always inferred (never hand-written) so runtime validation and
 * compile-time types cannot diverve (see .clinerules/06-typescript.md).
 */

/* ---------------------------------- enums --------------------------------- */

export const audienceIdSchema = z.enum([
  "preschool",
  "primary",
  "secondary",
  "highschool",
  "adults",
  "ielts",
  "online",
]);
export type AudienceId = z.infer<typeof audienceIdSchema>;

export const programFormatSchema = z.enum(["offline", "online", "hybrid", "one-to-one"]);
export type ProgramFormat = z.infer<typeof programFormatSchema>;

export const articleCategorySchema = z.enum([
  "learning-tips",
  "parent-resources",
  "ielts",
  "study-abroad",
  "cambridge",
  "school-english",
  "events",
  "center-news",
]);
export type ArticleCategory = z.infer<typeof articleCategorySchema>;

export const faqGroupSchema = z.enum(["enrollment", "programs", "logistics"]);
export type FaqGroup = z.infer<typeof faqGroupSchema>;

/* -------------------------------- entities -------------------------------- */

export const audienceSchema = z.object({
  id: audienceIdSchema,
  /** Vietnamese selector label, e.g. "Bé 4–6 tuổi" */
  label: z.string().min(1),
  description: z.string().min(1),
  recommendedProgramSlugs: z.array(z.string().min(1)).min(1),
});

export const programSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  name: z.string().min(1),
  audienceId: audienceIdSchema,
  /** e.g. "4–8 tuổi" or "16+" */
  ageRange: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  /** Learner outcomes — what you can do after this program */
  outcomes: z.array(z.string().min(1)).min(1),
  format: programFormatSchema,
  levels: z.array(z.string().min(1)).default([]),
  /** "Inside the classroom" preview items for the program detail page */
  curriculumHighlights: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
});

export const teacherSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  role: z.string().min(1),
  specialization: z.string().min(1),
  credentials: z.array(z.string().min(1)).min(1),
  philosophy: z.string().min(1),
  /** true → render draft marker; must never read as a real person's profile */
  placeholder: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  id: z.string().min(1),
  authorName: z.string().min(1),
  /** "parent" | "student" | "alumnus" */
  authorRole: z.enum(["parent", "student", "alumnus"]),
  program: z.string().min(1),
  learnerAge: z.number().int().positive().optional(),
  quote: z.string().min(1),
  outcome: z.string().optional(),
  placeholder: z.boolean().default(true),
});

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), level: z.number().int().min(2).max(4), text: z.string().min(1) }),
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal("image"),
    src: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("list"),
    style: z.enum(["bullet", "numbered"]),
    items: z.array(z.string().min(1)).min(1),
  }),
  z.object({ type: z.literal("divider") }),
]);
export type Block = z.infer<typeof blockSchema>;

export const articleSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  category: articleCategorySchema,
  excerpt: z.string().min(1),
  readingTimeMinutes: z.number().int().positive(),
  publishedAt: z.string().date(),
  placeholder: z.boolean().default(true),
  body: z.array(blockSchema).optional(),
});

export const eventSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  /** e.g. "Summer 2026" — free text until a scheduling system exists */
  period: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  placeholder: z.boolean().default(true),
});

export const branchSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  mapUrl: z.string().url().optional(),
});

export const faqSchema = z.object({
  id: z.string().min(1),
  group: faqGroupSchema,
  question: z.string().min(1),
  answer: z.string().min(1),
  placeholder: z.boolean().default(true),
});

export const statisticSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.number().int().nonnegative(),
  suffix: z.string().optional(),
  placeholder: z.boolean().default(true),
});

export const differentiatorSchema = z.object({
  id: z.string().min(1),
  /** lucide icon key — mapped to a component in the programs/differentiators section */
  icon: z.enum(["globe", "target", "users", "message-circle", "award", "line-chart"]),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const journeyStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

/* ------------------------------ inferred types ----------------------------- */

export type Audience = z.infer<typeof audienceSchema>;
export type Program = z.infer<typeof programSchema>;
export type Teacher = z.infer<typeof teacherSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Article = z.infer<typeof articleSchema>;
export type EventItem = z.infer<typeof eventSchema>;
export type Branch = z.infer<typeof branchSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Statistic = z.infer<typeof statisticSchema>;
export type Differentiator = z.infer<typeof differentiatorSchema>;
export type JourneyStep = z.infer<typeof journeyStepSchema>;

export const CONTENT_DRAFT_MARKER = "Nội dung mẫu — chờ dữ liệu thực tế";
