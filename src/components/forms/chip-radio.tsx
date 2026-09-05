import { cn } from "@/lib/utils";

/** Radio rendered as a selectable card — shared by consultation and placement forms. */
export function ChipRadio(p: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <label
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 transition-colors duration-[var(--duration-fast)]",
        p.checked ? "border-accent bg-accent-soft/70" : "border-line bg-surface hover:border-accent/50",
      )}
    >
      <input
        type="radio"
        name={p.name}
        value={p.value}
        checked={p.checked}
        onChange={p.onChange}
        className="h-4 w-4 accent-[var(--color-accent)]"
      />
      <span>
        <span className="block text-small font-semibold text-ink">{p.label}</span>
        {p.hint ? <span className="mt-0.5 block text-caption text-muted">{p.hint}</span> : null}
      </span>
    </label>
  );
}

/** Inline validation message — wire with aria-describedby on the control. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-1.5 text-small text-[#c0392b]">{message}</p>;
}
