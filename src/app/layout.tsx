import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthNav } from "@/components/AuthNav";
import { CookieConsent } from "@/components/CookieConsent";
import { ConditionalAnalytics } from "@/components/ConditionalAnalytics";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "it_IT",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 md:px-10">
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
              <AuthNav variant="header" />
            </nav>
          </header>
          {children}

          <footer className="mt-20 border-t border-[var(--border)] py-10 sm:mt-28">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="font-heading text-base font-semibold text-[var(--ink)]"
              >
                Corso AI in 10 puntate
              </Link>
              <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href="/chapters"
                  className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                >
                  Capitoli
                </Link>
                <Link
                  href="/chapters/puntata-1-perche-adesso"
                  className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                >
                  Inizia gratis
                </Link>
                <AuthNav variant="footer" />
              </nav>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[var(--ink-faint)]">
                © {new Date().getFullYear()} Corso AI in 10 puntate
              </p>
              <nav className="flex gap-4">
                <Link
                  href="/privacy"
                  className="text-xs text-[var(--ink-faint)] hover:text-[var(--ink-muted)] transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-[var(--ink-faint)] hover:text-[var(--ink-muted)] transition-colors"
                >
                  Termini
                </Link>
              </nav>
            </div>
          </footer>
        </div>
        <CookieConsent />
        <ConditionalAnalytics />
      </body>
    </html>
  );
}
