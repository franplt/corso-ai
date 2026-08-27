<!-- slug: /guida/formato-gguf -->

# Cos’è il formato GGUF?

GGUF è un formato di file per salvare un [LLM](/guida/cose-un-llm) già [quantizzato](/guida/quantizzazione-modelli-ai) (pesi compressi) così da farlo girare in [inferenza](/guida/cose-linferenza-ai) su CPU/GPU con poca RAM. Lo usano runtime come [Ollama](/guida/cose-ollama) e altri tool per [modelli locali](/guida/modelli-ai-locali).

Serve perché un modello «pieno» (fp16/bf16) non entra in un laptop: GGUF con livelli tipo Q4/Q5 riduce la memoria. Non cambia la conoscenza del mondo: è un *contenitore* dei pesi. Per i fatti tuoi resta più adatto il [RAG](/guida/cose-il-rag).

## Cosa non è

Non è un modello nuovo. Non è [fine-tuning](/guida/cose-il-fine-tuning) né [QLoRA](/guida/cose-il-qlora) (quelli *allenano*; GGUF di solito serve a *eseguire*). Non è [distillazione](/guida/distillazione-modelli-ai). Non toglie le [allucinazioni](/guida/allucinazioni-ai).

Nel corso si vede perché «modello piccolo in locale» e «modello in cloud» non sono la stessa cosa.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
