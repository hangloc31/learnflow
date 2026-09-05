import { describe, expect, it } from "vitest";
import { leadPayloadSchema } from "@/lib/leads/schema";

const validLead = {
  type: "consultation",
  audience: "Học sinh tiểu học",
  ageGroup: "Lớp 3–4",
  goal: "Giao tiếp tự tin",
  preferredFormat: "offline",
  fullName: "Nguyễn Văn A",
  phone: "0901234567",
  email: "parent@example.com",
  sourcePage: "/",
} as const;

describe("leadPayloadSchema", () => {
  it("accepts a complete valid lead", () => {
    const result = leadPayloadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it("accepts a Vietnamese-formatted phone number", () => {
    const result = leadPayloadSchema.safeParse({ ...validLead, phone: "0901 234 567" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid phone number", () => {
    const result = leadPayloadSchema.safeParse({ ...validLead, phone: "not-a-phone" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = leadPayloadSchema.safeParse({ ...validLead, email: "nope" });
    expect(result.success).toBe(false);
  });

  it("rejects when the audience step was skipped", () => {
    const result = leadPayloadSchema.safeParse({ ...validLead, audience: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a honeypot submission (website filled)", () => {
    const result = leadPayloadSchema.safeParse({ ...validLead, website: "spam.example" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown lead type", () => {
    const result = leadPayloadSchema.safeParse({ ...validLead, type: "newsletter" });
    expect(result.success).toBe(false);
  });
});
