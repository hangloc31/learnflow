-- Turso / libSQL schema for LearnFlow
-- Run: turso db shell learnflow < scripts/turso-schema.sql

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
