<!-- slug: /guida/distillazione-modelli-ai -->

# Cos’è la distillazione di un modello AI?

La distillazione (knowledge distillation) è addestrare un modello più piccolo («studente») a imitare il comportamento di uno più grande («insegnante»). Lo studente impara non solo le risposte giuste, ma spesso anche le probabilità soft dell’insegnante. Così ottieni un [LLM](/guida/cose-un-llm) più leggero in [inferenza](/guida/cose-linferenza-ai), a volte quasi altrettanto utile sui compiti scelti.

Serve per costi, latenza e dispositivi piccoli, o per pubblicare [modelli open source](/guida/modelli-open-source-ai) derivati. Non è magia: lo studente eredita anche i limiti e le [allucinazioni](/guida/allucinazioni-ai) dell’insegnante, e di solito perde un po’ di capacità sui casi difficili.

## Cosa non è

Non è [quantizzazione](/guida/quantizzazione-modelli-ai) (che comprime i pesi già addestrati). Non è [LoRA](/guida/cose-il-lora) né un [fine-tuning](/guida/cose-il-fine-tuning) generico sul tuo dataset. Non è [RAG](/guida/cose-il-rag). Non crea conoscenza nuova dal nulla: trasferisce (e filtra) quella dell’insegnante.

Nel corso si vede perché «modello piccolo» può voler dire compresso, distillato, o semplicemente nato piccolo.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
