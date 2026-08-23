"use client";

export function CookiePreferences() {
  function reopenConsent() {
    localStorage.removeItem("cookie-consent");
    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="text-xs text-[var(--ink-faint)] hover:text-[var(--ink-muted)] transition-colors"
    >
      Preferenze cookie
    </button>
  );
}
