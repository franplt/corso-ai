"use client";

import { useState } from "react";

type Answer = { id: string; label: string };
type Question = { id: string; text: string; answers: Answer[] };

const QUESTIONS: Question[] = [
  {
    id: "task",
    text: "Che tipo di compito devi fare?",
    answers: [
      { id: "writing", label: "✍️ Scrittura (testi, email, contenuti)" },
      { id: "code", label: "💻 Codice (programmazione, debug)" },
      { id: "analysis", label: "📊 Analisi (dati, documenti, ricerca)" },
      { id: "chat", label: "💬 Conversazione generale" },
    ],
  },
  {
    id: "budget",
    text: "Qual è il tuo budget?",
    answers: [
      { id: "zero", label: "🆓 Gratis (o quasi)" },
      { id: "low", label: "💶 Basso (qualche euro/mese)" },
      { id: "medium", label: "💳 Medio (abbonamento standard)" },
      { id: "high", label: "🏢 Business / API su scala" },
    ],
  },
  {
    id: "privacy",
    text: "La privacy dei dati è critica?",
    answers: [
      { id: "yes", label: "🔒 Sì — i dati non possono uscire" },
      { id: "no", label: "🌐 No — cloud va benissimo" },
    ],
  },
  {
    id: "technical",
    text: "Quanto sei a tuo agio con la tecnologia?",
    answers: [
      { id: "beginner", label: "👶 Voglio solo aprire un browser" },
      { id: "intermediate", label: "🔧 Posso usare API e integrazioni" },
      { id: "advanced", label: "⚙️ Posso fare il deploy di modelli" },
    ],
  },
];

type Recommendation = {
  primary: { name: string; why: string; url: string };
  alternative?: { name: string; why: string };
  tip: string;
};

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { task, budget, privacy, technical } = answers;

  // Privacy-first → open-weight
  if (privacy === "yes") {
    if (technical === "advanced") {
      return {
        primary: { name: "Llama 3.1 70B (self-hosted)", why: "Potente, completamente offline, nessun dato esce.", url: "https://ollama.com" },
        alternative: { name: "Mistral Large", why: "Buona alternativa open-weight, più leggera da deployare." },
        tip: "Usa Ollama per fare il deploy locale in pochi minuti su Mac o Linux.",
      };
    }
    return {
      primary: { name: "Mistral via API europea", why: "Server europei, GDPR-compliant, open-weight.", url: "https://mistral.ai" },
      tip: "Mistral AI ha sede in Francia — utile per conformità GDPR.",
    };
  }

  // Free tier
  if (budget === "zero") {
    if (task === "code") {
      return {
        primary: { name: "GitHub Copilot (piano free)", why: "Il miglior assistente codice, piano free per uso personale.", url: "https://github.com/features/copilot" },
        alternative: { name: "Claude 3.5 Haiku (free tier)", why: "Ottimo per analisi e debug." },
        tip: "Il piano free di GitHub Copilot include 2000 completamenti/mese.",
      };
    }
    return {
      primary: { name: "ChatGPT GPT-4o mini (free)", why: "Il più accessibile, funziona bene per la maggior parte degli usi quotidiani.", url: "https://chat.openai.com" },
      alternative: { name: "Gemini (Google)", why: "Gratis, integrato con Google Workspace." },
      tip: "Il piano free di ChatGPT ha limiti orari — per uso intensivo considera Plus.",
    };
  }

  // Code tasks
  if (task === "code") {
    return {
      primary: { name: "Claude 3.5 Sonnet", why: "Il migliore per il codice: capisce contesti complessi e fa meno errori.", url: "https://claude.ai" },
      alternative: { name: "GPT-4o", why: "Eccellente e con plugin per navigazione web." },
      tip: "Per il codice, Claude 3.5 Sonnet batte consistentemente GPT-4 nei benchmark reali.",
    };
  }

  // Analysis
  if (task === "analysis") {
    return {
      primary: { name: "GPT-4o + Advanced Data Analysis", why: "Carica file CSV/PDF, fa analisi e crea grafici in autonomia.", url: "https://chat.openai.com" },
      alternative: { name: "Gemini 1.5 Pro", why: "Contesto di 1M token — legge interi libri o dataset." },
      tip: "ChatGPT Plus include Advanced Data Analysis — esegue Python direttamente.",
    };
  }

  // General/writing
  if (technical === "beginner") {
    return {
      primary: { name: "ChatGPT Plus (GPT-4o)", why: "L'interfaccia più semplice, il più conosciuto, funziona bene per tutto.", url: "https://chat.openai.com" },
      tip: "Inizia da ChatGPT Plus — è il punto di partenza ideale per chi comincia.",
    };
  }

  if (budget === "high") {
    return {
      primary: { name: "GPT-4o via API (OpenAI)", why: "Massima flessibilità, integrazione in qualsiasi prodotto, pay-per-use.", url: "https://platform.openai.com" },
      alternative: { name: "Claude API (Anthropic)", why: "Migliore per testi lunghi e reasoning complesso." },
      tip: "Per business, valuta anche Azure OpenAI per SLA enterprise e compliance.",
    };
  }

  return {
    primary: { name: "Claude 3.5 Sonnet", why: "Eccellente bilanciamento qualità/prezzo, ottimo per scrittura e analisi.", url: "https://claude.ai" },
    alternative: { name: "ChatGPT Plus", why: "L'alternativa più conosciuta e versatile." },
    tip: "Molti professionisti usano entrambi per compiti diversi.",
  };
}

