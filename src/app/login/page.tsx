import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Accedi",
  robots: {
    index: false,
    follow: false,
  },
};

function LoginFormFallback() {
  return (
    <main className="mx-auto max-w-md">
      <div className="mb-10">
        <div className="font-heading mb-2 h-9 w-32 rounded bg-[var(--border)]" />
        <div className="h-5 w-64 rounded bg-[var(--border)]" />
      </div>
      <div className="surface rounded-[var(--radius-lg)] p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <div className="label mb-2 h-4 w-16 rounded bg-[var(--border)]" />
            <div className="input h-12 rounded bg-[var(--border)]" />
          </div>
          <div>
            <div className="label mb-2 h-4 w-20 rounded bg-[var(--border)]" />
            <div className="input h-12 rounded bg-[var(--border)]" />
          </div>
        </div>
        <div className="btn btn-primary mt-6 h-12 w-full rounded-full bg-[var(--border)]" />
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
