import { sql } from "drizzle-orm";
import { getDb } from "./leads/db";
import type { AudienceId, Branch, Program, Teacher, Article, EventItem } from "@/types/content";

/**
 * Typed content access layer — the ONLY module pages use to read content.
 * Reads from SQLite database (seeded via `npx tsx scripts/seed-content.ts`).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

/* -------------------------------------------------------------------------- */
/*                                site config                                 */
/* -------------------------------------------------------------------------- */

export function getSiteConfig() {
  const db = getDb();
  const rows = db.all(sql`SELECT key, value FROM site_config ORDER BY rowid`) as Row[];
  const map = new Map<string, string>();
  for (const r of rows) map.set(r.key, r.value);

  return {
    name: map.get("name") ?? "",
    tagline: map.get("tagline") ?? "",
    description: map.get("description") ?? "",
    url: map.get("url") ?? "",
    contact: {
      phone: map.get("contact.phone") ?? "",
      phoneHref: map.get("contact.phoneHref") ?? "",
      email: map.get("contact.email") ?? "",
      address: map.get("contact.address") ?? "",
    },
    branches: JSON.parse(map.get("branches") ?? "[]") as Branch[],
    ctas: JSON.parse(map.get("ctas") ?? "{}") as Record<string, string>,
  };
}

/* -------------------------------------------------------------------------- */
/*                                navigation                                  */
/* -------------------------------------------------------------------------- */

// Navigation stays in TypeScript — structural, not business content.
import { mainNav, footerNav } from "@/content/navigation";

export function getMainNav() {
  return mainNav;
}

export function getFooterNav() {
  return footerNav;
}

export function getBranches() {
  return getSiteConfig().branches;
}

/* -------------------------------------------------------------------------- */
/*                                audiences                                   */
/* -------------------------------------------------------------------------- */

export function getAudiences() {
  const db = getDb();
  const rows = db.all(sql`SELECT id, label, description, recommended_program_slugs FROM audiences ORDER BY rowid`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    description: r.description,
    recommendedProgramSlugs: JSON.parse(r.recommended_program_slugs) as string[],
  }));
}

/* -------------------------------------------------------------------------- */
/*                                programs                                    */
/* -------------------------------------------------------------------------- */

function rowToProgram(r: Row): Program {
  return {
    slug: r.slug,
    name: r.name,
    audienceId: r.audience_id,
    ageRange: r.age_range,
    tagline: r.tagline,
    summary: r.summary,
    outcomes: JSON.parse(r.outcomes),
    format: r.format,
    levels: JSON.parse(r.levels),
    curriculumHighlights: JSON.parse(r.curriculum_highlights),
    featured: r.featured === 1,
  };
}

export function getPrograms(): Program[] {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM programs ORDER BY rowid`) as Row[];
  return rows.map(rowToProgram);
}

export function getFeaturedPrograms(): Program[] {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM programs WHERE featured = 1 ORDER BY rowid`) as Row[];
  return rows.map(rowToProgram);
}

export function getProgram(slug: string): Program | undefined {
  const db = getDb();
  const row = db.get(sql`SELECT * FROM programs WHERE slug = ${slug}`) as Row | undefined;
  return row ? rowToProgram(row) : undefined;
}

export function getProgramsForAudience(audienceId: AudienceId): Program[] {
  const db = getDb();
  const audience = db.get(sql`SELECT recommended_program_slugs FROM audiences WHERE id = ${audienceId}`) as Row | undefined;
  if (!audience) return [];
  const slugs: string[] = JSON.parse(audience.recommended_program_slugs);
  if (slugs.length === 0) return [];
  const rows = db.all(sql`SELECT * FROM programs WHERE slug IN (${sql.join(slugs, sql`, `)}) ORDER BY rowid`) as Row[];
  return rows.map(rowToProgram);
}

/* -------------------------------------------------------------------------- */
/*                                teachers                                    */
/* -------------------------------------------------------------------------- */

function rowToTeacher(r: Row): Teacher {
  return {
    slug: r.slug,
    name: r.name,
    role: r.role,
    specialization: r.specialization,
    credentials: JSON.parse(r.credentials),
    philosophy: r.philosophy,
    placeholder: r.placeholder === 1,
  };
}

export function getTeachers(): Teacher[] {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM teachers ORDER BY rowid`) as Row[];
  return rows.map(rowToTeacher);
}

export function getTeacher(slug: string): Teacher | undefined {
  const db = getDb();
  const row = db.get(sql`SELECT * FROM teachers WHERE slug = ${slug}`) as Row | undefined;
  return row ? rowToTeacher(row) : undefined;
}

/* -------------------------------------------------------------------------- */
/*                              testimonials                                   */
/* -------------------------------------------------------------------------- */

export function getTestimonials() {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM testimonials ORDER BY rowid`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    authorName: r.author_name,
    authorRole: r.author_role,
    program: r.program,
    learnerAge: r.learner_age ?? undefined,
    quote: r.quote,
    outcome: r.outcome ?? undefined,
    placeholder: r.placeholder === 1,
  }));
}

/* -------------------------------------------------------------------------- */
/*                                 events                                     */
/* -------------------------------------------------------------------------- */

function rowToEvent(r: Row): EventItem {
  return {
    slug: r.slug,
    title: r.title,
    period: r.period,
    summary: r.summary,
    highlights: JSON.parse(r.highlights),
    placeholder: r.placeholder === 1,
  };
}

export function getEvents(): EventItem[] {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM events ORDER BY rowid`) as Row[];
  return rows.map(rowToEvent);
}

export function getEvent(slug: string): EventItem | undefined {
  const db = getDb();
  const row = db.get(sql`SELECT * FROM events WHERE slug = ${slug}`) as Row | undefined;
  return row ? rowToEvent(row) : undefined;
}

/* -------------------------------------------------------------------------- */
/*                                articles                                    */
/* -------------------------------------------------------------------------- */

function rowToArticle(r: Row): Article {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    excerpt: r.excerpt,
    readingTimeMinutes: r.reading_time_minutes,
    publishedAt: r.published_at,
    placeholder: r.placeholder === 1,
    body: r.body ? JSON.parse(r.body) : undefined,
  };
}

export function getArticles(): Article[] {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM articles ORDER BY rowid`) as Row[];
  return rows.map(rowToArticle);
}

export function getArticle(slug: string): Article | undefined {
  const db = getDb();
  const row = db.get(sql`SELECT * FROM articles WHERE slug = ${slug}`) as Row | undefined;
  return row ? rowToArticle(row) : undefined;
}

/* -------------------------------------------------------------------------- */
/*                                  faqs                                      */
/* -------------------------------------------------------------------------- */

export function getFaqs() {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM faqs ORDER BY rowid`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    group: r.group,
    question: r.question,
    answer: r.answer,
    placeholder: r.placeholder === 1,
  }));
}

/* -------------------------------------------------------------------------- */
/*                              statistics                                     */
/* -------------------------------------------------------------------------- */

export function getStatistics() {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM statistics ORDER BY rowid`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    value: r.value,
    suffix: r.suffix ?? undefined,
    placeholder: r.placeholder === 1,
  }));
}

/* -------------------------------------------------------------------------- */
/*                           differentiators                                  */
/* -------------------------------------------------------------------------- */

export function getDifferentiators() {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM differentiators ORDER BY rowid`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    icon: r.icon,
    title: r.title,
    description: r.description,
  }));
}

export function getJourneySteps() {
  const db = getDb();
  const rows = db.all(sql`SELECT * FROM journey_steps ORDER BY rowid`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
  }));
}
