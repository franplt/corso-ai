<!-- slug: /guida/hybrid-search-rag -->

# Cos’è l’hybrid search (nel RAG)?

L’hybrid search mescola due modi di recuperare pezzi di testo: la ricerca lessicale (parole esatte, tipo BM25) e la [ricerca semantica](/guida/ricerca-semantica-ai) con [embedding](/guida/cosa-sono-gli-embedding). Nel [RAG](/guida/cose-il-rag) serve perché una query può coincidere con le parole del documento *oppure* col significato, e una sola delle due sbaglia.

Serve quando i nomi propri, i codici, o le formule devono matchare alla lettera, mentre il resto può essere «simile». Spesso dopo c’è un [reranking](/guida/reranking-rag). Non sostituisce un buon [chunking](/guida/chunking-testo-rag) né un [database vettoriale](/guida/database-vettoriale) messo bene.

## Cosa non è

Non è un [LLM](/guida/cose-un-llm). Non è [RAG](/guida/cose-il-rag) da solo (è un pezzo del recupero). Non è [fine-tuning](/guida/cose-il-fine-tuning). Non rende il modello più vero: se recuperi il pezzo sbagliato, l’assistente lo userà comunque.

Nel corso si vede perché «cerca per significato» non basta sempre.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
