"use client";

import { useEffect, useRef, useState } from "react";

// Simple 2D loss landscape: f(x) = (x-3)^2 + noise bumps
function lossAt(x: number): number {
  return (x - 3) ** 2 + 2 * Math.sin(x * 2) + 10;
}

function gradientAt(x: number): number {
  // Numerical gradient
  const h = 0.001;
  return (lossAt(x + h) - lossAt(x - h)) / (2 * h);
}

const X_MIN = -1;
const X_MAX = 7;
const Y_MIN = 0;
const Y_MAX = 30;

const SVG_W = 400;
const SVG_H = 220;
const PAD_L = 35;
const PAD_R = 10;
const PAD_T = 15;
const PAD_B = 25;

function toSvgX(x: number) {
  return PAD_L + ((x - X_MIN) / (X_MAX - X_MIN)) * (SVG_W - PAD_L - PAD_R);
}
function toSvgY(y: number) {
  return PAD_T + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (SVG_H - PAD_T - PAD_B);
}

// Generate smooth loss curve points
const CURVE_POINTS: [number, number][] = [];
for (let x = X_MIN; x <= X_MAX; x += 0.05) {
  CURVE_POINTS.push([x, lossAt(x)]);
}

const LEARNING_RATES = [
  { value: 0.01, label: "0.01", desc: "Troppo lento" },
  { value: 0.05, label: "0.05", desc: "Lento" },
  { value: 0.15, label: "0.15", desc: "Giusto" },
  { value: 0.3, label: "0.3", desc: "Veloce" },
  { value: 0.6, label: "0.6", desc: "Troppo veloce" },
];

export function GradientDescentDemo() {
  const [lr, setLr] = useState(0.15);
  const [ballX, setBallX] = useState(0.5);
  const [trail, setTrail] = useState<number[]>([0.5]);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ballXRef = useRef(0.5);
  const stepCountRef = useRef(0);

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    ballXRef.current = 0.5;
    stepCountRef.current = 0;
    setPlaying(false);
    setBallX(0.5);
    setTrail([0.5]);
  }

  function advance() {
    const previous = ballXRef.current;
    const next = previous - lr * gradientAt(previous);
    const clamped = Math.max(X_MIN + 0.1, Math.min(X_MAX - 0.1, next));

    ballXRef.current = clamped;
    stepCountRef.current += 1;
    setBallX(clamped);
    setTrail((current) => [...current.slice(-30), clamped]);

    return stepCountRef.current > 5 && Math.abs(clamped - previous) < 0.001;
  }

  function step() {
    advance();
  }

  function play() {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    intervalRef.current = setInterval(() => {
      if (advance()) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPlaying(false);
      }
    }, 200);
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const ballY = lossAt(ballX);
  const converged = trail.length > 5 && Math.abs(gradientAt(ballX)) < 0.5;
  const diverging = ballX <= X_MIN + 0.2 || ballX >= X_MAX - 0.2;

  // Build curve path
  const curvePath = CURVE_POINTS.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"} ${toSvgX(x)} ${toSvgY(y)}`
  ).join(" ");

  const lrInfo = LEARNING_RATES.find((l) => l.value === lr);

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Discesa del gradiente
      </h3>
      <p className="mb-4 text-sm text-[var(--ink-muted)]">
        La pallina deve trovare il punto più basso della curva (l&apos;errore minimo). Il learning rate
        controlla quanto è grande ogni passo. Troppo grande? Rimbalza. Troppo piccolo? Ci mette un&apos;eternità.
      </p>

      {/* Learning rate selector */}
      <div className="mb-4">
        <div className="mb-2 text-xs font-medium text-[var(--ink-muted)]">
          Learning rate: <span className="font-semibold text-[var(--ink)]">{lr}</span>
          {lrInfo && <span className="ml-1 text-[var(--ink-faint)]">({lrInfo.desc})</span>}
        </div>
        <div className="flex gap-2">
          {LEARNING_RATES.map((l) => (
            <button
              key={l.value}
              onClick={() => { setLr(l.value); reset(); }}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                lr === l.value
                  ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink-faint)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG visualization */}
      <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)]">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full">
          {/* Axes */}
          <line x1={PAD_L} y1={SVG_H - PAD_B} x2={SVG_W - PAD_R} y2={SVG_H - PAD_B} stroke="var(--border)" strokeWidth={1} />
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={SVG_H - PAD_B} stroke="var(--border)" strokeWidth={1} />
          <text x={SVG_W / 2} y={SVG_H - 5} textAnchor="middle" className="text-[9px]" fill="var(--ink-faint)">Parametro</text>
          <text x={10} y={SVG_H / 2} textAnchor="middle" className="text-[9px]" fill="var(--ink-faint)" transform={`rotate(-90, 10, ${SVG_H / 2})`}>Errore (loss)</text>

          {/* Loss curve */}
          <path d={curvePath} fill="none" stroke="var(--accent)" strokeWidth={2} opacity={0.6} />

          {/* Fill under curve */}
          <path
            d={`${curvePath} L ${toSvgX(X_MAX)} ${toSvgY(Y_MIN)} L ${toSvgX(X_MIN)} ${toSvgY(Y_MIN)} Z`}
            fill="var(--accent)"
            opacity={0.05}
          />

          {/* Trail */}
          {trail.map((tx, i) => {
            if (i === trail.length - 1) return null;
            return (
              <circle
                key={i}
                cx={toSvgX(tx)}
                cy={toSvgY(lossAt(tx))}
                r={2}
                fill="var(--accent)"
                opacity={0.2 + (i / trail.length) * 0.4}
              />
            );
          })}

          {/* Ball */}
          <circle
            cx={toSvgX(ballX)}
            cy={toSvgY(ballY)}
            r={7}
            fill={converged ? "#10b981" : diverging ? "#ef4444" : "var(--accent)"}
            stroke="white"
            strokeWidth={2}
          />

          {/* Loss label */}
          <text
            x={toSvgX(ballX)}
            y={toSvgY(ballY) - 14}
            textAnchor="middle"
            className="text-[10px]"
            fill="var(--ink)"
            fontWeight={600}
          >
            loss: {ballY.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={play}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          {playing ? "⏸ Pausa" : "▶ Play"}
        </button>
        <button
          onClick={step}
          disabled={playing}
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)] disabled:opacity-30"
        >
          1 step
        </button>
        <button
          onClick={reset}
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--bg)]"
        >
          Reset
        </button>
        <span className="ml-auto text-xs text-[var(--ink-faint)]">
          Step {trail.length - 1}
        </span>
      </div>

      {/* Status */}
      {converged && (
        <p className="mt-3 rounded-[var(--radius)] bg-green-50 p-3 text-sm text-green-800">
          Convergenza raggiunta! La pallina ha trovato un minimo locale. Con il learning rate giusto,
          il modello trova i parametri ottimali in un numero ragionevole di step.
        </p>
      )}
      {diverging && !playing && trail.length > 3 && (
        <p className="mt-3 rounded-[var(--radius)] bg-red-50 p-3 text-sm text-red-800">
          Il learning rate è troppo alto: la pallina rimbalza fuori dalla valle invece di scenderci.
          Prova con un valore più basso.
        </p>
      )}
    </div>
  );
}
