<!-- slug: /guida/cose-un-tokenizer -->

# Cos’è un tokenizer?

Il tokenizer è il pezzo di software che spezza il testo in [token](/guida/cosa-sono-i-token-ai) prima che il modello lo legga. Non è il modello: è il «taglia-testo». La stessa frase, con tokenizer diversi, diventa pezzi diversi — e quindi costi e limiti diversi.

Serve perché il [LLM](/guida/cose-un-llm) non vede parole: vede numeri. Il tokenizer traduce «Ciao, come stai?» in una sequenza di ID; poi il modello predice il pezzo successivo. Una parola comune spesso sta in un token solo; un nome raro, un numero o una riga di codice ne occupano di più.

## Cosa non è

Non è un dizionario di italiano. Non capisce il significato (quello è più vicino agli [embedding](/guida/cosa-sono-gli-embedding)). Non è l’[inferenza](/guida/cose-linferenza-ai): lì il modello genera; qui si spezza solo l’input. Due chat «uguali» possono usare tokenizer diversi.

Nel corso si vede perché «quanto hai scritto» e «quanto ha contato il modello» non coincidono.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).

