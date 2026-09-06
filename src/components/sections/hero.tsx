import { ArrowRight, ClipboardCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroVisual } from "./hero-visual";

const TRUST_MARKERS = ["Test đầu vào miễn phí 20 phút", "Lớp tối đa 12 học viên", "Báo cáo tiến bộ định kỳ"] as const;

/**
 * Section 01 — Hero. Answers: what / for whom / why care / next step (docs/ux-principles.md).
 * Story-first for parents of kids 4–15; one primary CTA (placement test).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <Badge variant="accent">Dành cho bé 4–15 tuổi · Theo chuẩn Cambridge</Badge>
          <h1 id="hero-title" className="mt-5 text-display font-semibold">
            Biết đúng trình độ của con{" "}
            <span className="font-display italic text-accent">sau 20 phút</span> —{" "}
            <span className="underline decoration-gold decoration-4 underline-offset-8">
              miễn phí
            </span>
          </h1>
          <p className="mt-6 text-subheading text-ink-soft">
            Bài kiểm tra ngắn theo chuẩn Cambridge YLE cho biết con đang ở đâu, điểm mạnh
            và điểm cần cải thiện — để xếp đúng lớp vừa sức, thay vì học mò.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/placement-test" size="lg">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              {siteConfig.ctas.placementTest} miễn phí
            </ButtonLink>
            <ButtonLink href="#lo-trinh" variant="ghost" size="lg">
              Xem lộ trình mẫu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <p className="mt-4 text-small text-muted">
            Chưa chắc chắn?{" "}
            <a href="/trial" className="font-semibold text-accent-strong underline underline-offset-4 hover:text-accent">
              {siteConfig.ctas.trial}
            </a>{" "}
            sau khi có kết quả test.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2" aria-label="Cam kết của trung tâm">
            {TRUST_MARKERS.map((marker) => (
              <li key={marker} className="flex items-center gap-2 text-small text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                {marker}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
