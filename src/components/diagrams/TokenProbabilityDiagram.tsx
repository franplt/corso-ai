const PROMPT = "Il gatto salta sul…";

const TOKENS = [
  { token: "divano", prob: 0.41, color: "#b45309" },
  { token: "tavolo", prob: 0.24, color: "#0284c7" },
  { token: "letto", prob: 0.16, color: "#7c3aed" },
  { token: "pavimento", prob: 0.09, color: "#059669" },
  { token: "frigorifero", prob: 0.04, color: "#6b6560" },
  { token: "tetto", prob: 0.03, color: "#9c9590" },
  { token: "…altri", prob: 0.03, color: "#c8c4c0" },
];

export function TokenProbabilityDiagram() {
  const maxProb = TOKENS[0].prob;

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Distribuzione di probabilità — quale parola viene dopo?</p>

      <div className="mb-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5">
        <span className="text-xs text-[var(--ink-faint)]">Prompt: </span>
        <span className="font-mono text-sm font-semibold text-[var(--ink)]">{PROMPT}</span>
        <span className="animate-pulse font-mono text-sm font-bold text-[var(--accent)]"> ▌</span>
      </div>

      <div className="space-y-2">
        {TOKENS.map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-right font-mono text-sm font-semibold text-[var(--ink)]">
              {t.token}
            </span>
            <div className="flex-1">
              <div className="relative h-5 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all"
                  style={{
                    width: `${(t.prob / maxProb) * 100}%`,
                    background: t.color,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
            <span
              className="w-10 text-right font-mono text-xs font-bold"
              style={{ color: t.color }}
            >
              {Math.round(t.prob * 100)}%
            </span>
          </div>
        ))}
      </div>

      <p className="diagram-caption">
        Il modello non &quot;decide&quot; la parola — calcola la probabilità di ogni possibile continuazione. Con temperatura bassa, sceglie quasi sempre la più probabile (&quot;divano&quot;). Con temperatura alta, può scegliere anche &quot;frigorifero&quot; — per sorprendere o sbagliare.
      </p>
    </figure>
  );
}
