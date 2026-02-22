"use client";

import { useState, useMemo } from "react";

// Simplified BPE-inspired tokenizer for Italian/English text.
// Uses a vocabulary of common patterns to demonstrate the concept.
const COMMON_WORDS = new Set([
  "il", "la", "lo", "le", "i", "gli", "un", "una", "uno",
  "di", "a", "da", "in", "con", "su", "per", "tra", "fra",
  "che", "è", "e", "o", "ma", "se", "non", "si", "mi",
  "ho", "ha", "hai", "hanno", "sono", "sei", "siamo", "siete",
  "the", "a", "an", "is", "are", "was", "be", "to", "of", "in",
  "and", "or", "but", "not", "with", "for", "on", "at", "by",
  "questo", "questa", "questi", "queste", "quello", "quella",
  "come", "cosa", "dove", "quando", "chi", "perché", "quale",
  "AI", "GPT", "LLM", "RAG", "API",
]);

const COMMON_PREFIXES = [
  "trans", "pre", "post", "inter", "super", "auto", "anti", "semi",
  "micro", "macro", "multi", "under", "over", "sub",
  "co", "re", "dis", "un", "in", "im", "ir",
];

const COMMON_SUFFIXES = [
  "zione", "mento", "tore", "trice", "ista", "ismo", "ità",
  "ibile", "abile", "mente", "ando", "endo", "ato", "uto", "ito",
  "tion", "ment", "ness", "tion", "ing", "ed", "er", "ful", "less",
];

function tokenize(text: string): string[] {
  if (!text.trim()) return [];
  const tokens: string[] = [];

  // Split on whitespace and punctuation, keeping them
  const rawParts = text.split(/(\s+|[.,;:!?'"()\[\]{}<>\/\\@#$%^&*+=|~`])/);

  for (const part of rawParts) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      // spaces: merge into next token or show as a token
      if (tokens.length > 0) {
        tokens[tokens.length - 1] = tokens[tokens.length - 1] + part.replace(/\n/g, "↵");
      }
      continue;
    }
    if (/^[.,;:!?'"()\[\]{}<>\/\\@#$%^&*+=|~`]$/.test(part)) {
      tokens.push(part);
      continue;
    }

    // Word: decide if it's a single token or gets split
    const word = part;
    const lower = word.toLowerCase();

    if (COMMON_WORDS.has(word) || COMMON_WORDS.has(lower) || word.length <= 3) {
      tokens.push(word);
      continue;
    }

    // Try to split long/rare words into subword tokens
    let remainder = word;
    const wordTokens: string[] = [];

    // Try prefix
    for (const prefix of COMMON_PREFIXES) {
      if (remainder.toLowerCase().startsWith(prefix) && remainder.length > prefix.length + 2) {
        wordTokens.push(remainder.slice(0, prefix.length));
        remainder = remainder.slice(prefix.length);
        break;
      }
    }

    // Try suffix
    let suffixFound = false;
    for (const suffix of COMMON_SUFFIXES) {
      if (remainder.toLowerCase().endsWith(suffix) && remainder.length > suffix.length + 2) {
        const stem = remainder.slice(0, remainder.length - suffix.length);
        if (stem.length >= 2) {
          wordTokens.push(stem);
          wordTokens.push(suffix);
          suffixFound = true;
          break;
        }
      }
    }

    if (!suffixFound && wordTokens.length === 0) {
      // Just split long words at roughly syllable boundaries
      if (remainder.length > 8) {
        const mid = Math.ceil(remainder.length / 2);
        wordTokens.push(remainder.slice(0, mid));
        wordTokens.push(remainder.slice(mid));
      } else {
        wordTokens.push(remainder);
      }
    } else if (!suffixFound) {
      wordTokens.push(remainder);
    }

    tokens.push(...wordTokens);
  }

  return tokens.filter(Boolean);
}

const TOKEN_COLORS = [
  "bg-orange-100 text-orange-800 border-orange-300",
  "bg-blue-100 text-blue-800 border-blue-300",
  "bg-violet-100 text-violet-800 border-violet-300",
  "bg-emerald-100 text-emerald-800 border-emerald-300",
  "bg-rose-100 text-rose-800 border-rose-300",
  "bg-amber-100 text-amber-800 border-amber-300",
  "bg-cyan-100 text-cyan-800 border-cyan-300",
];

const EXAMPLES = [
  "Ciao, come stai?",
  "Il modello di intelligenza artificiale elabora i dati.",
  "ChatGPT è un large language model.",
  "La tokenizzazione trasforma il testo in numeri.",
];

export function TokenizerDemo() {
  const [input, setInput] = useState(EXAMPLES[0]);
  const tokens = useMemo(() => tokenize(input), [input]);

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Demo interattiva: prova il tokenizzatore</p>
      <p className="mb-3 text-sm text-[var(--ink-muted)]">
        Scrivi qualsiasi testo e guarda come viene suddiviso in token. Ogni colore è un token diverso.
      </p>

      {/* Example buttons */}
      <div className="mb-3 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setInput(ex)}
            className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {ex.length > 28 ? ex.slice(0, 28) + "…" : ex}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
        placeholder="Scrivi qui il tuo testo…"
        className="input mb-4 resize-none text-sm"
        style={{ fontFamily: "inherit" }}
      />

      {/* Token visualization */}
      {tokens.length > 0 && (
        <div className="mb-4 rounded-[var(--radius)] bg-[var(--bg)] p-4">
          <div className="flex flex-wrap gap-1">
            {tokens.map((token, i) => (
              <span
                key={i}
                className={`inline-block rounded border px-1.5 py-0.5 font-mono text-xs font-semibold ${TOKEN_COLORS[i % TOKEN_COLORS.length]}`}
                title={`Token ${i + 1}: "${token}"`}
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-2xl font-heading font-bold text-[var(--accent)]">{tokens.length}</p>
          <p className="text-xs text-[var(--ink-muted)]">token</p>
        </div>
        <div>
          <p className="text-2xl font-heading font-bold text-[var(--ink)]">
            {input.trim().split(/\s+/).filter(Boolean).length}
          </p>
          <p className="text-xs text-[var(--ink-muted)]">parole</p>
        </div>
        <div>
          <p className="text-2xl font-heading font-bold text-[var(--ink)]">
            {input.length}
          </p>
          <p className="text-xs text-[var(--ink-muted)]">caratteri</p>
        </div>
      </div>

      <p className="diagram-caption">
        Nota: questo è un tokenizzatore semplificato a scopo didattico. I tokenizzatori reali (come BPE di OpenAI) usano vocabolari appresi su trilioni di parole e producono risultati diversi.
      </p>
    </div>
  );
}
