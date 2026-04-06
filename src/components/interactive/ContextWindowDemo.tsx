"use client";

import { useState, useMemo } from "react";

const MODELS = [
  { name: "GPT-3.5", tokens: 16_384, color: "#10b981" },
  { name: "GPT-4o", tokens: 128_000, color: "#3b82f6" },
  { name: "Claude 3.5", tokens: 200_000, color: "#d97706" },
  { name: "Gemini 1.5", tokens: 1_000_000, color: "#8b5cf6" },
];

const PRESETS = [
  { label: "Un tweet", text: "L'intelligenza artificiale non è magia, è matematica applicata su scala enorme." },
  { label: "Un'email", text: "Gentile dott. Rossi,\n\nLe scrivo per confermare la nostra riunione di giovedì 15 marzo alle ore 10:00 presso la sala riunioni al terzo piano.\n\nL'ordine del giorno prevede:\n1. Revisione del budget Q1\n2. Aggiornamento sul progetto Alpha\n3. Pianificazione attività Q2\n\nLe chiedo gentilmente di confermare la sua partecipazione entro mercoledì.\n\nCordiali saluti,\nMaria Bianchi" },
  { label: "Un paragrafo tecnico", text: "Il Transformer utilizza un meccanismo chiamato self-attention che permette a ogni token nella sequenza di calcolare un punteggio di rilevanza rispetto a tutti gli altri token. Questo avviene attraverso tre trasformazioni lineari — query, key e value — che producono vettori utilizzati per determinare quanto ogni parola sia importante per comprendere ogni altra parola nel contesto. A differenza delle reti ricorrenti, questo calcolo avviene in parallelo per tutti i token contemporaneamente, rendendo il Transformer molto più veloce da addestrare su hardware moderno." },
];

// Simple tokenizer approximation: ~1.3 tokens per word for Italian
function estimateTokens(text: string): number {
  if (!text.trim()) return 0;
  const words = text.trim().split(/\s+/).length;
  return Math.round(words * 1.3);
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

export function ContextWindowDemo() {
  const [text, setText] = useState(PRESETS[2].text);

  const tokens = useMemo(() => estimateTokens(text), [text]);
  const words = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  const chars = text.length;

  // Estimated cost per 1M input tokens (approximate, USD)
  const costPer1M: Record<string, number> = {
    "GPT-3.5": 0.5,
    "GPT-4o": 2.5,
    "Claude 3.5": 3.0,
    "Gemini 1.5": 1.25,
  };

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Quanto spazio occupa il tuo testo?
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Scrivi o incolla un testo e vedi quanti token occupa nella finestra di contesto di ogni modello.
      </p>

      {/* Presets */}
      <div className="mb-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setText(p.text)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              text === p.text
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-4 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:outline-none"
        rows={4}
        placeholder="Scrivi qualcosa..."
      />

      {/* Stats */}
      <div className="mb-5 flex gap-6 text-sm">
        <div>
          <span className="text-[var(--ink-muted)]">Parole: </span>
          <span className="font-semibold text-[var(--ink)]">{words}</span>
        </div>
        <div>
          <span className="text-[var(--ink-muted)]">Caratteri: </span>
          <span className="font-semibold text-[var(--ink)]">{chars}</span>
        </div>
        <div>
          <span className="text-[var(--ink-muted)]">Token (stima): </span>
          <span className="font-semibold text-[var(--ink)]">~{tokens}</span>
        </div>
      </div>

      {/* Model bars */}
      <div className="space-y-3">
        {MODELS.map((model) => {
          const pct = Math.min((tokens / model.tokens) * 100, 100);
          const cost = (tokens / 1_000_000) * (costPer1M[model.name] ?? 0);
          return (
            <div key={model.name}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--ink)]">{model.name}</span>
                <span className="text-[var(--ink-muted)]">
                  {tokens.toLocaleString()} / {formatNumber(model.tokens)} token
                  {cost > 0 && ` · $${cost < 0.01 ? "<0.01" : cost.toFixed(4)}`}
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-[var(--border)]">
                <div
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(pct, tokens > 0 ? 0.5 : 0)}%`,
                    backgroundColor: model.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {tokens > 0 && (
        <p className="mt-4 text-xs text-[var(--ink-faint)]">
          Stima basata su ~1.3 token per parola italiana. I conteggi reali dipendono dal tokenizer specifico di ogni modello.
        </p>
      )}
    </div>
  );
}
