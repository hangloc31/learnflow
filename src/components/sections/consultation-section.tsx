import { CircleCheck, Phone } from "lucide-react";
import type { LeadType } from "@/lib/leads/schema";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ConsultationForm } from "@/components/forms/consultation-form";

const NEXT_STEPS = [
  "Tư vấn viên gọi lại trong 24 giờ (Thứ 2 – Thứ 7, giờ hành chính)",
  "Kiểm tra trình độ miễn phí cho bé — 20 phút",
  "Nhận lớp vừa sức kèm học phí rõ ràng theo lộ trình",
] as const;

export interface ConsultationSectionProps {
  leadType?: LeadType;
  sourcePage: string;
  title?: string;
  description?: string;
  /** pre-fills "program of interest" in the form (e.g. program detail pages) */
  programInterest?: string;
}


/**
 * Conversion section — pairs the form with a "what happens next" contract.
 * Placed at the end of the homepage (and on /trial, /placement-test, /contact).
 */
export function ConsultationSection({
  leadType = "consultation",
  sourcePage,
  title = "Nhận kết quả test và lộ trình cho con",
  description = "3 bước khoảng 1 phút — chúng tôi gọi lại, test 20 phút rồi đề xuất lớp vừa sức nhất.",
}: ConsultationSectionProps) {
  return (
    <Section tone="soft" aria-labelledby="consultation-title" id="consultation" className="lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:pt-4">
            <h2 id="consultation-title" className="text-section font-semibold text-ink">
              {title}
            </h2>
            <p className="mt-4 max-w-prose text-body">{description}</p>

            <ul className="mt-8 space-y-4">
              {NEXT_STEPS.map((item, index) => (
                <li key={item} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-soft text-caption font-bold text-teal" aria-hidden="true">
                    {index + 1}
                  </span>
                  <p className="text-small text-ink-soft">{item}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[var(--radius-md)] border border-line bg-surface p-5">
              <p className="text-small font-semibold text-ink">Cần tư vấn ngay?</p>
              <a
                href={siteConfig.contact.phoneHref}
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-small font-semibold text-accent-strong hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phone} · {siteConfig.ctas.consultation.toLowerCase()}
              </a>
              <p className="mt-1 flex items-center gap-1.5 text-caption text-muted">
                <CircleCheck className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
                Không áp lực đăng ký — tư vấn là miễn phí
              </p>
            </div>
          </div>

          <ConsultationForm leadType={leadType} sourcePage={sourcePage} />
        </div>
      </Container>
    </Section>
  );
}
