"use client";

import { useState } from "react";

// Pre-computed similarity pairs (cosine similarity approximation for demo)
// Words are mapped to clusters to simulate semantic proximity
type WordEntry = {
  word: string;
  x: number; // 2D projection for mini map (0-100)
  y: number;
  cluster: "animals" | "cities" | "tech" | "food" | "emotions";
};

const WORDS: WordEntry[] = [
  // Animals
  { word: "cane",     x: 20, y: 25, cluster: "animals" },
  { word: "dog",      x: 22, y: 23, cluster: "animals" },
  { word: "gatto",    x: 26, y: 30, cluster: "animals" },
  { word: "cat",      x: 28, y: 28, cluster: "animals" },
  { word: "cavallo",  x: 18, y: 35, cluster: "animals" },
  // Cities
  { word: "Roma",     x: 72, y: 20, cluster: "cities" },
  { word: "Milano",   x: 76, y: 24, cluster: "cities" },
  { word: "Parigi",   x: 70, y: 28, cluster: "cities" },
  { word: "Londra",   x: 78, y: 18, cluster: "cities" },
  // Tech
  { word: "computer", x: 45, y: 70, cluster: "tech" },
  { word: "modello",  x: 50, y: 72, cluster: "tech" },
  { word: "AI",       x: 48, y: 66, cluster: "tech" },
  { word: "token",    x: 54, y: 74, cluster: "tech" },
  // Food
  { word: "pizza",    x: 25, y: 72, cluster: "food" },
  { word: "pasta",    x: 28, y: 76, cluster: "food" },
  { word: "cibo",     x: 22, y: 80, cluster: "food" },
  // Emotions
  { word: "amore",    x: 72, y: 72, cluster: "emotions" },
  { word: "felicità", x: 76, y: 68, cluster: "emotions" },
  { word: "tristezza",x: 68, y: 76, cluster: "emotions" },
];

const CLUSTER_COLORS: Record<string, string> = {
  animals:  "#059669",
  cities:   "#0284c7",
  tech:     "#b45309",
  food:     "#dc2626",
  emotions: "#7c3aed",
};

function getSimilarity(a: WordEntry, b: WordEntry): number {
  if (a.word === b.word) return 1.0;
  // Same cluster → high similarity
  if (a.cluster === b.cluster) {
    // Same language bonus
    const aLang = /^[a-z]$/.test(a.word[0]) && a.word === a.word.toLowerCase() ? "en" : "it";
    const bLang = /^[a-z]$/.test(b.word[0]) && b.word === b.word.toLowerCase() ? "en" : "it";
    const sameLang = aLang === bLang;
    const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    return Math.max(0.7, 0.98 - dist * 0.015 + (sameLang ? 0 : -0.02));
  }
  // Different cluster → low similarity
  const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  return Math.max(0.01, 0.35 - dist * 0.004);
}

function SimilarityBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value > 0.8 ? "#059669" : value > 0.5 ? "#b45309" : "#9c9590";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 overflow-hidden rounded-full bg-[var(--border)]" style={{ height: 10 }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="w-10 text-right font-mono text-sm font-bold" style={{ color }}>
        {value.toFixed(2)}
      </span>
    </div>
  );
}

export function EmbeddingExplorer() {
  const [wordA, setWordA] = useState<string>("cane");
  const [wordB, setWordB] = useState<string>("dog");

  const entryA = WORDS.find((w) => w.word === wordA);
  const entryB = WORDS.find((w) => w.word === wordB);
  const similarity = entryA && entryB ? getSimilarity(entryA, entryB) : null;

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Esplora le similarità — embedding in azione</p>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Seleziona due parole e osserva quanto sono &quot;vicine&quot; nello spazio semantico. Nota come <strong>cane</strong> e <strong>dog</strong> siano quasi identici — lingue diverse, stesso concetto.
      </p>

      {/* Word selectors */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        {(["A", "B"] as const).map((side) => {
          const selected = side === "A" ? wordA : wordB;
          const setSelected = side === "A" ? setWordA : setWordB;
          return (
            <div key={side}>
              <p className="label">Parola {side}</p>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="input text-sm"
              >
                {WORDS.map((w) => (
                  <option key={w.word} value={w.word}>
                    {w.word}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Similarity score */}
      {similarity !== null && (
        <div className="mb-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
            Similarità coseno tra &quot;{wordA}&quot; e &quot;{wordB}&quot;
          </p>
          <SimilarityBar value={similarity} />
          <p className="mt-2 text-xs text-[var(--ink-muted)]">
            {similarity > 0.9
              ? "Praticamente la stessa parola — stesso concetto, forse lingue diverse."
              : similarity > 0.7
              ? "Molto simili — stesso dominio semantico."
              : similarity > 0.4
              ? "Correlate ma distanti — concetti diversi con qualche legame."
              : "Quasi nessuna relazione semantica."}
          </p>
        </div>
      )}

      {/* 2D Map */}
      <div>
        <p className="label mb-2">Mappa 2D (proiezione semplificata)</p>
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)]" style={{ paddingBottom: "60%" }}>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Connection line */}
            {entryA && entryB && (
              <line
                x1={entryA.x} y1={entryA.y}
                x2={entryB.x} y2={entryB.y}
                stroke="var(--accent)"
                strokeWidth="0.5"
                strokeDasharray="2,1.5"
                opacity="0.6"
              />
            )}
            {/* All dots */}
            {WORDS.map((w) => {
              const isSelected = w.word === wordA || w.word === wordB;
              const color = CLUSTER_COLORS[w.cluster];
              return (
                <g key={w.word}>
                  <circle
                    cx={w.x} cy={w.y}
                    r={isSelected ? 2.5 : 1.5}
                    fill={color}
                    opacity={isSelected ? 1 : 0.4}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (wordA !== w.word) setWordA(w.word);
                      else setWordB(w.word);
                    }}
                  />
                  {isSelected && (
                    <text
                      x={w.x + 3} y={w.y + 1}
                      fontSize="4"
                      fill={color}
                      fontWeight="600"
                    >
                      {w.word}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-1">
            {Object.entries(CLUSTER_COLORS).map(([cluster, color]) => (
              <span key={cluster} className="flex items-center gap-1 text-[9px] text-[var(--ink-faint)]">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
                {cluster}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-1 text-xs text-[var(--ink-faint)]">
          Clicca su un punto per selezionarlo. I colori raggruppano le parole per dominio semantico.
        </p>
      </div>

      <p className="diagram-caption">
        Gli embedding sono vettori di 1.000+ dimensioni — questa è una proiezione in 2D. Nonostante la semplificazione, il principio è reale: parole semanticamente simili finiscono vicine nello spazio, indipendentemente dalla lingua.
      </p>
    </div>
  );
}
