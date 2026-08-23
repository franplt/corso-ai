# Launch status

Last verified: 2026-08-23

## Completed and deployed

- All 10 episodes render in full with their diagrams and interactive demos.
- Episode 1 is public. Episodes 2–10 use the authenticated paywall.
- Desktop and 390 px mobile layouts have no horizontal overflow.
- Cookie consent persists for accept and decline. Analytics load only after
  acceptance, without a returning-visitor banner flash.
- Privacy, terms, password reset, 404, sitemap, robots and Open Graph routes
  are present in the production build.
- Lint passes without errors or warnings.
- The Next.js production build passes.
- `npm audit` reports zero known vulnerabilities.
- Stripe test mode uses an active €9.90 one-time EUR price.
- A signed unpaid webhook event is acknowledged without granting access.
- A paid event returns a retryable error when Supabase is unavailable.
- The complete launch history is published on `main` at commit `731f0b1`.
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

## Remaining external blocker

1. **Supabase:** the hostname in the current local environment does not resolve.
   Auth, password reset and paid entitlement cannot complete until the project
   is restored or replaced and its keys are updated.

The GitHub CLI and Vercel dashboard are not authenticated locally, but Git push
and the connected Vercel deployment both completed successfully. After
restoring or replacing Supabase, follow the Supabase and end-to-end verification
sections in `DEPLOY.md`.
