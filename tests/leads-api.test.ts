import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { count, eq } from "drizzle-orm";
import { handleLeadRoute } from "@/lib/leads/server";
import { getDb, leadsTable } from "@/lib/leads/db";

const validBody = {
  type: "trial",
  audience: "Người lớn đi làm",
  ageGroup: "25–35 tuổi",
  goal: "Phát triển nghề nghiệp",
  preferredFormat: "online",
  fullName: "Trần Thị B",
  phone: "0912345678",
  email: "adult@example.com",
  sourcePage: "/trial",
};

function postRequest(body: unknown, ip = "203.0.113.10"): Request {
  return new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

async function countRows(phone: string): Promise<number> {
  // parameterized via Drizzle; never logs PII
  const rows = await getDb().select({ n: count() }).from(leadsTable).where(eq(leadsTable.phone, phone));
  return rows[0]?.n ?? 0;
}

beforeEach(() => {
  getDb().delete(leadsTable).run();
});

afterEach(() => {
  getDb().delete(leadsTable).run();
});

describe("POST /api/leads handler", () => {
  it("stores a valid lead in the database", async () => {
    const response = await handleLeadRoute(postRequest(validBody));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(await countRows("0912345678")).toBe(1);
  });

  it("rejects invalid payloads without storing", async () => {
    const response = await handleLeadRoute(postRequest({ ...validBody, email: "bad" }));
    expect(response.status).toBe(400);
    expect(await countRows("0912345678")).toBe(0);
  });

  it("returns a helpful message for malformed JSON", async () => {
    const response = await handleLeadRoute(
      new Request("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{not json",
      }),
    );
    expect(response.status).toBe(400);
  });

  it("silently accepts honeypot submissions without storing", async () => {
    const response = await handleLeadRoute(postRequest({ ...validBody, website: "http://spam.example" }));
    expect(response.status).toBe(200);
    expect(await countRows("0912345678")).toBe(0);
  });

  it("rate-limits bursts from the same IP", async () => {
    const ip = "198.51.100.77";
    for (let i = 0; i < 5; i += 1) {
      const response = await handleLeadRoute(
        postRequest({ ...validBody, phone: `09123456${i}`.slice(0, 10) }, ip),
      );
      expect(response.status).toBe(200);
    }
    const limited = await handleLeadRoute(postRequest({ ...validBody, phone: "0977777777" }, ip));
    expect(limited.status).toBe(429);
  });
});
