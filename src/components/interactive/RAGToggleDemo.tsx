"use client";

import { useState } from "react";

type Scenario = {
  question: string;
  withoutRAG: string;
  withRAG: string;
  context: string;
  source: string;
};

const SCENARIOS: Scenario[] = [
  {
    question: "Qual è la policy di rimborso per ordini superiori a 500€?",
    withoutRAG: "In genere, per ordini di importo elevato, la maggior parte delle aziende offre rimborsi entro 30 giorni dall'acquisto. Ti consiglio di verificare i termini e condizioni specifici del venditore.",
    withRAG: "Per ordini superiori a 500€ il rimborso è integrale entro 14 giorni dalla consegna, senza necessità di motivazione. Dopo i 14 giorni, è possibile richiedere un buono acquisto del valore corrispondente entro 60 giorni.",
    context: "Art. 12 — Rimborsi: Per ordini fino a 500€ il rimborso è possibile entro 30 giorni. Per ordini superiori a 500€ il rimborso è integrale entro 14 giorni dalla consegna, senza necessità di motivazione. Dopo i 14 giorni e fino a 60 giorni dalla consegna, è possibile richiedere un buono acquisto del valore corrispondente.",
    source: "Termini e condizioni aziendali, Art. 12",
  },
  {
    question: "Quanti giorni di ferie mi restano quest'anno?",
    withoutRAG: "I giorni di ferie dipendono dal tuo contratto e dalla legislazione del tuo paese. In Italia, il minimo legale è di 4 settimane all'anno. Controlla con il tuo ufficio HR per il saldo esatto.",
    withRAG: "Ti restano 8 giorni di ferie su 22 totali per quest'anno. Hai usato 11 giorni tra giugno e agosto e 3 giorni a dicembre. I giorni non usati scadono il 30 giugno dell'anno successivo.",
    context: "Dipendente: Mario Rossi | Ferie totali 2024: 22 gg | Usate: 14 gg (11 giu-ago, 3 dic) | Residue: 8 gg | Scadenza residui: 30/06/2025",
    source: "Database HR, scheda dipendente",
  },
  {
    question: "Il nostro fatturato è cresciuto nel Q3?",
    withoutRAG: "Non ho accesso ai dati finanziari della tua azienda. In generale, per analizzare la crescita del fatturato puoi confrontare i dati del trimestre corrente con quelli del trimestre precedente e dello stesso trimestre dell'anno scorso.",
    withRAG: "Sì, il fatturato Q3 2024 è stato di 2.3M€, in crescita del 12% rispetto al Q2 (2.05M€) e del 18% rispetto al Q3 2023 (1.95M€). Il margine lordo è migliorato di 2 punti percentuali, passando dal 34% al 36%.",
    context: "Report finanziario Q3 2024: Fatturato Q3: 2.3M€ | Q2: 2.05M€ (+12% QoQ) | Q3 2023: 1.95M€ (+18% YoY) | Margine lordo Q3: 36% (vs 34% Q2)",
    source: "Report finanziario trimestrale Q3 2024",
  },
];

export function RAGToggleDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [showContext, setShowContext] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Con e senza RAG
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        La stessa domanda, due risposte. Senza i tuoi documenti il modello può solo dare risposte generiche
        (o inventare). Con RAG, risponde con dati reali.
      </p>

      {/* Scenario selector */}
      <div className="mb-5 flex flex-wrap gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => { setScenarioIdx(i); setShowContext(false); }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              scenarioIdx === i
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            {s.question.slice(0, 40)}...
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="mb-4 rounded-[var(--radius)] bg-[var(--bg)] p-3 text-sm">
        <span className="font-medium text-[var(--ink-muted)]">Domanda: </span>
        <span className="text-[var(--ink)]">{scenario.question}</span>
      </div>

      {/* Side by side */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        {/* Without RAG */}
        <div className="rounded-[var(--radius)] border border-orange-200 bg-orange-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
              Senza RAG
            </span>
          </div>
          <p className="text-sm text-orange-900">{scenario.withoutRAG}</p>
          <div className="mt-2 text-xs text-orange-600">
            Risposta generica, nessun dato specifico
          </div>
        </div>

        {/* With RAG */}
        <div className="rounded-[var(--radius)] border border-green-200 bg-green-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
              Con RAG
            </span>
          </div>
          <p className="text-sm text-green-900">{scenario.withRAG}</p>
          <div className="mt-2 text-xs text-green-600">
            Fonte: {scenario.source}
          </div>
        </div>
      </div>

      {/* Show/hide context */}
      <button
        onClick={() => setShowContext(!showContext)}
        className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)]"
      >
        {showContext ? "Nascondi documento" : "Mostra il documento usato dal RAG"}
      </button>

      {showContext && (
        <div className="mt-3 rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--bg)] p-4">
          <div className="mb-1 text-xs font-semibold text-[var(--ink-muted)]">
            Documento recuperato:
          </div>
          <p className="font-mono text-xs text-[var(--ink)]">{scenario.context}</p>
        </div>
      )}
    </div>
  );
}
