<!-- slug: /guida/cose-il-sft -->

# Cos’è il SFT (supervised fine-tuning)?

SFT (Supervised Fine-Tuning) è un [fine-tuning](/guida/cose-il-fine-tuning) su coppie «domanda → risposta buona»: dopo il [pretraining](/guida/cose-il-pretraining) (completa testo a caso) il [LLM](/guida/cose-un-llm) impara a rispondere come un assistente. È il passo *instruct*: da modello nudo a modello che segue un [prompt](/guida/cose-un-prompt).

Serve perché il pretraining da solo non basta per una chat utile. Molti checkpoint «instruct» o «chat» nascono così, prima di [RLHF](/guida/cose-il-rlhf) o [DPO](/guida/cose-il-dpo). Non gli insegna i fatti di ieri: gli insegna *come* rispondere. Per i dati tuoi resta più adatto il [RAG](/guida/cose-il-rag).

## Cosa non è

Non è il pretraining. Non è [RAG](/guida/cose-il-rag). Non è [LoRA](/guida/cose-il-lora) in sé (LoRA è un modo *leggero* di fare SFT). Non toglie le [allucinazioni](/guida/allucinazioni-ai). Non è il [system prompt](/guida/cose-un-system-prompt): quello è testo in chat, non un cambio dei [parametri](/guida/parametri-modello-ai).

Nel corso si vede la catena: pretraining → SFT → allineamento, e dove entra ciò che gli passi tu.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
