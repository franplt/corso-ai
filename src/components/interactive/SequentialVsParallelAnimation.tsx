"use client";

import { useState, useEffect, useRef } from "react";

const WORDS = ["Il", "gatto", "dorme", "sul", "divano", "caldo"];

export function SequentialVsParallelAnimation() {
  const [playing, setPlaying] = useState(false);
  const [rnnStep, setRnnStep] = useState(-1);
  const [transformerActive, setTransformerActive] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function start() {
    setPlaying(true);
    setDone(false);
    setRnnStep(-1);
    setTransformerActive(false);

    // Transformer activates all at once after a brief delay
    setTimeout(() => setTransformerActive(true), 400);

    // RNN processes one word at a time
    for (let i = 0; i < WORDS.length; i++) {
      setTimeout(() => setRnnStep(i), 400 + i * 600);
    }

    // Mark done after RNN finishes
    timerRef.current = setTimeout(() => {
      setDone(true);
      setPlaying(false);
    }, 400 + WORDS.length * 600 + 200);
  }

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setRnnStep(-1);
    setTransformerActive(false);
    setDone(false);
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-7">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Demo interattiva
      </div>
      <h3 className="font-heading mb-1 text-lg font-semibold text-[var(--ink)]">
        Sequenziale (RNN) vs Parallelo (Transformer)
      </h3>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        Premi play e guarda la differenza: la RNN deve processare ogni parola una dopo l&apos;altra,
        il Transformer le processa tutte insieme.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* RNN side */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
              RNN
            </span>
            <span className="text-xs text-[var(--ink-muted)]">Sequenziale</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {WORDS.map((word, i) => {
              const processed = rnnStep >= i;
              const current = rnnStep === i;
              return (
                <div
                  key={i}
                  className={`rounded-[var(--radius)] border px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                    current
                      ? "border-orange-400 bg-orange-100 text-orange-800 scale-105"
                      : processed
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--ink-faint)]"
                  }`}
                >
                  {word}
                  {processed && !current && (
                    <span className="ml-1 text-xs text-green-500">✓</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-[var(--border)]">
            <div
              className="h-1.5 rounded-full bg-orange-400 transition-all duration-500"
              style={{ width: `${rnnStep >= 0 ? ((rnnStep + 1) / WORDS.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Transformer side */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
              Transformer
            </span>
            <span className="text-xs text-[var(--ink-muted)]">Parallelo</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {WORDS.map((word, i) => (
              <div
                key={i}
                className={`rounded-[var(--radius)] border px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                  transformerActive
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--ink-faint)]"
                }`}
              >
                {word}
                {transformerActive && (
                  <span className="ml-1 text-xs text-green-500">✓</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-[var(--border)]">
            <div
              className={`h-1.5 rounded-full bg-blue-500 transition-all ${transformerActive ? "duration-300" : "duration-0"}`}
              style={{ width: transformerActive ? "100%" : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={playing ? reset : start}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          {playing ? "Reset" : done ? "Rigioca" : "▶ Play"}
        </button>
        {done && (
          <span className="text-sm text-[var(--ink-muted)]">
            Il Transformer ha finito subito. La RNN ha dovuto aspettare {WORDS.length} step.
          </span>
        )}
      </div>
    </div>
  );
}
