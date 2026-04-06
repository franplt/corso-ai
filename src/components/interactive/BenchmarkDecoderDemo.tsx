"use client";

import { useState } from "react";

type Benchmark = {
  name: string;
  fullName: string;
  measures: string;
  example: string;
  exampleAnswer: string;
  limitation: string;
  scores: { model: string; score: number }[];
};

const BENCHMARKS: Benchmark[] = [
  {
    name: "MMLU",
    fullName: "Massive Multitask Language Understanding",
    measures: "Conoscenza generale in 57 materie: storia, matematica, medicina, legge, informatica, ecc. Domande a scelta multipla a livello universitario.",
    example: "Quale delle seguenti è una caratteristica della mitosi?\n(A) Produce cellule aploidi\n(B) Avviene solo nelle cellule sessuali\n(C) Produce due cellule geneticamente identiche\n(D) Richiede la fecondazione",
    exampleAnswer: "(C) — le cellule figlie sono copie identiche",
    limitation: "Misura conoscenza enciclopedica, non capacità di ragionamento o di applicare le conoscenze a problemi nuovi.",
    scores: [
      { model: "GPT-4o", score: 88.7 },
      { model: "Claude 3.5", score: 88.3 },
      { model: "Gemini 1.5 Pro", score: 85.9 },
      { model: "LLaMA 3.1 70B", score: 82.0 },
    ],
  },
  {
    name: "HumanEval",
    fullName: "HumanEval Code Generation",
    measures: "Capacità di scrivere codice funzionante. 164 problemi di programmazione in Python con test automatici.",
    example: "Scrivi una funzione che, data una lista di numeri, restituisca la somma di tutti i numeri pari.",
    exampleAnswer: "def sum_even(nums):\n    return sum(x for x in nums if x % 2 == 0)",
    limitation: "Solo Python, solo problemi algoritmici brevi. Non misura la capacità di lavorare su codebase grandi o di fare debugging.",
    scores: [
      { model: "GPT-4o", score: 90.2 },
      { model: "Claude 3.5", score: 92.0 },
      { model: "Gemini 1.5 Pro", score: 84.1 },
      { model: "LLaMA 3.1 70B", score: 80.5 },
    ],
  },
  {
    name: "GSM8K",
    fullName: "Grade School Math 8K",
    measures: "Ragionamento matematico con problemi da scuola elementare/media. 8.500 problemi che richiedono più passaggi logici.",
    example: "Maria ha 15 mele. Ne regala 1/3 a Luca e poi compra altre 8 mele. Quante mele ha adesso Maria?",
    exampleAnswer: "15 - (15/3) + 8 = 15 - 5 + 8 = 18 mele",
    limitation: "Problemi relativamente semplici. Non misura la capacità di ragionamento matematico avanzato (algebra, calcolo, geometria).",
    scores: [
      { model: "GPT-4o", score: 95.8 },
      { model: "Claude 3.5", score: 96.4 },
      { model: "Gemini 1.5 Pro", score: 94.4 },
      { model: "LLaMA 3.1 70B", score: 93.0 },
    ],
  },
  {
    name: "HellaSwag",
    fullName: "HellaSwag Commonsense Reasoning",
    measures: "Buon senso e comprensione di situazioni quotidiane. Data una situazione, scegliere il seguito più plausibile.",
    example: "Una persona prende un ombrello prima di uscire di casa. Fuori...\n(A) splende il sole e non c'è una nuvola\n(B) sta piovendo forte\n(C) è notte fonda\n(D) ci sono dei gatti",
    exampleAnswer: "(B) — sta piovendo, per questo ha preso l'ombrello",
    limitation: "Misura solo buon senso di base. I modelli attuali sono quasi al 100%, quindi non è più discriminante tra i migliori.",
    scores: [
      { model: "GPT-4o", score: 95.3 },
      { model: "Claude 3.5", score: 94.8 },
      { model: "Gemini 1.5 Pro", score: 93.2 },
      { model: "LLaMA 3.1 70B", score: 88.0 },
    ],
  },
];

export function BenchmarkDecoderDemo() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const bench = BENCHMARKS[selectedIdx];
  const maxScore = Math.max(...bench.scores.map((s) => s.score));

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Cosa misurano davvero i benchmark?
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Clicca su un benchmark per vedere cosa misura, un esempio di domanda, e perché un
        punteggio alto non significa automaticamente &quot;modello migliore per te&quot;.
      </p>

      {/* Benchmark selector */}
      <div className="mb-5 flex flex-wrap gap-2">
        {BENCHMARKS.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setSelectedIdx(i)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedIdx === i
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Benchmark detail */}
      <div className="space-y-4">
        <div>
          <div className="text-xs font-medium text-[var(--ink-muted)]">{bench.fullName}</div>
          <p className="mt-1 text-sm text-[var(--ink)]">{bench.measures}</p>
        </div>

        {/* Example */}
        <div className="rounded-[var(--radius)] bg-[var(--bg)] p-4">
          <div className="mb-2 text-xs font-semibold text-[var(--ink-muted)]">Esempio di domanda:</div>
          <pre className="whitespace-pre-wrap font-mono text-xs text-[var(--ink)]">{bench.example}</pre>
          <div className="mt-2 border-t border-[var(--border)] pt-2 text-xs text-green-700">
            {bench.exampleAnswer}
          </div>
        </div>

        {/* Scores */}
        <div>
          <div className="mb-2 text-xs font-semibold text-[var(--ink-muted)]">Punteggi:</div>
          <div className="space-y-1.5">
            {bench.scores.map((s) => (
              <div key={s.model} className="flex items-center gap-2">
                <span className="w-28 text-xs font-medium text-[var(--ink)]">{s.model}</span>
                <div className="h-4 flex-1 rounded-full bg-[var(--border)]">
                  <div
                    className="h-4 rounded-full bg-[var(--accent)] transition-all duration-300"
                    style={{ width: `${(s.score / 100) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right text-xs font-semibold text-[var(--ink)]">
                  {s.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Limitation */}
        <div className="rounded-[var(--radius)] border border-dashed border-yellow-300 bg-yellow-50 p-3">
          <div className="mb-1 text-xs font-semibold text-yellow-800">Attenzione</div>
          <p className="text-xs text-yellow-700">{bench.limitation}</p>
        </div>
      </div>
    </div>
  );
}
