import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Shared inner-page hero band — consistent editorial header across routes. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="py-14 lg:py-20">
        <div className="max-w-2xl">
          {eyebrow ? <Badge variant="accent">{eyebrow}</Badge> : null}
          <h1 className="mt-4 text-section font-semibold text-ink lg:text-hero lg:leading-[1.08]">
            {title}
          </h1>
          {description ? <p className="mt-4 text-body text-ink-soft">{description}</p> : null}
        </div>
      </Container>
    </header>
  );
}
