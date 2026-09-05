import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 14 — final CTA: emotional close + functional next steps.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink" aria-labelledby="final-cta-title">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
      <Container className="relative py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-caption font-semibold uppercase text-gold">
            Bước tiếp theo
          </p>
          <h2 id="final-cta-title" className="mt-4 text-hero font-semibold text-paper">
            Hãy tìm hành trình tiếng Anh{" "}
            <span className="font-display italic text-gold">phù hợp</span> — cho riêng bạn
          </h2>
          <p className="mt-5 max-w-xl text-body text-paper/75">
            Đặt lịch tư vấn miễn phí: chúng tôi sẽ kiểm tra trình độ, lắng nghe mục tiêu và
            đề xuất lộ trình — không áp lực đăng ký.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/trial" size="lg" className="ring-1 ring-accent">
              {siteConfig.ctas.trial}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={siteConfig.contact.phoneHref} variant="ghost" size="lg" className="border-paper/30 bg-transparent text-paper hover:border-gold hover:text-gold">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contact.phone}
            </ButtonLink>
          </div>

          <p className="mt-6 text-small text-paper/50">
            Hoặc <a href="/placement-test" className="underline underline-offset-4 hover:text-paper">kiểm tra trình độ online</a> —
            mất 20 phút, miễn phí.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
