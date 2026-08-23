import Link from "next/link";
import { PurchaseAnalytics } from "@/components/PurchaseAnalytics";
import { getStripeClient } from "@/lib/stripe";

type PaymentSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  let purchase: { transactionId: string; value: number; currency: string } | null = null;

  if (sessionId?.startsWith("cs_")) {
    try {
      const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
      const expectedPriceId = process.env.STRIPE_PRICE_ID;
      const hasExpectedProduct =
        !expectedPriceId || session.metadata?.stripe_price_id === expectedPriceId;

      if (session.payment_status === "paid" && hasExpectedProduct) {
        purchase = {
          transactionId: session.id,
          value: (session.amount_total ?? 0) / 100,
          currency: (session.currency ?? "eur").toUpperCase(),
        };
      }
    } catch (error) {
      console.error("Unable to verify Checkout session for analytics", error);
    }
  }

  return (
    <main className="mx-auto max-w-xl">
      {purchase ? <PurchaseAnalytics {...purchase} /> : null}
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
