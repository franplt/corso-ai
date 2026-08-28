import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Scopri quali dati personali tratta Corso AI in 10 puntate, per quali finalità e come esercitare i tuoi diritti.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <div className="mb-10">
        <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
          Informativa sulla Privacy
        </h1>
        <p className="text-[var(--ink-muted)]">
          Ultimo aggiornamento: agosto 2026
        </p>
      </div>

      <div className="prose">
        <h2>Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento dei dati personali è{" "}
          <strong>Francesco Paltrinieri</strong>, lavoratore autonomo registrato
          in Portogallo. Per qualsiasi richiesta relativa ai tuoi dati puoi
          scrivere a{" "}
          <a href="mailto:fran.paltrinieri@gmail.com">
            fran.paltrinieri@gmail.com
          </a>
          .
        </p>

        <h2>Dati raccolti</h2>
        <p>Raccogliamo i seguenti dati personali:</p>
        <ul>
          <li>
            <strong>Email e password</strong> — necessari per creare e gestire il
            tuo account. La password viene memorizzata in forma criptata (hash) e
            non è mai accessibile in chiaro.
          </li>
          <li>
            <strong>Dati di pagamento</strong> — elaborati direttamente da Stripe.
            Non memorizziamo numeri di carta di credito né dati bancari sui nostri
            server. Conserviamo solo l&apos;identificativo della transazione e
            l&apos;importo pagato.
          </li>
          <li>
            <strong>Dati di navigazione</strong> — tramite cookie analitici
            (previo consenso), raccogliamo dati anonimi sull&apos;utilizzo del
            sito per migliorare l&apos;esperienza.
          </li>
        </ul>

        <h2>Finalità del trattamento</h2>
        <ul>
          <li>Fornitura del servizio (accesso al corso)</li>
          <li>Gestione dell&apos;account e dell&apos;autenticazione</li>
          <li>Elaborazione dei pagamenti</li>
          <li>Analisi anonima dell&apos;utilizzo del sito (previo consenso)</li>
        </ul>

        <h2>Servizi di terze parti</h2>
        <p>Utilizziamo i seguenti servizi esterni per il funzionamento del sito:</p>
        <ul>
          <li>
            <strong>Supabase</strong> (autenticazione e database) — i tuoi dati di
            account sono conservati su infrastruttura Supabase.{" "}
            <a
              href="https://supabase.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy di Supabase
            </a>
          </li>
          <li>
            <strong>Stripe</strong> (pagamenti) — i dati di pagamento sono gestiti
            interamente da Stripe, certificato PCI DSS Level 1.{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy di Stripe
            </a>
          </li>
          <li>
            <strong>Vercel</strong> (hosting e analytics) — il sito è ospitato su
            Vercel. I dati analitici vengono raccolti solo previo consenso tramite
            il banner cookie.{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy di Vercel
            </a>
          </li>
          <li>
            <strong>Google Analytics 4</strong> (analisi del sito) — previo
            consenso, misuriamo in forma aggregata pagine visitate, avanzamento
            nella lettura e passaggi del processo di acquisto. Non inviamo a
            Google email, password o dati della carta. Puoi cambiare la scelta
            in qualsiasi momento tramite “Preferenze cookie” nel piè di pagina.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy di Google
            </a>
          </li>
          <li>
            <strong>PostHog EU</strong> (analisi del prodotto e replay delle
            sessioni) — previo consenso, raccogliamo interazioni, errori tecnici
            e registrazioni della navigazione per individuare problemi nel
            funnel e nell&apos;esperienza di lettura. I campi dei form sono sempre
            mascherati e le aree contrassegnate come sensibili sono escluse. I
            dati sono inviati all&apos;infrastruttura europea di PostHog.{" "}
            <a
              href="https://posthog.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy di PostHog
            </a>
          </li>
        </ul>

        <h2>Cookie</h2>
        <p>
          Questo sito utilizza cookie tecnici necessari al funzionamento
          (autenticazione) e, previo consenso, cookie analitici di Google
          Analytics 4, PostHog e Vercel Analytics per comprendere come viene
          utilizzato il sito. PostHog può registrare la sessione con i campi dei
          form mascherati. Puoi modificare la scelta in qualsiasi momento
          tramite “Preferenze cookie” nel piè di pagina.
        </p>

        <h2>I tuoi diritti (GDPR)</h2>
        <p>
          In conformità al Regolamento Generale sulla Protezione dei Dati (GDPR),
          hai diritto di:
        </p>
        <ul>
          <li>
            <strong>Accesso</strong> — richiedere una copia dei tuoi dati
            personali
          </li>
          <li>
            <strong>Rettifica</strong> — correggere dati inesatti o incompleti
          </li>
          <li>
            <strong>Cancellazione</strong> — richiedere la cancellazione dei tuoi
            dati
          </li>
          <li>
            <strong>Portabilità</strong> — ricevere i tuoi dati in formato
            leggibile
          </li>
          <li>
            <strong>Opposizione</strong> — opporti al trattamento per finalità
            specifiche
          </li>
          <li>
            <strong>Limitazione</strong> — richiedere la limitazione del
            trattamento
          </li>
        </ul>
        <p>
          Per esercitare questi diritti, scrivi a{" "}
          <a href="mailto:fran.paltrinieri@gmail.com">
            fran.paltrinieri@gmail.com
          </a>
          . Risponderemo entro 30 giorni.
        </p>

        <h2>Conservazione dei dati</h2>
        <p>
          I tuoi dati personali vengono conservati per il tempo necessario alla
          fornitura del servizio. Se richiedi la cancellazione dell&apos;account,
          i tuoi dati verranno eliminati entro 30 giorni, salvo obblighi di legge
          (ad esempio, conservazione dei dati fiscali).
        </p>

        <h2>Modifiche a questa informativa</h2>
        <p>
          Ci riserviamo il diritto di aggiornare questa informativa. In caso di
          modifiche sostanziali, ne daremo comunicazione tramite il sito. La data
          dell&apos;ultimo aggiornamento è indicata in cima a questa pagina.
        </p>
      </div>
    </main>
  );
}
