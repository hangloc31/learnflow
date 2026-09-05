import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Content tables — all business content stored in SQLite.
 * Arrays and nested objects are serialized as JSON strings.
 */

export const siteConfigTable = sqliteTable("site_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const audiencesTable = sqliteTable("audiences", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  description: text("description").notNull(),
  /** JSON array of program slugs */
  recommendedProgramSlugs: text("recommended_program_slugs").notNull(),
});

export const programsTable = sqliteTable("programs", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  audienceId: text("audience_id").notNull(),
  ageRange: text("age_range").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  /** JSON array */
  outcomes: text("outcomes").notNull(),
  format: text("format").notNull(),
  /** JSON array */
  levels: text("levels").notNull(),
  /** JSON array */
  curriculumHighlights: text("curriculum_highlights").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
});

export const teachersTable = sqliteTable("teachers", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  specialization: text("specialization").notNull(),
  /** JSON array */
  credentials: text("credentials").notNull(),
  philosophy: text("philosophy").notNull(),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const testimonialsTable = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  program: text("program").notNull(),
  learnerAge: integer("learner_age"),
  quote: text("quote").notNull(),
  outcome: text("outcome"),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const articlesTable = sqliteTable("articles", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  readingTimeMinutes: integer("reading_time_minutes").notNull(),
  publishedAt: text("published_at").notNull(),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const eventsTable = sqliteTable("events", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  period: text("period").notNull(),
  summary: text("summary").notNull(),
  /** JSON array */
  highlights: text("highlights").notNull(),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const faqsTable = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  group: text("group").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const statisticsTable = sqliteTable("statistics", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix"),
  placeholder: integer("placeholder", { mode: "boolean" }).notNull().default(true),
});

export const differentiatorsTable = sqliteTable("differentiators", {
  id: text("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const journeyStepsTable = sqliteTable("journey_steps", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});
