"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import { createCheckoutUrl } from "@/lib/checkout-client";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intentBuy = searchParams.get("intent") === "buy";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Auto-login after signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // If auto-login fails (e.g. email confirmation required), go to login
      router.push(intentBuy ? "/login?next=checkout" : "/login");
      router.refresh();
      return;
    }

    if (intentBuy) {
      try {
        window.location.assign(await createCheckoutUrl());
      } catch (checkoutError) {
        setError(
          checkoutError instanceof Error
            ? checkoutError.message
            : "Impossibile avviare il pagamento. Riprova.",
        );
        setLoading(false);
      }
      return;
    }

    router.push("/chapters");
    router.refresh();
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
          Crea account
        </h1>
        <p className="text-[var(--ink-muted)]">
          {intentBuy
            ? "Registrati per sbloccare tutte le puntate. Dopo la registrazione andrai direttamente al pagamento."
            : "Registrati per acquistare e sbloccare tutte le puntate."}
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
              minLength={8}
              required
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          className="btn btn-primary mt-6 w-full"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creazione account..."
            : intentBuy
              ? "Registrati e vai al pagamento"
              : "Registrati"}
        </button>
        {error ? (
          <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
        ) : null}
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Hai già un account?{" "}
        <Link
          href={intentBuy ? "/login?next=checkout" : "/login"}
          className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Accedi
        </Link>
      </p>
    </>
  );
}

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-md">
      <Suspense>
        <SignupForm />
      </Suspense>
    </main>
  );
}
