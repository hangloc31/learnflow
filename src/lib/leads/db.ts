import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { env } from "@/lib/env";

/**
 * Lead storage + content DB. Uses @libsql/client (Turso) in production,
 * better-sqlite3 for local dev. The `leads` table holds PII — never log rows.
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

/* -------------------------------------------------------------------------- */
/*                          Unified async query client                        */
/* -------------------------------------------------------------------------- */

type Row = Record<string, unknown>;

export interface AsyncQueryClient {
  all(sql: string, params?: unknown[]): Promise<Row[]>;
  get(sql: string, params?: unknown[]): Promise<Row | undefined>;
  run(sql: string, params?: unknown[]): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                           Sync client (local dev)                          */
/* -------------------------------------------------------------------------- */

async function createLocalClient(): Promise<AsyncQueryClient> {
  const { default: Database } = await import("better-sqlite3");
  const { mkdirSync } = await import("node:fs");
  const path = await import("node:path");

  const filePart = env.databaseUrl.replace(/^file:/, "");
  const absolutePath = path.isAbsolute(filePart)
    ? filePart
    : path.join(process.cwd(), filePart);
  mkdirSync(path.dirname(absolutePath), { recursive: true });

  const sqlite = new Database(absolutePath);
  sqlite.exec(SCHEMA_SQL);

  // Migration: add body column to articles if not present
  const cols = sqlite.prepare("PRAGMA table_info(articles)").all() as { name: string }[];
  if (!cols.some((c) => c.name === "body")) {
    sqlite.exec(`ALTER TABLE articles ADD COLUMN body TEXT;`);
  }

  return {
    async all(sql: string, params?: unknown[]): Promise<Row[]> {
      if (params && params.length > 0) return sqlite.prepare(sql).all(...params) as Row[];
      return sqlite.prepare(sql).all() as Row[];
    },
    async get(sql: string, params?: unknown[]): Promise<Row | undefined> {
      if (params && params.length > 0) return sqlite.prepare(sql).get(...params) as Row | undefined;
      return sqlite.prepare(sql).get() as Row | undefined;
    },
    async run(sql: string, params?: unknown[]): Promise<void> {
      if (params && params.length > 0) sqlite.prepare(sql).run(...params);
      else sqlite.exec(sql);
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                         Async client (Turso / libSQL)                      */
/* -------------------------------------------------------------------------- */

async function createTursoClient(): Promise<AsyncQueryClient> {
  const { createClient } = await import("@libsql/client");
  const client = createClient({
    url: env.tursoDatabaseUrl!,
    authToken: env.tursoAuthToken,
  });

  // Run schema
  for (const stmt of SCHEMA_SQL.split(";").map((s) => s.trim()).filter(Boolean)) {
    await client.execute(stmt + ";");
  }

  // Migration: add body column if not present
  const cols = await client.execute("PRAGMA table_info(articles)");
  if (!cols.rows.some((c) => c.name === "body")) {
    await client.execute("ALTER TABLE articles ADD COLUMN body TEXT;");
  }

  return {
    async all(sql: string, params?: unknown[]): Promise<Row[]> {
      const result = await client.execute({ sql, args: (params ?? []) as never[] });
      return result.rows as Row[];
    },
    async get(sql: string, params?: unknown[]): Promise<Row | undefined> {
      const result = await client.execute({ sql, args: (params ?? []) as never[] });
      return result.rows[0] as Row | undefined;
    },
    async run(sql: string, params?: unknown[]): Promise<void> {
      await client.execute({ sql, args: (params ?? []) as never[] });
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

const globalForDb = globalThis as unknown as {
  __learnflowAsyncClient?: AsyncQueryClient;
};

/** Async query client — Turso in production, better-sqlite3 wrapper for local dev. */
export async function getDb(): Promise<AsyncQueryClient> {
  if (globalForDb.__learnflowAsyncClient) return globalForDb.__learnflowAsyncClient;

  const client = env.tursoDatabaseUrl
    ? await createTursoClient()
    : await createLocalClient();

  globalForDb.__learnflowAsyncClient = client;
  return client;
}

/* -------------------------------------------------------------------------- */
/*                              Schema SQL                                    */
/* -------------------------------------------------------------------------- */

export const SCHEMA_SQL = `
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
`;
