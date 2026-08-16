# Launch Readiness — Design Spec

**Date**: 2026-04-04
**Scope**: Privacy Policy, Terms of Service, Cookie Consent, 404 Page, Password Reset, OG Image, Footer Updates

## Context

The course site (Next.js + Supabase Auth + Stripe) is functionally complete but missing legal, UX, and SEO pieces required before launch.

**Seller**: Francesco Paltrinieri, independent contractor registered in Portugal.
**Product**: "Corso AI in 10 puntate" — digital course, €9.99 one-time payment.
**Refund policy**: 14-day money-back guarantee.

---

## 1. Privacy Policy Page (`/privacy`)

- Server component at `src/app/privacy/page.tsx`
- Written in Italian
- Covers:
  - Identity of the data controller (Francesco Paltrinieri)
  - Data collected: email, password (hashed by Supabase), payment info (processed by Stripe)
  - Third-party processors: Supabase (auth/db), Stripe (payments), Vercel (hosting/analytics)
  - GDPR rights: access, rectification, deletion, portability, objection
  - Cookie usage (analytics only, with consent)
  - Contact email for data requests
- Styled with existing `.prose` class for consistency

## 2. Terms of Service Page (`/terms`)

- Server component at `src/app/terms/page.tsx`
- Written in Italian
- Covers:
  - Description of the service (digital course, 10 episodes)
  - Pricing: €9.99 one-time, episode 1 free
  - 14-day refund policy (money-back guarantee, request via email)
  - License: personal use only, no redistribution
  - Account responsibility
  - Limitation of liability
  - Governing law (Portuguese law)
- Styled with `.prose` class

## 3. Cookie Consent Banner

- Client component at `src/components/CookieConsent.tsx`
- Small fixed banner at bottom of page
- Text: "Questo sito usa cookie analitici per migliorare l'esperienza."
- Two buttons: "Accetta" / "Rifiuta"
- Stores preference in `localStorage` key `cookie-consent` (values: `accepted` | `declined`)
- On decline: Vercel Analytics should not load
- On accept or previous accept: Analytics loads normally
- Matches site design (warm palette, rounded corners, subtle shadow)
- Rendered in `layout.tsx` wrapping `<Analytics />`

## 4. Custom 404 Page

- Server component at `src/app/not-found.tsx`
- Friendly Italian message: "Pagina non trovata"
- Links to homepage and chapters
- Matches site design

## 5. Password Reset Flow

- **Forgot password link**: Added to `LoginForm.tsx` below the password field
- **Request page** (`src/app/reset-password/page.tsx`): Email input form, calls `supabase.auth.resetPasswordForEmail()` with redirect to `/reset-password/confirm`
- **Confirm page** (`src/app/reset-password/confirm/page.tsx`): New password form, calls `supabase.auth.updateUser({ password })` using the session from the magic link
- Both pages styled with existing form classes

## 6. OG Image

- Static file at `public/og-image.png` generated via `src/app/opengraph-image.tsx` (Next.js OG image generation)
- 1200×630, warm palette (#faf8f5 bg, #b45309 accent)
- Course title + subtitle
- Referenced in root `metadata` in `layout.tsx`

## 7. Footer & Analytics Updates

- Add "Privacy" and "Termini" links to footer nav
- Wrap `<Analytics />` in a client component that checks cookie consent before rendering
