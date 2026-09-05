"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CircleCheck, Phone } from "lucide-react";
import { leadPayloadSchema, type LeadPayload, type LeadType } from "@/lib/leads/schema";
import { submitLead } from "@/lib/leads/client";
import { siteConfig } from "@/content/site";
import {
  audienceOptions,
  ageGroupOptionsByAudience,
  goalOptions,
  formatOptions,
} from "@/content/consultation-options";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ChipRadio, FieldError } from "@/components/forms/chip-radio";
import { cn } from "@/lib/utils";

type FormInput = typeof leadPayloadSchema._input;
type Status = "idle" | "submitting" | "success" | { error: string };

const STEP_TITLES = ["Đối tượng", "Độ tuổi", "Mục tiêu", "Hình thức", "Liên hệ"] as const;
const LAST_STEP = 4;

export interface ConsultationFormProps {
  leadType: LeadType;
  sourcePage: string;
}

/**
 * 5-step consultation flow (docs/ux-principles.md): each step validates before
 * advancing; submission goes through submitLead() only (.clinerules/12-forms.md).
 */
export function ConsultationForm({ leadType, sourcePage }: ConsultationFormProps) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, LeadPayload>({
    resolver: zodResolver(leadPayloadSchema),
    mode: "onTouched",
    defaultValues: {
      type: leadType,
      audience: "",
      ageGroup: "",
      goal: "",
      preferredFormat: "undecided",
      programInterest: "",
      fullName: "",
      phone: "",
      email: "",
      message: "",
      sourcePage,
      website: "",
    },
  });

  const audience = watch("audience");
  const ageGroup = watch("ageGroup");
  const goal = watch("goal");
  const preferredFormat = watch("preferredFormat");
  const ageGroups = useMemo(
    () => (audience ? ageGroupOptionsByAudience[audience] ?? ["Theo chương trình gợi ý"] : []),
    [audience],
  );

  const stepFields: (keyof FormInput)[][] = [
    ["audience"],
    ["ageGroup"],
    ["goal"],
    ["preferredFormat"],
    ["fullName", "phone", "email"],
  ];

  async function next() {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, LAST_STEP));
  }

  const onValid = async (data: LeadPayload) => {
    setStatus("submitting");
    const result = await submitLead(data);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus({ error: result.error });
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-[var(--radius-md)] border border-teal/30 bg-teal-soft/60 p-8 text-center"
        aria-live="polite"
      >
        <CircleCheck className="mx-auto h-10 w-10 text-teal" aria-hidden="true" />
        <h3 className="mt-4 font-display text-subheading font-semibold text-ink">
          Đã nhận thông tin của bạn!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-small">
          Đội ngũ tư vấn sẽ liên hệ trong vòng 24 giờ. Nếu cần hỗ trợ ngay, hãy gọi hotline:
        </p>
        <a
          href={siteConfig.contact.phoneHref}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 text-small font-semibold text-paper hover:bg-ink-soft"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.contact.phone}
        </a>
        <div>
          <button
            type="button"
            onClick={() => {
              reset();
              setStep(0);
              setStatus("idle");
            }}
            className="mt-5 text-small font-semibold text-accent-strong underline underline-offset-4 hover:text-accent"
          >
            Gửi thêm yêu cầu khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid)}
      className="rounded-[var(--radius-md)] border border-line bg-surface p-6 shadow-soft lg:p-8"
    >
      <ol className="flex items-center gap-2" aria-label="Tiến độ biểu mẫu">
        {STEP_TITLES.map((title, index) => (
          <li key={title} className="flex-1" aria-current={index === step ? "step" : undefined}>
            <div
              className={cn(
                "h-1.5 rounded-full transition-colors duration-[var(--duration-base)]",
                index <= step ? "bg-accent" : "bg-line",
              )}
            />
            <p
              className={cn(
                "mt-1.5 hidden text-caption sm:block",
                index === step ? "font-semibold text-ink" : "text-muted",
              )}
            >
              {title}
            </p>
          </li>
        ))}
      </ol>

      {status !== "idle" && typeof status === "object" ? (
        <div
          role="alert"
          className="mt-5 rounded-[var(--radius-sm)] border border-[#c0392b]/40 bg-[#fdecea] p-4 text-small text-[#7a2318]"
        >
          {status.error}
        </div>
      ) : null}

      {/* step 1 — audience */}
      {step === 0 ? (
        <fieldset className="mt-6">
          <legend className="font-display text-subheading font-semibold text-ink">
            Bạn đăng ký cho ai?
          </legend>
          <div className="mt-4 grid gap-2.5">
            {audienceOptions.map((option) => (
              <ChipRadio
                key={option.value}
                name="audience"
                value={option.value}
                checked={audience === option.value}
                onChange={() => {
                  setValue("audience", option.value, { shouldValidate: true });
                  setValue("ageGroup", "");
                }}
                label={option.label}
                hint={option.hint}
              />
            ))}
          </div>
          <FieldError id="audience-error" message={errors.audience?.message} />
        </fieldset>
      ) : null}

      {/* step 2 — age group (dependent options) */}
      {step === 1 ? (
        <fieldset className="mt-6">
          <legend className="font-display text-subheading font-semibold text-ink">
            Độ tuổi / trình độ hiện tại?
          </legend>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {ageGroups.map((group) => (
              <ChipRadio
                key={group}
                name="ageGroup"
                value={group}
                checked={ageGroup === group}
                onChange={() => setValue("ageGroup", group, { shouldValidate: true })}
                label={group}
              />
            ))}
          </div>
          <FieldError id="ageGroup-error" message={errors.ageGroup?.message} />
        </fieldset>
      ) : null}

      {/* step 3 — goal */}
      {step === 2 ? (
        <fieldset className="mt-6">
          <legend className="font-display text-subheading font-semibold text-ink">
            Mục tiêu học của bạn?
          </legend>
          <div className="mt-4 grid gap-2.5">
            {goalOptions.map((option) => (
              <ChipRadio
                key={option.value}
                name="goal"
                value={option.value}
                checked={goal === option.value}
                onChange={() => setValue("goal", option.value, { shouldValidate: true })}
                label={option.label}
              />
            ))}
          </div>
          <FieldError id="goal-error" message={errors.goal?.message} />
        </fieldset>
      ) : null}

      {/* step 4 — format */}
      {step === 3 ? (
        <fieldset className="mt-6">
          <legend className="font-display text-subheading font-semibold text-ink">
            Hình thức học mong muốn?
          </legend>
          <div className="mt-4 grid gap-2.5">
            {formatOptions.map((option) => (
              <ChipRadio
                key={option.value}
                name="preferredFormat"
                value={option.value}
                checked={preferredFormat === option.value}
                onChange={() => setValue("preferredFormat", option.value, { shouldValidate: true })}
                label={option.label}
                hint={option.hint}
              />
            ))}
          </div>
          <FieldError id="preferredFormat-error" message={errors.preferredFormat?.message} />
        </fieldset>
      ) : null}

      {/* step 5 — contact details */}
      {step === 4 ? (
        <fieldset className="mt-6 space-y-4">
          <legend className="font-display text-subheading font-semibold text-ink">
            Thông tin để chúng tôi liên hệ
          </legend>
          <div>
            <label htmlFor="lead-name" className="mb-1.5 block text-small font-semibold text-ink">
              Họ và tên <span aria-hidden="true" className="text-accent">*</span>
            </label>
            <Input
              id="lead-name"
              autoComplete="name"
              placeholder="Nguyễn Văn A"
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
            <FieldError id="fullName-error" message={errors.fullName?.message} />
          </div>
          <div>
            <label htmlFor="lead-phone" className="mb-1.5 block text-small font-semibold text-ink">
              Số điện thoại <span aria-hidden="true" className="text-accent">*</span>
            </label>
            <Input
              id="lead-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0901 234 567"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
          <div>
            <label htmlFor="lead-email" className="mb-1.5 block text-small font-semibold text-ink">
              Email <span aria-hidden="true" className="text-accent">*</span>
            </label>
            <Input
              id="lead-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ban@email.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
          <div>
            <label htmlFor="lead-message" className="mb-1.5 block text-small font-semibold text-ink">
              Mô tả thêm (không bắt buộc)
            </label>
            <Textarea
              id="lead-message"
              placeholder="Mục tiêu cụ thể, thời gian có thể học, câu hỏi cho trung tâm…"
              {...register("message")}
            />
          </div>

          {/* honeypot — hidden from humans, catches bots (13-security) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="lead-website">Website</label>
            <input
              id="lead-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>
        </fieldset>
      ) : null}

      {/* navigation */}
      <div className="mt-7 flex items-center gap-3">
        {step > 0 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            aria-label="Quay lại bước trước"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Quay lại
          </Button>
        ) : null}
        {step < LAST_STEP ? (
          <Button type="button" onClick={next} className="flex-1 sm:flex-none">
            Tiếp tục
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="flex-1 sm:flex-none"
          >
            {status === "submitting" ? "Đang gửi…" : "Gửi thông tin nhận tư vấn"}
            {status !== "submitting" ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
          </Button>
        )}
      </div>

      <p className="mt-4 text-caption text-muted">
        Thông tin của bạn chỉ dùng để tư vấn lộ trình học — không chia sẻ cho bên thứ ba.
      </p>


    </form>
  );
}
