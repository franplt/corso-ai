"use client";

import { useState, useMemo } from "react";

type Word = {
  label: string;
  x: number;
  y: number;
  cluster: string;
};

const WORDS: Word[] = [
  // Royalty / Gender
  { label: "re", x: 0.72, y: 0.82, cluster: "royalty" },
  { label: "regina", x: 0.85, y: 0.75, cluster: "royalty" },
  { label: "principe", x: 0.68, y: 0.7, cluster: "royalty" },
  { label: "principessa", x: 0.82, y: 0.63, cluster: "royalty" },
  // Gender
  { label: "uomo", x: 0.35, y: 0.78, cluster: "people" },
  { label: "donna", x: 0.48, y: 0.71, cluster: "people" },
  { label: "ragazzo", x: 0.3, y: 0.65, cluster: "people" },
  { label: "ragazza", x: 0.43, y: 0.58, cluster: "people" },
  // Animals
  { label: "gatto", x: 0.2, y: 0.35, cluster: "animals" },
  { label: "gatta", x: 0.28, y: 0.28, cluster: "animals" },
  { label: "cane", x: 0.15, y: 0.42, cluster: "animals" },
  // Cities / Countries
  { label: "Roma", x: 0.65, y: 0.25, cluster: "places" },
  { label: "Italia", x: 0.72, y: 0.18, cluster: "places" },
  { label: "Parigi", x: 0.58, y: 0.3, cluster: "places" },
  { label: "Francia", x: 0.65, y: 0.12, cluster: "places" },
];

const CLUSTER_COLORS: Record<string, string> = {
  royalty: "#8b5cf6",
  people: "#3b82f6",
  animals: "#10b981",
  places: "#f59e0b",
};

const PRESETS = [
  { a: "re", b: "uomo", c: "donna", expected: "regina", description: "re - uomo + donna ≈ regina" },
  { a: "Roma", b: "Italia", c: "Francia", expected: "Parigi", description: "Roma - Italia + Francia ≈ Parigi" },
  { a: "principe", b: "ragazzo", c: "ragazza", expected: "principessa", description: "principe - ragazzo + ragazza ≈ principessa" },
  { a: "gatto", b: "gatto", c: "cane", expected: "cane", description: "gatto - gatto + cane ≈ cane" },
];

function findWord(label: string): Word | undefined {
  return WORDS.find((w) => w.label === label);
}

function computeResult(a: string, b: string, c: string): { x: number; y: number; nearest: string } {
  const wa = findWord(a);
  const wb = findWord(b);
  const wc = findWord(c);
  if (!wa || !wb || !wc) return { x: 0.5, y: 0.5, nearest: "?" };

  const rx = wa.x - wb.x + wc.x;
  const ry = wa.y - wb.y + wc.y;

  // Find nearest word (excluding the three input words)
  let minDist = Infinity;
  let nearest = "?";
  for (const w of WORDS) {
    if (w.label === a || w.label === b || w.label === c) continue;
    const dist = Math.sqrt((w.x - rx) ** 2 + (w.y - ry) ** 2);
    if (dist < minDist) {
      minDist = dist;
      nearest = w.label;
    }
  }

  return { x: Math.max(0, Math.min(1, rx)), y: Math.max(0, Math.min(1, ry)), nearest };
}

export function VectorArithmeticDemo() {
  const [wordA, setWordA] = useState("re");
  const [wordB, setWordB] = useState("uomo");
  const [wordC, setWordC] = useState("donna");

  const result = useMemo(() => computeResult(wordA, wordB, wordC), [wordA, wordB, wordC]);

  const SVG_W = 400;
  const SVG_H = 300;
  const PAD = 30;

  function toSvg(x: number, y: number): [number, number] {
    return [PAD + x * (SVG_W - 2 * PAD), PAD + (1 - y) * (SVG_H - 2 * PAD)];
  }

  const wA = findWord(wordA);
  const wB = findWord(wordB);
  const wC = findWord(wordC);

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Aritmetica vettoriale
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Se i significati sono coordinate, si possono sommare e sottrarre. Prova le combinazioni preset o scegli le tue parole.
      </p>

      {/* Presets */}
      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.description}
            onClick={() => { setWordA(p.a); setWordB(p.b); setWordC(p.c); }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              wordA === p.a && wordB === p.b && wordC === p.c
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            {p.description}
          </button>
        ))}
      </div>

      {/* Selectors */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <WordSelect value={wordA} onChange={setWordA} />
        <span className="text-lg font-semibold text-[var(--ink-muted)]">−</span>
        <WordSelect value={wordB} onChange={setWordB} />
        <span className="text-lg font-semibold text-[var(--ink-muted)]">+</span>
        <WordSelect value={wordC} onChange={setWordC} />
        <span className="text-lg font-semibold text-[var(--ink-muted)]">≈</span>
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-semibold text-white">
          {result.nearest}
        </span>
      </div>

      {/* SVG Map */}
      <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)]">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" role="img" aria-label="Spazio vettoriale 2D con aritmetica">
          {/* All words */}
          {WORDS.map((w) => {
            const [cx, cy] = toSvg(w.x, w.y);
            const isInput = w.label === wordA || w.label === wordB || w.label === wordC;
            const isResult = w.label === result.nearest;
            return (
              <g key={w.label}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isInput || isResult ? 5 : 3}
                  fill={isResult ? "var(--accent)" : CLUSTER_COLORS[w.cluster]}
                  opacity={isInput || isResult ? 1 : 0.4}
                />
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  className="text-[9px]"
                  fill={isInput || isResult ? "var(--ink)" : "var(--ink-faint)"}
                  fontWeight={isInput || isResult ? 600 : 400}
                >
                  {w.label}
                </text>
              </g>
            );
          })}

          {/* Arrows: A→B (subtract), C→result (add) */}
          {wA && wB && wC && (
            <>
              {/* Arrow from A to B (red, subtraction) */}
              <line
                x1={toSvg(wA.x, wA.y)[0]}
                y1={toSvg(wA.x, wA.y)[1]}
                x2={toSvg(wB.x, wB.y)[0]}
                y2={toSvg(wB.x, wB.y)[1]}
                stroke="#ef4444"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                opacity={0.6}
              />
              {/* Arrow from C to result (green, addition) */}
              <line
                x1={toSvg(wC.x, wC.y)[0]}
                y1={toSvg(wC.x, wC.y)[1]}
                x2={toSvg(result.x, result.y)[0]}
                y2={toSvg(result.x, result.y)[1]}
                stroke="#10b981"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                opacity={0.6}
              />
              {/* Result point */}
              <circle
                cx={toSvg(result.x, result.y)[0]}
                cy={toSvg(result.x, result.y)[1]}
                r={6}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2}
              />
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--ink-faint)]">
        {Object.entries(CLUSTER_COLORS).map(([cluster, color]) => (
          <div key={cluster} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            {cluster === "royalty" ? "Regalità" : cluster === "people" ? "Persone" : cluster === "animals" ? "Animali" : "Luoghi"}
          </div>
        ))}
      </div>
    </div>
  );
}

function WordSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-sm font-medium text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
    >
      {WORDS.map((w) => (
        <option key={w.label} value={w.label}>
          {w.label}
        </option>
      ))}
    </select>
  );
}
