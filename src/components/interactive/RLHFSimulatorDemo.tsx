"use client";

import { useState } from "react";

type Round = {
  question: string;
  responseA: string;
  responseB: string;
  betterIs: "A" | "B";
  explanationA: string;
  explanationB: string;
};

const ROUNDS: Round[] = [
  {
    question: "Spiega cos'è un buco nero in modo semplice.",
    responseA: "Un buco nero è una regione dello spaziotempo con un campo gravitazionale così intenso che nulla al suo interno, compresa la luce, può sfuggire. Si forma dal collasso gravitazionale di stelle massive.",
    responseB: "Immagina di comprimere tutto il peso del Sole in una sfera grande come una città. La gravità diventerebbe così forte che nemmeno la luce riuscirebbe a scappare. Ecco cos'è un buco nero: un punto nello spazio dove la gravità vince su tutto.",
    betterIs: "B",
    explanationA: "Tecnicamente corretta ma usa termini complessi (spaziotempo, collasso gravitazionale) senza spiegarli.",
    explanationB: "Usa un'analogia concreta (Sole compresso), linguaggio quotidiano, e costruisce il concetto passo per passo.",
  },
  {
    question: "Come funziona la fotosintesi?",
    responseA: "Le piante assorbono luce solare attraverso le foglie. Usano questa energia per trasformare acqua (dalle radici) e anidride carbonica (dall'aria) in zucchero, il loro cibo. Come sottoprodotto, rilasciano ossigeno — quello che respiriamo noi.",
    responseB: "La fotosintesi è il processo mediante il quale gli organismi fotoautotrofi convertono l'energia luminosa in energia chimica, utilizzando CO₂ e H₂O come substrati per la sintesi di glucosio (C₆H₁₂O₆) e la liberazione di O₂.",
    betterIs: "A",
    explanationA: "Spiega il processo con linguaggio semplice e collega il risultato alla vita quotidiana (l'ossigeno che respiriamo).",
    explanationB: "Usa formule chimiche e terminologia tecnica non richiesta. Corretta ma non accessibile.",
  },
  {
    question: "Perché il cielo è blu?",
    responseA: "La luce del sole contiene tutti i colori. Quando entra nell'atmosfera, le molecole d'aria spargono i colori in modo diverso: il blu viene sparso molto di più degli altri. Per questo, guardando il cielo, vedi blu da ogni direzione.",
    responseB: "Il cielo è blu per via della diffusione di Rayleigh. La luce solare viene dispersa dalle molecole nell'atmosfera, e la lunghezza d'onda corta (blu, ~450nm) viene diffusa più efficacemente di quella lunga (rosso, ~700nm).",
    betterIs: "A",
    explanationA: "Costruisce l'intuizione: parte dalla luce bianca, spiega lo scattering, e connette il fenomeno all'esperienza visiva.",
    explanationB: "Nomina il fenomeno (Rayleigh) e cita lunghezze d'onda, ma non aiuta a capire perché.",
  },
  {
    question: "Cosa succede se prendo troppo caffè?",
    responseA: "Il caffè contiene caffeina, un composto della famiglia delle metilxantine che agisce come antagonista dei recettori dell'adenosina nel sistema nervoso centrale, inibendo la sensazione di stanchezza.",
    responseB: "Il cuore batte più veloce, le mani possono tremare, e rischi di non dormire la notte. Il caffè blocca il segnale che dice al cervello \"sono stanco\", quindi ti senti sveglio — ma il corpo è comunque stanco. Troppo caffè e il corpo si ribella.",
    betterIs: "B",
    explanationA: "Spiega il meccanismo biochimico ma non risponde alla domanda pratica: cosa succede al mio corpo?",
    explanationB: "Parte dall'esperienza concreta (cuore, mani, sonno), poi spiega il perché in modo intuitivo.",
  },
];

