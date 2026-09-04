"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { createCheckoutUrl } from "@/lib/checkout-client";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    trackEvent("login", {
      method: "email",
      purchase_intent: searchParams.get("next") === "checkout",
    });

    const next = searchParams.get("next");
    if (next === "checkout") {
      try {
        window.location.assign(await createCheckoutUrl("login"));
        return;
      } catch (checkoutError) {
        setError(
          checkoutError instanceof Error
            ? checkoutError.message
            : "Impossibile avviare il pagamento. Riprova.",
        );
        setLoading(false);
        return;
      }
    }

    // Only ever redirect to a path on this origin. A bare `next` value would
    // otherwise let a crafted link (?next=//evil.example) bounce a user who
    // just typed their password straight off the site.
    const isSafeInternalPath =
      typeof next === "string" && next.startsWith("/") && !next.startsWith("//");
    router.push(isSafeInternalPath ? next : "/chapters");
    router.refresh();
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
          Accedi
        </h1>
        <p className="text-[var(--ink-muted)]">
          {searchParams.get("next") === "checkout"
            ? "Accedi per proseguire al pagamento sicuro su Stripe. Il corso costa 9,90 € una tantum, senza abbonamento."
            : "Rientra nel tuo account per continuare a leggere il corso."}
        </p>
      </div>

      <form
        className="surface rounded-[var(--radius-lg)] p-6 sm:p-8"
        onSubmit={onSubmit}
      >
        <div className="space-y-5">
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>
        <div className="mt-2 text-right">
          <Link
            href="/reset-password"
            className="text-sm text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
          >
            Password dimenticata?
          </Link>
        </div>
        <button
          className="btn btn-primary mt-6 w-full"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Accesso in corso..."
            : searchParams.get("next") === "checkout"
              ? "Accedi e vai al pagamento · €9,90"
              : "Accedi"}
        </button>
        {error ? (
          <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
        ) : null}
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Non hai un account?{" "}
        <Link
          href={searchParams.get("next") === "checkout" ? "/signup?intent=buy" : "/signup"}
          className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Registrati
        </Link>
      </p>
    </>
  );
}
