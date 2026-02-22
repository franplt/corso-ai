const SCALES = [
  {
    params: "1M",
    model: "Filtro antispam",
    example: "Classifica email in spam/non-spam",
    bar: 4,
    color: "#9c9590",
  },
  {
    params: "100M",
    model: "BERT (2018)",
    example: "Comprende il senso di frasi, risponde a domande semplici",
    bar: 20,
    color: "#0284c7",
  },
  {
    params: "7B",
    model: "Llama 3.1 (7B)",
    example: "Assistente base, traduzione, riassunti — gira su un laptop",
    bar: 40,
    color: "#7c3aed",
  },
  {
    params: "70B",
    model: "Llama 3.1 (70B)",
    example: "Ragionamento complesso, codice, analisi avanzata",
    bar: 62,
    color: "#059669",
  },
  {
    params: "175B",
    model: "GPT-3 (2020)",
    example: "Scrive romanzi, traduce lingue rare, emergono abilità inattese",
    bar: 80,
    color: "#b45309",
  },
  {
    params: "1T+",
    model: "GPT-4 / Gemini",
    example: "Ragionamento multi-step, comprensione visiva, coding professionale",
    bar: 100,
    color: "#dc2626",
  },
];

export function ParameterScaleDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">La scala dei parametri — cosa cambia al crescere del modello</p>

      <div className="space-y-3">
        {SCALES.map((s, i) => (
          <div key={i}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span
                  className="w-10 shrink-0 font-mono text-xs font-bold"
                  style={{ color: s.color }}
                >
                  {s.params}
                </span>
                <span className="text-sm font-semibold text-[var(--ink)]">{s.model}</span>
              </div>
            </div>
            <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${s.bar}%`, background: s.color }}
              />
            </div>
            <p className="text-xs text-[var(--ink-muted)]">{s.example}</p>
          </div>
        ))}
      </div>

      <p className="diagram-caption">
        La scala non è lineare — raddoppiare i parametri non raddoppia le capacità. Oltre certi threshold emergono abilità completamente nuove che nessuno aveva programmato.
      </p>
    </figure>
  );
}
