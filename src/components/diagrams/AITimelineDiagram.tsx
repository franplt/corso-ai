const EVENTS = [
  { year: 2012, label: "AlexNet vince ImageNet", category: "compute", note: "GPU per deep learning" },
  { year: 2014, label: "GAN inventate da Goodfellow", category: "arch", note: "Prima architettura generativa" },
  { year: 2016, label: "AlphaGo batte il campione mondiale", category: "milestone", note: "Go: 10^170 possibilità" },
  { year: 2017, label: "\"Attention is All You Need\"", category: "arch", note: "Nasce il Transformer" },
  { year: 2018, label: "BERT e GPT-1", category: "arch", note: "Modelli pre-addestrati su testo" },
  { year: 2019, label: "GPT-2 — \"troppo pericoloso\"", category: "scale", note: "1.5B parametri" },
  { year: 2020, label: "GPT-3 — 175B parametri", category: "scale", note: "Emergono capacità inattese" },
  { year: 2022, label: "ChatGPT — 100M utenti in 60 gg", category: "milestone", note: "Più veloce di qualunque prodotto nella storia" },
  { year: 2023, label: "GPT-4, Llama, Claude, Gemini", category: "scale", note: "Esplosione di modelli" },
];

const CATEGORY_STYLE: Record<string, { dot: string; label: string }> = {
  compute:   { dot: "#0284c7", label: "Calcolo" },
  arch:      { dot: "#7c3aed", label: "Architettura" },
  scale:     { dot: "#059669", label: "Scala" },
  milestone: { dot: "#b45309", label: "Traguardo" },
};

export function AITimelineDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">La tempesta perfetta: come siamo arrivati all&apos;AI di oggi</p>

      {/* Legend */}
      <div className="mb-5 flex flex-wrap gap-3">
        {Object.entries(CATEGORY_STYLE).map(([key, s]) => (
          <span key={key} className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: s.dot }}
            />
            {s.label}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[54px] top-0 h-full w-px sm:left-[62px]"
          style={{ background: "var(--border)" }}
        />

        <ol className="space-y-4">
          {EVENTS.map((ev, i) => {
            const style = CATEGORY_STYLE[ev.category];
            return (
              <li key={i} className="flex items-start gap-4">
                {/* Year */}
                <span className="w-12 shrink-0 pt-0.5 text-right font-mono text-xs font-bold text-[var(--ink-faint)] sm:w-14">
                  {ev.year}
                </span>
                {/* Dot */}
                <span
                  className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-[var(--bg-elevated)]"
                  style={{ background: style.dot, boxShadow: `0 0 0 2px ${style.dot}40` }}
                />
                {/* Text */}
                <div className="pb-1">
                  <p className="text-sm font-semibold leading-tight text-[var(--ink)]">{ev.label}</p>
                  <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{ev.note}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="diagram-caption">
        Tre forze si sono allineate tra il 2017 e il 2023: potenza di calcolo (GPU), dati (internet), e una nuova architettura (Transformer). Nessuna da sola sarebbe bastata.
      </p>
    </figure>
  );
}
