import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // base — pill radius, 44px min touch target, token-only styling
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold " +
    "min-h-11 whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] " +
    "duration-[var(--duration-fast)] ease-[var(--ease-out-expo)] " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
    "disabled:pointer-events-none disabled:opacity-55 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-deep text-white hover:bg-accent-strong shadow-soft hover:shadow-lift",
        secondary:
          "bg-ink text-paper hover:bg-ink-soft shadow-soft",
        ghost:
          "bg-transparent text-ink border border-line hover:border-accent hover:text-accent bg-surface/60",
      },
      size: {
        sm: "px-4 py-2 text-small",
        md: "px-6 py-2.5 text-body",
        lg: "px-8 py-3 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonVariantProps {}

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
