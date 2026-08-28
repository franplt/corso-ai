# Analytics e conversioni

## Configurazione

Impostare `NEXT_PUBLIC_GA_MEASUREMENT_ID` con l'ID dello stream web GA4, nel
formato `G-XXXXXXXXXX`. Per PostHog impostare
`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` e `NEXT_PUBLIC_POSTHOG_HOST` (per il cloud
europeo: `https://eu.i.posthog.com`). Google Analytics, PostHog, Vercel
Analytics e Speed Insights si caricano solo dopo il consenso esplicito.

PostHog acquisisce automaticamente click, page view, uscita dalla pagina,
dead click, eccezioni JavaScript e replay della sessione. Tutti gli input sono
mascherati; gli elementi con `data-ph-mask` nascondono anche il testo visibile e
quelli con `data-ph-block` vengono esclusi interamente dal replay. Gli utenti
autenticati vengono collegati usando soltanto l'ID tecnico Supabase, mai l'email.

Non inviare mai email, ID Supabase, nomi o altri dati personali negli eventi.

## Eventi raccolti

| Evento | Quando parte | Parametri principali |
| --- | --- | --- |
| `page_view` | Navigazione o cambio pagina | Automatico tramite GA4 e PostHog |
| `select_content` | Click su CTA o capitolo | `content_type`, `content_id`, `chapter_number` |
| `chapter_view` | Apertura di una puntata | numero, titolo, tipo di accesso, minuti |
| `chapter_progress` | 25%, 50%, 75% e 90% di lettura | puntata, tipo di accesso, percentuale |
| `chapter_complete` | 90% di una puntata leggibile | puntata e tipo di accesso |
| `paywall_view` | Visualizzazione del blocco di acquisto | stato anonimo/autenticato |
| `paywall_cta_click` | Click su registrazione o accesso dal paywall | azione scelta |
| `sign_up` | Registrazione riuscita | metodo e intento di acquisto |
| `login` | Accesso riuscito | metodo e intento di acquisto |
| `begin_checkout` | Creazione riuscita di una sessione Stripe | valore, valuta, origine e prodotto |
| `checkout_cancel` | Ritorno da Stripe senza pagamento | — |
| `purchase` | Sessione Stripe verificata come pagata | transazione, valore, valuta e prodotto |
| `tutor_open` | Apertura del tutor contestuale | `chapter_number` |
| `tutor_conversation_started` | Primo messaggio inviato al tutor | `chapter_number` |
| `tutor_explain_selection` | Richiesta di spiegazione del testo selezionato | `chapter_number`, `selection_length` |

`purchase` è protetto dai duplicati nel browser e usa l'ID della sessione
Stripe come `transaction_id`. La pagina di conferma recupera valore e valuta
direttamente da Stripe: non si fida dei parametri della URL.

Gli eventi espliciti della tabella vengono inviati con gli stessi nomi sia a
GA4 sia a PostHog. Questo permette di costruire in PostHog un funnel unico:
`chapter_view` → `paywall_view` → `sign_up`/`login` → `begin_checkout` →
`purchase`, e di aprire i replay delle sessioni che abbandonano un passaggio.

## Eventi chiave consigliati in GA4

In **Amministrazione → Visualizzazione dati → Eventi chiave**, contrassegnare:

1. `purchase` — conversione primaria (GA4 la considera già un evento chiave).
2. `begin_checkout` — conversione secondaria del funnel.
3. `sign_up` — conversione secondaria di acquisizione.
4. `chapter_complete` — conversione di attivazione/qualità.

Non marcare `page_view`, `chapter_progress` o `paywall_view` come conversioni:
servono a diagnosticare il funnel, non rappresentano un risultato finale.

## Verifica

Accettare i cookie in una finestra di test e usare **Realtime** o **DebugView**
in GA4. In PostHog usare **Live events** e **Session replay**. Percorrere il
funnel senza pagare fino al Checkout. Per `purchase`, usare esclusivamente una
transazione Stripe in modalità test su un ambiente configurato con chiavi
Stripe test.
