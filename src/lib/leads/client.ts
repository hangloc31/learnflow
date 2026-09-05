import type { LeadPayload } from "./schema";

/**
 * Client-side lead submission — the only way UI code sends a lead
 * (.clinerules/12-forms.md). Server persistence details are invisible here.
 */
export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

const FALLBACK_ERROR =
  "Không gửi được thông tin lúc này. Vui lòng thử lại sau hoặc gọi hotline để được hỗ trợ trực tiếp.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data: unknown = await response.json().catch(() => null);

    if (response.ok && isRecord(data) && data.ok === true) {
      return { ok: true };
    }
    if (isRecord(data) && isRecord(data.error) && typeof data.error.message === "string") {
      return { ok: false, error: data.error.message };
    }
    return { ok: false, error: FALLBACK_ERROR };
  } catch {
    return { ok: false, error: FALLBACK_ERROR };
  }
}
