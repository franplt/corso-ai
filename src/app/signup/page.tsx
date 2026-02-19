"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
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

    router.push("/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md">
      <h1 className="mb-2 text-3xl font-semibold">Crea account</h1>
      <p className="mb-6 text-neutral-600">
        Registrati per acquistare e sbloccare tutte le puntate.
      </p>

      <form className="card space-y-4 p-5" onSubmit={onSubmit}>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <button className="btn w-full" type="submit" disabled={loading}>
          {loading ? "Creazione account..." : "Registrati"}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
      <p className="mt-4 text-sm text-neutral-600">
        Hai gia un account?{" "}
        <Link className="underline" href="/login">
          Accedi
        </Link>
      </p>
    </main>
  );
}
