import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini di Servizio — Corso AI in 10 puntate",
  description: "Termini e condizioni per l'utilizzo del corso.",
};

export default function TermsPage() {
  return (
    <main>
      <div className="mb-10">
        <h1 className="font-heading mb-2 text-3xl font-semibold text-[var(--ink)]">
          Termini di Servizio
        </h1>
        <p className="text-[var(--ink-muted)]">
          Ultimo aggiornamento: aprile 2026
        </p>
      </div>

      <div className="prose">
        <h2>1. Descrizione del servizio</h2>
        <p>
          &ldquo;Corso AI in 10 puntate&rdquo; è un corso digitale composto da
          10 episodi che spiegano i fondamenti dell&apos;intelligenza artificiale.
          Il servizio è offerto da <strong>Francesco Paltrinieri</strong>,
          lavoratore autonomo registrato in Portogallo.
        </p>

        <h2>2. Accesso al corso</h2>
        <ul>
          <li>
            <strong>Episodio 1</strong> è accessibile gratuitamente a tutti gli
            utenti registrati e non.
          </li>
          <li>
            <strong>Episodi 2-10</strong> richiedono un pagamento unico di{" "}
            <strong>&euro;9,99</strong>.
          </li>
          <li>
            Una volta effettuato il pagamento, l&apos;accesso ai contenuti premium
            è immediato e illimitato nel tempo.
          </li>
        </ul>

        <h2>3. Account</h2>
        <p>
          Per acquistare il corso è necessario creare un account con email e
          password. Sei responsabile della sicurezza delle tue credenziali e di
          tutte le attività svolte tramite il tuo account.
        </p>

        <h2>4. Garanzia di rimborso</h2>
        <p>
          Offriamo una <strong>garanzia soddisfatti o rimborsati di 14 giorni</strong>.
          Se il corso non soddisfa le tue aspettative, puoi richiedere un rimborso
          completo entro 14 giorni dalla data di acquisto, senza dover fornire
          motivazioni.
        </p>
        <p>
          Per richiedere il rimborso, scrivi a{" "}
          <a href="mailto:supporto@francescopaltrinieri.com">
            supporto@francescopaltrinieri.com
          </a>{" "}
          indicando l&apos;email associata al tuo account. Il rimborso verrà
          elaborato entro 10 giorni lavorativi tramite lo stesso metodo di
          pagamento utilizzato per l&apos;acquisto.
        </p>
        <p>
          Dopo il rimborso, l&apos;accesso agli episodi premium verrà revocato.
        </p>

        <h2>5. Licenza d&apos;uso</h2>
        <p>
          Con l&apos;acquisto del corso, ottieni una{" "}
          <strong>licenza personale, non trasferibile e non esclusiva</strong> per
          accedere e leggere i contenuti. Non è consentito:
        </p>
        <ul>
          <li>Copiare, riprodurre o redistribuire i contenuti del corso</li>
          <li>Condividere le credenziali del tuo account con terzi</li>
          <li>Utilizzare i contenuti per scopi commerciali senza autorizzazione</li>
        </ul>

        <h2>6. Proprietà intellettuale</h2>
        <p>
          Tutti i contenuti del corso (testi, diagrammi, codice, componenti
          interattivi) sono protetti da diritto d&apos;autore e appartengono a
          Francesco Paltrinieri. L&apos;acquisto del corso non trasferisce alcun
          diritto di proprietà intellettuale.
        </p>

        <h2>7. Limitazione di responsabilità</h2>
        <p>
          Il corso è fornito &ldquo;così com&apos;è&rdquo;. Non garantiamo che i
          contenuti siano privi di errori o che il servizio sia sempre
          disponibile. Non siamo responsabili per danni indiretti, incidentali o
          consequenziali derivanti dall&apos;uso del corso.
        </p>

        <h2>8. Modifiche ai termini</h2>
        <p>
          Ci riserviamo il diritto di modificare questi termini. Le modifiche
          saranno comunicate tramite il sito. L&apos;uso continuato del servizio
          dopo la pubblicazione delle modifiche costituisce accettazione dei nuovi
          termini.
        </p>

        <h2>9. Legge applicabile</h2>
        <p>
          Questi termini sono regolati dalla legge portoghese. Eventuali
          controversie saranno di competenza del foro di Lisbona, fatti salvi i
          diritti del consumatore previsti dalla legislazione del suo Paese di
          residenza.
        </p>

        <h2>10. Contatti</h2>
        <p>
          Per qualsiasi domanda relativa a questi termini, scrivi a{" "}
          <a href="mailto:supporto@francescopaltrinieri.com">
            supporto@francescopaltrinieri.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
