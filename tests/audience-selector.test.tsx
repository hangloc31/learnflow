import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AudienceSelector } from "@/components/sections/audience-selector";
import type { Audience, Program } from "@/types/content";

const mockAudiences: Audience[] = [
  {
    id: "ielts",
    label: "Luyện thi IELTS",
    description: "Chuẩn bị thi IELTS",
    recommendedProgramSlugs: ["ielts-foundations", "ielts-advanced"],
  },
];

const mockPrograms: Program[] = [
  {
    slug: "ielts-foundations",
    name: "IELTS Foundations",
    audienceId: "ielts",
    ageRange: "16+",
    tagline: "Nền tảng IELTS",
    summary: "Khóa học nền tảng",
    outcomes: ["Band 5.0+"],
    format: "offline",
    levels: ["Beginner"],
    curriculumHighlights: ["Listening", "Reading"],
    featured: true,
  },
  {
    slug: "ielts-advanced",
    name: "IELTS Advanced",
    audienceId: "ielts",
    ageRange: "16+",
    tagline: "Nâng cao IELTS",
    summary: "Khóa học nâng cao",
    outcomes: ["Band 7.0+"],
    format: "online",
    levels: ["Advanced"],
    curriculumHighlights: ["Writing", "Speaking"],
    featured: false,
  },
];

describe("AudienceSelector — program filtering", () => {
  it("shows a prompt before selection", () => {
    render(<AudienceSelector audiences={mockAudiences} programs={mockPrograms} />);
    expect(screen.getByText(/Chọn đối tượng phía trên/i)).toBeInTheDocument();
  });

  it("reveals recommended programs after selection", async () => {
    const user = userEvent.setup();
    render(<AudienceSelector audiences={mockAudiences} programs={mockPrograms} />);

    await user.click(screen.getByRole("button", { name: "Luyện thi IELTS" }));

    const details = screen.getAllByRole("link", { name: /Xem chi tiết chương trình/i });
    expect(details.length).toBeGreaterThan(0);
    expect(details[0]?.getAttribute("href")).toMatch(/^\/programs\//);
  });

  it("deselects when the same audience is clicked again", async () => {
    const user = userEvent.setup();
    render(<AudienceSelector audiences={mockAudiences} programs={mockPrograms} />);

    await user.click(screen.getByRole("button", { name: "Luyện thi IELTS" }));
    await user.click(screen.getByRole("button", { name: "Luyện thi IELTS" }));

    expect(screen.getByText(/Chọn đối tượng phía trên/i)).toBeInTheDocument();
  });
});
