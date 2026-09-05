import { ArrowRight, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroVisual } from "./hero-visual";

const TRUST_MARKERS = ["Lộ trình cá nhân hóa", "Lớp tối đa 12 học viên", "Cambridge YLE → IELTS"] as const;

/**
 * Section 01 — Hero. Answers: what / for whom / why care / next step (docs/ux-principles.md).
 * One primary CTA + one secondary; trust markers inline.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <Badge variant="accent">Trung tâm tiếng Anh hiện đại</Badge>
          <h1 id="hero-title" className="mt-5 text-display font-semibold">
            Nói tiếng Anh{" "}
            <span className="font-display italic text-accent">tự tin</span>, theo lộ trình{" "}
            <span className="underline decoration-gold decoration-4 underline-offset-8">
              của riêng bạn
            </span>
          </h1>
          <p className="mt-6 text-subheading text-ink-soft">
            Từ bé 4 tuổi đến người lớn đi làm — lớp học nhỏ, giáo viên tâm huyết và lộ trình
            được thiết kế theo mục tiêu của từng học viên.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/programs" size="lg">
              {siteConfig.ctas.explorePrograms}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/trial" variant="ghost" size="lg">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              {siteConfig.ctas.trial}
            </ButtonLink>
          </div>

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
