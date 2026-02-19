import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto max-w-xl">
      <div className="card p-6">
        <h1 className="mb-2 text-3xl font-semibold">Pagamento completato</h1>
        <p className="mb-5 text-neutral-600">
          Perfetto, il tuo accesso premium e stato attivato. Ora puoi leggere tutte le puntate.
        </p>
        <Link href="/chapters" className="btn">
          Vai ai capitoli
        </Link>
      </div>
    </main>
  );
}
