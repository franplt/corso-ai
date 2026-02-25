# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
Italian-language AI course ("Corso AI in 10 puntate") — a Next.js 16 App Router site with Supabase Auth/DB and Stripe Checkout. Episode 1 is free; episodes 2–10 are behind a one-time €9.99 payment.

### Running the app
- `npm run dev` starts the Next.js dev server on port 3000.
- The app **starts and serves public pages without any external credentials**. Auth, payments, and access-gated chapters require Supabase and Stripe env vars in `.env.local` (see README for the full list).
- In development mode, setting the cookie `dev_unlocked=1` bypasses the paywall (handled by `src/lib/auth.ts`).

### Lint / Build / Test
- Lint: `npm run lint` (ESLint with Next.js + TypeScript configs). Currently 0 errors, 2 warnings.
- Build: `npm run build` (production build via Turbopack).
- There are no automated test suites in this repo.

### Non-obvious notes
- The `.env.example` file referenced in the README does not exist in the repo. Create `.env.local` manually with the variables listed in the README.
- Course content lives as numbered `.md` files in the project root (e.g. `1. Perché adesso?.md`). The app reads them at build/runtime via `src/lib/episodes.ts`.
- `next.config.ts` sets `turbopack.root` to `__dirname` so that Turbopack can resolve the root-level `.md` episode files.