export function ModelSelectorQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [done, setDone] = useState(false);

  function answer(questionId: string, answerId: string) {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setCurrentQ(0);
    setDone(false);
  }

  const recommendation = done ? getRecommendation(answers) : null;
  const q = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;

  return (
    <div className="diagram-card my-8">
      <p className="diagram-label">Quiz: qual è il modello giusto per te?</p>

      {!done ? (
        <>
          {/* Progress */}
          <div className="mb-5">
            <div className="mb-1 flex justify-between text-xs text-[var(--ink-faint)]">
              <span>Domanda {currentQ + 1} di {QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <p className="mb-4 text-base font-semibold text-[var(--ink)]">{q.text}</p>

          {/* Answers */}
          <div className="space-y-2">
            {q.answers.map((ans) => (
              <button
                key={ans.id}
                onClick={() => answer(q.id, ans.id)}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-left text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
              >
                {ans.label}
              </button>
            ))}
          </div>
        </>
      ) : recommendation ? (
        <div>
          <div className="mb-4 rounded-[var(--radius)] border border-[var(--accent)] bg-[var(--accent-muted)] p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              La nostra raccomandazione
            </p>
            <p className="text-lg font-bold text-[var(--ink)]">{recommendation.primary.name}</p>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">{recommendation.primary.why}</p>
            <a
              href={recommendation.primary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mt-3 inline-flex"
            >
              Prova subito →
            </a>
          </div>

          {recommendation.alternative && (
            <div className="mb-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
                Alternativa valida
              </p>
              <p className="text-sm font-semibold text-[var(--ink)]">{recommendation.alternative.name}</p>
              <p className="text-xs text-[var(--ink-muted)]">{recommendation.alternative.why}</p>
            </div>
          )}

          <div className="mb-4 flex items-start gap-2 rounded-[var(--radius)] border border-[#0284c740] bg-[#e0f2fe] p-3">
            <span className="text-sm">💡</span>
            <p className="text-xs leading-relaxed text-[#0c4a6e]">{recommendation.tip}</p>
          </div>

          <button onClick={reset} className="btn btn-secondary btn-sm">
            ← Riprova con risposte diverse
          </button>
        </div>
      ) : null}

      <p className="diagram-caption">
        Non esiste una risposta universale — il modello giusto dipende dal tuo contesto. Questa è una guida di partenza: sperimenta e cambia se non sei soddisfatto.
      </p>
    </div>
  );
}
