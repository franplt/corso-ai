export function TokenizerDiagram() {
  const examples = [
    {
      word: "Ciao",
      tokens: ["Ciao"],
      color: "var(--accent)",
    },
    {
      word: "intelligenza",
      tokens: ["intel", "lig", "enza"],
      color: "#0284c7",
    },
    {
      word: "artificiale",
      tokens: ["art", "ific", "iale"],
      color: "#7c3aed",
    },
    {
      word: "ChatGPT",
      tokens: ["Chat", "G", "PT"],
      color: "#059669",
    },
  ];

  const TOKEN_COLORS = [
    "bg-[#fff3e0] text-[#b45309] border-[#f59e0b]",
    "bg-[#e0f2fe] text-[#0284c7] border-[#38bdf8]",
    "bg-[#f3e8ff] text-[#7c3aed] border-[#a78bfa]",
    "bg-[#d1fae5] text-[#059669] border-[#34d399]",
  ];

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Come il testo viene suddiviso in token</p>
      <div className="space-y-4">
        {examples.map((ex, i) => (
          <div key={ex.word} className="flex items-center gap-3 flex-wrap">
            <span className="w-28 shrink-0 font-mono text-sm font-semibold text-[var(--ink)]">
              &quot;{ex.word}&quot;
            </span>
            <span className="text-[var(--ink-faint)] text-sm">→</span>
            <div className="flex flex-wrap gap-1.5">
              {ex.tokens.map((token, j) => (
                <span
                  key={j}
                  className={`inline-block rounded border px-2 py-0.5 font-mono text-xs font-semibold ${TOKEN_COLORS[i % TOKEN_COLORS.length]}`}
                >
                  {token}
                </span>
              ))}
              <span className="ml-1 self-center text-xs text-[var(--ink-faint)]">
                {ex.tokens.length} token{ex.tokens.length > 1 ? "" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="diagram-caption">
        La stessa parola può corrispondere a uno o più token. Parole comuni = 1 token; parole rare o nomi propri vengono spezzate.
      </p>
    </figure>
  );
}
