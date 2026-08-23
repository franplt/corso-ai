import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";

type PaywallCardProps = {
  isLoggedIn: boolean;
};

const INCLUDED = [
  "Tutte le 10 puntate, subito disponibili",
  "Accesso a vita — nessun abbonamento",
  "Aggiornamenti futuri inclusi",
  "Leggi da qualsiasi dispositivo",
];

export function PaywallCard({ isLoggedIn }: PaywallCardProps) {
  return (
    <aside
      className="rounded-[var(--radius-lg)] border-2 border-[var(--accent)] bg-[var(--accent-muted)]/30 p-8 sm:p-10"
      role="region"
      aria-label="Sblocca il corso"
    >
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            Accesso completo
          </p>
          <h2 className="font-heading mb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Sblocca le puntate 2–10
          </h2>
          <p className="mb-6 text-[var(--ink-muted)]">
            Un solo pagamento di{" "}
            <strong className="text-[var(--ink)]">€9,90</strong>.
          </p>
        </div>

        <ul className="mb-7 space-y-2.5">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--ink-muted)]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white text-[10px] font-bold">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {isLoggedIn ? (
          <div className="text-center">
            <CheckoutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/signup?intent=buy" className="btn btn-primary">
              Crea account e sblocca
            </Link>
            <Link href="/login?next=checkout" className="btn btn-secondary">
              Accedi
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
