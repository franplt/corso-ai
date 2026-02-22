# Product Improvement Plan

Goal: transform the course from static pages into an outstanding digital product people want to share — ready for public release by end of next week.

---

## Status legend

- [ ] Not started
- [~] In progress
- [x] Done
- [—] Dropped

---

## PHASE 1 — Structure & polish (completed 2026-02-22)

All done. See "Session 1" log at the bottom for details.

- [x] Fix Episode 10 conclusion
- [x] Unique episode descriptions + reading time
- [x] Reading progress bar
- [x] 6 SVG diagrams (tokenizer, embedding, attention, training phases, RAG, agent loop)
- [x] 2 interactive demos (tokenizer, temperature slider)
- [x] Key takeaways for all 10 chapters
- [x] Improved PaywallCard, footer, author section
- [x] Prose styling (hr, blockquotes, code, spacing)
- [x] OG meta tags per chapter

---

## PHASE 2 — Writing, visuals & "wow factor"

The structure is solid. Now the goal is to make the reading experience *feel* exceptional — every chapter should hook the reader, build understanding through multiple senses (text + visual + interactive), and leave them wanting the next one.

### A. New components to build (cross-chapter)

| # | Component | Where | What it does |
|---|---|---|---|
| 1 | **Callout box** | All chapters | Styled aside for key stats, surprising facts, "lo sapevi?" moments. Currently important numbers are buried in prose. |
| 2 | **Before/After comparison** | Ep 2, 5 | Side-by-side comparison card (e.g. traditional programming vs ML, RNN vs Transformer). |
| 3 | **Embedding explorer** | Ep 4 | Interactive: type two words/phrases, see similarity score + mini 2D map. |
| 4 | **Probability distribution chart** | Ep 7 | Visual: bar chart showing token probabilities for a given prompt (e.g. "Il gatto salta sul…" → divano 40%, tavolo 25%, …). |
| 5 | **Chain-of-Thought comparison** | Ep 7 | Side-by-side: same question answered with direct output vs "ragiona passo per passo". |
| 6 | **Semantic vs keyword search** | Ep 8 | Interactive: same query, see keyword results vs semantic results on sample docs. |
| 7 | **Model selector tool** | Ep 10 | Quiz-style: answer 3-4 questions about your use case, get a model recommendation. |
| 8 | **Inline glossary tooltip** | All chapters | First occurrence of key terms (token, embedding, transformer, RLHF, RAG, ecc.) gets a hover tooltip. |

### B. Per-episode improvements

---

#### Episode 1 — "Perché adesso?"

**Writing**
- [ ] Strengthen the opening: add a concrete, surprising example of AI failure to create urgency (e.g. "You asked ChatGPT for a source and it cited a paper that doesn't exist. Why?")
- [ ] The three factors (calcolo, dati, architettura) feel list-like. Add a unifying "perfect storm" frame and a quick before/after for each.
- [ ] The episode roadmap (lines 27-58) is a wall of text. Tighten to 1-2 sentences per episode.
- [ ] Strengthen the closing hook: tease episode 2 with a provocative question, not just "passa alla puntata 2."

**Visuals**
- [x] **AI convergence timeline** — simple horizontal timeline showing GPU power, data growth, and the Transformer paper converging around 2017-2023.
- [x] **Course roadmap visual** — a styled 10-step path graphic showing the journey from "perché adesso" to "scegli il modello."

**Interactive**
- [x] **"Which of these use AI?" quiz** — show 8-10 everyday products/services, let the reader guess. Reveal answers. Good hook and eye-opener.

---

#### Episode 2 — "Cos'è un modello"

**Writing**
- [ ] The opening is transitional and flat. Rewrite with a hook: "Hai usato ChatGPT. Ma cos'è davvero? Non un programma. Non un database. Qualcosa di completamente diverso."
- [ ] The ML explanation (lines 21-30) is abstract. Add a concrete spam filter example: "Prova a scrivere regole per riconoscere lo spam. Fallirai. Un modello impara da 10.000 esempi e trova pattern che non avresti immaginato."
- [ ] The emergent capabilities moment is understated. Punch it up: "Nessuno ha programmato GPT per tradurre. Nessuno gli ha insegnato il codice. Ha imparato queste cose dalla scala — e i ricercatori stanno ancora scoprendo cos'altro sa fare."
- [ ] Foundation model section feels like an afterthought. Integrate it better or tighten.

**Visuals**
- [x] **Traditional programming vs ML** — before/after comparison card. Left: "Regole scritte dall'umano → Output." Right: "Dati + Esempi → Il modello impara → Output."
- [x] **Parameter scale visual** — shows what different parameter counts can do: 1M = filtro antispam → 7B = assistente base → 175B = GPT-3 → 1T+ = GPT-4.

---

#### Episode 3 — "Dai dati ai token"

Already has the tokenizer diagram + interactive demo. Focus on writing.

