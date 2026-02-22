"use client";

import { useState } from "react";

type Example = {
  question: string;
  directAnswer: string;
  cotSteps: string[];
  cotAnswer: string;
};

const EXAMPLES: Example[] = [
  {
    question: "Ho 3 figli. Il primo ha 8 anni, il secondo 3 anni in meno, il terzo 2 anni più del secondo. Quanti anni ha il terzo figlio?",
    directAnswer: "Il terzo figlio ha 7 anni.",
    cotSteps: [
      "Il primo figlio ha 8 anni.",
      "Il secondo figlio ha 3 anni in meno del primo: 8 - 3 = 5 anni.",
      "Il terzo figlio ha 2 anni più del secondo: 5 + 2 = 7 anni.",
    ],
    cotAnswer: "Il terzo figlio ha 7 anni. ✓",
  },
  {
    question: "Un treno parte alle 14:30 e arriva dopo 2 ore e 45 minuti. A che ora arriva?",
    directAnswer: "Il treno arriva alle 17:15.",
    cotSteps: [
      "Ora di partenza: 14:30.",
      "Aggiungo 2 ore: 14:30 + 2:00 = 16:30.",
      "Aggiungo 45 minuti: 16:30 + 0:45 = 17:15.",
    ],
    cotAnswer: "Il treno arriva alle 17:15. ✓",
  },
  {
    question: "Se 5 operai costruiscono 5 case in 5 giorni, quante case costruiscono 10 operai in 10 giorni?",
    directAnswer: "10 operai costruiscono 10 case in 10 giorni.",
    cotSteps: [
      "5 operai costruiscono 5 case in 5 giorni → 1 operaio costruisce 1 casa in 5 giorni.",
      "1 operaio in 10 giorni costruisce: 10/5 = 2 case.",
      "10 operai in 10 giorni costruiscono: 10 × 2 = 20 case.",
    ],
    cotAnswer: "10 operai costruiscono 20 case in 10 giorni. ✓",
  },
];

export function ChainOfThoughtDemo() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [showDirect, setShowDirect] = useState(false);
  const [showCoT, setShowCoT] = useState(false);
  const [cotStep, setCotStep] = useState(0);

  const ex = EXAMPLES[exampleIdx];

  function selectExample(i: number) {
    setExampleIdx(i);
    setShowDirect(false);
    setShowCoT(false);
    setCotStep(0);
  }

  function startCoT() {
    setShowCoT(true);
    setCotStep(1);
  }

  function nextStep() {
    if (cotStep < ex.cotSteps.length) {
      setCotStep((s) => s + 1);
    }
  }

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Chain-of-Thought — ragionare passo per passo</p>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Stessa domanda, due approcci diversi. Vedi cosa succede quando chiedi al modello di &quot;ragionare passo per passo.&quot;
      </p>

      {/* Example selector */}
      <div className="mb-5">
        <p className="label mb-2">Esempio</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((_, i) => (
            <button
              key={i}
              onClick={() => selectExample(i)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                i === exampleIdx
                  ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink-muted)] hover:border-[var(--accent)]"
              }`}
            >
              Problema {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="mb-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">Domanda</p>
        <p className="text-sm font-medium leading-relaxed text-[var(--ink)]">{ex.question}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Direct */}
        <div className="rounded-[var(--radius)] border border-[#6b656040] bg-[#6b656006] p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
            Risposta diretta
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">
            Prompt: &quot;{ex.question.slice(0, 40)}…&quot;
          </p>
          {!showDirect ? (
            <button
              onClick={() => setShowDirect(true)}
              className="btn btn-secondary btn-sm w-full"
            >
              Genera risposta →
            </button>
          ) : (
            <div className="rounded-[6px] bg-[var(--bg)] p-3 text-sm text-[var(--ink)]">
              {ex.directAnswer}
            </div>
          )}
        </div>

        {/* CoT */}
        <div className="rounded-[var(--radius)] border border-[#05996940] bg-[#05996906] p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#059669]">
            Chain-of-Thought
          </p>
          <p className="mb-3 text-xs text-[var(--ink-faint)]">
            Prompt: &quot;…Ragiona passo per passo.&quot;
          </p>
          {!showCoT ? (
            <button
              onClick={startCoT}
              className="btn btn-sm w-full"
              style={{ background: "#059669", color: "white" }}
            >
              Genera con CoT →
            </button>
          ) : (
            <div className="space-y-2">
              {ex.cotSteps.slice(0, cotStep).map((step, i) => (
                <div key={i} className="flex items-start gap-2 rounded-[6px] bg-[var(--bg)] p-2">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: "#059669" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-[var(--ink)]">{step}</p>
                </div>
              ))}
              {cotStep < ex.cotSteps.length ? (
                <button
                  onClick={nextStep}
                  className="btn btn-sm w-full border border-[#059669] bg-transparent text-[#059669] hover:bg-[#05996910]"
                >
                  Passo successivo →
                </button>
              ) : (
                <div className="rounded-[6px] border border-[#05996940] bg-[#059669] p-2 text-center text-sm font-semibold text-white">
                  → {ex.cotAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="diagram-caption">
        Il Chain-of-Thought non è magia — stai chiedendo al modello di allocare più token al ragionamento intermedio prima di dare la risposta. Più token = più &quot;spazio&quot; per elaborare la logica. Funziona perché i modelli sono addestrati su testi che mostrano ragionamenti passo per passo.
      </p>
    </div>
  );
}
