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
  `);

  const db = drizzle(sqlite);
  globalForDb.__learnflowDb = db;
  return db;
}
