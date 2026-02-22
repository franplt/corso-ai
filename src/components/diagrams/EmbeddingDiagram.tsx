export function EmbeddingDiagram() {
  // 2D positions in a unit-ish space, mapped to SVG coords
  // Words clustered by semantic similarity
  const words = [
    // Animals
    { label: "gatto", x: 120, y: 80, group: "animals" },
    { label: "felino", x: 155, y: 100, group: "animals" },
    { label: "cane", x: 100, y: 140, group: "animals" },
    { label: "cucciolo", x: 140, y: 155, group: "animals" },
    // Royalty
    { label: "re", x: 340, y: 90, group: "royalty" },
    { label: "regina", x: 380, y: 110, group: "royalty" },
    { label: "corona", x: 360, y: 145, group: "royalty" },
    // Tech
    { label: "computer", x: 300, y: 230, group: "tech" },
    { label: "rete", x: 335, y: 255, group: "tech" },
    { label: "codice", x: 295, y: 270, group: "tech" },
    // Food
    { label: "pasta", x: 110, y: 250, group: "food" },
    { label: "pizza", x: 145, y: 270, group: "food" },
    { label: "pane", x: 120, y: 295, group: "food" },
  ];

  const GROUP_STYLES: Record<string, { circle: string; text: string; bubble: string }> = {
    animals: { circle: "#fbbf24", text: "#92400e", bubble: "#fff7ed" },
    royalty: { circle: "#a78bfa", text: "#4c1d95", bubble: "#f5f3ff" },
    tech:    { circle: "#34d399", text: "#064e3b", bubble: "#ecfdf5" },
    food:    { circle: "#f87171", text: "#7f1d1d", bubble: "#fef2f2" },
  };

  const LEGEND = [
    { group: "animals", label: "animali" },
    { group: "royalty", label: "regalità" },
    { group: "tech",    label: "tecnologia" },
    { group: "food",    label: "cibo" },
  ];

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Lo spazio degli embedding: parole simili stanno vicine</p>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 480 360"
          className="w-full max-w-lg mx-auto"
          aria-label="Mappa di embedding: parole semanticamente simili sono raggruppate insieme"
          role="img"
        >
          {/* Cluster halos */}
          {[
            { cx: 128, cy: 120, rx: 72, ry: 58, group: "animals" },
            { cx: 363, cy: 115, rx: 60, ry: 50, group: "royalty" },
            { cx: 316, cy: 255, rx: 58, ry: 48, group: "tech" },
            { cx: 126, cy: 272, rx: 55, ry: 45, group: "food" },
          ].map((halo) => (
            <ellipse
              key={halo.group}
              cx={halo.cx}
              cy={halo.cy}
              rx={halo.rx}
              ry={halo.ry}
              fill={GROUP_STYLES[halo.group].bubble}
              stroke={GROUP_STYLES[halo.group].circle}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          ))}

          {/* Distance line example: gatto ↔ felino */}
          <line
            x1={120} y1={80}
            x2={155} y2={100}
            stroke="#b45309"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          <text x="125" y="70" fontSize="9" fill="#b45309" opacity="0.8" fontStyle="italic">vicini = simili</text>

          {/* Words */}
          {words.map((w) => {
            const style = GROUP_STYLES[w.group];
            return (
              <g key={w.label}>
                <circle cx={w.x} cy={w.y} r="5" fill={style.circle} />
                <text
                  x={w.x + 8}
                  y={w.y + 4}
                  fontSize="11"
                  fill={style.text}
                  fontFamily="ui-monospace, monospace"
                  fontWeight="600"
                >
                  {w.label}
                </text>
              </g>
            );
          })}

          {/* Axes labels */}
          <text x="8" y="16" fontSize="10" fill="#9c9590" fontStyle="italic">dimensione semantica ↑</text>
          <text x="380" y="350" fontSize="10" fill="#9c9590" fontStyle="italic">contesto →</text>
        </svg>
      </div>
      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {LEGEND.map((l) => (
          <span key={l.group} className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: GROUP_STYLES[l.group].circle }}
            />
            {l.label}
          </span>
        ))}
      </div>
      <p className="diagram-caption">
        Ogni parola è un punto nello spazio. La distanza tra i punti riflette la somiglianza di significato — non la somiglianza di forma.
      </p>
    </figure>
  );
}
