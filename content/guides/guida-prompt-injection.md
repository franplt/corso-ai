<!-- slug: /guida/prompt-injection-ai -->

# Cos’è un prompt injection?

Un prompt injection è un testo (in chat, in una pagina, in un documento) che cerca di far fare a un [LLM](/guida/cose-un-llm) qualcosa di diverso dalle regole del prodotto: ignorare il [system prompt](/guida/cose-un-system-prompt), svelare istruzioni, o usare [tools](/guida/tools-e-function-calling) in modo non previsto. Funziona perché il modello legge istruzioni e dati nello stesso flusso di [token](/guida/cosa-sono-i-token-ai).

Serve saperlo se costruisci un assistente sui tuoi file ([RAG](/guida/cose-il-rag)) o un [agente](/guida/agenti-ai-vs-chatbot): il contenuto recuperato può contenere ordini nascosti. I [guardrail](/guida/guardrail-ai) e la separazione tra dati e istruzioni riducono il rischio; non lo azzerano.

## Cosa non è

Non è un virus e non cambia i pesi del modello. Non è [fine-tuning](/guida/cose-il-fine-tuning). Non è un attacco al server: cambia ciò che il modello legge in quella richiesta. Non è la stessa cosa di un [prompt](/guida/cose-un-prompt) scritto male.

Nel corso si vede perché «il modello segue le istruzioni» è sia la forza sia il rischio.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
