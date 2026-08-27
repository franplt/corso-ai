<!-- slug: /guida/mixture-of-experts-ai -->

# Cos’è un Mixture of Experts (MoE)?

Un Mixture of Experts (MoE) è un’architettura in cui un [foundation model](/guida/cose-un-foundation-model) ha tanti «esperti» (gruppi di [parametri](/guida/parametri-modello-ai)) e, per ogni [token](/guida/cosa-sono-i-token-ai), ne accende solo alcuni. Così il modello può essere grande sulla carta, ma più leggero in [inferenza](/guida/cose-linferenza-ai) di uno denso con lo stesso numero di pesi.

Serve per scalare i [LLM](/guida/cose-un-llm) senza pagare tutti i parametri a ogni parola. Alcuni [modelli open source](/guida/modelli-open-source-ai) usano questa idea. Non è magia: serve un routing (chi decide quale esperto) e il modello resta predizione, pezzo dopo pezzo.

## Cosa non è

Non è un team di persone. Non è un [agente](/guida/agenti-ai-vs-chatbot). Non è [RAG](/guida/cose-il-rag). Non significa automaticamente «più intelligente»: è un modo di organizzare i pesi.

Nel corso si distingue «quanto è grande il modello» da «quanto lavoro fa a ogni risposta».

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
