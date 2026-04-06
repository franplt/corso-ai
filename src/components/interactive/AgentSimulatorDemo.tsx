"use client";

import { useState } from "react";

type AgentStep = {
  phase: "observe" | "reason" | "act" | "result";
  content: string;
  tool?: string;
};

const STEPS: AgentStep[] = [
  {
    phase: "observe",
    content: "L'utente chiede: \"Organizza un weekend a Lisbona per due persone, 15-17 marzo, budget massimo 600€.\"",
  },
  {
    phase: "reason",
    content: "Devo trovare voli, un alloggio e suggerire attività. Parto dai voli perché vincolano il resto del budget. Cerco voli low-cost da Milano.",
  },
  {
    phase: "act",
    content: "cerca_voli(da: \"Milano\", a: \"Lisbona\", andata: \"15/03\", ritorno: \"17/03\", persone: 2)",
    tool: "Ricerca voli",
  },
  {
    phase: "result",
    content: "Ryanair MIL→LIS 15/03 ore 7:20 — €45/persona | Ritorno 17/03 ore 21:10 — €52/persona | Totale voli: €194",
  },
  {
    phase: "reason",
    content: "Budget rimanente: 600 - 194 = 406€. Cerco un alloggio per 2 notti in zona centrale, max 200€ totali per restare nel budget.",
  },
  {
    phase: "act",
    content: "cerca_alloggio(città: \"Lisbona\", checkin: \"15/03\", checkout: \"17/03\", ospiti: 2, max_prezzo: 200)",
    tool: "Ricerca alloggi",
  },
  {
    phase: "result",
    content: "Airbnb nel quartiere Alfama — €85/notte, 2 notti = €170 | Valutazione 4.8/5 | A 10 min dal centro",
  },
  {
    phase: "reason",
    content: "Budget rimanente: 406 - 170 = 236€ per cibo e attività. Cerco le attrazioni principali e il meteo per suggerire attività adatte.",
  },
  {
    phase: "act",
    content: "meteo(città: \"Lisbona\", data: \"15-17/03\")",
    tool: "API Meteo",
  },
  {
    phase: "result",
    content: "15/03: 19°C, soleggiato | 16/03: 17°C, parzialmente nuvoloso | 17/03: 18°C, soleggiato",
  },
  {
    phase: "reason",
    content: "Tempo buono, posso suggerire attività all'aperto. Preparo l'itinerario completo con il riepilogo del budget.",
  },
];

const PHASE_STYLES = {
  observe: { label: "Osserva", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "👁" },
  reason: { label: "Ragiona", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", icon: "🧠" },
  act: { label: "Agisce", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "⚡" },
  result: { label: "Risultato", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "📥" },
};

export function AgentSimulatorDemo() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  const allVisible = visibleSteps >= STEPS.length;

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Un agente in azione
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        Guarda un agente AI organizzare un viaggio passo dopo passo: osserva il contesto,
        ragiona su cosa fare, agisce chiamando strumenti, e usa i risultati per il passo successivo.
      </p>

      {/* Steps */}
      <div className="mb-4 space-y-2">
        {STEPS.slice(0, visibleSteps).map((step, i) => {
          const style = PHASE_STYLES[step.phase];
          return (
            <div
              key={i}
              className={`rounded-[var(--radius)] border ${style.border} ${style.bg} p-3 text-sm`}
            >
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-xs">{style.icon}</span>
                <span className={`text-xs font-semibold ${style.text}`}>{style.label}</span>
                {step.tool && (
                  <span className="ml-1 rounded bg-orange-200 px-1.5 py-0.5 font-mono text-[10px] text-orange-800">
                    {step.tool}
                  </span>
                )}
              </div>
              <div className={`${step.phase === "act" || step.phase === "result" ? "font-mono text-xs" : "text-sm"} ${style.text}`}>
                {step.content}
              </div>
            </div>
          );
        })}
      </div>

      {visibleSteps === 0 && (
        <div className="mb-4 rounded-[var(--radius)] border border-dashed border-[var(--border)] p-3 text-center text-sm text-[var(--ink-faint)]">
          Clicca per vedere l&apos;agente lavorare passo dopo passo
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-4 h-1.5 w-full rounded-full bg-[var(--border)]">
        <div
          className="h-1.5 rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${(visibleSteps / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setVisibleSteps((v) => Math.min(v + 1, STEPS.length))}
          disabled={allVisible}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Prossimo passo →
        </button>
        {visibleSteps > 0 && (
          <button
            onClick={() => setVisibleSteps(0)}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)]"
          >
            Reset
          </button>
        )}
        <span className="ml-auto text-xs text-[var(--ink-faint)]">
          {visibleSteps}/{STEPS.length}
        </span>
      </div>

      {allVisible && (
        <p className="mt-3 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
          L&apos;agente ha completato il task in {STEPS.length} passi: ha cercato voli, trovato un alloggio,
          controllato il meteo, e pianificato il budget — tutto autonomamente. Ogni passo
          alimenta il successivo attraverso il ciclo osserva → ragiona → agisci.
        </p>
      )}
    </div>
  );
}
