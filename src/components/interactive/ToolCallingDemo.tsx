"use client";

import { useState } from "react";

type Step = {
  type: "thinking" | "tool_call" | "tool_result" | "response";
  content: string;
};

type Scenario = {
  question: string;
  steps: Step[];
};

const SCENARIOS: Scenario[] = [
  {
    question: "Quanto fa 847 × 293?",
    steps: [
      { type: "thinking", content: "L'utente vuole un calcolo preciso. Potrei provare a calcolarlo, ma con numeri grandi rischio di sbagliare. Meglio usare la calcolatrice." },
      { type: "tool_call", content: "Chiamo: calcolatrice(847 × 293)" },
      { type: "tool_result", content: "Risultato: 248.171" },
      { type: "response", content: "847 × 293 = 248.171" },
    ],
  },
  {
    question: "Che tempo fa a Milano oggi?",
    steps: [
      { type: "thinking", content: "Non ho informazioni in tempo reale sul meteo. I miei dati di addestramento non includono il meteo di oggi. Devo usare l'API meteo." },
      { type: "tool_call", content: "Chiamo: api_meteo(città: \"Milano\", data: \"oggi\")" },
      { type: "tool_result", content: "Milano, oggi: 18°C, parzialmente nuvoloso, umidità 65%, vento 12 km/h" },
      { type: "response", content: "A Milano oggi ci sono 18°C con cielo parzialmente nuvoloso. Umidità al 65% e vento leggero a 12 km/h." },
    ],
  },
  {
    question: "Qual è il prezzo attuale delle azioni Apple?",
    steps: [
      { type: "thinking", content: "Il prezzo delle azioni cambia in tempo reale. Non posso rispondere con dati di addestramento perché sarebbero obsoleti. Devo interrogare un'API finanziaria." },
      { type: "tool_call", content: "Chiamo: api_finanza(ticker: \"AAPL\")" },
      { type: "tool_result", content: "AAPL: $178.52 (+1.3%), volume: 52.4M, market cap: $2.78T" },
      { type: "response", content: "Le azioni Apple (AAPL) sono a $178.52, in rialzo dell'1.3% rispetto alla chiusura precedente." },
    ],
  },
];

const STEP_STYLES = {
  thinking: { label: "Ragionamento", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", icon: "💭" },
  tool_call: { label: "Chiamata tool", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "🔧" },
  tool_result: { label: "Risultato", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "📥" },
  response: { label: "Risposta", bg: "bg-[var(--accent-muted)]/30", border: "border-[var(--accent)]", text: "text-[var(--ink)]", icon: "💬" },
};

export function ToolCallingDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const scenario = SCENARIOS[scenarioIdx];
  const allVisible = visibleSteps >= scenario.steps.length;

  function nextStep() {
    if (visibleSteps < scenario.steps.length) {
      setVisibleSteps((v) => v + 1);
    }
  }

  function changeScenario(idx: number) {
    setScenarioIdx(idx);
    setVisibleSteps(0);
  }

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Come un modello usa i tool
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Il modello decide autonomamente quando chiamare uno strumento esterno invece di
        rispondere dalla sua memoria. Clicca per vedere ogni passaggio.
      </p>

      {/* Scenario selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => changeScenario(i)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              scenarioIdx === i
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            {s.question}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="mb-4 rounded-[var(--radius)] bg-[var(--bg)] p-3 text-sm">
        <span className="font-medium text-[var(--ink-muted)]">Utente: </span>
        <span className="text-[var(--ink)]">{scenario.question}</span>
      </div>

      {/* Steps */}
      <div className="mb-4 space-y-2">
        {scenario.steps.slice(0, visibleSteps).map((step, i) => {
          const style = STEP_STYLES[step.type];
          return (
            <div
              key={i}
              className={`rounded-[var(--radius)] border ${style.border} ${style.bg} p-3 text-sm animate-in fade-in duration-300`}
            >
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
                <span>{style.icon}</span>
                <span className={style.text}>{style.label}</span>
              </div>
              <div className={`${step.type === "tool_call" || step.type === "tool_result" ? "font-mono text-xs" : ""} ${style.text}`}>
                {step.content}
              </div>
            </div>
          );
        })}
      </div>

      {visibleSteps === 0 && (
        <div className="mb-4 rounded-[var(--radius)] border border-dashed border-[var(--border)] p-3 text-center text-sm text-[var(--ink-faint)]">
          Clicca &quot;Prossimo passo&quot; per vedere il ragionamento del modello
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={nextStep}
          disabled={allVisible}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Prossimo passo →
        </button>
        {visibleSteps > 0 && (
          <button
            onClick={() => setVisibleSteps(0)}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)]"
          >
            Reset
          </button>
        )}
        <span className="ml-auto text-xs text-[var(--ink-faint)]">
          {visibleSteps}/{scenario.steps.length}
        </span>
      </div>

      {allVisible && (
        <p className="mt-3 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
          Il modello non ha &quot;inventato&quot; il risultato: ha riconosciuto di non saperlo e ha
          delegato a uno strumento esterno. Questo pattern — ragionare, chiamare un tool,
          usare il risultato — è alla base di RAG, agenti, e di quasi tutti i prodotti AI moderni.
        </p>
      )}
    </div>
  );
}
