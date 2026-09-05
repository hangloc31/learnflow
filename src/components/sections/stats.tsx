import { siteConfig } from "@/content/site";
import type { Statistic } from "@/types/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { CountUpStatistic } from "./count-up-statistic";

/**
 * Section 03 — trust/proof.
 * ⚠️ All statistics are PLACEHOLDER values (TODO(content)) — the draft marker below
 * must stay until real numbers are verified.
 */
export function Stats({ statistics }: { statistics: Statistic[] }) {
  return (
    <Section tone="inverse" className="py-12 lg:py-16" aria-label="Thành tựu nổi bật (dữ liệu mẫu)">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-hero font-semibold text-paper">
              Con số biết nói
            </p>
            <p className="mt-2 text-small text-paper/60">
              Cập nhật khi có số liệu chính thức.
            </p>
          </div>
          <dl className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:max-w-2xl lg:grid-cols-5">
            {statistics.map((stat) => (
              <div key={stat.id}>
                <dd className="font-display text-section font-semibold text-gold">
                  <CountUpStatistic statistic={stat} />
                </dd>
                <dt className="mt-1 text-small text-paper/70">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 text-caption uppercase text-paper/40">
          Số liệu mẫu — {siteConfig.name} chờ xác minh trước khi công bố.
        </p>
      </Container>
    </Section>
  );
}
