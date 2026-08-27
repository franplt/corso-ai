<!-- slug: /guida/modelli-ai-locali -->

# Cosa sono i modelli AI locali?

Un modello AI «locale» è un [LLM](/guida/cose-un-llm) che gira sul *tuo* computer (o su un server tuo), non su un’API in cloud. Di solito è un checkpoint [open source](/guida/modelli-open-source-ai) in formato compresso (spesso GGUF, con [quantizzazione](/guida/quantizzazione-modelli-ai)), servito da un programma sul disco.

Serve per privacy (i testi non escono), costi prevedibili, e lavorare offline. Lo scotto: ti occupi tu di RAM, aggiornamenti, e [valutazione](/guida/valutazione-modelli-ai). Un modello locale piccolo non è ChatGPT: ha [knowledge cutoff](/guida/knowledge-cutoff-ai) e, senza [RAG](/guida/cose-il-rag), non legge i tuoi file da solo.

## Cosa non è

Non è «l’AI in generale». Non è automaticamente più sicuro: se il [prompt](/guida/cose-un-prompt) o i [tools](/guida/tools-e-function-calling) sono aperti, i rischi restano. Non è [fine-tuning](/guida/cose-il-fine-tuning): scaricare un GGUF è [inferenza](/guida/cose-linferenza-ai), non addestramento. Non toglie le [allucinazioni](/guida/allucinazioni-ai).

Nel corso si vede quando conviene un assistente in cloud e quando conviene tenerlo in casa.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
