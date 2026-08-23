"use client";

import { useState } from "react";

type Action = {
  description: string;
  risk: "low" | "medium" | "high";
  detail: string;
  autoApproved: boolean;
};

const ACTIONS: Action[] = [
  {
    description: "Cercare voli Milano-Lisbona per il 15-17 marzo",
    risk: "low",
    detail: "Ricerca informativa, nessun costo, nessun dato sensibile",
    autoApproved: true,
  },
  {
    description: "Confrontare prezzi su 3 piattaforme diverse",
    risk: "low",
    detail: "Ricerca comparativa, solo lettura di dati pubblici",
    autoApproved: true,
  },
  {
    description: "Inviare un'email al tuo capo per chiedere i giorni di ferie",
    risk: "medium",
    detail: "Comunica con una persona reale a tuo nome — potrebbe dire qualcosa che non avresti detto tu",
    autoApproved: false,
  },
  {
    description: "Prenotare il volo Ryanair a €194 con la tua carta di credito",
    risk: "high",
    detail: "Spesa di denaro reale, non reversibile facilmente, usa dati di pagamento sensibili",
    autoApproved: false,
  },
  {
    description: "Prenotare l'Airbnb a €170 per 2 notti",
    risk: "high",
    detail: "Seconda transazione finanziaria, policy di cancellazione da verificare",
    autoApproved: false,
  },
];

const RISK_STYLES = {
  low: { label: "Basso rischio", bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" },
  medium: { label: "Rischio medio", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700" },
  high: { label: "Alto rischio", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-700" },
};

export function HumanInTheLoopDemo() {
  const [currentAction, setCurrentAction] = useState(0);
  const [decisions, setDecisions] = useState<Record<number, "approved" | "rejected">>({});
  const [autoAnimating, setAutoAnimating] = useState(false);

  const action = ACTIONS[currentAction];
  const done = currentAction >= ACTIONS.length;

  function handleAutoApprove() {
    setAutoAnimating(true);
    setDecisions((prev) => ({ ...prev, [currentAction]: "approved" }));
    setTimeout(() => {
      setAutoAnimating(false);
      setCurrentAction((c) => c + 1);
    }, 800);
  }

  function handleDecision(d: "approved" | "rejected") {
    setDecisions((prev) => ({ ...prev, [currentAction]: d }));
    setTimeout(() => setCurrentAction((c) => c + 1), 600);
  }

  function restart() {
    setCurrentAction(0);
    setDecisions({});
  }

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Human in the loop
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        L&apos;agente esegue azioni a basso rischio automaticamente. Per quelle a rischio medio o alto,
        chiede la tua approvazione prima di procedere.
      </p>

      {/* Past actions */}
      {currentAction > 0 && (
        <div className="mb-4 space-y-2">
          {ACTIONS.slice(0, currentAction).map((act, i) => {
            const style = RISK_STYLES[act.risk];
            const d = decisions[i];
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-[var(--radius)] border p-3 text-sm ${
                  d === "approved" ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
                }`}
              >
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>
                  {style.label}
                </span>
                <span className="flex-1 text-xs text-[var(--ink)]">{act.description}</span>
                <span className={`text-xs font-medium ${d === "approved" ? "text-green-600" : "text-red-600"}`}>
                  {d === "approved" ? (act.autoApproved ? "Auto ✓" : "Approvato ✓") : "Rifiutato ✗"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Current action */}
      {!done && (
        <div className={`rounded-[var(--radius)] border-2 ${RISK_STYLES[action.risk].border} ${RISK_STYLES[action.risk].bg} p-4`}>
          <div className="mb-2 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${RISK_STYLES[action.risk].badge}`}>
              {RISK_STYLES[action.risk].label}
            </span>
            {action.autoApproved && (
              <span className="text-xs text-[var(--ink-faint)]">Approvazione automatica</span>
            )}
          </div>
          <p className="mb-1 text-sm font-medium text-[var(--ink)]">{action.description}</p>
          <p className="mb-3 text-xs text-[var(--ink-muted)]">{action.detail}</p>

          {action.autoApproved ? (
            <button
              onClick={handleAutoApprove}
              disabled={autoAnimating}
              className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {autoAnimating ? "Eseguito automaticamente ✓" : "→ L'agente procede da solo"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleDecision("approved")}
                className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                Approva
              </button>
              <button
                onClick={() => handleDecision("rejected")}
                className="rounded-full bg-red-100 px-4 py-1.5 text-xs font-medium text-red-700 transition-opacity hover:opacity-90"
              >
                Rifiuta
              </button>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className="space-y-3">
          <div className="rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-4 text-sm text-[var(--ink-muted)]">
            L&apos;agente ha gestito {ACTIONS.filter((a) => a.autoApproved).length} azioni automaticamente
            (basso rischio) e ha chiesto la tua approvazione per {ACTIONS.filter((a) => !a.autoApproved).length} azioni
            (rischio medio-alto). Questo è il principio del <strong className="text-[var(--ink)]">human in the loop</strong>:
            autonomia dove è sicuro, supervisione dove serve.
          </div>
          <button
            onClick={restart}
            className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            Ricomincia
          </button>
        </div>
      )}
    </div>
  );
}
