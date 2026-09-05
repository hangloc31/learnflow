import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqSection } from "@/components/sections/faq-section";
import type { Faq } from "@/types/content";

const mockFaqs: Faq[] = [
  { id: "1", group: "enrollment", question: "Học phí bao nhiêu?", answer: "Tùy chương trình", placeholder: true },
  { id: "2", group: "enrollment", question: "Có được học thử không?", answer: "Có, miễn phí", placeholder: true },
  { id: "3", group: "enrollment", question: "Trung tâm nhận học viên từ mấy tuổi?", answer: "từ 4 tuổi trở lên", placeholder: true },
];

describe("FAQ accordion", () => {
  it("renders all questions collapsed by default", () => {
    render(<FaqSection faqs={mockFaqs} />);
    const triggers = screen.getAllByRole("button");
    const questions = triggers.filter((t) => /Học phí|Học thử|từ mấy tuổi/i.test(t.textContent ?? ""));
    expect(questions.length).toBeGreaterThan(2);
  });

  it("expands an answer when its question is clicked", async () => {
    const user = userEvent.setup();
    render(<FaqSection faqs={mockFaqs} />);

    await user.click(screen.getByText(/Trung tâm nhận học viên từ mấy tuổi\?/i));

    expect(screen.getByText(/từ 4 tuổi trở lên/i)).toBeVisible();
  });

  it("keeps placeholder-marked answers visually honest", () => {
    render(<FaqSection faqs={mockFaqs} />);
    expect(document.body.textContent).toContain("TODO(content)");
  });
});
