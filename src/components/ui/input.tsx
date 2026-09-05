import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-[var(--radius-sm)] border border-line bg-surface px-4 py-3 text-body " +
  "text-ink placeholder:text-muted/70 transition-colors duration-[var(--duration-fast)] " +
  "focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent " +
  "aria-[invalid=true]:border-[#c0392b]";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(fieldClasses, "min-h-11", className)} {...props} />;
  },
);

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} rows={4} className={cn(fieldClasses, className)} {...props} />;
  },
);

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(fieldClasses, "min-h-11 appearance-none pr-10", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7a8c' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
        }}
        {...props}
      />
    );
  },
);

