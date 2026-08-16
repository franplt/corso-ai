"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ResetPasswordConfirmPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("La password deve avere almeno 8 caratteri.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <main>
        <div className="mb-10">
          <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
            Password aggiornata
          </h1>
          <p className="text-[var(--ink-muted)]">
            La tua password è stata reimpostata con successo. Ora puoi accedere
            con la nuova password.
          </p>
        </div>
        <Link href="/chapters" className="btn btn-primary">
          Vai ai capitoli
        </Link>
      </main>
    );
  }

  return (
    <main>
      <div className="mb-10">
        <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
          Nuova password
        </h1>
        <p className="text-[var(--ink-muted)]">
          Scegli una nuova password per il tuo account.
        </p>
      </div>

      <form
        className="surface rounded-[var(--radius-lg)] p-6 sm:p-8"
        onSubmit={onSubmit}
      >
        <div className="space-y-5">
          <div>
            <label className="label" htmlFor="password">
              Nuova password
            </label>
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Minimo 8 caratteri"
            />
          </div>
          <div>
            <label className="label" htmlFor="confirm-password">
              Conferma password
            </label>
            <input
              id="confirm-password"
              className="input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          className="btn btn-primary mt-6 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Aggiornamento..." : "Aggiorna password"}
        </button>
        {error && (
          <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
        )}
      </form>
    </main>
  );
}
