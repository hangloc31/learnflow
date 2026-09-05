"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Faq } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site";

/**
 * Section 13 — FAQ. Radix Accordion (keyboard-safe, animated height only).
 * Placeholder answers are visible as-is; TODO(content) lives in the content module.
 */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <Section tone="base" aria-labelledby="faq-title">
      <Container className="max-w-3xl">
        <SectionHeading
          id="faq-title"
          align="center"
          eyebrow="Câu hỏi thường gặp"
          title="Những điều phụ huynh hay hỏi"
          description="Chưa thấy câu trả lời phù hợp? Gọi cho chúng tôi — tư vấn là miễn phí."
        />

        <Accordion.Root type="single" collapsible className="mt-10">
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="border-b border-line"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left">
                  <span className="font-display text-body font-semibold text-ink">
                    {faq.question}
                  </span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-[var(--duration-base)] group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </Accordion.Trigger>
                {faq.placeholder ? (
                  <span className="block pb-1 text-caption text-muted">
                    TODO(content): câu trả lời đang chờ trung tâm xác nhận
                  </span>
                ) : null}
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_var(--duration-base)_var(--ease-out-expo)] data-[state=closed]:animate-[accordion-up_var(--duration-base)_var(--ease-out-expo)]">
                <p className="pb-5 pr-10 text-small">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-small text-muted">Vẫn còn thắc mắc?</p>
          {/* TODO(content): swap contact CTA copy with verified support-channel wording */}
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-6 text-small font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {siteConfig.ctas.contact} — {siteConfig.ctas.consultation.toLowerCase()}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
