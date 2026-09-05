import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { env } from "@/lib/env";

/**
 * Lead storage (SQLite via Drizzle). The `leads` table holds PII — never log rows,
 * never commit the database file (.clinerules/13-security.md).
 * For serverless hosts, point DATABASE_URL at Turso (libSQL) or Neon; this module is
 * the only file that changes.
 */
export const leadsTable = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  audience: text("audience").notNull(),
  ageGroup: text("age_group").notNull(),
  goal: text("goal").notNull(),
  preferredFormat: text("preferred_format").notNull(),
  programInterest: text("program_interest"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  sourcePage: text("source_page").notNull().default("/"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});

type DrizzleSqlite = ReturnType<typeof drizzle>;

const globalForDb = globalThis as unknown as { __learnflowDb?: DrizzleSqlite };

export function getDb(): DrizzleSqlite {
  if (globalForDb.__learnflowDb) return globalForDb.__learnflowDb;

  const filePart = env.databaseUrl.replace(/^file:/, "");
  const absolutePath = path.isAbsolute(filePart) ? filePart : path.join(process.cwd(), filePart);
  mkdirSync(path.dirname(absolutePath), { recursive: true });

  const sqlite = new Database(absolutePath);
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      audience TEXT NOT NULL,
      age_group TEXT NOT NULL,
      goal TEXT NOT NULL,
      preferred_format TEXT NOT NULL,
      program_interest TEXT,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT,
      source_page TEXT NOT NULL DEFAULT '/',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);

    CREATE TABLE IF NOT EXISTS site_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS audiences (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      description TEXT NOT NULL,
      recommended_program_slugs TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS programs (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      audience_id TEXT NOT NULL,
      age_range TEXT NOT NULL,
      tagline TEXT NOT NULL,
      summary TEXT NOT NULL,
      outcomes TEXT NOT NULL,
      format TEXT NOT NULL,
      levels TEXT NOT NULL,
      curriculum_highlights TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS teachers (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      specialization TEXT NOT NULL,
      credentials TEXT NOT NULL,
      philosophy TEXT NOT NULL,
      placeholder INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL,
      program TEXT NOT NULL,
      learner_age INTEGER,
      quote TEXT NOT NULL,
      outcome TEXT,
      placeholder INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS articles (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      reading_time_minutes INTEGER NOT NULL,
      published_at TEXT NOT NULL,
      placeholder INTEGER NOT NULL DEFAULT 1,
      body TEXT
    );
    CREATE TABLE IF NOT EXISTS events (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      period TEXT NOT NULL,
      summary TEXT NOT NULL,
      highlights TEXT NOT NULL,
      placeholder INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      "group" TEXT NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      placeholder INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS statistics (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      value INTEGER NOT NULL,
      suffix TEXT,
      placeholder INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS differentiators (
      id TEXT PRIMARY KEY,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS journey_steps (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `);

  // Migration: add body column to articles if not present
  const articlesColumns = sqlite.prepare("PRAGMA table_info(articles)").all() as { name: string }[];
  if (!articlesColumns.some((c) => c.name === "body")) {
    sqlite.exec(`ALTER TABLE articles ADD COLUMN body TEXT;`);
  }

  const db = drizzle(sqlite);
  globalForDb.__learnflowDb = db;
  return db;
}
