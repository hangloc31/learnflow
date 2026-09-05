import { cn } from "@/lib/utils";

export interface PlaceholderImageProps {
  label: string;
  tone?: "accent" | "teal" | "gold" | "ink";
  ratio?: string;
  className?: string;
}

const TONES = {
  accent: "bg-accent-soft",
  teal: "bg-teal-soft",
  gold: "bg-gold-soft",
  ink: "bg-ink text-paper",
} as const;

/**
 * Explicit, honest image slot (docs/asset-inventory.md).
 * TODO(assets): replace with <Image> + real photography per slot; label doubles as planned alt text.
 */
export function PlaceholderImage({
  label,
  tone = "accent",
  ratio = "aspect-[4/3]",
  className,
}: PlaceholderImageProps) {
  return (
    <figure
      role="img"
      aria-label={`Vị trí ảnh: ${label}`}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-line p-4 text-center",
        TONES[tone],
        ratio,
        className,
      )}
    >
      <figcaption className="text-small font-medium">{label}</figcaption>
    </figure>
  );
}
