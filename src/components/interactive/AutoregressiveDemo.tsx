"use client";

import { useState, useRef, useEffect } from "react";

type GenerationStep = {
  token: string;
  probabilities: { token: string; prob: number }[];
};

type Scenario = {
  prompt: string;
  steps: GenerationStep[];
};

const SCENARIOS: Scenario[] = [
  {
    prompt: "Il gatto salta sul",
    steps: [
      { token: " tavolo", probabilities: [{ token: "tavolo", prob: 0.32 }, { token: "divano", prob: 0.28 }, { token: "letto", prob: 0.18 }, { token: "muro", prob: 0.12 }, { token: "tetto", prob: 0.10 }] },
      { token: " e", probabilities: [{ token: "e", prob: 0.45 }, { token: ",", prob: 0.20 }, { token: ".", prob: 0.15 }, { token: "per", prob: 0.12 }, { token: "dove", prob: 0.08 }] },
      { token: " fa", probabilities: [{ token: "fa", prob: 0.25 }, { token: "si", prob: 0.22 }, { token: "rovescia", prob: 0.20 }, { token: "miagola", prob: 0.18 }, { token: "guarda", prob: 0.15 }] },
      { token: " cadere", probabilities: [{ token: "cadere", prob: 0.35 }, { token: "le", prob: 0.22 }, { token: "un", prob: 0.18 }, { token: "rumore", prob: 0.15 }, { token: "fusa", prob: 0.10 }] },
      { token: " un", probabilities: [{ token: "un", prob: 0.55 }, { token: "il", prob: 0.20 }, { token: "tutto", prob: 0.12 }, { token: "la", prob: 0.08 }, { token: "i", prob: 0.05 }] },
      { token: " vaso", probabilities: [{ token: "vaso", prob: 0.40 }, { token: "bicchiere", prob: 0.25 }, { token: "piatto", prob: 0.15 }, { token: "libro", prob: 0.12 }, { token: "oggetto", prob: 0.08 }] },
      { token: ".", probabilities: [{ token: ".", prob: 0.65 }, { token: " di", prob: 0.15 }, { token: ",", prob: 0.10 }, { token: " che", prob: 0.06 }, { token: " per", prob: 0.04 }] },
    ],
  },
  {
    prompt: "Per imparare a programmare",
    steps: [
      { token: " bisogna", probabilities: [{ token: "bisogna", prob: 0.30 }, { token: ",", prob: 0.22 }, { token: "serve", prob: 0.20 }, { token: "è", prob: 0.15 }, { token: "non", prob: 0.13 }] },
      { token: " partire", probabilities: [{ token: "partire", prob: 0.28 }, { token: "fare", prob: 0.25 }, { token: "iniziare", prob: 0.22 }, { token: "avere", prob: 0.15 }, { token: "capire", prob: 0.10 }] },
      { token: " dalle", probabilities: [{ token: "dalle", prob: 0.50 }, { token: "da", prob: 0.25 }, { token: "con", prob: 0.12 }, { token: "dai", prob: 0.08 }, { token: "dal", prob: 0.05 }] },
      { token: " basi", probabilities: [{ token: "basi", prob: 0.60 }, { token: "fondamenta", prob: 0.15 }, { token: "cose", prob: 0.10 }, { token: "nozioni", prob: 0.08 }, { token: "regole", prob: 0.07 }] },
      { token: ".", probabilities: [{ token: ".", prob: 0.35 }, { token: " e", prob: 0.25 }, { token: ":", prob: 0.18 }, { token: ",", prob: 0.15 }, { token: " —", prob: 0.07 }] },
    ],
  },
];

export function AutoregressiveDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = SCENARIOS[scenarioIdx];
  const generatedTokens = scenario.steps.slice(0, currentStep + 1).map((s) => s.token);
  const currentProbs = currentStep >= 0 && currentStep < scenario.steps.length
    ? scenario.steps[currentStep].probabilities
    : null;
  const isComplete = currentStep >= scenario.steps.length - 1;

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setCurrentStep(-1);
  }

  function nextStep() {
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  }

  function playAll() {
    if (playing) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const startFrom = currentStep + 1;
    for (let i = startFrom; i < scenario.steps.length; i++) {
      const delay = (i - startFrom) * 800;
      setTimeout(() => setCurrentStep(i), delay);
    }
    timerRef.current = setTimeout(() => setPlaying(false), (scenario.steps.length - startFrom) * 800);
  }

  function changeScenario(idx: number) {
    reset();
    setScenarioIdx(idx);
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Generazione autoregressiva
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Guarda il modello generare testo un token alla volta. A ogni passo sceglie il prossimo pezzo
        basandosi sulle probabilità.
      </p>

      {/* Scenario selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => changeScenario(i)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              scenarioIdx === i
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
            }`}
          >
            &quot;{s.prompt}...&quot;
          </button>
        ))}
      </div>

      {/* Generated text */}
      <div className="mb-4 rounded-[var(--radius)] bg-[var(--bg)] p-4 font-mono text-sm">
        <span className="text-[var(--ink)]">{scenario.prompt}</span>
        {generatedTokens.map((token, i) => (
          <span
            key={i}
            className={`${
              i === currentStep
                ? "rounded bg-[var(--accent-muted)] px-0.5 font-semibold text-[var(--accent)]"
                : "text-[var(--ink)]"
            }`}
          >
            {token}
          </span>
        ))}
        {!isComplete && (
          <span className="animate-pulse text-[var(--accent)]">▌</span>
        )}
      </div>

      {/* Probability bars */}
      {currentProbs && (
        <div className="mb-4">
          <div className="mb-2 text-xs font-medium text-[var(--ink-muted)]">
            Probabilità del token appena scelto:
          </div>
          <div className="space-y-1.5">
            {currentProbs.map((p, i) => {
              const isChosen = i === 0;
              return (
                <div key={p.token} className="flex items-center gap-2">
                  <span className={`w-20 text-right font-mono text-xs ${isChosen ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-muted)]"}`}>
                    &quot;{p.token}&quot;
                  </span>
                  <div className="h-4 flex-1 rounded-full bg-[var(--border)]">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${isChosen ? "bg-[var(--accent)]" : "bg-[var(--ink-faint)]"}`}
                      style={{ width: `${p.prob * 100}%` }}
                    />
                  </div>
                  <span className={`w-10 text-xs ${isChosen ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-faint)]"}`}>
                    {Math.round(p.prob * 100)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentStep === -1 && (
        <div className="mb-4 rounded-[var(--radius)] border border-dashed border-[var(--border)] p-3 text-center text-sm text-[var(--ink-faint)]">
          Premi play o &quot;prossimo token&quot; per iniziare la generazione
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={playAll}
          disabled={isComplete}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          {playing ? "⏸ Pausa" : "▶ Play"}
        </button>
        <button
          onClick={nextStep}
          disabled={isComplete || playing}
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)] disabled:opacity-30"
        >
          Prossimo token
        </button>
        <button
          onClick={reset}
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)]"
        >
          Reset
        </button>
      </div>

      {isComplete && (
        <p className="mt-3 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
          Ogni token generato diventa parte dell&apos;input per il token successivo. Il modello non &quot;sa&quot; dove
          sta andando — costruisce la frase un pezzo alla volta, scegliendo ogni volta il token più
          probabile (o uno dei più probabili, a seconda della temperatura).
        </p>
      )}
    </div>
  );
}
