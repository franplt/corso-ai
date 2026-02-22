export function ChatbotVsAgentDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Chatbot vs Agente AI — due paradigmi diversi</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Chatbot */}
        <div className="rounded-[var(--radius)] border border-[#6b656040] bg-[#6b656006] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
            Chatbot (es. ChatGPT base)
          </p>

          <div className="space-y-2">
            {[
              { icon: "💬", label: "Prompt", desc: "\"Pianifica un viaggio a Tokyo\"" },
              { icon: "→", label: "", desc: "" },
              { icon: "🧠", label: "Modello", desc: "Genera una risposta testuale" },
              { icon: "→", label: "", desc: "" },
              { icon: "📄", label: "Risposta", desc: "Testo con consigli generici" },
            ].filter(s => s.icon !== "→").map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-base leading-none">{step.icon}</span>
                <div>
                  {step.label && <p className="text-xs font-semibold text-[var(--ink)]">{step.label}</p>}
                  {step.desc && <p className="text-xs text-[var(--ink-muted)]">{step.desc}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-[6px] bg-[var(--border)] p-2 text-center text-xs text-[var(--ink-muted)]">
            Lineare: prompt → risposta<br />Nessuna azione nel mondo reale
          </div>
        </div>

        {/* Agent */}
        <div className="rounded-[var(--radius)] border border-[#05996940] bg-[#05996906] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">
            Agente AI (es. Perplexity, Copilot)
          </p>

          <div className="space-y-2">
            {[
              { icon: "🎯", label: "Obiettivo", desc: "\"Prenota volo + hotel a Tokyo\"", color: "#059669" },
              { icon: "🗺️", label: "Piano", desc: "Scompone in sotto-task", color: "#059669" },
              { icon: "🔧", label: "Esegue", desc: "Cerca voli, confronta prezzi, prenota", color: "#059669" },
              { icon: "✅", label: "Verifica", desc: "Controlla se l'obiettivo è raggiunto", color: "#059669" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-base leading-none">{step.icon}</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: step.color }}>{step.label}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="h-px flex-1 bg-[#059669] opacity-30" />
            <span className="text-[10px] font-semibold text-[#059669]">loop fino al completamento</span>
            <div className="h-px flex-1 bg-[#059669] opacity-30" />
          </div>

          <div className="mt-1 rounded-[6px] border border-dashed border-[#05996940] bg-[#05996910] p-2 text-center text-xs text-[#059669]">
            Autonomo: pianifica, esegue, verifica<br />Agisce nel mondo reale
          </div>
        </div>
      </div>

      <p className="diagram-caption">
        Un chatbot risponde a domande. Un agente esegue compiti — usa strumenti, chiama API, naviga il web, prende decisioni intermedie. La differenza è tra dare consigli e fare le cose.
      </p>
    </figure>
  );
}
