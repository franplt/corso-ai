import Link from "next/link";
import { PurchaseAnalytics } from "@/components/PurchaseAnalytics";
import { getCurrentUser } from "@/lib/auth";
import { getStripeClient } from "@/lib/stripe";

type PaymentSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  let purchase: { transactionId: string; value: number; currency: string } | null = null;
  let buyerEmail: string | null = null;

  if (sessionId?.startsWith("cs_")) {
    try {
      const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
      const expectedPriceId = process.env.STRIPE_PRICE_ID;
      const hasExpectedProduct =
        !expectedPriceId || session.metadata?.stripe_price_id === expectedPriceId;

      if (session.payment_status === "paid" && hasExpectedProduct) {
        buyerEmail =
          typeof session.customer_details?.email === "string"
            ? session.customer_details.email
            : typeof session.customer_email === "string"
              ? session.customer_email
              : null;
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

  const user = await getCurrentUser();

  function maskEmail(raw: string) {
    const [local, domain] = raw.split("@");
    if (!local || !domain) return "***@***.***";
    const visible = local.length <= 2 ? local[0] : local.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(local.length - 2, 1))}@${domain}`;
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
        {user ? (
          <>
            <p className="mb-8 text-[var(--ink-muted)]">
              Stiamo attivando il tuo accesso premium. Di solito bastano pochi
              secondi: apri i capitoli e, se necessario, aggiorna la pagina.
            </p>
            <Link href="/chapters" className="btn btn-primary">
              Vai ai capitoli
            </Link>
          </>
        ) : (
          <>
            <p className="mb-6 text-[var(--ink-muted)]">
              Il pagamento è stato registrato. Per leggere le puntate premium,
              accedi con l&apos;email usata su Stripe{buyerEmail ? (
                <>
                  {" "}
                  (<strong className="text-[var(--ink)]">{maskEmail(buyerEmail)}</strong>)
                </>
              ) : null}
              .
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={buyerEmail ? `/reset-password?email=${encodeURIComponent(buyerEmail)}` : "/reset-password"}
                className="btn btn-primary"
              >
                Imposta password
              </Link>
              <Link href="/login?next=/chapters" className="btn btn-secondary">
                Accedi
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
