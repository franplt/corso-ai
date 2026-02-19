## Corso AI in 10 puntate

Un solo progetto: **testi del corso** (file `.md` nella root) e **sito Next.js** (app in `src/`, ecc.). L’app legge le puntate direttamente dai file numerati nella root (`1. Perché adesso?.md`, ecc.).

Stack:
- Next.js (App Router)
- Supabase (Auth + DB)
- Stripe Checkout (one-time payment)

### Features
- Public homepage and chapter catalog
- Episode 1 free
- Episodes 2-10 gated behind payment
- Email/password signup and login
- One-time payment (€9.99) to unlock premium access

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
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`

4) Run database migrations in Supabase SQL editor:
- `supabase/migrations/001_profiles.sql`
- `supabase/migrations/002_entitlements.sql`

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

## Deploy

- Deploy app to Vercel
- Add all env vars in Vercel project settings
- Configure Stripe webhook endpoint to:
  - `https://your-domain.com/api/stripe/webhook`
