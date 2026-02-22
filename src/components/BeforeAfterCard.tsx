type Side = {
  label: string;
  items: string[];
  color?: string;
};

type BeforeAfterCardProps = {
  title?: string;
  before: Side;
  after: Side;
  caption?: string;
};

const DEFAULT_BEFORE_COLOR = "#6b6560";
const DEFAULT_AFTER_COLOR = "#059669";

export function BeforeAfterCard({ title, before, after, caption }: BeforeAfterCardProps) {
  const beforeColor = before.color ?? DEFAULT_BEFORE_COLOR;
  const afterColor = after.color ?? DEFAULT_AFTER_COLOR;

  return (
    <figure className="diagram-card my-8">
      {title && <p className="diagram-label">{title}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Before */}
        <div
          className="rounded-[var(--radius)] border p-4"
          style={{ borderColor: beforeColor + "40", background: beforeColor + "08" }}
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: beforeColor }}
          >
            {before.label}
          </p>
          <ul className="space-y-2">
            {before.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-snug text-[var(--ink)]">
                <span className="mt-1 shrink-0 text-[10px]" style={{ color: beforeColor }}>●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div
          className="rounded-[var(--radius)] border p-4"
          style={{ borderColor: afterColor + "40", background: afterColor + "08" }}
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: afterColor }}
          >
            {after.label}
          </p>
          <ul className="space-y-2">
            {after.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-snug text-[var(--ink)]">
                <span className="mt-1 shrink-0 text-[10px]" style={{ color: afterColor }}>●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {caption && <p className="diagram-caption">{caption}</p>}
    </figure>
  );
}
