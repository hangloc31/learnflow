import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-[var(--radius-md)] bg-surface", {
  variants: {
    variant: {
      flat: "border border-line",
      raised: "border border-line shadow-soft",
      interactive:
        "border border-line shadow-soft transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift hover:border-accent/40",
    },
  },
  defaultVariants: { variant: "flat" },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 lg:p-7", className)} {...props} />;
}
