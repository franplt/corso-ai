"use client";

import { useSyncExternalStore } from "react";

type ConsentStatus = "pending" | "accepted" | "declined";

const CONSENT_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-change";

function getConsentSnapshot(): ConsentStatus {
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : "pending";
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

function subscribeToHydration(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => undefined;
}

export function CookieConsent() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const status = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => "pending",
  );

  function record(choice: "accepted" | "declined") {
    localStorage.setItem(CONSENT_KEY, choice);
    // The `storage` event does not fire in the tab that wrote the value, so
    // without this the visitor who just clicked "Accetta" would not be counted
    // until they navigated or reloaded.
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  function accept() {
    record("accepted");
  }

  function decline() {
    record("declined");
  }

  // Never render the banner in the server HTML: returning visitors should not
  // see it flash before their saved decision is available in the browser.
  if (!hydrated || status !== "pending") return null;

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
