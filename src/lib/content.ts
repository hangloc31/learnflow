import { getDb } from "./leads/db";
import type { AudienceId, Program, ProgramFormat, Teacher, Article, ArticleCategory, EventItem, Testimonial, FaqGroup, Differentiator } from "@/types/content";

/**
 * Typed content access layer — the ONLY module pages use to read content.
 * Reads from SQLite (local) or Turso (production) via async query client.
 */

type Row = Record<string, unknown>;

/* -------------------------------------------------------------------------- */
/*                                site config                                 */
/* -------------------------------------------------------------------------- */

export async function getSiteConfig() {
  const db = await getDb();
  const rows = await db.all("SELECT key, value FROM site_config ORDER BY rowid");
  const map = new Map<string, string>();
  for (const r of rows) map.set(r.key as string, r.value as string);

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
    branches: JSON.parse(map.get("branches") ?? "[]") as { name: string; address: string; phone: string }[],
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

export async function getBranches() {
  const config = await getSiteConfig();
  return config.branches;
}

/* -------------------------------------------------------------------------- */
/*                                audiences                                   */
/* -------------------------------------------------------------------------- */

export async function getAudiences() {
  const db = await getDb();
  const rows = await db.all("SELECT id, label, description, recommended_program_slugs FROM audiences ORDER BY rowid");
  return rows.map((r) => ({
    id: r.id as AudienceId,
    label: r.label as string,
    description: r.description as string,
    recommendedProgramSlugs: JSON.parse(r.recommended_program_slugs as string) as string[],
  }));
}

/* -------------------------------------------------------------------------- */
/*                                programs                                    */
/* -------------------------------------------------------------------------- */

function rowToProgram(r: Row): Program {
  return {
    slug: r.slug as string,
    name: r.name as string,
    audienceId: r.audience_id as AudienceId,
    ageRange: r.age_range as string,
    tagline: r.tagline as string,
    summary: r.summary as string,
    outcomes: JSON.parse(r.outcomes as string),
    format: r.format as ProgramFormat,
    levels: JSON.parse(r.levels as string),
    curriculumHighlights: JSON.parse(r.curriculum_highlights as string),
    featured: r.featured === 1,
  };
}

export async function getPrograms(): Promise<Program[]> {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM programs ORDER BY rowid");
  return rows.map(rowToProgram);
}

export async function getFeaturedPrograms(): Promise<Program[]> {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM programs WHERE featured = 1 ORDER BY rowid");
  return rows.map(rowToProgram);
}

export async function getProgram(slug: string): Promise<Program | undefined> {
  const db = await getDb();
  const row = await db.get("SELECT * FROM programs WHERE slug = ?", [slug]);
  return row ? rowToProgram(row) : undefined;
}

export async function getProgramsForAudience(audienceId: AudienceId): Promise<Program[]> {
  const db = await getDb();
  const audience = await db.get("SELECT recommended_program_slugs FROM audiences WHERE id = ?", [audienceId]);
  if (!audience) return [];
  const slugs: string[] = JSON.parse(audience.recommended_program_slugs as string);
  if (slugs.length === 0) return [];
  const placeholders = slugs.map(() => "?").join(",");
  const rows = await db.all(`SELECT * FROM programs WHERE slug IN (${placeholders}) ORDER BY rowid`, slugs);
  return rows.map(rowToProgram);
}

/* -------------------------------------------------------------------------- */
/*                                teachers                                    */
/* -------------------------------------------------------------------------- */

function rowToTeacher(r: Row): Teacher {
  return {
    slug: r.slug as string,
    name: r.name as string,
    role: r.role as string,
    specialization: r.specialization as string,
    credentials: JSON.parse(r.credentials as string),
    philosophy: r.philosophy as string,
    placeholder: r.placeholder === 1,
  };
}

export async function getTeachers(): Promise<Teacher[]> {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM teachers ORDER BY rowid");
  return rows.map(rowToTeacher);
}

export async function getTeacher(slug: string): Promise<Teacher | undefined> {
  const db = await getDb();
  const row = await db.get("SELECT * FROM teachers WHERE slug = ?", [slug]);
  return row ? rowToTeacher(row) : undefined;
}

/* -------------------------------------------------------------------------- */
/*                              testimonials                                   */
/* -------------------------------------------------------------------------- */

export async function getTestimonials() {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM testimonials ORDER BY rowid");
  return rows.map((r) => ({
    id: r.id as string,
    authorName: r.author_name as string,
    authorRole: r.author_role as Testimonial['authorRole'],
    program: r.program as string,
    learnerAge: (r.learner_age as number) ?? undefined,
    quote: r.quote as string,
    outcome: (r.outcome as string) ?? undefined,
    placeholder: r.placeholder === 1,
  }));
}

/* -------------------------------------------------------------------------- */
/*                                 events                                     */
/* -------------------------------------------------------------------------- */

function rowToEvent(r: Row): EventItem {
  return {
    slug: r.slug as string,
    title: r.title as string,
    period: r.period as string,
    summary: r.summary as string,
    highlights: JSON.parse(r.highlights as string),
    placeholder: r.placeholder === 1,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM events ORDER BY rowid");
  return rows.map(rowToEvent);
}

export async function getEvent(slug: string): Promise<EventItem | undefined> {
  const db = await getDb();
  const row = await db.get("SELECT * FROM events WHERE slug = ?", [slug]);
  return row ? rowToEvent(row) : undefined;
}

/* -------------------------------------------------------------------------- */
/*                                articles                                    */
/* -------------------------------------------------------------------------- */

function rowToArticle(r: Row): Article {
  return {
    slug: r.slug as string,
    title: r.title as string,
    category: r.category as ArticleCategory,
    excerpt: r.excerpt as string,
    readingTimeMinutes: r.reading_time_minutes as number,
    publishedAt: r.published_at as string,
    placeholder: r.placeholder === 1,
    body: r.body ? JSON.parse(r.body as string) : undefined,
  };
}

export async function getArticles(): Promise<Article[]> {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM articles ORDER BY rowid");
  return rows.map(rowToArticle);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const db = await getDb();
  const row = await db.get("SELECT * FROM articles WHERE slug = ?", [slug]);
  return row ? rowToArticle(row) : undefined;
}

/* -------------------------------------------------------------------------- */
/*                                  faqs                                      */
/* -------------------------------------------------------------------------- */

export async function getFaqs() {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM faqs ORDER BY rowid");
  return rows.map((r) => ({
    id: r.id as string,
    group: r.group as FaqGroup,
    question: r.question as string,
    answer: r.answer as string,
    placeholder: r.placeholder === 1,
  }));
}

/* -------------------------------------------------------------------------- */
/*                              statistics                                     */
/* -------------------------------------------------------------------------- */

export async function getStatistics() {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM statistics ORDER BY rowid");
  return rows.map((r) => ({
    id: r.id as string,
    label: r.label as string,
    value: r.value as number,
    suffix: (r.suffix as string) ?? undefined,
    placeholder: r.placeholder === 1,
  }));
}

/* -------------------------------------------------------------------------- */
/*                           differentiators                                  */
/* -------------------------------------------------------------------------- */

export async function getDifferentiators() {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM differentiators ORDER BY rowid");
  return rows.map((r) => ({
    id: r.id as string,
    icon: r.icon as Differentiator['icon'],
    title: r.title as string,
    description: r.description as string,
  }));
}

export async function getJourneySteps() {
  const db = await getDb();
  const rows = await db.all("SELECT * FROM journey_steps ORDER BY rowid");
  return rows.map((r) => ({
    id: r.id as string,
    title: r.title as string,
    description: r.description as string,
  }));
}
