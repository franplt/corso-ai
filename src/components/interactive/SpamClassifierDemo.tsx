"use client";

import { useState } from "react";

type Email = {
  subject: string;
  preview: string;
  isSpam: boolean;
  explanation: string;
};

const EMAILS: Email[] = [
  {
    subject: "OFFERTA ESCLUSIVA: iPhone a 1€!!!",
    preview: "Congratulazioni! Sei stato selezionato per ricevere...",
    isSpam: true,
    explanation: "Prezzo irrealistico, urgenza artificiale, mittente sconosciuto",
  },
  {
    subject: "Riunione spostata a giovedì",
    preview: "Ciao team, la riunione di domani è stata spostata a giovedì alle 15...",
    isSpam: false,
    explanation: "Contesto lavorativo plausibile, tono normale, nessuna richiesta sospetta",
  },
  {
    subject: "Il tuo account sarà SOSPESO entro 24h",
    preview: "Abbiamo rilevato attività sospette. Clicca qui per verificare...",
    isSpam: true,
    explanation: "Urgenza artificiale, minaccia, richiesta di cliccare un link",
  },
  {
    subject: "Fattura n. 2024-0847",
    preview: "In allegato la fattura relativa al servizio di consulenza del mese di...",
    isSpam: false,
    explanation: "Numero fattura specifico, contesto professionale, nessuna urgenza",
  },
  {
    subject: "Guadagna 5000€ al giorno lavorando da casa",
    preview: "Scopri il metodo segreto che le banche non vogliono che tu sappia...",
    isSpam: true,
    explanation: "Promessa di guadagno irrealistico, linguaggio sensazionalistico",
  },
  {
    subject: "Re: Preventivo sito web",
    preview: "Grazie per il preventivo, lo giro al mio responsabile e ti faccio sapere...",
    isSpam: false,
    explanation: "Risposta a conversazione esistente, tono naturale, contesto specifico",
  },
  {
    subject: "Hai vinto un viaggio alle Maldive! 🏝️",
    preview: "Complimenti! Il tuo indirizzo email è stato estratto tra...",
    isSpam: true,
    explanation: "Premio non richiesto, estrazione inesistente, troppo bello per essere vero",
  },
  {
    subject: "Aggiornamento policy privacy",
    preview: "Ti informiamo che abbiamo aggiornato la nostra informativa sulla privacy...",
    isSpam: false,
    explanation: "Comunicazione legale standard, nessuna richiesta di azione urgente",
  },
];

export function SpamClassifierDemo() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState(false);

  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = Object.entries(answers).filter(
    ([i, ans]) => ans === EMAILS[Number(i)].isSpam,
  ).length;

  function classify(index: number, userSaysSpam: boolean) {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [index]: userSaysSpam }));
  }

  function getStatus(index: number) {
    if (!(index in answers)) return "unanswered";
    return answers[index] === EMAILS[index].isSpam ? "correct" : "wrong";
  }

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Classifica le email: spam o no?
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        Prova a classificare ogni email. Poi confronta con i pattern che un modello troverebbe nei dati.
      </p>

      <div className="space-y-3">
        {EMAILS.map((email, i) => {
          const status = getStatus(i);
          return (
            <div
              key={i}
              className={`rounded-[var(--radius)] border p-4 transition-colors ${
                status === "correct"
                  ? "border-green-300 bg-green-50"
                  : status === "wrong"
                    ? "border-red-300 bg-red-50"
                    : "border-[var(--border)] bg-[var(--bg)]"
              }`}
            >
              <div className="mb-1 text-sm font-semibold text-[var(--ink)]">
                {email.subject}
              </div>
              <div className="mb-3 text-xs text-[var(--ink-muted)]">
                {email.preview}
              </div>

              {status === "unanswered" && !revealed ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => classify(i, true)}
                    className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
                  >
                    Spam
                  </button>
                  <button
                    onClick={() => classify(i, false)}
                    className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
                  >
                    Non spam
                  </button>
                </div>
              ) : (
                <div className="text-xs">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 font-medium ${
                      email.isSpam
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {email.isSpam ? "Spam" : "Non spam"}
                  </span>
                  {(revealed || status !== "unanswered") && (
                    <span className="ml-2 text-[var(--ink-muted)]">
                      {status === "correct" && "✓ "}
                      {status === "wrong" && "✗ "}
                      {email.explanation}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm text-[var(--ink-muted)]">
          {totalAnswered === EMAILS.length && !revealed && (
            <span>
              Risultato: <strong className="text-[var(--ink)]">{totalCorrect}/{EMAILS.length}</strong> corrette
            </span>
          )}
        </div>
        {!revealed && totalAnswered === EMAILS.length && (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            Mostra spiegazioni
          </button>
        )}
        {revealed && (
          <button
            onClick={() => {
              setAnswers({});
              setRevealed(false);
            }}
            className="rounded-full bg-[var(--accent-muted)] px-4 py-1.5 text-xs font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
          >
            Ricomincia
          </button>
        )}
      </div>

      {revealed && (
        <p className="mt-4 rounded-[var(--radius)] bg-[var(--accent-muted)]/30 p-3 text-sm text-[var(--ink-muted)]">
          Hai usato la tua intuizione — il modello fa la stessa cosa, ma su milioni di email. Invece di regole
          esplicite, trova pattern statistici nei dati: parole, strutture, combinazioni che ricorrono nello spam.
          Nessuno gli dice le regole. Le scopre da solo.
        </p>
      )}
    </div>
  );
}
