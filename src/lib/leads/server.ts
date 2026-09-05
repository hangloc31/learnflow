import { leadsTable, getDb } from "./db";
import { leadPayloadSchema } from "./schema";
import { env } from "@/lib/env";

/**
 * Server-side lead handling: rate limiting → honeypot → validation → adapter.
 * Responses never leak internals (.clinerules/13-security.md); PII is never logged.
 */

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

function json(data: unknown, status: number): Response {
  return Response.json(data, { status });
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "local";
}

async function notifyByEmail(): Promise<void> {
  // TODO(crm-integration): wire Resend (or Zalo/email webhook) when the business picks a
  // provider. Enabled by env: RESEND_API_KEY + LEAD_NOTIFICATION_EMAIL. No PII in logs.
  if (!env.resendApiKey || !env.leadNotificationEmail) return;
}

export async function handleLeadRoute(request: Request): Promise<Response> {
  const ip = getClientIp(request);
  if (!rateLimit(ip)) {
    return json(
      { error: { code: "rate_limited", message: "Bạn đã gửi nhiều yêu cầu. Vui lòng thử lại sau ít phút." } },
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: { code: "invalid_json", message: "Dữ liệu không hợp lệ." } }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    (body as { website?: unknown }).website
  ) {
    return json({ ok: true }, 200);
  }

  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        error: {
          code: "validation_failed",
          message: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại các trường được đánh dấu.",
        },
      },
      400,
    );
  }

  const lead = parsed.data;

  try {
    if (env.leadsStorageAdapter === "console") {
      // Console adapter: count only — never log PII.
      console.info("[leads] lead received (PII redacted)");
    } else {
      const db = getDb();
      await db.insert(leadsTable).values({
        type: lead.type,
        audience: lead.audience,
        ageGroup: lead.ageGroup,
        goal: lead.goal,
        preferredFormat: lead.preferredFormat,
        programInterest: lead.programInterest || null,
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        message: lead.message || null,
        sourcePage: lead.sourcePage,
        createdAt: new Date().toISOString(),
      });
    }
    await notifyByEmail();
    return json({ ok: true }, 200);
  } catch (error) {
    // Fallback chain: if the database adapter fails, report a typed error (no internals).
    console.error("[leads] storage failed", error instanceof Error ? error.name : "unknown");
    return json(
      { error: { code: "storage_failed", message: "Hệ thống đang bận. Vui lòng thử lại hoặc gọi hotline." } },
      500,
    );
  }
}
