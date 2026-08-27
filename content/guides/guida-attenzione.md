<!-- slug: /guida/meccanismo-di-attenzione-ai -->

# Cos’è il meccanismo di attenzione?

Il meccanismo di attenzione (attention) è il pezzo del [Transformer](/guida/cose-un-transformer) che decide, a ogni passo, quali parti del testo contano di più per prevedere la successiva. Non «capisce» come una persona: pesa relazioni tra [token](/guida/cosa-sono-i-token-ai). È ciò che permette a un [LLM](/guida/cose-un-llm) di collegare un pronome a un nome lontano, o una domanda alla frase utile nel [contesto](/guida/finestra-di-contesto).

Serve perché le reti precedenti trattavano il testo in modo più rigido. Con l’attenzione il modello guarda tutto il pezzo (entro i limiti della finestra) e impara dove fissarsi. Costa calcolo: più token in ingresso, più lavoro in [inferenza](/guida/cose-linferenza-ai).

## Cosa non è

Non è «concentrazione» umana. Non è [RAG](/guida/cose-il-rag): non cerca nei tuoi file. Non è il [system prompt](/guida/cose-un-system-prompt). Non garantisce risposte vere: può dare peso alto anche a una frase sbagliata ([allucinazioni](/guida/allucinazioni-ai)).

Nel corso si vede perché il Transformer ha cambiato i modelli di linguaggio — e cosa resta ancora predizione, pezzo dopo pezzo.

**Poi, se vuoi la mappa intera.** [Inizia dalla puntata gratis](/chapters/puntata-1-perche-adesso). Il Corso AI in 10 puntate costa 9,90 € una tantum, e resta tuo. Home: [corso-intelligenza-artificiale.com](/).