**Writing**
- [ ] The opening 3 paragraphs are dense. Break them up — each paragraph is doing too much work.
- [ ] The "Schwarzenegger = 6 token" insight is buried in a paragraph. Pull it into a **callout box**.
- [ ] Token limits and their consequences need more drama: "Un documento di 10 pagine? Sono 20.000 token. GPT-4 ne legge 32.000. Indovina che fine fanno le pagine dalla 11 in poi."
- [ ] Add a practical "so what" callout: "Per questo il prompt engineering insegna a togliere parole inutili — ogni parola costa."

**Visuals**
- [ ] **Callout box** for the Schwarzenegger example + cost implications.

---

#### Episode 4 — "Embedding, significati e spazi vettoriali"

Already has the embedding space diagram.

**Writing**
- [ ] The cross-language insight ("cane" e "dog" finiscono vicine) is one of the most powerful moments in the course but it's mentioned in passing. Expand it — this should be a "wow" paragraph with its own callout.
- [ ] The "30-40% improvement in search" stat is buried. Make it a callout.
- [ ] The multimodal section feels tacked on. Either give it a proper intro or move it to a sidebar.

**Visuals**
- [x] **Semantic vs keyword search comparison** — small inline visual showing the same query returning different results. Even a static card would work.

**Interactive**
- [x] **Embedding similarity explorer** — type two words, see a score. Great tactile "aha" moment.

---

#### Episode 5 — "Dentro il Transformer"

Already has the attention diagram.

**Writing**
- [ ] The opening is weak (transitional). Replace with: "2017. Google pubblica un paper dal titolo 'Attention is All You Need.' Cinque anni dopo, è alla base di ogni AI che usi. Ecco perché."
- [ ] The attention concept (lines 16-24) is the heart of the course but abstract. Add a vivid example: "Nella frase 'Il gatto che dormiva sul divano è nero,' quando elabora 'nero,' l'attenzione dà al gatto un punteggio di 0.9 e al divano 0.1. Così capisce cosa è nero."
- [ ] The parallelism advantage is understated. Add: "Le RNN elaboravano una parola alla volta. Il Transformer le elabora tutte insieme. È per questo che l'addestramento è passato da mesi a giorni."
- [ ] The statistical nature warning (lines 75-82) breaks the flow. Move it to a styled "attenzione" callout box.

**Visuals**
- [x] **Sequential vs parallel processing** — side-by-side comparison: RNN (words in a queue, one at a time) vs Transformer (all words at once). Simple but powerful.

---

#### Episode 6 — "Come si allena un modello"

Already has the training phases diagram.

**Writing**
- [ ] The energy cost comparison (1.287 MWh = 120 famiglie) is fantastic but buried. Make it a **callout box** with big numbers.
- [ ] The loss function explanation is abstract. Add a concrete worked example: "Modello predice 'rosso' dopo 'Il cielo è': Loss = 0.9 (molto sbagliato). Predice 'blu': Loss = 0.1 (quasi giusto)."
- [ ] The fine-tuning practicality paragraph (lines 33-37) interrupts the narrative flow. Move it to a styled "nella pratica" box.
- [ ] Add a practical callout: "Per questo la maggior parte delle aziende non addestra modelli — li usa via API o li personalizza con fine-tuning."

**Visuals**
- [x] **Loss curve animation/chart** — simple visualization showing loss decreasing over training steps. Could be a static SVG with a decreasing curve, annotated with "inizio: predizioni casuali" → "fine: predizioni accurate."

---

#### Episode 7 — "Come genera testo un LLM"

Already has the temperature demo.

**Writing**
- [ ] The probability distribution example (lines 23-31) is important but purely textual. The numbers need visual support.
- [ ] Chain-of-Thought is one of the most practical techniques in the course. Expand it with a concrete before/after: same question, answered directly vs "ragiona passo per passo."
- [ ] Add a practical callout: "Per questo il prompt engineering funziona — stai modellando distribuzioni di probabilità, non dando comandi."

**Visuals**
- [x] **Token probability bar chart** — for a prompt like "Il gatto salta sul…", show a bar chart: divano 40%, tavolo 25%, letto 15%, frigorifero 3%, ecc.

**Interactive**
- [x] **Chain-of-Thought comparison** — side-by-side: same question with and without "ragiona passo per passo." Big impact.

---

#### Episode 8 — "RAG e tools"

Already has the RAG pipeline diagram.

**Writing**
- [ ] The "30-40% improvement" stat should be a callout, not buried in prose.
- [ ] The tools explanation (lines 49-54) is abstract. Add: "Invece di indovinare '23 × 47 = ?', il modello chiama una calcolatrice e ottiene la risposta esatta."
- [ ] Chunking is an important but dry section. Needs a visual.

**Visuals**
- [x] **Chunking visualization** — show a long document being sliced into overlapping chunks, with labels showing why chunk size matters.

**Interactive**
- [x] **Semantic vs keyword search demo** — same query, different results. Reader types a query and sees both sets side by side on sample documents.

---

#### Episode 9 — "Agenti AI"

Already has the agent loop diagram.

**Writing**
- [ ] The travel planning example is good but reads flat. Rewrite as a short **mini-scenario**: a numbered list of the 6-7 steps the agent takes autonomously, showing the loop in action.
- [ ] The "you're already using agents" revelation (Perplexity, Copilot) is a wow moment but understated. Pull it into a callout.
- [ ] Safety section (lines 61-74) is important but interrupts flow. Move to a styled "da sapere" box.

