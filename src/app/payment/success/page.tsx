import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto max-w-xl">
      <div className="surface rounded-[var(--radius-lg)] p-8 sm:p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>
        <h1 className="font-heading mb-3 text-3xl font-semibold text-[var(--ink)]">
          Pagamento completato
        </h1>
        <p className="mb-8 text-[var(--ink-muted)]">
          Perfetto, il tuo accesso premium è stato attivato. Ora puoi leggere
          tutte e 10 le puntate.
        </p>
        <Link href="/chapters" className="btn btn-primary">
          Vai ai capitoli
        </Link>
      </div>
    </main>
  );
}
