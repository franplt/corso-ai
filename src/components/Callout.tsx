type CalloutVariant = "lo-sapevi" | "nella-pratica" | "attenzione" | "da-sapere";

const VARIANTS: Record<
  CalloutVariant,
  { icon: string; label: string; borderColor: string; bgColor: string; iconColor: string }
> = {
  "lo-sapevi": {
    icon: "💡",
    label: "Lo sapevi?",
    borderColor: "#0284c7",
    bgColor: "#e0f2fe",
    iconColor: "#0284c7",
  },
  "nella-pratica": {
    icon: "⚙️",
    label: "Nella pratica",
    borderColor: "#059669",
    bgColor: "#d1fae5",
    iconColor: "#059669",
  },
  attenzione: {
    icon: "⚠️",
    label: "Attenzione",
    borderColor: "#b45309",
    bgColor: "#fef3c7",
    iconColor: "#b45309",
  },
  "da-sapere": {
    icon: "📌",
    label: "Da sapere",
    borderColor: "#7c3aed",
    bgColor: "#f3e8ff",
    iconColor: "#7c3aed",
  },
};

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
};

export function Callout({ variant = "lo-sapevi", title, children }: CalloutProps) {
  const v = VARIANTS[variant];
  return (
    <aside
      className="my-8 rounded-[var(--radius)] p-4"
      style={{
        borderLeft: `4px solid ${v.borderColor}`,
        background: v.bgColor,
      }}
    >
      <p
        className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest"
        style={{ color: v.iconColor }}
      >
        <span role="img" aria-hidden="true">{v.icon}</span>
        {title ?? v.label}
      </p>
      <div className="prose-sm text-sm leading-relaxed text-[var(--ink)]">{children}</div>
    </aside>
  );
}
