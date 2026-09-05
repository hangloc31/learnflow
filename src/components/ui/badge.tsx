import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption uppercase tracking-[0.08em] font-semibold",
  {
    variants: {
      variant: {
        accent: "bg-accent-soft text-accent-strong",
        teal: "bg-teal-soft text-teal",
        gold: "bg-gold-soft text-[#8a5d14]",
        neutral: "bg-paper text-muted border border-line",
      },
    },
    defaultVariants: { variant: "accent" },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
