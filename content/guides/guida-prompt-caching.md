<!-- slug: /guida/prompt-caching-ai -->

# Cos’è il prompt caching?

Il prompt caching riusa pezzi già processati di un [prompt](/guida/cose-un-prompt) lungo (spesso il [system prompt](/guida/cose-un-system-prompt) o un contesto fisso) così le chiamate successive allo stesso [LLM](/guida/cose-un-llm) costano meno e rispondono più in fretta. È un trucco di [inferenza](/guida/cose-linferenza-ai), legato anche alla [KV cache](/guida/kv-cache-ai).

Serve quando ripeti lo stesso prefisso (istruzioni, schema, documentazione) in molte richieste. Non «insegna» fatti nuovi al modello e non sostituisce il [RAG](/guida/cose-il-rag): il testo va comunque nel contesto. Se il prefisso cambia spesso, il cache non aiuta.

## Cosa non è

Non è [fine-tuning](/guida/cose-il-fine-tuning). Non è memoria a lungo termine dell’utente. Non è [MCP](/guida/mcp-model-context-protocol). Non toglie le [allucinazioni](/guida/allucinazioni-ai). Non è la stessa cosa di un [database vettoriale](/guida/database-vettoriale).

Nel corso si distingue «cosa metti nel prompt» da «come il provider lo fa costare meno».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
