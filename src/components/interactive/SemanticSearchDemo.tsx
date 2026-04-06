"use client";

import { useState } from "react";

type Doc = {
  id: number;
  text: string;
  keywords: string[];
  semanticScore: number;
};

type Query = {
  text: string;
  docs: Doc[];
};

const QUERIES: Query[] = [
  {
    text: "problemi di accesso all'account",
    docs: [
      { id: 1, text: "Se hai difficoltà a entrare nel tuo profilo, prova a resettare la password dalla pagina di login.", keywords: [], semanticScore: 0.92 },
      { id: 2, text: "Non riesco a fare il login: il sistema dice che le credenziali non sono valide.", keywords: ["login"], semanticScore: 0.88 },
      { id: 3, text: "Per cambiare il metodo di pagamento, vai nelle impostazioni dell'account.", keywords: ["account"], semanticScore: 0.35 },
      { id: 4, text: "L'autenticazione a due fattori può essere disattivata dalle impostazioni di sicurezza.", keywords: [], semanticScore: 0.72 },
      { id: 5, text: "Il nostro servizio clienti è disponibile dal lunedì al venerdì, dalle 9 alle 18.", keywords: [], semanticScore: 0.10 },
      { id: 6, text: "Errore 403: accesso negato. Verifica di avere i permessi necessari.", keywords: ["accesso"], semanticScore: 0.80 },
    ],
  },
  {
    text: "come ridurre i costi aziendali",
    docs: [
      { id: 1, text: "Tagliare le spese inutili è il primo passo per migliorare il bilancio della tua attività.", keywords: [], semanticScore: 0.90 },
      { id: 2, text: "L'outsourcing di alcune funzioni può abbassare significativamente le uscite mensili.", keywords: [], semanticScore: 0.82 },
      { id: 3, text: "I costi fissi includono affitto, stipendi e utenze.", keywords: ["costi"], semanticScore: 0.55 },
      { id: 4, text: "Un software di gestione finanziaria aiuta a tenere traccia di entrate e uscite.", keywords: [], semanticScore: 0.60 },
      { id: 5, text: "L'automazione dei processi ripetitivi fa risparmiare tempo e denaro.", keywords: [], semanticScore: 0.78 },
      { id: 6, text: "La sede dell'azienda si trova in via Roma 15.", keywords: ["aziendali"], semanticScore: 0.05 },
    ],
  },
  {
    text: "il prodotto non funziona bene",
    docs: [
      { id: 1, text: "Se il dispositivo si blocca spesso, prova a fare un reset alle impostazioni di fabbrica.", keywords: [], semanticScore: 0.85 },
      { id: 2, text: "Diversi utenti hanno segnalato rallentamenti dopo l'ultimo aggiornamento.", keywords: [], semanticScore: 0.80 },
      { id: 3, text: "Per restituire un prodotto difettoso, contatta l'assistenza entro 30 giorni.", keywords: ["prodotto"], semanticScore: 0.70 },
      { id: 4, text: "Le prestazioni possono peggiorare se la memoria è quasi piena.", keywords: [], semanticScore: 0.75 },
      { id: 5, text: "Il prodotto è disponibile nei colori nero, bianco e blu.", keywords: ["prodotto"], semanticScore: 0.08 },
      { id: 6, text: "La garanzia copre malfunzionamenti hardware per 24 mesi.", keywords: [], semanticScore: 0.65 },
    ],
  },
];

export function SemanticSearchDemo() {
  const [queryIdx, setQueryIdx] = useState(0);

  const query = QUERIES[queryIdx];

  const queryWords = query.text.toLowerCase().split(/\s+/);

  const keywordResults = query.docs
    .map((doc) => ({
      ...doc,
      hasKeyword: doc.keywords.some((kw) =>
        queryWords.some((qw) => qw.includes(kw) || kw.includes(qw)),
      ),
    }))
    .sort((a, b) => (b.hasKeyword ? 1 : 0) - (a.hasKeyword ? 1 : 0));

  const semanticResults = [...query.docs].sort((a, b) => b.semanticScore - a.semanticScore);

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Ricerca per parole chiave vs ricerca semantica
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        La stessa domanda, due approcci diversi. La ricerca semantica trova risultati rilevanti
        anche quando le parole esatte non corrispondono.
      </p>

      {/* Query selector */}
      <div className="mb-5">
        <div className="mb-2 text-xs font-medium text-[var(--ink-muted)]">Query:</div>
        <div className="flex flex-wrap gap-2">
          {QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={() => setQueryIdx(i)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                queryIdx === i
                  ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
              }`}
            >
              &quot;{q.text}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Side by side results */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Keyword */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
              Parole chiave
            </span>
          </div>
          <div className="space-y-2">
            {keywordResults.map((doc) => (
              <div
                key={doc.id}
                className={`rounded-[var(--radius)] border p-3 text-xs transition-colors ${
                  doc.hasKeyword
                    ? "border-orange-200 bg-orange-50"
                    : "border-[var(--border)] bg-[var(--bg)] opacity-40"
                }`}
              >
                <div className="text-[var(--ink)]">{doc.text}</div>
                {doc.hasKeyword ? (
                  <div className="mt-1 text-orange-600">
                    Match: {doc.keywords.filter((kw) => queryWords.some((qw) => qw.includes(kw) || kw.includes(qw))).join(", ")}
                  </div>
                ) : (
                  <div className="mt-1 text-[var(--ink-faint)]">Nessun match</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Semantic */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              Semantica
            </span>
          </div>
          <div className="space-y-2">
            {semanticResults.map((doc) => (
              <div
                key={doc.id}
                className={`rounded-[var(--radius)] border p-3 text-xs transition-colors ${
                  doc.semanticScore >= 0.6
                    ? "border-blue-200 bg-blue-50"
                    : "border-[var(--border)] bg-[var(--bg)] opacity-40"
                }`}
              >
                <div className="text-[var(--ink)]">{doc.text}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-[var(--border)]">
                    <div
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${doc.semanticScore * 100}%` }}
                    />
                  </div>
                  <span className={doc.semanticScore >= 0.6 ? "text-blue-600" : "text-[var(--ink-faint)]"}>
                    {Math.round(doc.semanticScore * 100)}% rilevante
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-xs text-[var(--ink-muted)]">
        La ricerca per parole chiave trova solo documenti con le stesse parole della query.
        La ricerca semantica usa gli embedding per trovare documenti con lo stesso <em>significato</em>,
        anche quando le parole sono completamente diverse.
      </p>
    </div>
  );
}
