/**
 * Typed environment access — the only place that reads process.env
 * (.clinerules/13-security.md). Never import this into components that render secrets;
 * all NEXT_PUBLIC_ values are public by definition.
 */
function optional(key: string): string | undefined {
  const value = process.env[key];
  return value === undefined || value === "" ? undefined : value;
}

export const env = {
  siteUrl: optional("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  showContentDrafts: optional("NEXT_PUBLIC_SHOW_CONTENT_DRAFTS") === "true",
  leadsStorageAdapter: (optional("LEADS_STORAGE_ADAPTER") ?? "database") as
    | "database"
    | "console",
  databaseUrl: optional("DATABASE_URL") ?? "file:./data/learnflow.db",
  resendApiKey: optional("RESEND_API_KEY"),
  leadNotificationEmail: optional("LEAD_NOTIFICATION_EMAIL"),
} as const;
