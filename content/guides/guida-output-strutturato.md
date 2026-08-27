<!-- slug: /guida/output-strutturato-ai -->

# Cos’è l’output strutturato (JSON mode)?

L’output strutturato è chiedere a un [LLM](/guida/cose-un-llm) di rispondere in un formato fisso — spesso JSON — invece di prosa libera. Serve quando un’app deve leggere i campi (titolo, punteggio, elenco) senza indovinare dal testo. A volte si combina con [tools / function calling](/guida/tools-e-function-calling): il modello compila argomenti tipizzati per uno strumento.

Serve nei flussi automatici: classificare, estrarre, riempire form. Un buon [prompt](/guida/cose-un-prompt) (o schema) riduce risposte «quasi JSON» rotte. Non rende il contenuto vero: se inventa un campo, il JSON è comunque falso ([allucinazioni](/guida/allucinazioni-ai)).

## Cosa non è

Non è un database. Non è [RAG](/guida/cose-il-rag). Non è [fine-tuning](/guida/cose-il-fine-tuning). Non sostituisce validazione lato codice: conviene controllare lo schema dopo l’[inferenza](/guida/cose-linferenza-ai).

Nel corso si vede la differenza tra «parlare in chat» e «far produrre pezzi che una macchina può usare».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
