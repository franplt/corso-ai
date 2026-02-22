type RatingProps = { value: number; max?: number; color: string };

function Rating({ value, max = 5, color }: RatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-4 rounded-sm"
          style={{ background: i < value ? color : "var(--border)" }}
        />
      ))}
    </div>
  );
}

const PROPRIETARY = [
  { name: "GPT-4o", maker: "OpenAI", costo: 4, velocita: 4, privacy: 2, facilita: 5, note: "Il più usato, ottimo per tutto" },
  { name: "Claude 3.5", maker: "Anthropic", costo: 4, velocita: 4, privacy: 2, facilita: 5, note: "Eccellente per testi lunghi e codice" },
  { name: "Gemini 1.5", maker: "Google", costo: 4, velocita: 5, privacy: 2, facilita: 5, note: "Contesto enorme (1M token)" },
];

const OPEN_WEIGHT = [
  { name: "Llama 3.1 70B", maker: "Meta", costo: 5, velocita: 3, privacy: 5, facilita: 3, note: "Open-weight, deploy locale possibile" },
  { name: "Mistral Large", maker: "Mistral", costo: 5, velocita: 4, privacy: 5, facilita: 4, note: "Eccellente per il costo" },
  { name: "Qwen 2.5", maker: "Alibaba", costo: 5, velocita: 4, privacy: 5, facilita: 3, note: "Forte in lingue asiatiche e codice" },
];

type ModelRow = { name: string; maker: string; costo: number; velocita: number; privacy: number; facilita: number; note: string };

function ModelTable({ models, accentColor }: { models: ModelRow[]; accentColor: string }) {
  return (
    <div className="space-y-3">
      {models.map((m, i) => (
        <div
          key={i}
          className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-3"
        >
          <div className="mb-2 flex items-baseline justify-between">
            <div>
              <span className="text-sm font-bold text-[var(--ink)]">{m.name}</span>
              <span className="ml-1.5 text-xs text-[var(--ink-faint)]">({m.maker})</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {[
              { label: "Costo", value: m.costo },
              { label: "Velocità", value: m.velocita },
              { label: "Privacy", value: m.privacy },
              { label: "Facilità", value: m.facilita },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-14 shrink-0 text-[var(--ink-faint)]">{label}</span>
                <Rating value={value} color={accentColor} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--ink-muted)]">{m.note}</p>
        </div>
      ))}
    </div>
  );
}

export function ModelComparisonDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Panoramica dei principali modelli (2024–2025)</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
            Modelli proprietari
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">Via API — zero infrastruttura</p>
          <ModelTable models={PROPRIETARY} accentColor="#b45309" />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7c3aed]">
            Modelli open-weight
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">Scaricabili — deploy locale possibile</p>
          <ModelTable models={OPEN_WEIGHT} accentColor="#7c3aed" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: "💰", label: "Costo", desc: "5 = gratuito o molto economico" },
          { icon: "⚡", label: "Velocità", desc: "5 = risposte istantanee" },
          { icon: "🔒", label: "Privacy", desc: "5 = tutto resta in locale" },
          { icon: "🎯", label: "Facilità", desc: "5 = pronto all'uso via browser" },
        ].map(({ icon, label, desc }) => (
          <div key={label} className="rounded-[6px] bg-[var(--bg)] p-2 text-center">
            <p className="text-base">{icon}</p>
            <p className="text-xs font-semibold text-[var(--ink)]">{label}</p>
            <p className="text-[10px] text-[var(--ink-faint)]">{desc}</p>
          </div>
        ))}
      </div>

      <p className="diagram-caption">
        Non esiste il modello migliore — esiste quello giusto per il tuo caso d&apos;uso. Per la maggior parte degli usi personali o aziendali, GPT-4o o Claude 3.5 sono il punto di partenza più semplice.
      </p>
    </figure>
  );
}
