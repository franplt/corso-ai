<!-- slug: /guida/top-p-nucleus-sampling -->

# Cos’è il top-p (nucleus sampling)?

Il top-p (o nucleus sampling) è un modo di scegliere la prossima parola di un [LLM](/guida/cose-un-llm): invece di prendere sempre la più probabile, il modello considera solo le parole «più plausibili» finché la loro probabilità cumulata raggiunge una soglia p (per esempio 0,9). Dentro quel gruppo pesca a caso. Va di pari passo con la [temperatura](/guida/temperatura-modello-ai): temperatura sposta quanto sono piatte le probabilità, top-p taglia la coda.

Serve per risposte più naturali senza lasciare spazio a token assurdi. Un p alto lascia più varietà; un p basso rende il testo più prevedibile. Non cambia cosa il modello sa ([knowledge cutoff](/guida/knowledge-cutoff-ai)): cambia solo come campiona in [inferenza](/guida/cose-linferenza-ai).

## Cosa non è

Non è [fine-tuning](/guida/cose-il-fine-tuning). Non è [RAG](/guida/cose-il-rag). Non è un [guardrail](/guida/guardrail-ai): riduce stranezze casuali, non istruzioni pericolose. Non è la stessa cosa del «top-k» (che tiene un numero fisso di candidati).

Nel corso si vede perché due risposte diverse allo stesso [prompt](/guida/cose-un-prompt) non significano due modelli diversi.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
