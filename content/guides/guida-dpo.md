<!-- slug: /guida/cose-il-dpo -->

# Cos’è il DPO?

DPO (Direct Preference Optimization) è un modo di allineare un [LLM](/guida/cose-un-llm) alle preferenze umane *senza* addestrare un modello di reward a parte. Parti da coppie «risposta migliore / peggiore» (come nel [RLHF](/guida/cose-il-rlhf)) e aggiorni i [parametri](/guida/parametri-modello-ai) perché il modello alzi la probabilità della risposta preferita.

Serve come alternativa più semplice al RLHF classico, spesso dopo un [fine-tuning](/guida/cose-il-fine-tuning) supervisionato. Non gli insegna i fatti di ieri: gli insegna uno stile (più utile, più cauto). Molti [modelli open source](/guida/modelli-open-source-ai) pubblicano checkpoint «DPO» o «instruct» nati così.

## Cosa non è

Non è magia morale e non toglie le [allucinazioni](/guida/allucinazioni-ai). Non è [RAG](/guida/cose-il-rag). Non è il [system prompt](/guida/cose-un-system-prompt): quello è testo in chat, non un cambio dei pesi. Non è [LoRA](/guida/cose-il-lora), anche se a volte il DPO si fa con adapter LoRA.

Nel corso si vede che «allineato» non significa «sa la tua azienda».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
