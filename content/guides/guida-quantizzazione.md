<!-- slug: /guida/quantizzazione-modelli-ai -->

# Cos’è la quantizzazione (nei modelli AI)?

La quantizzazione è ridurre la precisione dei [parametri](/guida/parametri-modello-ai) di un [foundation model](/guida/cose-un-foundation-model) (per esempio da 16 bit a 4 o 8) così pesa meno in memoria e gira più in fretta in [inferenza](/guida/cose-linferenza-ai). Si parla spesso di formati tipo GGUF o di modelli «Q4» quando li fai girare in locale o su macchine piccole.

Serve per usare [modelli open source](/guida/modelli-open-source-ai) su hardware accessibile, o tagliare costi cloud. C’è un compromesso: meno bit, di solito un po’ meno qualità. Non cambia cosa il modello ha imparato nel [pretraining](/guida/cose-il-pretraining); cambia come sono memorizzati i pesi.

## Cosa non è

Non è [fine-tuning](/guida/cose-il-fine-tuning) né [LoRA](/guida/cose-il-lora). Non è [RAG](/guida/cose-il-rag). Non elimina le [allucinazioni](/guida/allucinazioni-ai). Non è obbligatorio se usi solo un’API chiusa (là la quantizzazione, se c’è, la gestisce il fornitore).

Nel corso si distingue il modello «pieno» da quello compresso che puoi far girare vicino a te.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