**Visuals**
- [x] **Chatbot vs Agent comparison** — side-by-side card: chatbot (prompt → response, linear) vs agent (goal → plan → execute → verify, autonomous loop).

---

#### Episode 10 — "Come scegliere il modello giusto"

**Writing**
- [ ] The benchmark critique needs more punch. Add: "I benchmark sono come i voti a scuola — uno studente con tutti 10 non è necessariamente il migliore in un colloquio di lavoro."
- [ ] The "truck for bread" analogy is great — use more of this style. Add: "Proprietario vs open-weight? Come affittare un'auto vs comprarne una. Affitto: zero manutenzione. Acquisto: vai dove vuoi."
- [ ] The API vs interface section (lines 49-52) feels like an afterthought. Either give it a proper treatment or cut it.
- [ ] Strengthen the conclusion — it should feel like a graduation moment. Add a "what to do next" call to action.

**Visuals**
- [x] **Model comparison table** — clean card: Proprietari (GPT, Claude, Gemini) vs Open-weight (Llama, Mistral). Columns: costo, velocità, privacy, facilità d'uso.

**Interactive**
- [x] **Model selector quiz** — 3-4 questions ("Che tipo di compito?", "Budget?", "Serve privacy?") → personalized recommendation. Memorable and shareable.

---

### C. Technical improvements (remaining from Phase 1)

- [x] **Code syntax highlighting** — added `shiki` to `MarkdownContent` (async server component).
- [ ] **Inline glossary/tooltip** — first occurrence of key terms gets a hover tooltip definition.
- [x] **Callout component** — styled `<aside>` for "Lo sapevi?", "Nella pratica", "Attenzione" boxes. Needed across many episodes.
- [ ] **Mobile experience audit** — full pass on phone: font sizes, tap targets, diagrams, interactive components.
- [ ] **Dark mode** — optional polish.
- [—] ~~Email capture after Episode 1~~ — on hold per decision.

---

## Priority order for Phase 2

1. **Build the Callout component** — unlocks improvements across all 10 chapters immediately. Quick to build, huge readability impact.
2. **Writing rewrites: hooks + wow moments** — go chapter by chapter, strengthen openings, pull insights into callouts, add drama to flat explanations.
3. **New visuals** (roughly in chapter order):
   - Ep 1: AI convergence timeline, course roadmap
   - Ep 2: Programming vs ML comparison, parameter scale
   - Ep 5: Sequential vs parallel processing
   - Ep 6: Loss curve
   - Ep 7: Probability bar chart
   - Ep 8: Chunking visualization
   - Ep 9: Chatbot vs Agent comparison
   - Ep 10: Model comparison table
4. **New interactive components** (highest impact first):
   - Ep 4: Embedding similarity explorer
   - Ep 7: Chain-of-Thought comparison
   - Ep 10: Model selector quiz
   - Ep 1: "Which of these use AI?" quiz
   - Ep 8: Semantic vs keyword search demo
5. **Code syntax highlighting** — quick win, affects ep. 3/4 code blocks.
6. **Inline glossary/tooltips** — nice-to-have, lower priority.
7. **Mobile audit + dark mode** — final polish.

---

## Notes & decisions log

- **2026-02-22:** Plan created. Starting with Tier 1 bugs and quick wins, then visuals and interactives.
- **2026-02-22:** Phase 1 completed in Session 1. All structural items done.
- **2026-02-22:** Phase 2 plan written based on deep per-episode content review. Focus: writing quality, wow moments, visual understanding, interactivity.
- **2026-02-22:** Phase 2 Steps 1 & 2 completed in Session 2. All shared components built (Callout, BeforeAfterCard, shiki syntax highlighting). All 8 new diagrams and 5 new interactive components built and wired into ChapterContent.tsx. Build passes.
- Architecture: interactive components use `ChapterContent.tsx` wrapper that splits markdown at text anchors and injects React components between halves. Works with `markdown-it`, no MDX migration needed.
- Email capture dropped for now (user decision).

---

## Session 1 log (2026-02-22)

### Data layer
- [x] `description` + `readingTimeMinutes` added to `Episode` type.

### UI components
- [x] `ChapterCard.tsx` — unique descriptions + reading time.
- [x] Chapter reader header — "Puntata X di 10", reading time, subtitle.
- [x] `ReadingProgressBar.tsx` — sticky scroll progress bar.
- [x] `KeyTakeaways.tsx` — 4-point card per chapter.
- [x] `PaywallCard.tsx` — value bullet list.
- [x] Footer in `layout.tsx`.
- [x] Author section in homepage.

### Diagrams
- [x] TokenizerDiagram, EmbeddingDiagram, AttentionDiagram, TrainingPhasesDiagram, RagPipelineDiagram, AgentLoopDiagram.

### Interactive
- [x] TokenizerDemo (ep. 3), TemperatureDemo (ep. 7).

### Styling
- [x] Prose styles, diagram CSS, temperature slider CSS.

### SEO
- [x] `generateMetadata()` per chapter.
