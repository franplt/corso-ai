import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";

type PaywallCardProps = {
  chapterNumber: number;
  isLoggedIn: boolean;
};

export function PaywallCard({ chapterNumber, isLoggedIn }: PaywallCardProps) {
  return (
    <aside
      className="rounded-[var(--radius-lg)] border-2 border-[var(--accent)] bg-[var(--accent-muted)]/30 p-8 sm:p-10"
      role="region"
      aria-label="Sblocca il corso"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
          Accesso completo
        </p>
        <h2 className="font-heading mb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          Sblocca le puntate {chapterNumber}–10
        </h2>
        <p className="mb-6 text-[var(--ink-muted)]">
          Un solo pagamento di <strong className="text-[var(--ink)]">€9,99</strong>.
          Accesso a vita, senza abbonamenti.
        </p>
        {isLoggedIn ? (
          <CheckoutButton />
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/login" className="btn btn-primary">
              Accedi
            </Link>
            <Link href="/signup" className="btn btn-secondary">
              Crea account
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
