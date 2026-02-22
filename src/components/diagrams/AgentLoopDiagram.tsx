export function AgentLoopDiagram() {
  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Il loop di un agente AI: osserva → ragiona → agisce</p>

      <div className="flex justify-center py-2">
        <svg
          viewBox="0 0 360 280"
          className="w-full max-w-sm"
          role="img"
          aria-label="Il loop dell'agente: osserva l'ambiente, ragiona con l'LLM, agisce tramite strumenti, poi ricomincia"
        >
          {/* Background circle for the loop */}
          <circle cx="180" cy="140" r="105" fill="none" stroke="#e8e4e0" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* Arrows along the circle */}
          {/* Top → right (Osserva → Ragiona) */}
          <path d="M 248 68 Q 285 105 285 140" fill="none" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrow)" />
          {/* Right → bottom (Ragiona → Agisce) */}
          <path d="M 285 155 Q 275 205 240 230" fill="none" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrow)" />
          {/* Bottom → left (Agisce → Osserva) */}
          <path d="M 125 232 Q 82 200 78 152" fill="none" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrow)" />
          {/* Left → top (feedback) */}
          <path d="M 78 130 Q 82 75 125 52" fill="none" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrow)" />

          <defs>
            <marker id="arrow" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#b45309" />
            </marker>
          </defs>

          {/* Node: Osserva */}
          <g>
            <rect x="125" y="28" width="110" height="46" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="180" y="46" textAnchor="middle" fontSize="10" fill="#9c9590" fontStyle="italic">Passo 1</text>
            <text x="180" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0284c7" fontFamily="Georgia, serif">Osserva</text>
          </g>

          {/* Node: Ragiona (LLM) */}
          <g>
            <rect x="258" y="112" width="88" height="56" rx="10" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="302" y="132" textAnchor="middle" fontSize="10" fill="#9c9590" fontStyle="italic">Passo 2</text>
            <text x="302" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed" fontFamily="Georgia, serif">Ragiona</text>
            <text x="302" y="162" textAnchor="middle" fontSize="9" fill="#7c3aed" opacity="0.8">(LLM)</text>
          </g>

          {/* Node: Agisce */}
          <g>
            <rect x="125" y="212" width="110" height="46" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <text x="180" y="230" textAnchor="middle" fontSize="10" fill="#9c9590" fontStyle="italic">Passo 3</text>
            <text x="180" y="247" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669" fontFamily="Georgia, serif">Agisce</text>
          </g>

          {/* Node: Ambiente / Strumenti */}
          <g>
            <rect x="14" y="112" width="88" height="56" rx="10" fill="#fff7ed" stroke="#b45309" strokeWidth="1.5" />
            <text x="58" y="132" textAnchor="middle" fontSize="10" fill="#9c9590" fontStyle="italic">Feedback</text>
            <text x="58" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309" fontFamily="Georgia, serif">Ambiente</text>
            <text x="58" y="162" textAnchor="middle" fontSize="9" fill="#b45309" opacity="0.8">&amp; strumenti</text>
          </g>
        </svg>
      </div>

      <p className="diagram-caption">
        A differenza di un chatbot che risponde una volta, l&apos;agente ripete il loop fino a completare il compito — cercando informazioni, eseguendo codice, chiamando API, e adattandosi ai risultati.
      </p>
    </figure>
  );
}
