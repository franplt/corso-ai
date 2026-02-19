import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getCurrentUser, isDevUnlocked } from "@/lib/auth";
import { DevUnlockBanner } from "@/components/DevUnlockBanner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corso AI in 10 puntate",
  description: "Corso pratico e accessibile per capire davvero l'AI.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const devUnlocked = await isDevUnlocked();

  return (
    <html lang="it" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <div className="mx-auto min-h-screen max-w-4xl px-5 py-8 sm:px-8 md:px-10">
          <header className="mb-12 flex items-center justify-between sm:mb-16">
            <Link
              href="/"
              className="font-heading text-xl font-semibold text-[var(--ink)] sm:text-2xl"
            >
              Corso AI in 10 puntate
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/chapters"
                className="rounded-full px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--ink)] sm:px-4"
              >
                Capitoli
              </Link>
              {user ? (
                <Link
                  href="/account"
                  className="rounded-full px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--ink)] sm:px-4"
                >
                  Account
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--ink)] sm:px-4"
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/signup"
                    className="btn btn-primary btn-sm"
                  >
                    Inizia
                  </Link>
                </>
              )}
            </nav>
          </header>
          {children}
        </div>
        {process.env.NODE_ENV === "development" && (
          <DevUnlockBanner unlocked={devUnlocked} />
        )}
      </body>
    </html>
  );
}
