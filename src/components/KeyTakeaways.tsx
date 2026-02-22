const TAKEAWAYS: Record<number, string[]> = {
  1: [
    "L'AI ha fatto il salto grazie a tre fattori convergenti: GPU più potenti, dati in abbondanza, e l'architettura Transformer.",
    "Capire come funziona l'AI non è un lusso tecnico — è un vantaggio competitivo concreto.",
    "L'AI non è magia né intelligenza: è pattern matching su scala enorme.",
    "Questo corso ti darà gli strumenti per smettere di subire l'AI e iniziare a usarla con consapevolezza.",
  ],
  2: [
    "I modelli AI imparano dai dati, non da regole scritte dagli umani.",
    "I parametri (\"pesi\") sono i miliardi di valori numerici che codificano ciò che il modello ha imparato.",
    "Più scala → capacità emergenti: comportamenti che nessuno ha programmato esplicitamente.",
    "Un foundation model è una base flessibile che può essere specializzata per molti compiti.",
  ],
  3: [
    "Il testo non entra nel modello \"così com'è\" — viene prima convertito in token, unità numeriche sub-parola.",
    "Token ≠ parole: una parola può essere uno o più token, e i token variano per lingua e vocabolario.",
    "Il limite di contesto (context window) è un vincolo reale: superarlo tronca il tuo testo.",
    "I costi e i tempi di risposta dei modelli si misurano in token — capirlo ti aiuta a ottimizzare.",
  ],
  4: [
    "Gli embedding trasformano parole e frasi in coordinate numeriche: la distanza = similitudine di significato.",
    "Questa \"mappa del linguaggio\" si costruisce automaticamente dall'uso, non da regole.",
    "Gli embedding funzionano anche tra lingue diverse — è per questo che i modelli sanno tradurre.",
    "Le applicazioni pratiche sono immediate: ricerca semantica, deduplicazione, RAG, clustering.",
  ],
  5: [
    "Il meccanismo di attenzione permette a ogni token di \"guardare\" tutti gli altri — il contesto emerge dall'interazione.",
    "Il Transformer elabora tutti i token in parallelo (non uno alla volta come i modelli precedenti): questo lo rende scalabile.",
    "Più strati = rappresentazioni più astratte e potenti del linguaggio.",
    "Il modello rimane statistico: non capisce nel senso umano, ma produce output coerenti perché ha visto miliardi di esempi.",
  ],
  6: [
    "Pre-training: enormi quantità di dati, mesi di calcolo, accessibile solo a pochi. Costruisce la conoscenza generale.",
    "Fine-tuning: pochi migliaia di esempi, molto più accessibile. Specializza il modello per un compito.",
    "RLHF: i valutatori umani insegnano al modello a essere più utile e sicuro attraverso il rinforzo.",
    "Per la maggior parte dei casi d'uso, prompt engineering e RAG sono più pratici del fine-tuning.",
  ],
  7: [
    "La generazione è token per token, probabilistica: il modello non \"sa\" la risposta, la costruisce campionando.",
    "La temperatura controlla il bilanciamento tra precisione (bassa) e creatività (alta).",
    "Il prompt è il tuo principale strumento di controllo: più contesto e istruzioni chiare → migliori risultati.",
    "Chain-of-Thought: chiedere al modello di \"ragionare ad alta voce\" migliora significativamente i risultati su problemi complessi.",
  ],
  8: [
    "Il modello conosce solo ciò su cui è stato addestrato — knowledge cutoff è un limite reale.",
    "RAG risolve il problema: recupera documenti rilevanti al momento della richiesta e li inserisce nel contesto.",
    "La ricerca semantica (basata su embedding) è molto più efficace del keyword matching per trovare contenuti rilevanti.",
    "La qualità del RAG dipende dalla qualità dei dati sorgente: garbage in, garbage out.",
  ],
  9: [
    "Un agente AI = LLM + strumenti + loop autonomo (osserva → ragiona → agisce).",
    "La differenza dal chatbot: l'agente riceve un obiettivo, pianifica i passi, si corregge da solo.",
    "Human-in-the-loop è essenziale per compiti ad alto rischio — l'agente commette errori.",
    "I sistemi multi-agente dividono il lavoro: un agente pianifica, altri eseguono, altri verificano.",
  ],
  10: [
    "I benchmark misurano test standardizzati, non le tue prestazioni reali — prova sempre sul tuo caso.",
    "Modelli proprietari (GPT, Claude, Gemini) = massima qualità e semplicità. Open-weight = controllo, privacy, costi.",
    "Right-sizing: usa il modello più piccolo che risolve il tuo problema. I modelli grandi non servono sempre.",
    "La scelta migliore raramente è un solo modello: modelli leggeri per routine, potenti per i compiti critici.",
  ],
};

type KeyTakeawaysProps = {
  episodeNumber: number;
};

export function KeyTakeaways({ episodeNumber }: KeyTakeawaysProps) {
  const items = TAKEAWAYS[episodeNumber];
  if (!items) return null;

  return (
    <aside
      className="my-10 rounded-[var(--radius-lg)] border border-[var(--accent)] bg-[var(--accent-muted)]/20 p-6 sm:p-8"
      aria-label="Punti chiave della puntata"
    >
      <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--accent)]">
        Punti chiave
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-heading text-[10px] font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-[var(--ink)]">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
