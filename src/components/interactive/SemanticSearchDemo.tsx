"use client";

import { useState } from "react";

type Doc = { id: number; title: string; snippet: string; keywords: string[] };

const DOCS: Doc[] = [
  {
    id: 1,
    title: "Manuale di nutrizione sportiva",
    snippet: "L'alimentazione è fondamentale per le prestazioni atletiche. Carboidrati e proteine devono essere bilanciati in base all'intensità dell'allenamento.",
    keywords: ["alimentazione", "nutrizione", "sportiva", "carboidrati", "proteine"],
  },
  {
    id: 2,
    title: "Guida ai farmaci comuni",
    snippet: "I farmaci antidolorifici agiscono inibendo la produzione di prostaglandine. È importante consultare un medico prima di qualsiasi terapia.",
    keywords: ["farmaci", "antidolorifici", "terapia", "medico"],
  },
  {
    id: 3,
    title: "Ricette della cucina italiana",
    snippet: "La pasta al pomodoro è uno dei piatti più iconici d'Italia. Usa pomodori San Marzano freschi e un filo d'olio extravergine di oliva.",
    keywords: ["pasta", "pomodoro", "ricette", "cucina", "italiana"],
  },
  {
    id: 4,
    title: "Gestione dello stress sul lavoro",
    snippet: "Lo stress cronico può portare a burnout. Tecniche come la mindfulness e l'esercizio fisico regolare aiutano a mantenere l'equilibrio psicofisico.",
    keywords: ["stress", "burnout", "mindfulness", "lavoro", "psicofisico"],
  },
  {
    id: 5,
    title: "Introduzione allo yoga e al benessere",
    snippet: "Lo yoga combina posture, respirazione e meditazione. La pratica regolare migliora la flessibilità, riduce l'ansia e aumenta la concentrazione.",
    keywords: ["yoga", "benessere", "meditazione", "flessibilità", "ansia"],
  },
  {
    id: 6,
    title: "Dormire meglio: consigli pratici",
    snippet: "La qualità del sonno dipende da routine regolari, esposizione alla luce naturale e riduzione dello schermo prima di coricarsi.",
    keywords: ["sonno", "dormire", "routine", "luce", "schermo"],
  },
];

type QueryExample = {
  query: string;
  keywordMatches: number[];  // doc ids
  semanticMatches: number[]; // doc ids
};

const EXAMPLES: QueryExample[] = [
  {
    query: "come stare meglio",
    keywordMatches: [5],
    semanticMatches: [5, 4, 6, 1],
  },
  {
    query: "rimedi per il mal di testa",
    keywordMatches: [],
    semanticMatches: [2, 4, 6],
  },
  {
    query: "cosa mangiare prima di correre",
    keywordMatches: [],
    semanticMatches: [1, 3, 6],
  },
  {
    query: "pasta",
    keywordMatches: [3],
    semanticMatches: [3],
  },
];

export function SemanticSearchDemo() {
  const [queryIdx, setQueryIdx] = useState(0);

  const ex = EXAMPLES[queryIdx];
  const keywordDocs = DOCS.filter((d) => ex.keywordMatches.includes(d.id));
  const semanticDocs = DOCS.filter((d) => ex.semanticMatches.includes(d.id));

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Ricerca semantica vs ricerca per parole chiave</p>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Stessa query, risultati completamente diversi. La ricerca semantica capisce il <em>significato</em>, non solo le parole.
      </p>

      {/* Query selector */}
      <div className="mb-5">
        <p className="label mb-2">Query di ricerca</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((e, i) => (
            <button
              key={i}
              onClick={() => setQueryIdx(i)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                i === queryIdx
                  ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink-muted)] hover:border-[var(--accent)]"
              }`}
            >
              &quot;{e.query}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Query display */}
      <div className="mb-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5">
        <span className="text-xs text-[var(--ink-faint)]">Query: </span>
        <span className="font-mono text-sm font-semibold text-[var(--ink)]">&quot;{ex.query}&quot;</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Keyword */}
        <div className="rounded-[var(--radius)] border border-[#6b656040] bg-[#6b656006] p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
            Ricerca per parole chiave
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">
            Cerca le parole esatte nel testo
          </p>
          {keywordDocs.length === 0 ? (
            <div className="rounded-[6px] border border-dashed border-[#dc262640] p-3 text-center text-xs text-[#dc2626]">
              Nessun risultato trovato.<br />
              La query non contiene<br />parole presenti nei documenti.
            </div>
          ) : (
            <div className="space-y-2">
              {keywordDocs.map((doc) => (
                <div key={doc.id} className="rounded-[6px] border border-[var(--border)] bg-[var(--bg)] p-2">
                  <p className="text-xs font-semibold text-[var(--ink)]">{doc.title}</p>
                  <p className="text-[11px] text-[var(--ink-muted)] line-clamp-2">{doc.snippet}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Semantic */}
        <div className="rounded-[var(--radius)] border border-[#05996940] bg-[#05996906] p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#059669]">
            Ricerca semantica (embedding)
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">
            Cerca per significato e contesto
          </p>
          <div className="space-y-2">
            {semanticDocs.map((doc, rank) => (
              <div key={doc.id} className="rounded-[6px] border border-[#05996920] bg-[var(--bg)] p-2">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ background: "#059669" }}
                  >
                    {rank + 1}
                  </span>
                  <p className="text-xs font-semibold text-[var(--ink)]">{doc.title}</p>
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] line-clamp-2">{doc.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="diagram-caption">
        La ricerca per parole chiave trova esattamente quello che scrivi — se scrivi &quot;rimedi per il mal di testa&quot; ma il documento dice &quot;antidolorifici&quot;, non lo trova. La ricerca semantica converte query e documenti in embedding e confronta i vettori — trova contenuti rilevanti anche con parole diverse.
      </p>
    </div>
  );
}
