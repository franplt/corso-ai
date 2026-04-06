"use client";

import { useState } from "react";

type LayerInfo = {
  layer: number;
  label: string;
  description: string;
  highlights: Record<string, string>; // word → what the model "sees" at this layer
};

const SENTENCE = ["La", "volpe", "veloce", "salta", "sopra", "il", "cane", "pigro"];

const LAYERS: LayerInfo[] = [
  {
    layer: 1,
    label: "Struttura base",
    description: "Il modello riconosce le relazioni grammaticali fondamentali: articoli con nomi, aggettivi con i sostantivi che modificano.",
    highlights: {
      "La": "articolo → volpe",
      "volpe": "soggetto",
      "veloce": "aggettivo → volpe",
      "salta": "verbo",
      "sopra": "preposizione",
      "il": "articolo → cane",
      "cane": "complemento",
      "pigro": "aggettivo → cane",
    },
  },
  {
    layer: 4,
    label: "Relazioni semantiche",
    description: "Il modello collega il significato: chi fa l'azione? A chi/cosa si riferisce? Capisce che \"veloce\" spiega come salta la volpe.",
    highlights: {
      "La": "la volpe (soggetto)",
      "volpe": "agente dell'azione",
      "veloce": "qualità → salta velocemente",
      "salta": "azione: volpe → cane",
      "sopra": "relazione spaziale",
      "il": "il cane (oggetto)",
      "cane": "destinatario dell'azione",
      "pigro": "contrasto con 'veloce'",
    },
  },
  {
    layer: 8,
    label: "Comprensione profonda",
    description: "Il modello coglie sfumature: il contrasto veloce/pigro, la scena complessiva, il tono della frase. Può prevedere cosa potrebbe seguire.",
    highlights: {
      "La": "contesto narrativo",
      "volpe": "protagonista, animale agile",
      "veloce": "enfasi sulla velocità vs pigrizia",
      "salta": "azione dinamica, scena vivida",
      "sopra": "relazione di superamento",
      "il": "introduce l'antagonista",
      "cane": "antagonista passivo",
      "pigro": "contrasto ironico con la volpe",
    },
  },
  {
    layer: 12,
    label: "Rappresentazione astratta",
    description: "Il modello ha una rappresentazione completa della scena: relazioni, tono, implicazioni. Questa è la rappresentazione usata per generare la risposta.",
    highlights: {
      "La": "pangram classico",
      "volpe": "agente: agilità, furbizia",
      "veloce": "attributo contrastivo",
      "salta": "scena completa codificata",
      "sopra": "gerarchia spaziale",
      "il": "transizione a oggetto",
      "cane": "target: passività, staticità",
      "pigro": "chiusura ironica della scena",
    },
  },
];

export function LayerByLayerDemo() {
  const [layerIdx, setLayerIdx] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const layer = LAYERS[layerIdx];
  const progress = ((layerIdx + 1) / LAYERS.length) * 100;

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Cosa &quot;vede&quot; il modello a ogni livello
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        Passa il mouse sulle parole per vedere come la comprensione del modello si approfondisce a ogni layer del Transformer.
      </p>

      {/* Layer selector */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-[var(--ink)]">Layer {layer.layer}/12</span>
          <span className="font-medium text-[var(--accent)]">{layer.label}</span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-[var(--border)]">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          {LAYERS.map((l, i) => (
            <button
              key={i}
              onClick={() => setLayerIdx(i)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                layerIdx === i
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--ink-muted)] hover:bg-[var(--border)]"
              }`}
            >
              L{l.layer}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-[var(--ink-muted)]">{layer.description}</p>

      {/* Sentence with hover */}
      <div className="mb-3 flex flex-wrap gap-2">
        {SENTENCE.map((word) => (
          <button
            key={word}
            onMouseEnter={() => setHoveredWord(word)}
            onMouseLeave={() => setHoveredWord(null)}
            onClick={() => setHoveredWord(hoveredWord === word ? null : word)}
            className={`rounded-[var(--radius)] border px-3 py-2 text-sm font-medium transition-all ${
              hoveredWord === word
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)] shadow-sm"
                : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink-faint)]"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Highlight info */}
      {hoveredWord && layer.highlights[hoveredWord] && (
        <div className="rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm">
          <span className="font-semibold text-[var(--ink)]">&quot;{hoveredWord}&quot;</span>
          <span className="text-[var(--ink-muted)]"> → {layer.highlights[hoveredWord]}</span>
        </div>
      )}

      {!hoveredWord && (
        <div className="rounded-[var(--radius)] border border-dashed border-[var(--border)] p-3 text-center text-sm text-[var(--ink-faint)]">
          Passa il mouse su una parola per vedere cosa il modello &quot;capisce&quot; a questo livello
        </div>
      )}
    </div>
  );
}
