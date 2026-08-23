import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto max-w-xl">
      <div className="surface rounded-[var(--radius-lg)] p-8 sm:p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>
        <h1 className="font-heading mb-3 text-3xl font-semibold text-[var(--ink)]">
          Pagamento ricevuto
        </h1>
        <p className="mb-8 text-[var(--ink-muted)]">
          Stiamo attivando il tuo accesso premium. Di solito bastano pochi
          secondi: apri i capitoli e, se necessario, aggiorna la pagina.
        </p>
        <Link href="/chapters" className="btn btn-primary">
          Vai ai capitoli
        </Link>
      </div>
    </main>
  );
}
