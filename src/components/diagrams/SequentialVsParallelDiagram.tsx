const SENTENCE = ["Il", "gatto", "che", "dormiva", "sul", "divano", "è", "nero"];

export function SequentialVsParallelDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">RNN vs Transformer — come elaborano la stessa frase</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* RNN — Sequential */}
        <div className="rounded-[var(--radius)] border border-[#6b656040] bg-[#6b656006] p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
            RNN — Sequenziale
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">Una parola alla volta, in ordine</p>

          <div className="flex flex-wrap items-center gap-1">
            {SENTENCE.map((word, i) => (
              <div key={i} className="flex items-center gap-1">
                <div
                  className="rounded border border-[#6b656040] bg-[var(--bg)] px-2 py-1 text-xs font-mono text-[var(--ink-muted)]"
                  style={{ opacity: 0.4 + (i / SENTENCE.length) * 0.6 }}
                >
                  {word}
                </div>
                {i < SENTENCE.length - 1 && (
                  <span className="text-[9px] text-[var(--ink-faint)]">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-1">
            {SENTENCE.map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-4 text-right text-[9px] text-[var(--ink-faint)]">{i + 1}.</span>
                <div
                  className="h-2 rounded-full bg-[var(--ink-faint)]"
                  style={{ width: `${((i + 1) / SENTENCE.length) * 70}%`, opacity: 0.5 }}
                />
                <span className="text-[9px] text-[var(--ink-faint)]">step</span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-[6px] border border-dashed border-[#dc262640] bg-[#dc262606] p-2 text-center text-xs text-[#dc2626]">
            8 step sequenziali<br />Non parallelizzabile
          </div>
        </div>

        {/* Transformer — Parallel */}
        <div className="rounded-[var(--radius)] border border-[#05996940] bg-[#05996906] p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#059669]">
            Transformer — Parallelo
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">Tutte le parole insieme, in un solo step</p>

          <div className="flex flex-wrap gap-1">
            {SENTENCE.map((word, i) => (
              <div
                key={i}
                className="rounded border border-[#05996940] bg-[#05996912] px-2 py-1 text-xs font-mono font-semibold text-[#059669]"
              >
                {word}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-[#059669]" />
            <span className="text-[9px] text-[#059669] font-semibold">1 step parallelo</span>
          </div>

          <div className="mt-3 rounded-[6px] border border-dashed border-[#05996940] bg-[#05996910] p-2 text-center text-xs text-[#059669]">
            1 step (tutto in parallelo)<br />Sfrutta GPU al massimo
          </div>
        </div>
      </div>

      <p className="diagram-caption">
        Le RNN elaboravano una parola alla volta — lente e difficili da addestrare su sequenze lunghe. Il Transformer elabora tutte le parole insieme, sfruttando la GPU e riducendo i tempi di addestramento da mesi a giorni.
      </p>
    </figure>
  );
}
