export function AttentionDiagram() {
  const sentence = ["Il", "gatto", "è", "sul", "tappeto", "perché", "era", "caldo"];
  // Focus word: "era" — which words does it attend to most?
  // Simulated attention weights (higher = more attention)
  const attentionTo = {
    "Il": 0.05,
    "gatto": 0.15,
    "è": 0.05,
    "sul": 0.08,
    "tappeto": 0.45,
    "perché": 0.10,
    "era": 0.07,
    "caldo": 0.05,
  };
  const focusWord = "tappeto";
  const focusIndex = sentence.indexOf(focusWord);

  // For the attending word "era"
  const attendingWord = "era";
  const attendingIndex = sentence.indexOf(attendingWord);

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Come l&apos;attenzione collega le parole in una frase</p>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 520 200"
          className="w-full max-w-lg mx-auto"
          role="img"
          aria-label="Diagramma dell'attenzione: la parola 'era' attende principalmente a 'tappeto'"
        >
          {/* Connecting arcs from "era" to each word, weight = opacity + stroke width */}
          {sentence.map((word, i) => {
            const weight = attentionTo[word as keyof typeof attentionTo] ?? 0;
            if (weight < 0.04) return null;
            const fromX = attendingIndex * 58 + 36;
            const toX = i * 58 + 36;
            const fromY = 140;
            const toY = 60;
            const midX = (fromX + toX) / 2;
            const curveY = Math.min(fromY, toY) - 30 - weight * 60;
            return (
              <path
                key={word}
                d={`M ${fromX} ${fromY} Q ${midX} ${curveY} ${toX} ${toY}`}
                fill="none"
                stroke={word === focusWord ? "#b45309" : "#6b6560"}
                strokeWidth={weight * 10}
                opacity={0.15 + weight * 0.9}
              />
            );
          })}

          {/* Word boxes — top row (attended) */}
          {sentence.map((word, i) => {
            const x = i * 58 + 10;
            const isFocus = word === focusWord;
            return (
              <g key={`top-${word}`}>
                <rect
                  x={x}
                  y={38}
                  width={50}
                  height={26}
                  rx={6}
                  fill={isFocus ? "#fef3c7" : "var(--bg-elevated, #fff)"}
                  stroke={isFocus ? "#b45309" : "#e8e4e0"}
                  strokeWidth={isFocus ? 2 : 1}
                />
                <text
                  x={x + 25}
                  y={56}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isFocus ? "700" : "500"}
                  fill={isFocus ? "#b45309" : "#1a1816"}
                  fontFamily="ui-monospace, monospace"
                >
                  {word}
                </text>
              </g>
            );
          })}

          {/* Word boxes — bottom row (attending) */}
          {sentence.map((word, i) => {
            const x = i * 58 + 10;
            const isAttending = word === attendingWord;
            return (
              <g key={`bottom-${word}`}>
                <rect
                  x={x}
                  y={124}
                  width={50}
                  height={26}
                  rx={6}
                  fill={isAttending ? "#fff7ed" : "var(--bg-elevated, #fff)"}
                  stroke={isAttending ? "#b45309" : "#e8e4e0"}
                  strokeWidth={isAttending ? 2 : 1}
                />
                <text
                  x={x + 25}
                  y={142}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isAttending ? "700" : "500"}
                  fill={isAttending ? "#b45309" : "#1a1816"}
                  fontFamily="ui-monospace, monospace"
                >
                  {word}
                </text>
              </g>
            );
          })}

          {/* Labels */}
          <text x="4" y="30" fontSize="9" fill="#9c9590" fontStyle="italic">contesto disponibile</text>
          <text x="4" y="170" fontSize="9" fill="#9c9590" fontStyle="italic">parola in elaborazione</text>
        </svg>
      </div>

      <p className="diagram-caption">
        Quando il modello elabora <strong>&quot;era&quot;</strong>, l&apos;attenzione si concentra su <strong>&quot;tappeto&quot;</strong> (non su &quot;gatto&quot;): capisce che è il tappeto — non il gatto — ad essere caldo.
      </p>
    </figure>
  );
}
