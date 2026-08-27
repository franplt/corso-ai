<!-- slug: /guida/mcp-model-context-protocol -->

# Cos’è MCP (Model Context Protocol)?

MCP (Model Context Protocol) è uno standard per collegare un [LLM](/guida/cose-un-llm) a dati e [tools](/guida/tools-e-function-calling) in modo uniforme: invece di un’integrazione ad hoc per ogni app, il modello parla con «server» MCP che espongono risorse, prompt e strumenti. È un protocollo di connessione, non un modello.

Serve quando vuoi che un assistente legga file, query, o azioni senza riscrivere tutto a ogni cambio di prodotto. Sta vicino agli [agenti](/guida/agenti-ai-vs-chatbot): il modello decide *se* chiamare uno strumento; MCP dice *come* lo strumento è descritto e raggiunto. Non sostituisce un buon [RAG](/guida/cose-il-rag) sui tuoi documenti, e non toglie i [guardrail](/guida/guardrail-ai).

## Cosa non è

Non è un [LLM](/guida/cose-un-llm). Non è [function calling](/guida/tools-e-function-calling) in sé (quello è il meccanismo nel modello; MCP è il «presa a muro» verso i tool). Non è [RAG](/guida/cose-il-rag) e non è un [database vettoriale](/guida/database-vettoriale). Non rende il modello più vero: se lo strumento è sbagliato, l’errore passa.

Nel corso si distingue «il modello parla» da «il modello può usare cose tue, con permesso».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
