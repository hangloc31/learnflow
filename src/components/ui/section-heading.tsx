import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  id?: string;
}

/**
 * The only way sections render headings (03-ui-ux). Guarantees hierarchy,
 * eyebrow style and inverse-tone mapping.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Badge variant={tone === "inverse" ? "neutral" : "accent"} className="mb-4">
          {eyebrow}
        </Badge>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-section font-semibold",
          tone === "inverse" && "text-paper",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-body max-w-prose",
            align === "center" && "mx-auto",
            tone === "inverse" && "text-paper/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
