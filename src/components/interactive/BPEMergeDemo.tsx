"use client";

import { useState, useMemo } from "react";

const COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-orange-100 text-orange-800",
  "bg-pink-100 text-pink-800",
  "bg-teal-100 text-teal-800",
  "bg-red-100 text-red-800",
  "bg-yellow-100 text-yellow-800",
];

type MergeStep = {
  pair: [string, string];
  frequency: number;
  result: string;
};

// Pre-computed BPE merge steps for "il gatto mangia il pesce"
const INITIAL_TOKENS = ["i", "l", " ", "g", "a", "t", "t", "o", " ", "m", "a", "n", "g", "i", "a", " ", "i", "l", " ", "p", "e", "s", "c", "e"];

const MERGE_STEPS: MergeStep[] = [
  { pair: ["i", "l"], frequency: 2, result: "il" },
  { pair: ["t", "t"], frequency: 1, result: "tt" },
  { pair: ["a", "tt"], frequency: 1, result: "att" },
  { pair: ["g", "att"], frequency: 1, result: "gatt" },
  { pair: ["gatt", "o"], frequency: 1, result: "gatto" },
  { pair: ["i", "a"], frequency: 1, result: "ia" },
  { pair: ["g", "ia"], frequency: 1, result: "gia" },
  { pair: ["n", "gia"], frequency: 1, result: "ngia" },
  { pair: ["ma", "ngia"], frequency: 1, result: "mangia" },
  { pair: ["s", "c"], frequency: 1, result: "sc" },
  { pair: ["e", "sc"], frequency: 1, result: "esc" },
  { pair: ["p", "esc"], frequency: 1, result: "pesc" },
  { pair: ["pesc", "e"], frequency: 1, result: "pesce" },
];

function applyMerges(initial: string[], steps: MergeStep[], count: number): string[] {
  let tokens = [...initial];
  for (let s = 0; s < count; s++) {
    const { pair, result } = steps[s];
    const newTokens: string[] = [];
    let i = 0;
    while (i < tokens.length) {
      if (
        i < tokens.length - 1 &&
        tokens[i] === pair[0] &&
        tokens[i + 1] === pair[1]
      ) {
        newTokens.push(result);
        i += 2;
      } else {
        newTokens.push(tokens[i]);
        i++;
      }
    }
    tokens = newTokens;
  }
  return tokens;
}

export function BPEMergeDemo() {
  const [step, setStep] = useState(0);

  const tokens = useMemo(
    () => applyMerges(INITIAL_TOKENS, MERGE_STEPS, step),
    [step],
  );

  const currentMerge = step < MERGE_STEPS.length ? MERGE_STEPS[step] : null;
  const prevMerge = step > 0 ? MERGE_STEPS[step - 1] : null;

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Come funziona BPE (Byte-Pair Encoding)
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        Parti dai singoli caratteri. A ogni step, la coppia più frequente si fonde in un unico token.
        Clicca &quot;Prossimo merge&quot; per vedere il vocabolario crescere.
      </p>

      {/* Input text */}
      <div className="mb-4 rounded-[var(--radius)] bg-[var(--bg)] p-3 text-sm">
        <span className="text-[var(--ink-faint)]">Testo: </span>
        <span className="font-medium text-[var(--ink)]">&quot;il gatto mangia il pesce&quot;</span>
      </div>

      {/* Current tokens */}
      <div className="mb-4">
        <div className="mb-2 text-xs font-medium text-[var(--ink-muted)]">
          Token attuali ({tokens.length}):
        </div>
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, i) => {
            const isNew = prevMerge && token === prevMerge.result;
            const colorIdx = token.length > 1 ? (token.charCodeAt(0) + token.length) % COLORS.length : -1;
            return (
              <span
                key={`${step}-${i}`}
                className={`inline-block rounded px-1.5 py-0.5 font-mono text-xs transition-all ${
                  token === " "
                    ? "bg-neutral-100 text-neutral-400"
                    : colorIdx >= 0
                      ? COLORS[colorIdx]
                      : "bg-neutral-200 text-neutral-700"
                } ${isNew ? "ring-2 ring-[var(--accent)] ring-offset-1" : ""}`}
              >
                {token === " " ? "⎵" : token}
              </span>
            );
          })}
        </div>
      </div>

      {/* Last merge info */}
      {prevMerge && (
        <div className="mb-4 rounded-[var(--radius)] bg-green-50 p-3 text-xs text-green-800">
          Merge #{step}: <span className="font-mono font-semibold">&quot;{prevMerge.pair[0]}&quot;</span> +{" "}
          <span className="font-mono font-semibold">&quot;{prevMerge.pair[1]}&quot;</span> →{" "}
          <span className="font-mono font-semibold">&quot;{prevMerge.result}&quot;</span>
        </div>
      )}

      {/* Next merge preview */}
      {currentMerge && (
        <div className="mb-4 rounded-[var(--radius)] border border-dashed border-[var(--border)] p-3 text-xs text-[var(--ink-muted)]">
          Prossimo merge:{" "}
          <span className="font-mono font-semibold text-[var(--ink)]">
            &quot;{currentMerge.pair[0]}&quot;
          </span>{" "}
          +{" "}
          <span className="font-mono font-semibold text-[var(--ink)]">
            &quot;{currentMerge.pair[1]}&quot;
          </span>{" "}
          → <span className="font-mono font-semibold text-[var(--accent)]">&quot;{currentMerge.result}&quot;</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setStep(0)}
          disabled={step === 0}
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)] disabled:opacity-30"
        >
          Reset
        </button>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)] disabled:opacity-30"
        >
          ← Indietro
        </button>
        <button
          onClick={() => setStep((s) => Math.min(MERGE_STEPS.length, s + 1))}
          disabled={step >= MERGE_STEPS.length}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Prossimo merge →
        </button>
        <span className="ml-auto text-xs text-[var(--ink-faint)]">
          Step {step}/{MERGE_STEPS.length}
        </span>
      </div>

      {step >= MERGE_STEPS.length && (
        <p className="mt-4 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
          I tokenizer reali ripetono questo processo su miliardi di parole, creando vocabolari
          di 30.000–100.000 token. I pezzi più frequenti (parole comuni, prefissi, suffissi)
          diventano token singoli. Le parole rare restano spezzate in più pezzi.
        </p>
      )}
    </div>
  );
}
