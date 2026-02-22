// Loss curve points: exponential decay approximation
const POINTS = Array.from({ length: 50 }, (_, i) => {
  const x = i / 49;
  const loss = 2.8 * Math.exp(-3.2 * x) + 0.2 + Math.sin(i * 1.3) * 0.05 * Math.exp(-2 * x);
  return { x, loss };
});

const WIDTH = 360;
const HEIGHT = 160;
const PAD = { top: 16, right: 20, bottom: 36, left: 44 };

function lossToY(loss: number): number {
  const minL = 0.15;
  const maxL = 2.9;
  return PAD.top + ((maxL - loss) / (maxL - minL)) * (HEIGHT - PAD.top - PAD.bottom);
}

function xToSvg(x: number): number {
  return PAD.left + x * (WIDTH - PAD.left - PAD.right);
}

export function LossCurveDiagram() {
  const pathD = POINTS.map((p, i) => {
    const sx = xToSvg(p.x);
    const sy = lossToY(p.loss);
    return `${i === 0 ? "M" : "L"} ${sx} ${sy}`;
  }).join(" ");

  const areaD =
    pathD +
    ` L ${xToSvg(1)} ${HEIGHT - PAD.bottom} L ${xToSvg(0)} ${HEIGHT - PAD.bottom} Z`;

  return (
    <figure className="diagram-card my-8">
      <p className="diagram-label">Come il modello impara — la curva di loss</p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        style={{ maxHeight: 180 }}
        aria-hidden="true"
      >
        {/* Area fill */}
        <path d={areaD} fill="var(--accent)" opacity="0.08" />

        {/* Curve */}
        <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Y axis */}
        <line
          x1={PAD.left} y1={PAD.top}
          x2={PAD.left} y2={HEIGHT - PAD.bottom}
          stroke="var(--border)" strokeWidth="1"
        />
        {/* X axis */}
        <line
          x1={PAD.left} y1={HEIGHT - PAD.bottom}
          x2={WIDTH - PAD.right} y2={HEIGHT - PAD.bottom}
          stroke="var(--border)" strokeWidth="1"
        />

        {/* Y axis labels */}
        <text x={PAD.left - 6} y={lossToY(2.8) + 4} textAnchor="end" fontSize="9" fill="#9c9590">Alto</text>
        <text x={PAD.left - 6} y={lossToY(0.25) + 4} textAnchor="end" fontSize="9" fill="#9c9590">Basso</text>

        {/* Axis titles */}
        <text x={PAD.left - 6} y={HEIGHT / 2} textAnchor="middle" fontSize="9" fill="#9c9590"
          transform={`rotate(-90, ${PAD.left - 26}, ${HEIGHT / 2})`}
        >Loss (errore)</text>
        <text x={(WIDTH - PAD.right + PAD.left) / 2} y={HEIGHT - 4} textAnchor="middle" fontSize="9" fill="#9c9590">
          Passi di addestramento →
        </text>

        {/* Annotations */}
        <g>
          <line x1={xToSvg(0.02)} y1={lossToY(2.7)} x2={xToSvg(0.02)} y2={lossToY(2.7) - 22}
            stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3,2" />
          <text x={xToSvg(0.02) + 4} y={lossToY(2.7) - 26} fontSize="8" fill="#9c9590">Inizio: predizioni casuali</text>
        </g>
        <g>
          <line x1={xToSvg(0.98)} y1={lossToY(0.22)} x2={xToSvg(0.98)} y2={lossToY(0.22) - 22}
            stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3,2" />
          <text x={xToSvg(0.98) - 4} y={lossToY(0.22) - 26} textAnchor="end" fontSize="8" fill="#9c9590">Fine: predizioni accurate</text>
        </g>
      </svg>

      <p className="diagram-caption">
        La loss misura quanto il modello sbaglia. All&apos;inizio è alta — il modello predice a caso. Man mano che vede più esempi e aggiusta i suoi parametri, l&apos;errore scende. L&apos;addestramento si ferma quando la loss si stabilizza.
      </p>
    </figure>
  );
}
