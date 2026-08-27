"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") ?? "";
  const [email, setEmail] = useState(prefillEmail);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password/confirm`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  function maskEmail(raw: string) {
    const [local, domain] = raw.split("@");
    if (!local || !domain) return "***@***.***";
    const visible = local.length <= 2 ? local[0] : local.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(local.length - 2, 1))}@${domain}`;
  }

  if (sent) {
    return (
      <main>
        <div className="mb-10">
          <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
            Controlla la tua email
          </h1>
          <p className="text-[var(--ink-muted)]">
            Se l&apos;indirizzo{" "}
            <strong className="text-[var(--ink)]">{maskEmail(email)}</strong>{" "}
            è associato a un account, riceverai un link per reimpostare la
            password. Controlla anche la cartella spam.
          </p>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        >
          &larr; Torna al login
        </Link>
      </main>
    );
  }

  return (
    <main>
      <div className="mb-10">
        <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
          Reimposta la password
        </h1>
        <p className="text-[var(--ink-muted)]">
          Inserisci la tua email e ti invieremo un link per reimpostare la
          password.
        </p>
      </div>

      <form className="surface rounded-[var(--radius-lg)] p-6 sm:p-8" onSubmit={onSubmit}>
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
            placeholder="la-tua@email.com"
          />
        </div>
        <button className="btn btn-primary mt-6 w-full" type="submit" disabled={loading}>
          {loading ? "Invio in corso..." : "Invia link di reset"}
        </button>
        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Ricordi la password?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Accedi
        </Link>
      </p>
    </main>
  );
}

