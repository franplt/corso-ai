const STEPS = [
  { num: 1, title: "Perché adesso?", desc: "Il contesto storico e la tempesta perfetta", current: true },
  { num: 2, title: "Cos'è un modello", desc: "Come le macchine imparano dai dati" },
  { num: 3, title: "Dai dati ai token", desc: "Il linguaggio segreto dei modelli" },
  { num: 4, title: "Embedding e significati", desc: "Come l'AI rappresenta il senso" },
  { num: 5, title: "Dentro il Transformer", desc: "L'architettura che ha cambiato tutto" },
  { num: 6, title: "Come si allena un modello", desc: "Miliardi di parametri e trilioni di dati" },
  { num: 7, title: "Come genera testo", desc: "Probabilità, temperatura e auto-regressione" },
  { num: 8, title: "RAG e tools", desc: "Oltre la conoscenza interna" },
  { num: 9, title: "Agenti AI", desc: "Dall'assistente all'autonomia" },
  { num: 10, title: "Scegliere il modello", desc: "Mappa pratica per ogni uso" },
];

export function CourseRoadmapDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Il percorso del corso — 10 puntate</p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-[var(--radius)] border p-3 transition-colors"
            style={{
              borderColor: step.current ? "var(--accent)" : "var(--border)",
              background: step.current ? "var(--accent-muted)" : "var(--bg)",
            }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: step.current ? "var(--accent)" : "var(--border)",
                color: step.current ? "#fff" : "var(--ink-muted)",
              }}
            >
              {step.num}
            </span>
            <div>
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: step.current ? "var(--accent)" : "var(--ink)" }}
              >
                {step.title}
              </p>
              <p className="text-xs text-[var(--ink-muted)]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="diagram-caption">
        Ogni puntata costruisce sulla precedente. Non servono prerequisiti tecnici — solo curiosità.
      </p>
    </figure>
  );
}
