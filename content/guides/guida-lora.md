<!-- slug: /guida/cose-il-lora -->

# Cos’è LoRA?

LoRA (Low-Rank Adaptation) è un modo di fare [fine-tuning](/guida/cose-il-fine-tuning) senza riscrivere tutti i [parametri](/guida/parametri-modello-ai) di un [foundation model](/guida/cose-un-foundation-model). Si aggiungono piccole matrici «di adattamento» e si allenano quelle. Il modello base resta; il LoRA è un modulo che puoi caricare o togliere.

Serve quando vuoi uno stile, un dominio o un formato specifici senza il costo (e il rischio) di un full fine-tune. Spesso si usa su [modelli open source](/guida/modelli-open-source-ai). Non insegna i fatti di ieri: per documenti freschi resta più adatto il [RAG](/guida/cose-il-rag).

## Cosa non è

Non è [RAG](/guida/cose-il-rag) e non è il [system prompt](/guida/cose-un-system-prompt). Non è [RLHF](/guida/cose-il-rlhf) (anche se a volte si combinano idee). Non elimina le [allucinazioni](/guida/allucinazioni-ai). Non è obbligatorio per usare bene un assistente in chat.

Nel corso si vede quando conviene adattare i pesi e quando basta dare al modello il pezzo giusto di contesto.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
