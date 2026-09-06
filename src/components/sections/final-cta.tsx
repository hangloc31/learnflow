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
            Bước tiếp theo — giữ chỗ test miễn phí
          </p>
          <h2 id="final-cta-title" className="mt-4 text-hero font-semibold text-paper">
            Sau 20 phút, ba mẹ biết{" "}
            <span className="font-display italic text-gold">chính xác con cần gì</span>
          </h2>
          <p className="mt-5 max-w-xl text-body text-paper/75">
            Test miễn phí cho bé 4–15 tuổi, nhận lớp vừa sức và học phí rõ ràng — không
            cần đăng ký trước, không áp lực.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/placement-test" size="lg" className="ring-1 ring-accent">
              {siteConfig.ctas.placementTest} miễn phí
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#consultation" variant="ghost" size="lg" className="border-paper/30 bg-transparent text-paper hover:border-gold hover:text-gold">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Để lại SĐT — gọi lại T2–T7
            </ButtonLink>
          </div>

          <p className="mt-6 text-small text-paper/50">
            Mỗi tuần có 20 suất test miễn phí —{" "}
            <a href="/placement-test" className="underline underline-offset-4 hover:text-paper">giữ chỗ 1 phút</a>.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
