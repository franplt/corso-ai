const CHUNKS = [
  {
    id: 1,
    text: "L'intelligenza artificiale sta trasformando ogni settore. Dal 2022, l'adozione aziendale è cresciuta del 300%. Le aziende che non si adattano rischiano di rimanere indietro...",
    start: 0,
    end: 512,
    overlap: false,
  },
  {
    id: 2,
    text: "...rischiano di rimanere indietro rispetto ai competitor. Il costo medio di implementazione è sceso dell'80% negli ultimi tre anni. La vera sfida oggi è la qualità dei dati...",
    start: 384,
    end: 896,
    overlap: true,
  },
  {
    id: 3,
    text: "...La vera sfida oggi è la qualità dei dati e la governance. Senza dati puliti, nessun modello può dare risultati affidabili. Le best practice includono pipeline di validazione...",
    start: 768,
    end: 1280,
    overlap: true,
  },
  {
    id: 4,
    text: "...pipeline di validazione, monitoring e human-in-the-loop review. Il futuro appartiene alle organizzazioni che trattano i dati come asset strategici.",
    start: 1152,
    end: 1400,
    overlap: true,
  },
];

const COLORS = [
  { bg: "#fff3e0", border: "#f59e0b", text: "#b45309" },
  { bg: "#e0f2fe", border: "#38bdf8", text: "#0284c7" },
  { bg: "#f3e8ff", border: "#a78bfa", text: "#7c3aed" },
  { bg: "#d1fae5", border: "#34d399", text: "#059669" },
];

export function ChunkingDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Chunking — come un documento viene suddiviso per RAG</p>

      {/* Document bar */}
      <div className="mb-4">
        <p className="mb-1.5 text-xs text-[var(--ink-faint)]">Documento originale (1400 token)</p>
        <div className="relative h-6 overflow-hidden rounded-full bg-[var(--border)]">
          {CHUNKS.map((chunk, i) => {
            const maxLen = 1400;
            const left = (chunk.start / maxLen) * 100;
            const width = ((chunk.end - chunk.start) / maxLen) * 100;
            const c = COLORS[i];
            return (
              <div
                key={i}
                className="absolute inset-y-0 rounded-full border-2"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  background: c.bg,
                  borderColor: c.border,
                  opacity: 0.85,
                }}
              />
            );
          })}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-[var(--ink-faint)]">
          <span>0</span>
          <span>700</span>
          <span>1400</span>
        </div>
      </div>

      {/* Chunks */}
      <div className="space-y-2">
        {CHUNKS.map((chunk, i) => {
          const c = COLORS[i];
          return (
            <div
              key={i}
              className="rounded-[var(--radius)] border p-3"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: c.text }}
                >
                  Chunk {chunk.id} — token {chunk.start}–{chunk.end}
                </span>
                {chunk.overlap && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ background: c.border + "40", color: c.text }}
                  >
                    overlap
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-[var(--ink-muted)] line-clamp-2">
                {chunk.text}
              </p>
            </div>
          );
        })}
      </div>

      <p className="diagram-caption">
        I chunk si sovrappongono di ~128 token (&quot;overlap&quot;) per evitare che un&apos;informazione a cavallo di due chunk vada persa. La dimensione del chunk (512 token ≈ 1-2 paragrafi) è un compromesso: troppo piccolo perde contesto, troppo grande perde precisione nella ricerca.
      </p>
    </figure>
  );
}
