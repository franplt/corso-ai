import { SITE_URL } from "@/lib/site";

type GuideFaq = {
  question: string;
  answer: string;
};

const GUIDE_FAQ_BY_SLUG: Record<string, GuideFaq> = {
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
  "cose-un-llm": {
    question: "Cos'è un LLM?",
    answer:
      "Un LLM è un modello di linguaggio grande: un programma addestrato su moltissimo testo, che predice il pezzo successivo. Non è un database e non è una persona. ChatGPT, Claude e Gemini sono interfacce sopra modelli di questo tipo.",
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

