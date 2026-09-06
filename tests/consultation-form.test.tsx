import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsultationForm } from "@/components/forms/consultation-form";

// The form submits through the leads adapter seam (.clinerules/12-forms.md) —
// tests mock that boundary; no network happens in jsdom.
const { submitLeadMock } = vi.hoisted(() => ({ submitLeadMock: vi.fn() }));
vi.mock("@/lib/leads/client", () => ({ submitLead: submitLeadMock }));

function renderForm() {
  return render(<ConsultationForm leadType="consultation" sourcePage="/test" />);
}

async function fillContactStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Họ và tên/i), "Nguyễn Văn A");
  await user.type(screen.getByLabelText(/Số điện thoại/i), "0901234567");
  await user.type(screen.getByLabelText(/Email/i), "a@example.com");
}

describe("ConsultationForm — 3-step flow", () => {
  it("blocks progression while step 1 is unanswered", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /Tiếp tục/i }));
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Con bạn đang ở chặng nào?")).toBeInTheDocument();
  });

  it("completes the full flow and shows the success state", async () => {
    const user = userEvent.setup();
    renderForm();

    // Step 1: audience + goal on one screen.
    await user.click(screen.getByRole("radio", { name: /Học sinh tiểu học/i }));
    await user.click(screen.getByRole("radio", { name: /Giao tiếp tự tin/i }));
    await user.click(screen.getByRole("button", { name: /Tiếp tục/i }));

    // Step 2: age group + format on one screen.
    await user.click(screen.getByRole("radio", { name: /Lớp 3–4/i }));
    await user.click(screen.getByRole("radio", { name: /Học tại trung tâm/i }));
    await user.click(screen.getByRole("button", { name: /Tiếp tục/i }));

    await fillContactStep(user);
    submitLeadMock.mockResolvedValue({ ok: true });
    await user.click(screen.getByRole("button", { name: /Gửi thông tin/i }));

    expect(await screen.findByText(/Đã nhận thông tin của bạn/i)).toBeInTheDocument();
  });

  it("shows inline validation on the contact step and stays on the form", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("radio", { name: /Người lớn đi làm/i }));
    await user.click(screen.getByRole("radio", { name: /Dùng tiếng Anh trong công việc/i }));
    await user.click(screen.getByRole("button", { name: /Tiếp tục/i }));
    await user.click(screen.getByRole("radio", { name: /25–35 tuổi/i }));
    await user.click(screen.getByRole("radio", { name: /Học online/i }));
    await user.click(screen.getByRole("button", { name: /Tiếp tục/i }));

    await user.type(screen.getByLabelText(/Họ và tên/i), "A");
    await user.type(screen.getByLabelText(/Số điện thoại/i), "123");
    await user.type(screen.getByLabelText(/Email/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /Gửi thông tin/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(screen.getByRole("button", { name: /Gửi thông tin/i })).toBeInTheDocument();
  });
});
