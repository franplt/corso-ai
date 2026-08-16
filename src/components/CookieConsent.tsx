"use client";

import { useEffect, useState } from "react";

type ConsentStatus = "pending" | "accepted" | "declined";

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "declined") {
      setStatus(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function record(choice: "accepted" | "declined") {
    localStorage.setItem("cookie-consent", choice);
    setStatus(choice);
    setVisible(false);
    // The `storage` event does not fire in the tab that wrote the value, so
    // without this the visitor who just clicked "Accetta" would not be counted
    // until they navigated or reloaded.
    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  function accept() {
    record("accepted");
  }

  function decline() {
    record("declined");
  }

  // Don't render banner if already decided
  if (!visible) return null;

  // Don't render during SSR
  if (status !== "pending") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4 shadow-[0_-2px_12px_rgba(26,24,22,0.08)]"
      role="banner"
      aria-label="Consenso cookie"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--ink-muted)]">
          Questo sito usa cookie analitici per migliorare l&apos;esperienza.{" "}
          <a
            href="/privacy"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Scopri di più
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={decline} className="btn btn-ghost btn-sm">
            Rifiuta
          </button>
          <button onClick={accept} className="btn btn-primary btn-sm">
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
