"use client";

import { useState } from "react";

type Item = {
  emoji: string;
  name: string;
  usesAI: boolean;
  explanation: string;
};

const ITEMS: Item[] = [
  { emoji: "🎵", name: "Spotify (playlist consigliate)", usesAI: true, explanation: "Analizza i tuoi ascolti e li confronta con milioni di utenti simili per suggerire musica." },
  { emoji: "📧", name: "Filtro antispam email", usesAI: true, explanation: "Uno dei primi usi di ML: impara a riconoscere spam da migliaia di esempi etichettati." },
  { emoji: "🔍", name: "Google Search (ranking)", usesAI: true, explanation: "L'algoritmo che ordina i risultati usa modelli di language understanding dal 2019 (BERT)." },
  { emoji: "🚗", name: "GPS con traffico in tempo reale", usesAI: true, explanation: "Predice il traffico futuro analizzando dati storici e movimenti anonimi degli utenti." },
  { emoji: "📷", name: "Riconoscimento facce in foto", usesAI: true, explanation: "Deep learning classico: una rete neurale addestrata su milioni di volti etichettati." },
  { emoji: "🧮", name: "Calcolatrice standard", usesAI: false, explanation: "Usa algoritmi deterministici, non Machine Learning. 2+2 fa sempre 4, nessun apprendimento." },
  { emoji: "🌡️", name: "Termostato smart (Nest)", usesAI: true, explanation: "Impara le tue abitudini di temperatura nel tempo e ottimizza il riscaldamento automaticamente." },
  { emoji: "🛒", name: "\"Prodotti consigliati\" Amazon", usesAI: true, explanation: "Collaborative filtering: mostra cosa hanno comprato persone con acquisti simili ai tuoi." },
  { emoji: "📝", name: "Correttore ortografico base", usesAI: false, explanation: "Confronta le parole con un dizionario. Nessun apprendimento, solo lookup." },
  { emoji: "🎬", name: "Netflix (cosa guardare)", usesAI: true, explanation: "Sistema di raccomandazione che analizza gusti, tempo di visione e preferenze simili." },
];

export function AIQuizDemo() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState(false);

  const answered = Object.values(answers).filter((v) => v !== null).length;
  const correct = Object.entries(answers).filter(([i, v]) => v === ITEMS[+i].usesAI).length;

  function guess(idx: number, val: boolean) {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  }

  function reveal() {
    setRevealed(true);
  }

  function reset() {
    setAnswers({});
    setRevealed(false);
  }

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Quiz interattivo: quale di questi usa l&apos;AI?</p>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Per ogni prodotto, indovina se usa AI o tecnologia tradizionale. Poi scopri la risposta.
      </p>

      <div className="space-y-3">
        {ITEMS.map((item, i) => {
          const userAnswer = answers[i];
          const isCorrect = userAnswer === item.usesAI;
          const showResult = revealed || userAnswer !== undefined;

          return (
            <div
              key={i}
              className="rounded-[var(--radius)] border p-3 transition-colors"
              style={{
                borderColor: !showResult
                  ? "var(--border)"
                  : isCorrect
                  ? "#05996940"
                  : "#dc262640",
                background: !showResult
                  ? "var(--bg)"
                  : isCorrect
                  ? "#05996908"
                  : "#dc262606",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xl leading-none">{item.emoji}</span>
                  <span className="text-sm font-medium text-[var(--ink)]">{item.name}</span>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => guess(i, true)}
                    disabled={revealed}
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                      userAnswer === true
                        ? "border-[#059669] bg-[#059669] text-white"
                        : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink-muted)] hover:border-[#059669] hover:text-[#059669]"
                    }`}
                  >
                    Sì, AI
                  </button>
                  <button
                    onClick={() => guess(i, false)}
                    disabled={revealed}
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                      userAnswer === false
                        ? "border-[#dc2626] bg-[#dc2626] text-white"
                        : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink-muted)] hover:border-[#dc2626] hover:text-[#dc2626]"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {showResult && (
                <div className="mt-2 flex items-start gap-2">
                  <span className="text-sm">{item.usesAI ? "✅" : "❌"}</span>
                  <div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: item.usesAI ? "#059669" : "#dc2626" }}
                    >
                      {item.usesAI ? "Usa AI" : "Non usa AI"}
                    </span>
                    {revealed && (
                      <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{item.explanation}</p>
                    )}
                    {!revealed && userAnswer !== undefined && (
                      <span className="ml-2 text-xs font-semibold" style={{ color: isCorrect ? "#059669" : "#dc2626" }}>
                        {isCorrect ? "Corretto!" : "Sbagliato"}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {!revealed ? (
          <>
            <button
              onClick={reveal}
              className="btn btn-primary btn-sm"
            >
              Rivela tutte le risposte →
            </button>
            <span className="text-xs text-[var(--ink-faint)]">
              {answered}/{ITEMS.length} risposte
            </span>
          </>
        ) : (
          <>
            <div
              className="flex-1 rounded-[var(--radius)] border p-3 text-center"
              style={{
                borderColor: correct >= 8 ? "#05996940" : correct >= 5 ? "#b4530940" : "#dc262640",
                background: correct >= 8 ? "#05996908" : correct >= 5 ? "#b4530908" : "#dc262608",
              }}
            >
              <p
                className="text-sm font-bold"
                style={{ color: correct >= 8 ? "#059669" : correct >= 5 ? "#b45309" : "#dc2626" }}
              >
                {correct}/{ITEMS.length} corrette
              </p>
              <p className="text-xs text-[var(--ink-muted)]">
                {correct >= 8
                  ? "Ottimo — l'AI è già ovunque intorno a te!"
                  : correct >= 5
                  ? "Buono — molti usi di AI non sono evidenti"
                  : "Sorprendente, vero? L'AI è più pervasiva di quanto si pensi"}
              </p>
            </div>
            <button onClick={reset} className="btn btn-secondary btn-sm">
              Riprova
            </button>
          </>
        )}
      </div>

      <p className="diagram-caption">
        L&apos;AI non è solo nei robot e nelle macchine autonome — è nei prodotti che usi ogni giorno, spesso invisibile. La differenza rispetto al software tradizionale: questi sistemi non seguono regole scritte a mano, ma imparano da milioni di esempi.
      </p>
    </div>
  );
}
