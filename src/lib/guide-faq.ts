import { SITE_URL } from "@/lib/site";

type GuideFaq = {
  question: string;
  answer: string;
};

const GUIDE_FAQ_BY_SLUG: Record<string, GuideFaq> = {
  "prompt-engineering-ai": {
    question: "Cos’è il prompt engineering?",
    answer:
      "Il prompt engineering è scrivere istruzioni chiare per un LLM: compito, formato, limiti ed esempi. Non è fine-tuning né magia; riduce risposte vaghe ma non garantisce verità e non sostituisce RAG per i tuoi documenti.",
  },
  "quantizzazione-modelli-ai": {
    question: "Cos’è la quantizzazione nei modelli AI?",
    answer:
      "La quantizzazione riduce la precisione dei parametri di un modello così pesa meno e gira più in fretta in inferenza (es. formati Q4/GGUF). Non è fine-tuning né RAG: è compressione dei pesi, con un possibile calo di qualità.",
  },
  "output-strutturato-ai": {
    question: "Cos’è l’output strutturato (JSON mode)?",
    answer:
      "L’output strutturato è far rispondere un LLM in un formato fisso, spesso JSON, così un’app può leggere i campi. Si collega a tools/function calling; non rende i fatti veri e va validato dopo l’inferenza.",
  },
  "guardrail-ai": {
    question: "Cosa sono i guardrail nell’AI?",
    answer:
      "I guardrail sono regole e filtri intorno a un LLM che limitano cosa può dire o quali tools può usare. Completano l’allineamento (es. RLHF) a runtime; non sono una garanzia assoluta e non eliminano le allucinazioni sui fatti.",
  },
  "cose-un-tokenizer": {
    question: "Cos’è un tokenizer?",
    answer:
      "Il tokenizer è il software che spezza il testo in token prima che il modello lo legga. Non è il modello: traduce la frase in una sequenza di ID, su cui il LLM predice il pezzo successivo.",
  },
  "cose-il-pretraining": {
    question: "Cos’è il pretraining?",
    answer:
      "Il pretraining è la prima, enorme fase di addestramento: il modello legge moltissimo testo e impara a predire il pezzo successivo. Costa settimane; lo fanno i laboratori, non tu in chat.",
  },
  "cose-un-foundation-model": {
    question: "Cos’è un foundation model?",
    answer:
      "Un foundation model è un modello di base, di solito un LLM, addestrato su moltissimi dati e compiti e poi riusato come materia prima. I prodotti in chat (ChatGPT, Claude, Gemini) stanno sopra, non sono il modello nudo.",
  },
  "cose-il-rlhf": {
    question: "Cos’è il RLHF?",
    answer:
      "RLHF è una fase dopo il pretraining: persone confrontano due risposte e il modello impara a preferire quella giudicata meglio. Non insegna fatti nuovi: insegna uno stile più utile e cauto. Non elimina le allucinazioni.",
  },
  "few-shot-e-zero-shot": {
    question: "Cosa sono few-shot e zero-shot?",
    answer:
      "Zero-shot: chiedi un compito senza esempi. Few-shot: nel prompt metti due o tre esempi di input e output, poi il caso vero. Non rialleni il modello: gli mostri il formato nel contesto.",
  },
  "knowledge-cutoff-ai": {
    question: "Fino a quando sa un modello? Cos’è il knowledge cutoff?",
    answer:
      "Il knowledge cutoff è la data dopo la quale i fatti del pretraining si fermano. Il modello non vive il mondo in tempo reale: per notizie fresche servono RAG, un tool di ricerca o documenti in chat.",
  },
  "database-vettoriale": {
    question: "Cos’è un database vettoriale?",
    answer:
      "Un database vettoriale conserva embedding e, data una domanda, trova i pezzi di testo più vicini per significato. È il magazzino dietro molti sistemi RAG: non capisce, misura vicinanza, e non aggiorna i pesi del modello.",
  },
  "chain-of-thought-ai": {
    question: "Cos’è il chain of thought?",
    answer:
      "Il chain of thought è far scrivere al modello i passaggi prima della risposta. Non dà conoscenza nuova: usa meglio il contesto. Costa più token e non elimina le allucinazioni: può inventare anche i passaggi.",
  },
  "cose-un-llm": {
    question: "Cos'è un LLM?",
    answer:
      "Un LLM è un modello di linguaggio grande: un programma addestrato su moltissimo testo, che predice il pezzo successivo. Non è un database e non è una persona. ChatGPT, Claude e Gemini sono interfacce sopra modelli di questo tipo.",
  },
  "cose-un-system-prompt": {
    question: "Cos’è un system prompt?",
    answer:
      "Il system prompt (o istruzioni di sistema) è il testo che guida il modello prima del tuo messaggio: tono, regole, ruolo, limiti. Tu scrivi la domanda; il system prompt dice come deve rispondere.",
  },
  "tools-e-function-calling": {
    question: "Cosa sono tools e function calling?",
    answer:
      "I tools (o function calling) sono strumenti esterni che il modello può chiamare: cercare sul web, leggere un file, eseguire una funzione. Il modello propone quando usarli; il sistema esegue e gli restituisce il risultato.",
  },
  "cose-linferenza-ai": {
    question: "Cos’è l’inferenza in AI?",
    answer:
      "L’inferenza è il momento in cui usi un modello già addestrato: gli dai un input e lui genera l’output. Allenare costa settimane; l’inferenza è far girare il modello sul tuo prompt adesso.",
  },
  "modelli-multimodali": {
    question: "Cosa sono i modelli multimodali?",
    answer:
      "Un modello multimodale lavora con più tipi di input: testo, immagini, audio, video. Trasforma pixel o audio in rappresentazioni interne e le collega al linguaggio, così puoi chiedere cosa c’è in una foto.",
  },
  "cose-un-prompt": {
    question: "Cos'è un prompt?",
    answer:
      "Un prompt è il messaggio che mandi al modello: la domanda, il compito, il contesto. Non è magia: è testo. Il modello legge quel testo e predice la risposta pezzo per pezzo.",
  },
  "temperatura-modello-ai": {
    question: "Cos’è la temperatura di un modello AI?",
    answer:
      "La temperatura è un’impostazione che regola quanto il modello azzarda quando sceglie la parola successiva. Valori bassi: risposte più ripetibili. Valori alti: più varietà e più rischio.",
  },
  "cose-il-fine-tuning": {
    question: "Cos’è il fine-tuning?",
    answer:
      "Il fine-tuning è un passo di allenamento in più: prendi un modello già addestrato e lo ritocchi con i tuoi esempi, così risponde in uno stile o su un compito più stretto.",
  },
  "parametri-modello-ai": {
    question: "Cosa sono i parametri di un modello AI?",
    answer:
      "I parametri sono i numeri interni che il modello ha imparato in allenamento: i pesi che decidono come trasformare l’input in output. «70 miliardi di parametri» misura la dimensione, non la comprensione umana.",
  },
  "allucinazioni-ai": {
    question: "Perché l'AI inventa?",
    answer:
      "Perché è fatta per continuare il testo, non per consultare un fatto. Sceglie il pezzo successivo più plausibile. Se non ha la risposta, produce comunque una frase che sembra una risposta. Si chiama allucinazione: una continuazione fluida e falsa, non una bugia voluta.",
  },
  "rag-o-fine-tuning": {
    question: "RAG o fine-tuning?",
    answer:
      "Se il modello deve usare i tuoi documenti, in genere basta il RAG: al momento della domanda cerchi i pezzi utili e glieli mostri. Il fine-tuning riaddestra il modello su esempi, per stile o un compito ripetuto. Non è il modo economico di fargli sapere un PDF di ieri.",
  },
  "finestra-di-contesto": {
    question: "Cos'è la finestra di contesto?",
    answer:
      "È quanto testo il modello può tenere sotto gli occhi in una volta sola: la richiesta, la chat, e gli eventuali documenti. Non è memoria a vita. Quando la finestra è piena, i pezzi più vecchi escono.",
  },
  "cosa-sono-i-token-ai": {
    question: "Cosa sono i token nell'intelligenza artificiale?",
    answer:
      "I token sono i pezzi in cui un modello spezza il testo prima di leggerlo. Non vede la frase come la vedi tu, parola per parola: la riduce a una sequenza di pezzi, e lavora su quelli.",
  },
  "cose-il-rag": {
    question: "Cos'è il RAG?",
    answer:
      "Il RAG è questo: prima cerchi nei documenti giusti, poi fai rispondere il modello su quello che hai trovato. Il modello non sa il tuo archivio; gli metti sotto gli occhi i pezzi utili al momento della domanda.",
  },
  "agenti-ai-vs-chatbot": {
    question: "Cosa sono gli agenti AI, e in cosa sono diversi da un chatbot?",
    answer:
      "Un chatbot risponde. Un agente AI è un modello a cui dai il permesso di fare dei passi: cercare, aprire uno strumento, controllare il risultato, decidere il passo dopo. La differenza è se, finita la frase, succede qualcosa nel mondo.",
  },
  "come-funziona-lintelligenza-artificiale": {
    question: "Come funziona l'intelligenza artificiale?",
    answer:
      "L'intelligenza artificiale che usi in chat non capisce come una persona. Ha letto una quantità enorme di testo e ha imparato a continuare in modo plausibile. Funziona spesso. Inventa quando il pezzo più plausibile non è quello vero.",
  },
  "come-scegliere-chatgpt-claude-gemini": {
    question: "Come scegliere tra ChatGPT, Claude e Gemini?",
    answer:
      "Si sceglie dal compito, non dal nome. ChatGPT, Claude e Gemini usano la stessa idea di fondo: un modello che predice testo. Nessuno dei tre è il migliore in assoluto.",
  },
  "cosa-sono-gli-embedding": {
    question: "Cosa sono gli embedding nell'intelligenza artificiale?",
    answer:
      "Gli embedding sono numeri che rappresentano un pezzo di testo in uno spazio. Due frasi vicine in quel spazio vogliono dire cose vicine, per il modello. Serve per cercare anche quando le parole non coincidono.",
  },
  "cose-un-transformer": {
    question: "Cos'è un Transformer?",
    answer:
      "Il Transformer è l'architettura dietro quasi tutti gli assistenti in chat. L'idea centrale è l'attenzione: il modello decide a quali pezzi del testo dare peso, invece di leggerli solo in fila.",
  },
  "meccanismo-di-attenzione-ai": {
    question: "Cos’è il meccanismo di attenzione?",
    answer:
      "Il meccanismo di attenzione è la parte del Transformer che pesa quali token contano di più per prevedere il successivo. Non è comprensione umana né RAG: collega pezzi di testo nel contesto e costa più calcolo con finestre lunghe.",
  },
  "chunking-testo-rag": {
    question: "Cos’è il chunking nel RAG?",
    answer:
      "Il chunking spezza i documenti in pezzi prima di crearne gli embedding per il RAG. Il modello recupera i chunk più vicini alla domanda. Tagliare male porta al brano sbagliato; non è fine-tuning e non elimina le allucinazioni.",
  },
  "modelli-open-source-ai": {
    question: "Cosa sono i modelli open source?",
    answer:
      "Un modello open source (o open weights) ha pesi scaricabili da far girare in proprio. Dà più controllo su dati e costi a volume, ma non è automaticamente più sicuro né gratis: paghi hardware e manutenzione, e restano allucinazioni e limiti di licenza.",
  },
  "cose-il-lora": {
    question: "Cos’è LoRA?",
    answer:
      "LoRA è un fine-tuning leggero: si allenano piccole matrici di adattamento senza riscrivere tutti i parametri del foundation model. Utile per stile o dominio; per documenti freschi spesso conviene il RAG. Non elimina le allucinazioni.",
  },
};

export function getGuideFaqJsonLd(urlPath: string) {
  const slug = urlPath.replace(/^\/guida\//, "");
  const faq = GUIDE_FAQ_BY_SLUG[slug];
  if (!faq) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "it",
    url: `${SITE_URL}${urlPath}`,
    isPartOf: {
      "@type": "Course",
      name: "Corso AI in 10 puntate",
      url: `${SITE_URL}/`,
    },
    mainEntity: [
      {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      },
    ],
  };
}

