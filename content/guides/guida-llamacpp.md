<!-- slug: /guida/cose-llamacpp -->

# Cos’è llama.cpp?

llama.cpp è un programma che fa girare [LLM](/guida/cose-un-llm) in [locale](/guida/modelli-ai-locali): legge un file (di solito [GGUF](/guida/formato-gguf)) e fa [inferenza](/guida/cose-linferenza-ai) su CPU o GPU, senza cloud. [Ollama](/guida/cose-ollama) spesso lo usa sotto il cofano. Non è un modello: è il motore che lo esegue.

Serve se vuoi controllo, privacy, o far girare un checkpoint sul tuo hardware. Lo scotto: setup più «nudo» di Ollama, e i limiti del modello (RAM, [knowledge cutoff](/guida/knowledge-cutoff-ai), [allucinazioni](/guida/allucinazioni-ai)). Per i documenti tuoi resta più adatto il [RAG](/guida/cose-il-rag).

## Cosa non è

Non è un [LLM](/guida/cose-un-llm). Non è [fine-tuning](/guida/cose-il-fine-tuning) né [QLoRA](/guida/cose-il-qlora). Non è Hugging Face. Non toglie le allucinazioni e non rende il PC un servizio tipo ChatGPT.

Nel corso si distingue il *modello* (i pesi) dal *runtime* che lo fa parlare.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
