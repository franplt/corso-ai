<!-- slug: /guida/reranking-rag -->

# Cos’è il reranking (nel RAG)?

Il reranking è un secondo passaggio dopo la ricerca: hai già estratto dei pezzi ([chunk](/guida/chunking-testo-rag)) da un [database vettoriale](/guida/database-vettoriale), poi un modello più preciso li riordina rispetto alla domanda. I primi risultati dell’[embedding](/guida/cosa-sono-gli-embedding) sono veloci, ma a volte «vicini» di significato e non i più utili.

Serve per alzare la qualità del [RAG](/guida/cose-il-rag) senza rileggere tutto il corpus. Costa un po’ di [inferenza](/guida/cose-linferenza-ai) in più. Non crea fatti nuovi: se il pezzo giusto non è tra i candidati, il reranker non lo inventa (e il modello può ancora [allucinare](/guida/allucinazioni-ai)).

## Cosa non è

Non è [fine-tuning](/guida/cose-il-fine-tuning). Non è il [meccanismo di attenzione](/guida/meccanismo-di-attenzione-ai) del Transformer. Non sostituisce un buon chunking, né documenti aggiornati. Non è [output strutturato](/guida/output-strutturato-ai).

Nel corso si vede perché «ha trovato qualcosa» non è la stessa cosa di «ha trovato il pezzo giusto».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
