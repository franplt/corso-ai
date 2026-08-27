# Sistema operativo marketing cloud

## Scopo

Far avanzare marketing, traffico e conversioni anche quando il Mac personale e' spento. Il sistema gira su runner GitHub ospitati nel cloud e usa una pull request persistente come superficie di controllo e cronologia verificabile.

## Cadenza

- Lunedi' alle 08:00 UTC — revisione strategica: controlla contesto, sito, backlog e lavoro recente; sceglie una priorita' settimanale.
- Ogni giorno alle 09:00 UTC — esecuzione: continua l'obiettivo attivo o prende la priorita' `Ready` piu' importante, porta avanti il lavoro e aggiorna stato e log.
- Manuale — entrambi i modi possono essere avviati dalla pagina Actions di GitHub.

## Politica costi dei modelli

- Strategia settimanale: `gpt-5.6-luna` con reasoning `low`, per triage, backlog e decisioni documentali cost-sensitive.
- Esecuzione quotidiana: `gpt-5.6-terra` con reasoning `low`, per bilanciare affidabilita' agentica e costo nelle modifiche al prodotto.
- L'uso di `gpt-5.6-sol` richiede un avvio manuale con qualita' `important`; non viene mai selezionato dalle schedulazioni automatiche.
- La qualita' `important` e' riservata a decisioni o implementazioni complesse con un impatto economico plausibile che giustifichi il costo superiore.
- Un errore va diagnosticato prima di rilanciare: non ripetere run a pagamento identiche senza una modifica o una nuova evidenza.
- Il passaggio agentico ha un timeout di 30 minuti per limitare le run bloccate o improduttive.
- Una pull request aperta blocca le run successive prima della chiamata al modello, evitando lavoro e consumo duplicati.

Gli orari UTC corrispondono circa alle 09:00/10:00 in Italia e Portogallo a seconda dell'ora legale. GitHub puo' avviare i job schedulati con qualche minuto di ritardo.

## Flusso

1. Il runner apre il repository e l'eventuale branch persistente `codex/cloud-marketing-agent`.
2. Installa le dipendenze prima di avviare Codex; durante il lavoro l'agente non ha accesso generale alla rete.
3. Installa nel proprio ambiente cloud una selezione fissata per commit delle skill Marketing Skills e OpenSEO.
4. Codex legge il contesto persistente e compie il lavoro consentito.
5. Guardrail automatici controllano percorsi e tipo delle modifiche.
6. Lint e build devono riuscire.
7. Il risultato viene proposto in pull request. Le modifiche ordinarie classificate come Livello A possono essere unite automaticamente dopo i test; quelle ampie o sensibili restano aperte in attesa di approvazione.

Il deploy di Vercel avviene soltanto quando la pull request viene unita a `main`, secondo la configurazione gia' esistente del progetto. Una pull request ampia e' anche la richiesta di approvazione prima della pubblicazione: il lavoro puo' essere completo senza avere ancora effetto sugli utenti. Finche' una richiesta di approvazione e' aperta, le run successive si fermano per non accumulare o nascondere altre decisioni.

## Modello di autonomia

L'obiettivo economico e' costruire e validare un income stream con il minimo intervento umano possibile. L'agente non e' limitato a micro-correzioni: puo' fare ricerca, progettare esperimenti, scrivere contenuti, sviluppare nuove pagine o strumenti, migliorare SEO/CRO/onboarding e portare avanti progetti composti da piu' run. Tutto il lavoro reversibile puo' essere preparato autonomamente sul branch cloud.

### Livello A — autonomo

Analisi, strategia, backlog, ricerca basata su fonti disponibili, copy, contenuti, SEO, CRO, pagine, componenti, strumenti gratuiti e codice non sensibile. L'agente puo' preparare modifiche anche sostanziali e validarle in pull request.

### Livello B — proposta pronta, approvazione prima dell'effetto

Pubblicazione o merge di un cambiamento ampio, nuovi canali pubblici, invio di email o messaggi, submission a directory, creazione/modifica di account esterni, modifica importante dell'offerta, del prezzo o delle promesse commerciali. L'agente deve preparare il lavoro quando possibile, poi inserire una richiesta concreta in `.agents/approval-queue.md` spiegando effetto, rischio, costo e rollback.

### Livello C — mai senza approvazione esplicita

Spese, campagne a pagamento, pagamenti, cambiamenti a Stripe/checkout, Supabase/auth/entitlement, segreti, migrazioni, infrastruttura o azioni che coinvolgono dati personali. L'agente si ferma prima dell'azione esterna.

In ogni livello sono vietati social proof inventata, urgenza falsa, numeri non verificati e pratiche ingannevoli.

## Regole per esecuzione

- Un obiettivo coerente per volta; puo' richiedere piu' file e piu' run.
- Se esiste un obiettivo `In progress`, completarlo o bloccarlo prima di iniziarne un altro.
- Nessuna spesa pubblicitaria o azione esterna.
- Nessuna modifica diretta a `main`.
- Lint e build obbligatori per ogni modifica al prodotto.
- Se mancano dati, l'agente deve scrivere cosa manca e trasformarlo in un task misurabile.
- Il valore atteso deve essere collegato a traffico qualificato, attivazione, checkout o acquisti; evitare lavoro estetico senza una tesi misurabile.
- Ogni run deve aggiornare `.agents/run-decision.json`. Il valore sicuro predefinito e' `approval_required: true`; solo un intervento chiaramente di Livello A puo' impostarlo a `false`.

## Arresto e recupero

Kill switch immediato: disabilitare il workflow `Cloud marketing agents` dalla pagina Actions, oppure rimuovere/rinominare il secret `OPENAI_API_KEY`.

Se una run fallisce, nessuna modifica viene pubblicata. La run successiva riparte dallo stato della pull request persistente. In caso di conflitto con `main`, il job si ferma e richiede intervento.

## Dipendenze esterne ancora da collegare

La prima versione usa repository, contenuti ed eventi gia' definiti. Per prendere decisioni quantitative servira' in seguito accesso in sola lettura a PostHog, GA4/Search Console o esportazioni periodiche. Queste connessioni non devono bloccare l'avvio del sistema, ma l'agente non deve fingere di aver visto dati che non possiede.
