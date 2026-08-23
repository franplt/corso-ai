"use client";

import { useState } from "react";
import { createCheckoutUrl } from "@/lib/checkout-client";

export function CheckoutButton({ source = "paywall" }: { source?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      window.location.assign(await createCheckoutUrl(source));
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Errore di rete. Riprova.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={handleCheckout}
        type="button"
      >
        {loading ? "Reindirizzamento..." : "Sblocca ora · €9,90"}
      </button>
      {error ? (
        <p className="text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
