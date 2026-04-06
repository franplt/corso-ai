"use client";

import { useState } from "react";

type Choice = {
  label: string;
  options: { text: string; value: string }[];
};

const QUESTIONS: Choice[] = [
  {
    label: "Che tipo di task?",
    options: [
      { text: "Classificazione / estrazione dati", value: "simple" },
      { text: "Scrittura / analisi testi", value: "medium" },
      { text: "Ragionamento complesso / codice", value: "complex" },
    ],
  },
  {
    label: "Quante richieste al giorno?",
    options: [
      { text: "Poche (< 100)", value: "low" },
      { text: "Moderate (100-10.000)", value: "medium" },
      { text: "Molte (> 10.000)", value: "high" },
    ],
  },
  {
    label: "Requisiti di privacy?",
    options: [
      { text: "Dati non sensibili", value: "none" },
      { text: "Dati aziendali interni", value: "moderate" },
      { text: "Dati sensibili / regolamentati", value: "strict" },
    ],
  },
  {
    label: "Budget mensile?",
    options: [
      { text: "Minimo (< $50)", value: "low" },
      { text: "Moderato ($50-500)", value: "medium" },
      { text: "Flessibile (> $500)", value: "high" },
    ],
  },
];

type Recommendation = {
  primary: string;
  size: string;
  reason: string;
  alternative: string;
  costEstimate: string;
};

function getRecommendation(answers: Record<number, string>): Recommendation {
  const task = answers[0];
  const volume = answers[1];
  const privacy = answers[2];
  const budget = answers[3];

  // Privacy-strict → open-weight
  if (privacy === "strict") {
    if (task === "complex") {
      return {
        primary: "LLaMA 3.1 70B (self-hosted)",
        size: "Grande, open-weight",
        reason: "Task complessi con dati regolamentati richiedono un modello potente che puoi hostare internamente. Nessun dato esce dai tuoi server.",
        alternative: "Mistral Large (API con data residency EU)",
        costEstimate: volume === "high" ? "$200-800/mese (infrastruttura)" : "$100-300/mese (infrastruttura)",
      };
    }
    return {
      primary: "Mistral 7B / LLaMA 3.1 8B (self-hosted)",
      size: "Piccolo, open-weight",
      reason: "Per task semplici/medi con dati sensibili, un modello piccolo hostato internamente è la scelta più efficiente. Basse risorse richieste.",
      alternative: "Phi-3 Mini per task ancora più leggeri",
      costEstimate: "$30-100/mese (infrastruttura)",
    };
  }

  // High volume + simple → small model API
  if (volume === "high" && task === "simple") {
    return {
      primary: "GPT-4o mini / Claude 3.5 Haiku",
      size: "Piccolo, proprietario",
      reason: "Per task semplici ad alto volume, i modelli piccoli via API sono la scelta migliore: velocissimi, economici, e sufficientemente capaci per classificazione ed estrazione.",
      alternative: "Mistral Small via API",
      costEstimate: "$20-100/mese",
    };
  }

  // Complex task → big model
  if (task === "complex") {
    if (budget === "low") {
      return {
        primary: "Claude 3.5 Sonnet / GPT-4o",
        size: "Grande, proprietario",
        reason: "Task complessi richiedono i modelli più capaci. Con budget limitato, meglio usarli solo per le richieste che lo richiedono e delegare il resto a modelli piccoli.",
        alternative: "DeepSeek V2 (più economico, buono per codice)",
        costEstimate: "$30-80/mese (con uso attento)",
      };
    }
    return {
      primary: "Claude 3.5 Opus / GPT-4o",
      size: "Grande, proprietario",
      reason: "Per ragionamento complesso e generazione di codice, i modelli di punta sono nettamente superiori. Il costo extra si ripaga in qualità.",
      alternative: "Combinare: GPT-4o per il 20% complesso, GPT-4o mini per il resto",
      costEstimate: volume === "high" ? "$200-1000/mese" : "$50-200/mese",
    };
  }

  // Medium task, moderate volume
  if (task === "medium") {
    return {
      primary: "GPT-4o / Claude 3.5 Sonnet",
      size: "Medio-grande, proprietario",
      reason: "Per scrittura e analisi, serve un modello con buona comprensione del linguaggio. I modelli medi proprietari offrono il miglior rapporto qualità/prezzo.",
      alternative: "Gemini 1.5 Flash per volumi più alti a costo inferiore",
      costEstimate: volume === "high" ? "$100-400/mese" : "$20-80/mese",
    };
  }

  // Default: simple task, low/medium volume
  return {
    primary: "GPT-4o mini / Claude 3.5 Haiku",
    size: "Piccolo, proprietario",
    reason: "Per task semplici a volume moderato, i modelli piccoli via API fanno il lavoro egregiamente a una frazione del costo dei modelli grandi.",
    alternative: "Gemini 1.5 Flash come alternativa economica",
    costEstimate: "$5-30/mese",
  };
}

export function ModelSizingDemo() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const recommendation = allAnswered ? getRecommendation(answers) : null;

  function answer(qIdx: number, value: string) {
    setAnswers((prev) => ({ ...prev, [qIdx]: value }));
    setShowResult(false);
  }

  function restart() {
    setAnswers({});
    setShowResult(false);
  }

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Quale modello ti serve?
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        Rispondi a 4 domande sul tuo caso d&apos;uso e vedi quale tipo di modello è più adatto.
      </p>

      <div className="space-y-5">
        {QUESTIONS.map((q, qIdx) => (
          <div key={qIdx}>
            <div className="mb-2 text-sm font-medium text-[var(--ink)]">
              {qIdx + 1}. {q.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => answer(qIdx, opt.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    answers[qIdx] === opt.value
                      ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && !showResult && (
        <button
          onClick={() => setShowResult(true)}
          className="mt-5 rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          Mostra raccomandazione
        </button>
      )}

      {showResult && recommendation && (
        <div className="mt-5 rounded-[var(--radius)] border-2 border-[var(--accent)] bg-[var(--accent-muted)]/20 p-5">
          <div className="mb-3">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Raccomandazione
            </div>
            <div className="font-heading text-lg font-semibold text-[var(--ink)]">
              {recommendation.primary}
            </div>
            <div className="text-xs text-[var(--ink-muted)]">{recommendation.size}</div>
          </div>
          <p className="mb-3 text-sm text-[var(--ink-muted)]">{recommendation.reason}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius)] bg-[var(--bg)] p-3">
              <div className="text-xs font-medium text-[var(--ink-muted)]">Alternativa</div>
              <div className="text-sm font-medium text-[var(--ink)]">{recommendation.alternative}</div>
            </div>
            <div className="rounded-[var(--radius)] bg-[var(--bg)] p-3">
              <div className="text-xs font-medium text-[var(--ink-muted)]">Costo stimato</div>
              <div className="text-sm font-medium text-[var(--ink)]">{recommendation.costEstimate}</div>
            </div>
          </div>
          <button
            onClick={restart}
            className="mt-4 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)]"
          >
            Ricomincia
          </button>
        </div>
      )}
    </div>
  );
}
