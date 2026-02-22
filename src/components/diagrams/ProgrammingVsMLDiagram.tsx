export function ProgrammingVsMLDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Programmazione tradizionale vs Machine Learning</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Traditional */}
        <div className="rounded-[var(--radius)] border border-[#6b656040] bg-[#6b656008] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
            Programmazione tradizionale
          </p>
          <div className="space-y-2">
            {[
              { icon: "👤", text: "Umano scrive le regole" },
              { icon: "📋", text: "Regole → programma" },
              { icon: "📥", text: "Input (dati)" },
              { icon: "📤", text: "Output (risultato)" },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="ml-3 text-xs text-[var(--ink-faint)]">↓</span>
                )}
                {i === 0 && <span className="text-base">{icon}</span>}
                {i > 0 && <span className="text-base">{icon}</span>}
                <span className="text-sm text-[var(--ink)]">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[6px] border border-dashed border-[#dc262640] bg-[#dc262608] p-2 text-center text-xs text-[#dc2626]">
            Problema: le regole per lo spam<br />sono infinite e cambiano sempre
          </div>
        </div>

        {/* ML */}
        <div className="rounded-[var(--radius)] border border-[#05996940] bg-[#05996908] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">
            Machine Learning
          </p>
          <div className="space-y-2">
            {[
              { icon: "📊", text: "Dati + esempi etichettati" },
              { icon: "🧠", text: "Algoritmo impara pattern" },
              { icon: "📥", text: "Input (nuovi dati)" },
              { icon: "📤", text: "Output (predizione)" },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="ml-3 text-xs text-[var(--ink-faint)]">↓</span>
                )}
                <span className="text-base">{icon}</span>
                <span className="text-sm text-[var(--ink)]">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[6px] border border-dashed border-[#05996940] bg-[#05996910] p-2 text-center text-xs text-[#059669]">
            Il modello trova pattern che<br />nessun umano avrebbe scritto
          </div>
        </div>
      </div>

      <p className="diagram-caption">
        Con la programmazione tradizionale scrivi tu le regole. Con il machine learning mostri esempi e il sistema impara le regole da solo — anche quelle troppo complesse per essere scritte.
      </p>
    </figure>
  );
}
