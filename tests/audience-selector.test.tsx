import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AudienceSelector } from "@/components/sections/audience-selector";
import { getAudiences, getPrograms } from "@/lib/content";

describe("AudienceSelector — program filtering", () => {
  it("shows a prompt before selection", () => {
    render(<AudienceSelector audiences={getAudiences()} programs={getPrograms()} />);
    expect(screen.getByText(/Chọn đối tượng phía trên/i)).toBeInTheDocument();
  });

  it("reveals recommended programs after selection", async () => {
    const user = userEvent.setup();
    render(<AudienceSelector audiences={getAudiences()} programs={getPrograms()} />);

    await user.click(screen.getByRole("button", { name: "Luyện thi IELTS" }));

    const details = screen.getAllByRole("link", { name: /Xem chi tiết chương trình/i });
    expect(details.length).toBeGreaterThan(0);
    expect(details[0]?.getAttribute("href")).toMatch(/^\/programs\//);
  });

  it("deselects when the same audience is clicked again", async () => {
    const user = userEvent.setup();
    render(<AudienceSelector audiences={getAudiences()} programs={getPrograms()} />);

    await user.click(screen.getByRole("button", { name: "Luyện thi IELTS" }));
    await user.click(screen.getByRole("button", { name: "Luyện thi IELTS" }));

    expect(screen.getByText(/Chọn đối tượng phía trên/i)).toBeInTheDocument();
  });
});
