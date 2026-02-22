export function RagPipelineDiagram() {
  const steps = [
    {
      icon: "❓",
      label: "Domanda",
      description: "L'utente pone una domanda",
      color: "#0284c7",
      bg: "#e0f2fe",
    },
    {
      icon: "🔍",
      label: "Ricerca",
      description: "La domanda viene convertita in embedding e cercata nel database",
      color: "#7c3aed",
      bg: "#f3e8ff",
    },
    {
      icon: "📄",
      label: "Recupero",
      description: "I documenti più rilevanti vengono estratti",
      color: "#059669",
      bg: "#d1fae5",
    },
    {
      icon: "🧩",
      label: "Contesto",
      description: "I documenti vengono aggiunti al prompt del modello",
      color: "#b45309",
      bg: "#fff7ed",
    },
    {
      icon: "💬",
      label: "Risposta",
      description: "Il modello genera una risposta basata sui documenti recuperati",
      color: "#dc2626",
      bg: "#fef2f2",
    },
  ];

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Il pipeline RAG (Retrieval-Augmented Generation)</p>

      {/* Mobile: vertical flow */}
      <div className="flex flex-col gap-2 sm:hidden">
        {steps.map((step, i) => (
          <div key={step.label}>
            <div
              className="rounded-[var(--radius)] p-3 flex items-start gap-3"
              style={{ background: step.bg }}
            >
              <span className="text-xl">{step.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: step.color }}>
                  {step.label}
                </p>
                <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{step.description}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1 text-[var(--ink-faint)] text-sm">↓</div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: horizontal flow */}
      <div className="hidden sm:flex items-stretch gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div
              className="flex flex-1 flex-col items-center rounded-[var(--radius)] p-3 text-center"
              style={{ background: step.bg, minWidth: "88px" }}
            >
              <span className="text-2xl mb-1">{step.icon}</span>
              <p className="text-xs font-bold mb-1" style={{ color: step.color }}>
                {step.label}
              </p>
              <p className="text-[10px] text-[var(--ink-muted)] leading-snug">
                {step.description}
              </p>
            </div>
            {i < steps.length - 1 && (
              <span className="mx-1 text-[var(--ink-faint)] text-sm shrink-0">→</span>
            )}
          </div>
        ))}
      </div>

      <p className="diagram-caption">
        La chiave del RAG: il modello non ha bisogno di &quot;memorizzare&quot; i tuoi dati. Li legge al momento della risposta, proprio come farebbe un umano con i propri appunti.
      </p>
    </figure>
  );
}
