"use client";

import { useState, useMemo } from "react";

const TOKENS = [
  { token: "tavolo", prob: 0.28 },
  { token: "divano", prob: 0.22 },
  { token: "letto", prob: 0.16 },
  { token: "muro", prob: 0.10 },
  { token: "tetto", prob: 0.08 },
  { token: "pavimento", prob: 0.05 },
  { token: "balcone", prob: 0.03 },
  { token: "mobile", prob: 0.025 },
  { token: "frigorifero", prob: 0.02 },
  { token: "termosifone", prob: 0.015 },
  { token: "camino", prob: 0.01 },
  { token: "scaffale", prob: 0.005 },
];

export function TopKTopPDemo() {
  const [topK, setTopK] = useState(5);
  const [topP, setTopP] = useState(0.9);
  const [mode, setMode] = useState<"top-k" | "top-p">("top-k");

  const filtered = useMemo(() => {
    if (mode === "top-k") {
      return TOKENS.map((t, i) => ({
        ...t,
        included: i < topK,
      }));
    } else {
      let cumulative = 0;
      return TOKENS.map((t) => {
        const wasBelow = cumulative < topP;
        cumulative += t.prob;
        return { ...t, included: wasBelow };
      });
    }
  }, [mode, topK, topP]);

  const includedCount = filtered.filter((t) => t.included).length;
  const includedProb = filtered
    .filter((t) => t.included)
    .reduce((sum, t) => sum + t.prob, 0);

  const maxProb = TOKENS[0].prob;

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Top-k e Top-p: filtrare i token
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Dopo &quot;Il gatto salta sul...&quot;, il modello calcola la probabilità di ogni possibile
        prossimo token. Top-k e top-p decidono tra quanti token scegliere.
      </p>

      {/* Mode toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode("top-k")}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            mode === "top-k"
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
          }`}
        >
          Top-k
        </button>
        <button
          onClick={() => setMode("top-p")}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            mode === "top-p"
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
          }`}
        >
          Top-p (nucleus)
        </button>
      </div>

      {/* Slider */}
      <div className="mb-5">
        {mode === "top-k" ? (
          <>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[var(--ink-muted)]">
                Considera solo i top <strong className="text-[var(--ink)]">{topK}</strong> token
              </span>
              <span className="text-[var(--ink-faint)]">{includedCount} inclusi</span>
            </div>
            <input
              type="range"
              min={1}
              max={TOKENS.length}
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--ink-faint)]">
              <span>1 (solo il migliore)</span>
              <span>{TOKENS.length} (tutti)</span>
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[var(--ink-muted)]">
                Includi token finché la probabilità cumulativa raggiunge <strong className="text-[var(--ink)]">{(topP * 100).toFixed(0)}%</strong>
              </span>
              <span className="text-[var(--ink-faint)]">{includedCount} inclusi</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={topP * 100}
              onChange={(e) => setTopP(Number(e.target.value) / 100)}
              className="w-full accent-[var(--accent)]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--ink-faint)]">
              <span>10% (molto selettivo)</span>
              <span>100% (tutti)</span>
            </div>
          </>
        )}
      </div>

      {/* Token bars */}
      <div className="space-y-1.5">
        {filtered.map((t) => (
          <div
            key={t.token}
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              t.included ? "opacity-100" : "opacity-25"
            }`}
          >
            <span className={`w-24 text-right font-mono text-xs ${t.included ? "font-medium text-[var(--ink)]" : "text-[var(--ink-faint)]"}`}>
              {t.token}
            </span>
            <div className="h-5 flex-1 rounded bg-[var(--border)]">
              <div
                className={`h-5 rounded transition-all duration-300 ${
                  t.included ? "bg-[var(--accent)]" : "bg-[var(--ink-faint)]"
                }`}
                style={{ width: `${(t.prob / maxProb) * 100}%` }}
              />
            </div>
            <span className={`w-10 text-right text-xs ${t.included ? "font-medium text-[var(--ink)]" : "text-[var(--ink-faint)]"}`}>
              {(t.prob * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
        {mode === "top-k" ? (
          <>
            <strong className="text-[var(--ink)]">Top-{topK}</strong>: il modello sceglie solo tra
            i {includedCount} token più probabili (che coprono il{" "}
            {(includedProb * 100).toFixed(0)}% della probabilità totale).
            {topK <= 2 && " Molto conservativo: poca varietà nelle risposte."}
            {topK >= 8 && " Molto permissivo: più creatività ma rischio di token improbabili."}
          </>
        ) : (
          <>
            <strong className="text-[var(--ink)]">Top-p = {topP.toFixed(2)}</strong>: il modello
            include token finché la probabilità cumulativa raggiunge il {(topP * 100).toFixed(0)}%.
            Risultato: {includedCount} token inclusi.
            {topP <= 0.5 && " Molto selettivo: solo i token più sicuri."}
            {topP >= 0.95 && " Quasi tutti inclusi: massima varietà."}
          </>
        )}
      </div>
    </div>
  );
}
