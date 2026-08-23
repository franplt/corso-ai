# Deploy — checklist di lancio

## 1. Supabase

- [ ] Ripristinare il progetto configurato oppure crearne uno nuovo. L'host
  presente nell'ambiente locale non risolve più nel DNS (verifica 2026-08-23).
- [ ] Eseguire, in ordine, le migration `001_profiles.sql`,
  `002_entitlements.sql` e `003_lock_has_access.sql`.
- [ ] Aggiornare le tre variabili Supabase in locale e su Vercel.
- [ ] Configurare gli URL consentiti per login e reset password sul dominio di
  produzione.
- [ ] Verificare registrazione, login, reset password e lettura del profilo.

## 2. Stripe

- [x] Prodotto test configurato: pagamento una tantum da €9,99 in EUR.
- [x] Il codice concede accesso solo a sessioni con `payment_status=paid`.
- [x] Il webhook restituisce un errore a Stripe se la scrittura su Supabase
  fallisce, così l'evento viene ritentato.
- [ ] Creare o aggiornare il webhook di produzione verso
  `/api/stripe/webhook` e salvare il relativo secret su Vercel.
- [ ] Eseguire un pagamento completo con una carta Stripe di test dopo il
  ripristino di Supabase e confermare lo sblocco delle puntate 2–10.

## 3. GitHub e Vercel

- [ ] Ripristinare l'autenticazione GitHub e pubblicare i commit locali.
- [ ] Chiudere la PR SEO ridondante dopo la pubblicazione.
- [ ] Collegare il repository a Vercel e impostare tutte le variabili di
  ambiente.
- [ ] Eseguire il deploy di produzione e verificare che punti al commit atteso.

## 4. Verifica finale

- [ ] Controllare homepage, dieci puntate, paywall, account e pagine legali sul
  dominio pubblico.
- [ ] Controllare `robots.txt`, `sitemap.xml`, immagine Open Graph e header di
  sicurezza.
- [ ] Eseguire lo smoke test mobile e il pagamento Stripe in modalità test.

Per l'evidenza tecnica più recente, vedere
[`docs/LAUNCH_STATUS.md`](docs/LAUNCH_STATUS.md).
