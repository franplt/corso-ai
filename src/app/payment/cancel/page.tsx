import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto max-w-xl">
      <div className="card p-6">
        <h1 className="mb-2 text-3xl font-semibold">Pagamento annullato</h1>
        <p className="mb-5 text-neutral-600">
          Nessun addebito effettuato. Se vuoi, puoi riprovare quando preferisci.
        </p>
        <Link href="/chapters" className="btn btn-outline">
          Torna ai capitoli
        </Link>
      </div>
    </main>
  );
}
