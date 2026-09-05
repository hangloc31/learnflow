import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** narrow: article/list content (max 60ch-ish); default: full token container */
  width?: "default" | "narrow";
}

export function Container({ className, width = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-8",
        width === "default" ? "max-w-[var(--container-max)]" : "max-w-3xl",
        className,
      )}
      {...props}
    />
  );
}
