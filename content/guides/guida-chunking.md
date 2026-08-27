<!-- slug: /guida/chunking-testo-rag -->

# Cos’è il chunking (nel RAG)?

Il chunking è spezzare i documenti in pezzi (chunk) prima di crearne gli [embedding](/guida/cosa-sono-gli-embedding) e salvarli in un [database vettoriale](/guida/database-vettoriale). Nel [RAG](/guida/cose-il-rag) il modello non legge il PDF intero: recupera i pezzi più vicini alla domanda e li mette nella [finestra di contesto](/guida/finestra-di-contesto).

Serve perché un file lungo non entra tutto, e pezzi troppo grandi o troppo piccoli fanno recuperare il brano sbagliato. Tagliare per paragrafo, per titolo o con sovrapposizione è una scelta di progetto, non magia.

## Cosa non è

Non è il [tokenizer](/guida/cose-un-tokenizer) del modello (quello spezza per l’[inferenza](/guida/cose-linferenza-ai)). Non è [fine-tuning](/guida/cose-il-fine-tuning). Non aggiorna i [parametri](/guida/parametri-modello-ai). Non elimina le [allucinazioni](/guida/allucinazioni-ai): se il pezzo è fuori posto, il modello può comunque inventare.

Nel corso si vede come si dà al modello ciò che non sa, senza riallenarlo — e perché «tagliare bene» conta quanto il modello.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
