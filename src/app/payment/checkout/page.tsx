"use client";

import { useEffect, useState } from "react";
import { createCheckoutUrl } from "@/lib/checkout-client";

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function startCheckout() {
      try {
        const checkoutUrl = await createCheckoutUrl("checkout_page");
        if (!cancelled) window.location.assign(checkoutUrl);
      } catch (checkoutError) {
        if (!cancelled) {
          setError(
            checkoutError instanceof Error
              ? checkoutError.message
              : "Errore di rete. Riprova.",
          );
        }
      }
    }

    startCheckout();
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <main className="mx-auto max-w-xl">
        <div className="surface rounded-[var(--radius-lg)] p-8 text-center">
          <h1 className="font-heading mb-3 text-2xl font-semibold text-[var(--ink)]">
            Qualcosa è andato storto
          </h1>
          <p className="mb-6 text-[var(--ink-muted)]">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
          >
            Riprova
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl">
      <div className="surface rounded-[var(--radius-lg)] p-8 text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <h1 className="font-heading mb-2 text-2xl font-semibold text-[var(--ink)]">
          Reindirizzamento al pagamento...
        </h1>
        <p className="text-[var(--ink-muted)]">
          Stai per essere redirectato su Stripe per completare l&apos;acquisto.
        </p>
      </div>
    </main>
  );
}
