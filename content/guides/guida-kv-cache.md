<!-- slug: /guida/kv-cache-ai -->

# Cos’è la KV cache (nei transformer)?

La KV cache è una memoria intermedia usata in [inferenza](/guida/cose-linferenza-ai) dai modelli [transformer](/guida/cose-un-transformer): salva i vettori Key e Value già calcolati dal [meccanismo di attenzione](/guida/meccanismo-di-attenzione-ai), così a ogni nuovo [token](/guida/cosa-sono-i-token-ai) non si ricalcola tutto il contesto da zero. Senza di essa, generare una risposta lunga sarebbe molto più lento e costoso.

Serve perché i [LLM](/guida/cose-un-llm) generano pezzo dopo pezzo: il passato (il [prompt](/guida/cose-un-prompt) e i token già scritti) resta utile. La cache cresce con la [finestra di contesto](/guida/finestra-di-contesto), quindi conversazioni lunghe occupano più memoria GPU/RAM.

## Cosa non è

Non è la memoria a lungo termine del modello (i [parametri](/guida/parametri-modello-ai)). Non è un [database vettoriale](/guida/database-vettoriale) né [RAG](/guida/cose-il-rag). Non «ricorda» tra sessioni diverse: di solito vive solo per quella generazione. Non è [quantizzazione](/guida/quantizzazione-modelli-ai), anche se spesso si combinano per far girare modelli grandi.

Nel corso si distingue «cosa sa il modello» da «quanto costa continuare a generare».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
