<!-- slug: /guida/cose-il-qlora -->

# Cos’è QLoRA?

QLoRA (Quantized LoRA) è un modo di fare [fine-tuning](/guida/cose-il-fine-tuning) con poca memoria: tieni il modello base in [quantizzazione](/guida/quantizzazione-modelli-ai) (pesi «compressi») e alleni solo piccoli adapter [LoRA](/guida/cose-il-lora). Risultato: un SFT o un [DPO](/guida/cose-il-dpo) su hardware che non terrebbe il modello a piena precisione.

Serve se vuoi adattare un [LLM](/guida/cose-un-llm) [open source](/guida/modelli-open-source-ai) senza un cluster. Non cambia cosa il modello «sa» del mondo: cambia lo stile o il compito su cui lo alleni. Per documenti aziendali resta più adatto il [RAG](/guida/cose-il-rag).

## Cosa non è

Non è un modello nuovo. Non è [quantizzazione](/guida/quantizzazione-modelli-ai) da sola (quella serve in [inferenza](/guida/cose-linferenza-ai) per far girare il modello; QLoRA la usa *durante* l’addestramento). Non è [distillazione](/guida/distillazione-modelli-ai). Non è [RAG](/guida/cose-il-rag).

Nel corso si distingue «far stare il modello in memoria» da «insegnargli un compito».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
