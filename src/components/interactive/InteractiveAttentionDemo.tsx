"use client";

import { useState, useMemo } from "react";

type Sentence = {
  words: string[];
  // Attention matrix: [focused_word][attending_to] = weight (0-1)
  attention: number[][];
};

const SENTENCES: Sentence[] = [
  {
    words: ["Il", "gatto", "che", "dorme", "sul", "divano", "è", "nero"],
    attention: [
      [0.3, 0.4, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // Il → gatto
      [0.15, 0.2, 0.05, 0.1, 0.05, 0.1, 0.05, 0.3],    // gatto → nero
      [0.05, 0.6, 0.1, 0.15, 0.02, 0.03, 0.02, 0.03],   // che → gatto
      [0.02, 0.35, 0.1, 0.15, 0.1, 0.2, 0.03, 0.05],    // dorme → gatto, divano
      [0.02, 0.05, 0.02, 0.05, 0.15, 0.6, 0.03, 0.08],  // sul → divano
      [0.02, 0.15, 0.02, 0.2, 0.15, 0.2, 0.06, 0.2],    // divano → dorme, nero
      [0.05, 0.45, 0.05, 0.1, 0.02, 0.05, 0.08, 0.2],   // è → gatto, nero
      [0.05, 0.5, 0.03, 0.05, 0.02, 0.05, 0.15, 0.15],  // nero → gatto, è
    ],
  },
  {
    words: ["La", "banca", "vicino", "al", "fiume", "era", "chiusa"],
    attention: [
      [0.3, 0.5, 0.05, 0.05, 0.03, 0.04, 0.03],   // La → banca
      [0.1, 0.15, 0.15, 0.05, 0.1, 0.15, 0.3],     // banca → chiusa, vicino
      [0.03, 0.2, 0.1, 0.15, 0.4, 0.07, 0.05],     // vicino → fiume, banca
      [0.02, 0.05, 0.1, 0.15, 0.6, 0.05, 0.03],    // al → fiume
      [0.02, 0.15, 0.35, 0.1, 0.15, 0.13, 0.1],    // fiume → vicino, banca
      [0.03, 0.3, 0.05, 0.03, 0.1, 0.14, 0.35],    // era → chiusa, banca
      [0.03, 0.45, 0.05, 0.02, 0.05, 0.25, 0.15],  // chiusa → banca, era
    ],
  },
  {
    words: ["Non", "ho", "ancora", "letto", "il", "libro", "che", "mi", "hai", "consigliato"],
    attention: [
      [0.2, 0.3, 0.15, 0.2, 0.02, 0.03, 0.02, 0.03, 0.02, 0.03],  // Non → ho, letto
      [0.15, 0.1, 0.15, 0.35, 0.02, 0.05, 0.02, 0.03, 0.05, 0.08], // ho → letto
      [0.1, 0.1, 0.1, 0.4, 0.02, 0.05, 0.02, 0.03, 0.05, 0.13],   // ancora → letto
      [0.1, 0.1, 0.1, 0.1, 0.1, 0.35, 0.02, 0.03, 0.02, 0.08],    // letto → libro
      [0.02, 0.02, 0.02, 0.05, 0.15, 0.6, 0.02, 0.02, 0.02, 0.08], // il → libro
      [0.02, 0.05, 0.02, 0.2, 0.1, 0.15, 0.1, 0.05, 0.05, 0.26],  // libro → letto, consigliato
      [0.02, 0.03, 0.02, 0.05, 0.05, 0.55, 0.05, 0.05, 0.05, 0.13],// che → libro
      [0.02, 0.05, 0.02, 0.05, 0.02, 0.05, 0.05, 0.1, 0.3, 0.34], // mi → hai, consigliato
      [0.02, 0.1, 0.02, 0.05, 0.02, 0.05, 0.05, 0.15, 0.14, 0.4], // hai → consigliato, mi
      [0.02, 0.05, 0.02, 0.1, 0.02, 0.3, 0.1, 0.15, 0.15, 0.09],  // consigliato → libro, mi, hai
    ],
  },
];

export function InteractiveAttentionDemo() {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [focusedWord, setFocusedWord] = useState<number | null>(null);

  const sentence = SENTENCES[sentenceIdx];
  const weights = focusedWord !== null ? sentence.attention[focusedWord] : null;

  // Find top 2 attended words for explanation
  const topAttended = useMemo(() => {
    if (weights === null || focusedWord === null) return [];
    return weights
      .map((w, i) => ({ word: sentence.words[i], weight: w, index: i }))
      .filter((x) => x.index !== focusedWord)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 2);
  }, [weights, focusedWord, sentence]);

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Meccanismo di attenzione
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Clicca su una parola per vedere a quali altre parole &quot;presta attenzione&quot; il modello per capirne il significato.
      </p>

      {/* Sentence selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {SENTENCES.map((s, i) => (
          <button
            key={i}
            onClick={() => { setSentenceIdx(i); setFocusedWord(null); }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              sentenceIdx === i
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            Frase {i + 1}
          </button>
        ))}
      </div>

      {/* Words */}
      <div className="mb-4 flex flex-wrap gap-2">
        {sentence.words.map((word, i) => {
          const weight = weights ? weights[i] : 0;
          const isFocused = focusedWord === i;
          const opacity = weights ? Math.max(0.15, weight) : 1;

          return (
            <button
              key={i}
              onClick={() => setFocusedWord(focusedWord === i ? null : i)}
              className={`relative rounded-[var(--radius)] border px-3 py-2 text-sm font-medium transition-all ${
                isFocused
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md"
                  : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink-faint)]"
              }`}
              style={
                !isFocused && weights
                  ? {
                      opacity,
                      backgroundColor: weight > 0.15
                        ? `rgba(99, 102, 241, ${weight * 0.3})`
                        : undefined,
                      borderColor: weight > 0.2 ? `rgba(99, 102, 241, ${weight * 0.6})` : undefined,
                    }
                  : undefined
              }
            >
              {word}
              {!isFocused && weights && weight > 0.1 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-indigo-500 px-1 text-[9px] font-bold text-white">
                  {Math.round(weight * 100)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {focusedWord !== null && topAttended.length > 0 && (
        <div className="rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
          Per capire &quot;<strong className="text-[var(--ink)]">{sentence.words[focusedWord]}</strong>&quot;, il modello
          guarda soprattutto a &quot;<strong className="text-[var(--ink)]">{topAttended[0].word}</strong>&quot;
          ({Math.round(topAttended[0].weight * 100)}%)
          {topAttended[1] && topAttended[1].weight > 0.1 && (
            <>
              {" "}e &quot;<strong className="text-[var(--ink)]">{topAttended[1].word}</strong>&quot;
              ({Math.round(topAttended[1].weight * 100)}%)
            </>
          )}.
        </div>
      )}

      {focusedWord === null && (
        <div className="rounded-[var(--radius)] border border-dashed border-[var(--border)] p-3 text-center text-sm text-[var(--ink-faint)]">
          Clicca su una parola per esplorare i pesi dell&apos;attenzione
        </div>
      )}
    </div>
  );
}
