import { MarkdownContent } from "@/components/MarkdownContent";

// ── Diagrams (kept) ──────────────────────────────────────────────────────────
import { AITimelineDiagram } from "@/components/diagrams/AITimelineDiagram";
import { ProgrammingVsMLDiagram } from "@/components/diagrams/ProgrammingVsMLDiagram";
import { TokenizerDiagram } from "@/components/diagrams/TokenizerDiagram";
import { EmbeddingDiagram } from "@/components/diagrams/EmbeddingDiagram";
import { LossCurveDiagram } from "@/components/diagrams/LossCurveDiagram";
import { TokenProbabilityDiagram } from "@/components/diagrams/TokenProbabilityDiagram";
import { RagPipelineDiagram } from "@/components/diagrams/RagPipelineDiagram";
import { AgentLoopDiagram } from "@/components/diagrams/AgentLoopDiagram";

// ── Interactive demos (kept) ─────────────────────────────────────────────────
import { TokenizerDemo } from "@/components/interactive/TokenizerDemo";
import { EmbeddingExplorer } from "@/components/interactive/EmbeddingExplorer";
import { TemperatureDemo } from "@/components/interactive/TemperatureDemo";

// ── New interactive demos ────────────────────────────────────────────────────
import { SpamClassifierDemo } from "@/components/interactive/SpamClassifierDemo";
import { ContextWindowDemo } from "@/components/interactive/ContextWindowDemo";
import { BPEMergeDemo } from "@/components/interactive/BPEMergeDemo";
import { VectorArithmeticDemo } from "@/components/interactive/VectorArithmeticDemo";
import { InteractiveAttentionDemo } from "@/components/interactive/InteractiveAttentionDemo";
import { SequentialVsParallelAnimation } from "@/components/interactive/SequentialVsParallelAnimation";
import { LayerByLayerDemo } from "@/components/interactive/LayerByLayerDemo";
import { GradientDescentDemo } from "@/components/interactive/GradientDescentDemo";
import { RLHFSimulatorDemo } from "@/components/interactive/RLHFSimulatorDemo";
import { AutoregressiveDemo } from "@/components/interactive/AutoregressiveDemo";
import { TopKTopPDemo } from "@/components/interactive/TopKTopPDemo";
import { SemanticSearchDemo } from "@/components/interactive/SemanticSearchDemo";
import { ToolCallingDemo } from "@/components/interactive/ToolCallingDemo";
import { RAGToggleDemo } from "@/components/interactive/RAGToggleDemo";
import { AgentSimulatorDemo } from "@/components/interactive/AgentSimulatorDemo";
import { HumanInTheLoopDemo } from "@/components/interactive/HumanInTheLoopDemo";
import { ModelSizingDemo } from "@/components/interactive/ModelSizingDemo";
import { BenchmarkDecoderDemo } from "@/components/interactive/BenchmarkDecoderDemo";

type ChapterContentProps = {
  episodeNumber: number;
  content: string;
};

/**
 * Normalise typographic punctuation to its ASCII equivalent.
 *
 * Every replacement is one character for one character, so offsets into the
 * normalised string still address the original string correctly.
 */
