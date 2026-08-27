# Backlog marketing

Ultimo aggiornamento: 2026-08-26

## Tesi dell'esperimento

Costruire un income stream a bassa manutenzione vendendo un prodotto digitale utile e affidabile. Il sistema deve cercare distribuzione organica ripetibile e migliorare il funnel fino all'acquisto, misurando ogni ipotesi e senza dipendere dal lavoro quotidiano del proprietario.

## Priorita' settimanale

Stabilire una baseline affidabile del funnel, quindi scegliere il collo di bottiglia con il maggiore impatto economico. Finche' i dati PostHog/GA4 non sono disponibili al runner, avanzare sulle opportunita' dimostrabili nel prodotto e preparare esattamente la connessione dati necessaria.

## Coda

| Stato | Priorita' | Intervento | Segnale di successo | Note |
| --- | --- | --- | --- | --- |
| Ready | P1 | Verificare che il percorso prima puntata → paywall → registrazione → checkout abbia CTA e messaggi coerenti | Nessun punto morto; eventi esistenti preservati | Usare solo evidenze nel prodotto |
| Ready | P1 | Ridurre il tempo di risposta delle puntate premium | Le 9 anteprime premium scendono dalla baseline di circa 1,99–2,10 s | Verificare auth/Supabase e possibilita' di caching senza indebolire l'accesso |
| Research | P2 | Definire 3–5 cluster di ricerca in italiano coerenti con il corso | Intento, pagina target e ipotesi annotati | Richiede verifica SERP/keyword prima di creare pagine |
| Research | P2 | Preparare un piano di riuso dei contenuti del corso per canali organici | 4 settimane di temi, senza pubblicazione automatica | Nessuna affermazione non verificata |
| Blocked | P1 | Analizzare conversione reale del funnel in PostHog/GA4 | Baseline per ogni passaggio e principale drop-off | Manca accesso dati in sola lettura dal cloud |

## In progress

Nessun progetto attivo.

## Regole di gestione

- `Ready`: eseguibile con le informazioni gia' disponibili.
- `Research`: prima raccogliere evidenze; non trasformare ipotesi in contenuto pubblico.
- `Blocked`: indicare il dato o permesso preciso che manca.
- Quando un task e' completato, aggiungere data, risultato e file nella sezione seguente.

## Completati

- 2026-08-27 — Audit tecnico OpenSEO e correzione indicizzazione: uniformato il canonical sul dominio `www`, assegnati canonical autonomi a indice e pagine legali, rimossa l'ereditarieta' del canonical homepage e impostato `noindex, nofollow` su login/signup. Baseline audit: 16 URL, 6 canonicalizzate verso una pagina diversa, 2 pagine auth indicizzabili e sottili. Obiettivo alla prossima scansione: 0 conflitti canonical tra le 6 URL segnalate e pagine auth escluse dall'indice.
