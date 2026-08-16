import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-20 text-center">
      <p className="mb-2 text-6xl font-bold text-[var(--accent)]">404</p>
      <h1 className="font-heading mb-4 text-2xl font-semibold text-[var(--ink)]">
        Pagina non trovata
      </h1>
      <p className="mb-8 max-w-md text-[var(--ink-muted)]">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn btn-primary">
          Torna alla home
        </Link>
        <Link href="/chapters" className="btn btn-secondary">
          Vai ai capitoli
        </Link>
      </div>
    </main>
  );
}
