"use client";

import { useState } from "react";

type Example = {
  prompt: string;
  responses: {
    low: string[];    // temp ~0.1–0.3: deterministic, conservative
    medium: string[]; // temp ~0.7–0.8: balanced
    high: string[];   // temp ~1.4–2.0: creative, chaotic
  };
};

const EXAMPLES: Example[] = [
  {
    prompt: "La capitale d'Italia è…",
    responses: {
      low: ["Roma.", "Roma, fondata nel 753 a.C.", "Roma, sede del governo italiano."],
      medium: ["Roma, una città ricca di storia e cultura.", "Roma — la città eterna.", "Roma, cuore politico e culturale d'Italia."],
      high: ["Roma! O forse Venezia nell'anima?", "Roma… anche se Napoli ha il cuore del paese.", "Roma, ma ogni città italiana è una capitale a modo suo."],
    },
  },
  {
    prompt: "Completa: 'L'intelligenza artificiale…'",
    responses: {
      low: [
        "è una branca dell'informatica che studia la creazione di sistemi in grado di eseguire compiti che richiedono intelligenza umana.",
        "è un campo tecnologico che mira a replicare capacità cognitive umane nelle macchine.",
        "include tecniche come machine learning e deep learning per automatizzare compiti complessi.",
      ],
      medium: [
        "sta trasformando il modo in cui lavoriamo e interagiamo con il mondo.",
        "non è né magica né omnisciente — ma è uno strumento potentissimo nelle mani giuste.",
        "apprende dai dati e migliora con l'esperienza, come farebbe un umano.",
      ],
      high: [
        "è uno specchio strano — riflette tutto ciò che l'umanità ha scritto, bene e male.",
        "non sogna, ma sogna di sognare attraverso miliardi di testi umani.",
        "è il jazz dei computer: improvvisazione su strutture apprese.",
      ],
    },
  },
  {
    prompt: "Come si chiama il cane?",
    responses: {
      low: ["Non ho abbastanza contesto per rispondere.", "Potresti fornire maggiori informazioni?", "Non è specificato nel testo fornito."],
      medium: ["Dipende dal contesto — non mi hai dato informazioni sul cane!", "Buona domanda! Di quale cane stai parlando?", "Non lo so — ma mi piacerebbe saperlo!"],
      high: ["Forse Pulce? O Vento? I cani migliori hanno nomi buffi.", "Dipende! Ogni cane merita un nome che racconta una storia.", "Boh, però scommetto che è un bel nome con molte vocali."],
    },
  },
];

function getResponse(example: Example, temperature: number): string {
  const tier = temperature <= 0.4 ? "low" : temperature <= 1.0 ? "medium" : "high";
  const options = example.responses[tier];
  // Use temperature as a seed for variety, but consistently
  const idx = Math.floor((temperature * 7.3 + 1) % options.length);
  return options[idx];
}

function getTempLabel(t: number): { label: string; color: string; description: string } {
  if (t <= 0.3) return { label: "Deterministico", color: "#0284c7", description: "Sempre la risposta più probabile" };
  if (t <= 0.7) return { label: "Bilanciato", color: "#059669", description: "Variato ma coerente" };
  if (t <= 1.2) return { label: "Creativo", color: "#b45309", description: "Più variazione nelle scelte" };
  return { label: "Caotico", color: "#dc2626", description: "Alta casualità, bassa coerenza" };
}

export function TemperatureDemo() {
  const [temperature, setTemperature] = useState(0.7);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [rerollSeed, setRerollSeed] = useState(0);

  const example = EXAMPLES[exampleIdx];
  const response = getResponse(example, temperature + rerollSeed * 0.01);
  const { label, color, description } = getTempLabel(temperature);

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Demo interattiva: effetto della temperatura</p>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        La temperatura controlla quanto il modello è &quot;avventuroso&quot; nelle sue scelte. Muovi il cursore e osserva come cambia la risposta.
      </p>

      {/* Prompt selector */}
      <div className="mb-4">
        <p className="label mb-2">Prompt di esempio</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => setExampleIdx(i)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                i === exampleIdx
                  ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {ex.prompt.length > 30 ? ex.prompt.slice(0, 30) + "…" : ex.prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Temperature slider */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="label mb-0">Temperatura</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold" style={{ color }}>
              {temperature.toFixed(1)}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ background: `${color}20`, color }}
            >
              {label}
            </span>
          </div>
        </div>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="temperature-slider w-full"
          style={{ accentColor: color }}
        />
        <div className="mt-1 flex justify-between text-[10px] text-[var(--ink-faint)]">
          <span>0.1 — preciso</span>
          <span>0.7 — bilanciato</span>
          <span>2.0 — creativo</span>
        </div>
        <p className="mt-1.5 text-xs text-[var(--ink-muted)]">{description}</p>
      </div>

      {/* Response preview */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
          Prompt
        </p>
        <p className="mb-3 text-sm font-medium text-[var(--ink)]">{example.prompt}</p>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
          Risposta generata (temp {temperature.toFixed(1)})
        </p>
        <p className="text-sm leading-relaxed text-[var(--ink)]">{response}</p>
      </div>

      <button
        onClick={() => setRerollSeed((s) => s + 1)}
        className="btn btn-secondary btn-sm mt-3"
      >
        Genera un&apos;altra risposta →
      </button>

      <p className="diagram-caption">
        Con temperatura bassa, il modello sceglie quasi sempre il token più probabile — risposte prevedibili ma sicure. Con temperatura alta, esplora scelte meno probabili — più creatività, ma anche più errori.
      </p>
    </div>
  );
}
