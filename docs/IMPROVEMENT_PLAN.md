# Product Improvement Plan

Goal: transform the course from static pages into a polished, shareable digital product — ready for public release by end of next week.

---

## Status legend

- [ ] Not started
- [~] In progress
- [x] Done

---

## TIER 1 — Must-haves (high impact, do first)

### Bugs
- [x] **Fix next-episode navigation bug** — was already correctly coded in the actual file.
- [x] **Fix Episode 10 conclusion** — replaced with a proper course-ending message.

### Content & UX
- [x] **Add unique descriptions to each chapter card** — each card now shows a specific one-line teaser.
- [x] **Add estimated reading time** to each chapter header — auto-computed from word count (~200 wpm).
- [x] **Add a reading progress bar** — sticky 3px accent-colored bar at top of page.
- [~] **Add course progress indicator** — showing "Puntata X di Y" in the reader header. Per-episode tracking deprioritized.

### Visuals
- [x] **SVG/React diagram: Transformer attention flow** — replaces `[AGGIUNGI VISUAL]` placeholder in Episode 5.
- [x] **SVG/React diagram: RAG pipeline** — injected in Episode 8.
- [x] **SVG/React diagram: Agent loop** — injected in Episode 9.
- [x] **SVG/React diagram: Tokenization example** — injected in Episode 3.
- [x] **SVG/React diagram: Embedding space** — SVG 2D cluster map, injected in Episode 4.
- [x] **SVG/React diagram: Training phases** — 3-panel card, injected in Episode 6.

### Typography & Reader polish
- [x] **Improve chapter reader styling** — better `<hr>`, blockquotes, inline code, pre blocks, list spacing.

---

## TIER 2 — High-value enhancements

### Interactive components
- [x] **Tokenizer demo** — live textarea with color-coded tokens and word/token/char stats. Episode 3.
- [x] **Temperature slider** — slider with prompt selector and live response preview. Episode 7.
- [ ] **Embedding similarity visualizer** — enter two words/phrases, see similarity score and 2D plot. Episode 4.

### Content improvements
- [x] **Add "Punti chiave" (Key takeaways) box** — 4-point styled card at the end of each chapter, shown to full readers.
- [ ] **Add inline glossary/tooltips** — first use of key terms shows a tooltip definition.
- [x] **Fix Episode 10 ending** — proper course-closing message, no longer references a nonexistent next chapter.

### Homepage & trust
- [x] **Add "About the author" section** to homepage.
- [x] **Improve PaywallCard** — 4-item value bullet list, CTA reordered (signup first).

### Navigation & structure
- [x] **Add a footer** — links to chapters, account/signup, copyright.

---

## TIER 3 — Polish & growth

- [x] **Open Graph / social meta tags** — `generateMetadata()` on each chapter page with unique title, description, og/twitter cards.
- [ ] **SEO improvements** — deeper optimization of Episode 1 specifically for organic traffic.
- [ ] **Email capture after Episode 1** — opt-in CTA at the bottom of the free episode.
- [ ] **Code syntax highlighting** — Episodes 3 and 4 use code-style formatting for tokens/vectors. Add `shiki` or `highlight.js`.
- [ ] **Mobile experience audit** — font sizes, tap targets, sticky nav on mobile.
- [ ] **Dark mode** — tasteful dark variant of the warm palette.

---

## Notes & decisions log

- **2026-02-22:** Plan created. Starting with Tier 1 bugs and quick wins, then visuals and interactives.
- **2026-02-22:** First full session completed. All Tier 1 and most Tier 2 items done. See below.
- Architecture note: interactive components use a `ChapterContent.tsx` wrapper that splits markdown at text anchors and injects React components between halves. Simpler than MDX migration, works with existing `markdown-it` setup.
- For reading progress: chose sticky progress bar at top of page (scroll %) over episode-tracking (localStorage). The bar is more useful and requires no state management.
- Course progress tracking (localStorage per-episode) was deprioritized — the progress bar covers the in-session need, and episode tracking requires careful UX (when does an episode count as "read"?).

## Session 1 — what was done (2026-02-22)

### Fixed
- [x] Episode 10 conclusion now has a proper course-ending message instead of referencing a nonexistent next chapter.

### Data layer
- [x] Added `description` (unique per episode) and `readingTimeMinutes` (auto-computed from word count) to the `Episode` type in `src/lib/episodes.ts`.

### UI components
- [x] `ChapterCard.tsx` — shows unique description and reading time per card.
- [x] Chapter reader header — shows "Puntata X di 10" and "X min di lettura", plus the episode description as a subtitle.
- [x] `ReadingProgressBar.tsx` — sticky 3px accent-colored bar at top of page.
- [x] `KeyTakeaways.tsx` — styled box with 4 bullet points per chapter, shown to full readers at the end of the article.
- [x] `PaywallCard.tsx` — now includes a 4-item value bullet list before the CTA.
- [x] Footer added to `layout.tsx`.
- [x] Author section added to `page.tsx` (homepage).

### Diagrams (src/components/diagrams/)
- [x] `TokenizerDiagram.tsx` — shows words split into colored token chips (Episode 3).
- [x] `EmbeddingDiagram.tsx` — SVG 2D map of semantic clusters (Episode 4).
- [x] `AttentionDiagram.tsx` — SVG showing attention arcs between words (Episode 5, replaces `[AGGIUNGI VISUAL]` placeholder).
- [x] `TrainingPhasesDiagram.tsx` — 3-panel card: pre-training → fine-tuning → RLHF (Episode 6).
- [x] `RagPipelineDiagram.tsx` — 5-step pipeline flow (Episode 8).
- [x] `AgentLoopDiagram.tsx` — circular loop SVG: Osserva → Ragiona → Agisce (Episode 9).

### Interactive components (src/components/interactive/)
- [x] `TokenizerDemo.tsx` — live textarea tokenizer with color-coded tokens and stats (Episode 3).
- [x] `TemperatureDemo.tsx` — temperature slider with prompt selector and live response preview (Episode 7).

### CSS & styling
- [x] Richer prose styles: better `<hr>`, blockquotes, inline code, pre blocks, list spacing.
- [x] Diagram utility CSS: `.diagram-card`, `.diagram-label`, `.diagram-caption`.
- [x] Temperature slider custom CSS.

### SEO
- [x] `generateMetadata()` added to chapter page — unique og:title, og:description, twitter card per episode.

## Remaining (Tier 2–3)

- [ ] Glossary/tooltip system — inline tooltips on first use of key terms.
- [ ] Email capture after Episode 1.
- [ ] Code syntax highlighting (highlight.js or shiki for token/vector code blocks).
- [ ] Mobile experience audit.
- [ ] Dark mode.