function normalizePunctuation(value: string): string {
  return value
    .replace(/[\u2018\u2019\u02BC\u00B4]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
}

function splitAt(content: string, anchor: string): { before: string; after: string } | null {
  // Anchors are matched against prose that is authored in a Markdown editor,
  // so the same apostrophe may be typed as ' or as the typographic '. Episode 7
  // silently lost four components for months because the anchor here used the
  // ASCII apostrophe while the episode text used U+2019. Compare on a
  // normalised copy so the two forms are interchangeable.
  const idx = normalizePunctuation(content).indexOf(normalizePunctuation(anchor));
  if (idx === -1) return null;
  return { before: content.slice(0, idx).trimEnd(), after: content.slice(idx) };
}

export function ChapterContent({ episodeNumber, content }: ChapterContentProps) {
  // ── Episode 1: Timeline only ────────────────────────────────────────────────
  if (episodeNumber === 1) {
    const split = splitAt(content, "Quando queste tre cose si sono incontrate");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <AITimelineDiagram />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // ── Episode 2: Programming vs ML diagram + Spam Classifier demo ─────────────
  if (episodeNumber === 2) {
    const split1 =
      splitAt(content, "Il risultato di questo processo di apprendimento è") ||
      splitAt(content, "Con il machine learning, fai una cosa diversa");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Qui c'è qualcosa di controintuitivo") ||
        splitAt(split1.after, "Un modello piccolo ha qualche milione");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <ProgrammingVsMLDiagram />
            <SpamClassifierDemo />
            <MarkdownContent markdown={split2.before} />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <ProgrammingVsMLDiagram />
          <SpamClassifierDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 3: Tokenizer diagram + demo + BPE demo + Context window ─────────
  if (episodeNumber === 3) {
    const split1 =
      splitAt(content, "Il tipo di tokenizzatore") ||
      splitAt(content, "I token sono anche la base");
    if (split1) {
      const split2 =
        splitAt(split1.after, "I token sono anche la base") ||
        splitAt(split1.after, "Un modello ha sempre un limite");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <TokenizerDiagram />
            <TokenizerDemo />
            <BPEMergeDemo />
            <MarkdownContent markdown={split2.before} />
            <ContextWindowDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <TokenizerDiagram />
          <TokenizerDemo />
          <BPEMergeDemo />
          <ContextWindowDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 4: Embedding diagram + explorer + vector arithmetic ─────────────
  if (episodeNumber === 4) {
    const split1 =
      splitAt(content, "Questa mappa non serve solo a") ||
      splitAt(content, "Lo stesso vale per strumenti");
    if (split1) {
      const split2 =
        splitAt(split1.after, "E non vale solo per una lingua") ||
        splitAt(split1.after, "Anche frasi intere o documenti");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <EmbeddingDiagram />
            <VectorArithmeticDemo />
            <MarkdownContent markdown={split2.before} />
            <EmbeddingExplorer />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <EmbeddingDiagram />
          <VectorArithmeticDemo />
          <EmbeddingExplorer />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 5: Interactive Attention + Sequential vs Parallel + Layer demo ──
  if (episodeNumber === 5) {
    const split1 =
      splitAt(content, "Il Transformer ha rivoluzionato tutto") ||
      splitAt(content, "Il Transformer processa");
    if (split1) {
      // Find the attention explanation section
      const split2 =
        splitAt(split1.after, "Questo punteggio si chiama") ||
        splitAt(split1.after, "query, key e value") ||
        splitAt(split1.after, "Ogni parola nella sequenza");
      // Find the multi-layer section
      const split3 = split2
        ? splitAt(split2.after, "Questo processo non avviene una volta sola") ||
          splitAt(split2.after, "un Transformer è fatto di molti") ||
          splitAt(split2.after, "stacked")
        : null;
      if (split2 && split3) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <SequentialVsParallelAnimation />
            <MarkdownContent markdown={split2.before} />
            <InteractiveAttentionDemo />
            <MarkdownContent markdown={split3.before} />
            <LayerByLayerDemo />
            <MarkdownContent markdown={split3.after} />
          </>
        );
      }
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <SequentialVsParallelAnimation />
            <MarkdownContent markdown={split2.before} />
            <InteractiveAttentionDemo />
            <LayerByLayerDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <SequentialVsParallelAnimation />
          <InteractiveAttentionDemo />
          <LayerByLayerDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
    // Handle the placeholder pattern from Ch5
    const placeholder = "[AGGIUNGI VISUAL SUL CALCOLO DELL'ATTENZIONE]";
    if (content.includes(placeholder)) {
      const parts = content.split(placeholder);
      return (
        <>
          <MarkdownContent markdown={parts[0].trimEnd()} />
          <SequentialVsParallelAnimation />
          <InteractiveAttentionDemo />
          <LayerByLayerDemo />
          {parts[1] && <MarkdownContent markdown={parts[1].trimStart()} />}
        </>
      );
    }
  }

  // ── Episode 6: Loss curve + Gradient descent + RLHF simulator ───────────────
  if (episodeNumber === 6) {
    const split1 =
      splitAt(content, "La prima e più massiccia") ||
      splitAt(content, "Questo processo non avviene");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Reinforcement Learning from Human Feedback") ||
        splitAt(split1.after, "RLHF");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <LossCurveDiagram />
            <GradientDescentDemo />
            <MarkdownContent markdown={split2.before} />
            <RLHFSimulatorDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <LossCurveDiagram />
          <GradientDescentDemo />
          <RLHFSimulatorDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 7: Probability + Autoregressive + Temperature + Top-k/p ─────────
  if (episodeNumber === 7) {
    const split1 =
      splitAt(content, "Come controllare l'output") ||
      splitAt(content, "come controllare l'output");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Insieme alla temperatura, esistono") ||
        splitAt(split1.after, "top-k");
      const split3 = split2
        ? splitAt(split2.after, "Auto-regressione") ||
          splitAt(split2.after, "auto-regressione")
        : null;
      if (split2 && split3) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <TokenProbabilityDiagram />
            <MarkdownContent markdown={split2.before} />
            <TemperatureDemo />
            <MarkdownContent markdown={split3.before} />
            <TopKTopPDemo />
            <AutoregressiveDemo />
            <MarkdownContent markdown={split3.after} />
          </>
        );
      }
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <TokenProbabilityDiagram />
            <MarkdownContent markdown={split2.before} />
            <TemperatureDemo />
            <TopKTopPDemo />
            <AutoregressiveDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <TokenProbabilityDiagram />
          <TemperatureDemo />
          <TopKTopPDemo />
          <AutoregressiveDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 8: RAG toggle + pipeline + semantic search + tool calling ────────
  if (episodeNumber === 8) {
    const split1 =
      splitAt(content, "Non può usare una ricerca tradizionale") ||
      splitAt(content, "Ma come fa il sistema a cercare");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Il modello può essere collegato a") ||
        splitAt(split1.after, "strumenti esterni");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <RAGToggleDemo />
            <RagPipelineDiagram />
            <MarkdownContent markdown={split2.before} />
            <SemanticSearchDemo />
            <ToolCallingDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <RAGToggleDemo />
          <RagPipelineDiagram />
          <SemanticSearchDemo />
          <ToolCallingDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 9: Agent loop + simulator + human in the loop ───────────────────
  if (episodeNumber === 9) {
    const split1 =
      splitAt(content, "Come funziona, in pratica?") ||
      splitAt(content, "Come funziona in pratica");
    if (split1) {
      const split2 =
        splitAt(split1.after, "human in the loop") ||
        splitAt(split1.after, "azioni critiche chiede conferma");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <AgentLoopDiagram />
            <AgentSimulatorDemo />
            <MarkdownContent markdown={split2.before} />
            <HumanInTheLoopDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <AgentLoopDiagram />
          <AgentSimulatorDemo />
          <HumanInTheLoopDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 10: Benchmark decoder + model sizing ────────────────────────────
  if (episodeNumber === 10) {
    const split1 =
      splitAt(content, "La seconda cosa da capire è come leggere i benchmark") ||
      splitAt(content, "Ogni volta che esce un modello nuovo");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Un concetto che pochi conoscono") ||
        splitAt(split1.after, "right-sizing");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <BenchmarkDecoderDemo />
            <MarkdownContent markdown={split2.before} />
            <ModelSizingDemo />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <BenchmarkDecoderDemo />
          <ModelSizingDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  return <MarkdownContent markdown={content} />;
}
