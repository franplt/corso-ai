# Launch status

Last verified: 2026-08-23

## Completed and deployed

- All 10 episodes render in full with their diagrams and interactive demos.
- Episode 1 is public. Episodes 2–10 use the authenticated paywall.
- Desktop and 390 px mobile layouts have no horizontal overflow.
- All 29 embedded diagrams and interactive demos were rendered and visually
  reviewed individually at 1280 px and 390 px.
- Embedded components no longer inherit article paragraph and list spacing;
  the episode 1 timeline is aligned and compact at both widths.
- Premium previews end at a paragraph boundary and fade into the paywall
  instead of cutting a word abruptly.
- Cookie consent persists for accept and decline. Analytics load only after
  acceptance, without a returning-visitor banner flash.
- Privacy, terms, password reset, 404, sitemap, robots and Open Graph routes
  are present in the production build.
- Lint passes without errors or warnings.
- The Next.js production build passes.
- `npm audit` reports zero known vulnerabilities.
- Stripe test mode uses an active €9.90 one-time EUR price.
- Checkout is localized in Italian and uses the course colors, typography,
  wordmark and trust copy. It offers card payments with supported wallets,
  without unrelated buy-now-pay-later or country-specific methods.
- Signup and login purchase intents create the Checkout Session directly,
  without rendering the former intermediate redirect page. Checkout identity
  validation uses verified JWT claims before the existing access check.
- A real Stripe test Checkout Session completed successfully for €9.90.
- Its paid session was delivered as a correctly signed webhook event; the
  handler returned 200 and granted access in Supabase.
- A signed unpaid webhook event is acknowledged without granting access, and a
  paid event returns a retryable error when Supabase is unavailable.
- Registration, logout, login and password recovery were verified in
  production with a synthetic account.
- The authenticated paywall was verified before payment. After the test
  payment, premium access persisted across logout, password reset and a fresh
  login; episode 10 rendered in full without the paywall.
- The Supabase project is active. The access-protection function, trigger and
  safe profile policy from migration 003 were applied and verified; the old
  unsafe policy is absent.
- Email confirmation is disabled to match the product's immediate-login signup
  flow. Password recovery remains enabled and was verified end to end.
- All product changes through pricing alignment commit `a0f4195` are published
  on `main`.
- Vercel completed the production deployment successfully on 2026-08-23.
- The public domain serves the new legal pages, custom 404, sitemap, robots,
  hardened security headers and corrected post-payment copy.
- No redundant pull request is open on GitHub.

## Important fixes in the launch branch

- Updated Next.js and Markdown rendering dependencies to patched versions.
- Prevented unpaid Stripe sessions from granting course access.
- Added support for delayed-payment success events.
- Made database failures retryable instead of silently acknowledging them.
- Prevented duplicate checkout for users who already have access.
- Removed production `unsafe-eval` from the Content Security Policy.
- Isolated episode Markdown files in `content/episodes/` so server output
  tracing does not include the whole repository.
- Removed the visible episode 5 authoring placeholder.

## Launch decision

No launch blocker remains. The public site, authentication, recovery, paywall,
Stripe test payment, signed webhook handling and persistent premium entitlement
have all been verified end to end.

Production correctly opens a live Stripe Checkout for €9.90. QA did not place a
real-money order: the payment proof used Stripe test mode while exercising the
same application webhook code and production Supabase entitlement path. Keep
the Stripe live webhook endpoint monitored during the first real order.
