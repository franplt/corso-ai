export function TrainingPhasesDiagram() {
  const phases = [
    {
      number: "01",
      name: "Pre-training",
      subtitle: "Apprendimento non supervisionato",
      description: "Il modello legge miliardi di pagine di testo e impara a predire il token successivo.",
      scale: "~1 trilione di token · mesi di GPU",
      color: "#0284c7",
      bg: "#e0f2fe",
    },
    {
      number: "02",
      name: "Fine-tuning",
      subtitle: "Apprendimento supervisionato",
      description: "Il modello viene addestrato su esempi di conversazione curati dagli umani per imparare a rispondere.",
      scale: "Migliaia di esempi · giorni di GPU",
      color: "#7c3aed",
      bg: "#f3e8ff",
    },
    {
      number: "03",
      name: "RLHF",
      subtitle: "Rinforzo da feedback umano",
      description: "I valutatori umani classificano le risposte. Il modello impara a preferire quelle più utili e sicure.",
      scale: "Feedback continuo · cicli iterativi",
      color: "#b45309",
      bg: "#fff7ed",
    },
  ];

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Le tre fasi di addestramento di un LLM</p>
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-5 top-6 bottom-6 w-px bg-[var(--border)] sm:hidden" />

        <div className="grid gap-0 sm:grid-cols-3">
          {phases.map((phase, i) => (
            <div key={phase.name} className="relative flex sm:flex-col">
              {/* Connector arrow between phases (desktop) */}
              {i < phases.length - 1 && (
                <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 sm:flex">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--border)] text-xs text-[var(--ink-muted)]">
                    →
                  </span>
                </div>
              )}
              <div
                className="m-2 flex-1 rounded-[var(--radius)] p-4"
                style={{ background: phase.bg }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="font-heading text-lg font-bold"
                    style={{ color: phase.color }}
                  >
                    {phase.number}
                  </span>
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: phase.color }}
                  >
                    {phase.name}
                  </span>
                </div>
                <p className="mb-1 text-xs font-medium text-[var(--ink-muted)]">
                  {phase.subtitle}
                </p>
                <p className="mb-3 text-sm leading-relaxed text-[var(--ink)]">
                  {phase.description}
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: phase.color, opacity: 0.8 }}
                >
                  {phase.scale}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="diagram-caption">
        Il pre-training richiede risorse enormi (solo le big tech possono farlo). Fine-tuning e RLHF sono accessibili: molte aziende partono da un modello base e lo specializzano.
      </p>
    </figure>
  );
}
