## Corso AI in 10 puntate

Un solo progetto: **testi del corso** (file `.md` in `content/episodes/`) e **sito Next.js** (app in `src/`, ecc.). L’app legge le puntate direttamente dai file numerati nella directory dei contenuti (`1. Perché adesso?.md`, ecc.).

Stack:
- Next.js (App Router)
- Supabase (Auth + DB)
- Stripe Checkout (one-time payment)

### Features
- Public homepage and chapter catalog
- Episode 1 free
- Episodes 2-10 gated behind payment
- Email/password signup and login
- One-time payment (€9.90) to unlock premium access

## Local setup

1) Install dependencies:
```bash
npm install
```

2) Copy env file:
```bash
cp .env.example .env.local
```

3) Fill environment variables in `.env.local`:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (ID GA4 nel formato `G-XXXXXXXXXX`)
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (token pubblico del progetto PostHog)
- `NEXT_PUBLIC_POSTHOG_HOST` (endpoint di ingestione, predefinito EU)
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`

## Analytics e conversioni

Google Analytics 4 e PostHog vengono caricati solo dopo il consenso ai cookie.
Gli eventi del funnel, dell'acquisto e della lettura sono descritti in
[`docs/ANALYTICS.md`](docs/ANALYTICS.md).

4) Run database migrations in Supabase SQL editor:
- `supabase/migrations/001_profiles.sql`
- `supabase/migrations/002_entitlements.sql`
- `supabase/migrations/003_lock_has_access.sql`

5) Start dev server:
```bash
npm run dev
```

Open `http://localhost:3000`.

## Stripe webhook (local)

Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Set `STRIPE_WEBHOOK_SECRET` using the secret shown by `stripe listen`.

## Deploy (mettere online)

Guida completa: **[DEPLOY.md](DEPLOY.md)** — Supabase, Stripe e Vercel passo passo.

Stato verificato e blocchi correnti: **[docs/LAUNCH_STATUS.md](docs/LAUNCH_STATUS.md)**.