export function RLHFSimulatorDemo() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [choices, setChoices] = useState<Record<number, "A" | "B">>({});
  const [showResult, setShowResult] = useState(false);

  const round = ROUNDS[roundIdx];
  const choice = choices[roundIdx];
  const isCorrect = choice === round.betterIs;
  const totalRounds = ROUNDS.length;

  function choose(pick: "A" | "B") {
    if (choice) return;
    setChoices((prev) => ({ ...prev, [roundIdx]: pick }));
  }

  function nextRound() {
    if (roundIdx < totalRounds - 1) {
      setRoundIdx(roundIdx + 1);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setRoundIdx(0);
    setChoices({});
    setShowResult(false);
  }

  const correctCount = Object.entries(choices).filter(
    ([i, c]) => c === ROUNDS[Number(i)].betterIs,
  ).length;

  if (showResult) {
    return (
      <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          Demo interattiva
        </div>
        <h3 className="font-heading mb-3 text-lg font-semibold text-[var(--ink)]">
          RLHF completato!
        </h3>
        <p className="mb-4 text-sm text-[var(--ink-muted)]">
          Hai scelto la risposta migliore in <strong className="text-[var(--ink)]">{correctCount}/{totalRounds}</strong> casi.
        </p>
        <div className="mb-5 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-4 text-sm text-[var(--ink-muted)]">
          Hai appena fatto quello che fanno i valutatori umani nel processo RLHF: confrontare due risposte
          e scegliere quella migliore. Queste preferenze diventano un <strong className="text-[var(--ink)]">reward model</strong> — una
          funzione che il modello usa per capire cosa significa &quot;buona risposta&quot;. Con migliaia di
          confronti come questo, il modello impara a produrre risposte più chiare, utili e accessibili.
        </div>
        <button
          onClick={restart}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          Ricomincia
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Simula il processo RLHF
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        Confronta due risposte e scegli quella migliore — esattamente come fanno i valutatori umani
        per allineare il modello. Round {roundIdx + 1}/{totalRounds}.
      </p>

      {/* Progress */}
      <div className="mb-5 h-1.5 w-full rounded-full bg-[var(--border)]">
        <div
          className="h-1.5 rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${((roundIdx + (choice ? 1 : 0)) / totalRounds) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-4 rounded-[var(--radius)] bg-[var(--bg)] p-3 text-sm">
        <span className="font-medium text-[var(--ink-muted)]">Domanda: </span>
        <span className="text-[var(--ink)]">{round.question}</span>
      </div>

      {/* Two responses */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        {(["A", "B"] as const).map((label) => {
          const text = label === "A" ? round.responseA : round.responseB;
          const explanation = label === "A" ? round.explanationA : round.explanationB;
          const selected = choice === label;
          const correct = choice && label === round.betterIs;
          const wrong = choice && selected && !isCorrect && label !== round.betterIs;

          return (
            <button
              key={label}
              onClick={() => choose(label)}
              disabled={!!choice}
              className={`rounded-[var(--radius)] border p-4 text-left text-sm transition-all ${
                correct
                  ? "border-green-400 bg-green-50"
                  : wrong
                    ? "border-red-300 bg-red-50"
                    : selected
                      ? "border-[var(--accent)] bg-[var(--accent-muted)]/20"
                      : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--ink-faint)]"
              } ${!choice ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="mb-2 text-xs font-semibold text-[var(--ink-muted)]">
                Risposta {label}
                {correct && " ✓"}
                {wrong && " ✗"}
              </div>
              <div className="text-[var(--ink)]">{text}</div>
              {choice && (
                <div className={`mt-2 text-xs ${correct ? "text-green-700" : "text-[var(--ink-faint)]"}`}>
                  {explanation}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {choice && (
        <button
          onClick={nextRound}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          {roundIdx < totalRounds - 1 ? "Prossimo round →" : "Vedi risultato"}
        </button>
      )}
    </div>
  );
}
