import { cn } from "@/lib/utils";

export type SectionTone = "base" | "soft" | "inverse";

const toneClasses: Record<SectionTone, string> = {
  base: "bg-paper",
  soft: "bg-surface border-y border-line",
  inverse: "bg-ink text-ink-soft [&_h2]:text-paper [&_h3]:text-paper",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  id?: string;
}

/** Section rhythm primitive — enforces token section spacing across the site. */
export function Section({ className, tone = "base", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 lg:py-28 scroll-mt-20",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
