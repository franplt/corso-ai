import { MarkdownContent } from "@/components/MarkdownContent";
import { TokenizerDiagram } from "@/components/diagrams/TokenizerDiagram";
import { EmbeddingDiagram } from "@/components/diagrams/EmbeddingDiagram";
import { AttentionDiagram } from "@/components/diagrams/AttentionDiagram";
import { TrainingPhasesDiagram } from "@/components/diagrams/TrainingPhasesDiagram";
import { RagPipelineDiagram } from "@/components/diagrams/RagPipelineDiagram";
import { AgentLoopDiagram } from "@/components/diagrams/AgentLoopDiagram";
import { AITimelineDiagram } from "@/components/diagrams/AITimelineDiagram";
import { CourseRoadmapDiagram } from "@/components/diagrams/CourseRoadmapDiagram";
import { ProgrammingVsMLDiagram } from "@/components/diagrams/ProgrammingVsMLDiagram";
import { ParameterScaleDiagram } from "@/components/diagrams/ParameterScaleDiagram";
import { SequentialVsParallelDiagram } from "@/components/diagrams/SequentialVsParallelDiagram";
import { LossCurveDiagram } from "@/components/diagrams/LossCurveDiagram";
import { TokenProbabilityDiagram } from "@/components/diagrams/TokenProbabilityDiagram";
import { ChunkingDiagram } from "@/components/diagrams/ChunkingDiagram";
import { ChatbotVsAgentDiagram } from "@/components/diagrams/ChatbotVsAgentDiagram";
import { ModelComparisonDiagram } from "@/components/diagrams/ModelComparisonDiagram";
import { TokenizerDemo } from "@/components/interactive/TokenizerDemo";
import { TemperatureDemo } from "@/components/interactive/TemperatureDemo";
import { AIQuizDemo } from "@/components/interactive/AIQuizDemo";
import { EmbeddingExplorer } from "@/components/interactive/EmbeddingExplorer";
import { ChainOfThoughtDemo } from "@/components/interactive/ChainOfThoughtDemo";
import { ModelSelectorQuiz } from "@/components/interactive/ModelSelectorQuiz";
import { SemanticSearchDemo } from "@/components/interactive/SemanticSearchDemo";

type ChapterContentProps = {
  episodeNumber: number;
  content: string;
};

function splitAt(content: string, anchor: string): { before: string; after: string } | null {
  const idx = content.indexOf(anchor);
  if (idx === -1) return null;
  return { before: content.slice(0, idx).trimEnd(), after: content.slice(idx) };
}

export function ChapterContent({ episodeNumber, content }: ChapterContentProps) {
  // ── Episode 1: AI quiz hook, then timeline, then roadmap ──────────────────
  if (episodeNumber === 1) {
    // Inject AIQuizDemo after the intro (before the "why now" section)
    const split1 = splitAt(content, "Poi è cambiato tutto, quasi contemporaneamente");
    if (split1) {
      // Then inject timeline after the three-factors explanation
      const split2 = splitAt(split1.after, "Quando queste tre cose si sono incontrate");
      // Then inject course roadmap after "Ecco di cosa tratta ciascuna"
      const split3 = split2
        ? splitAt(split2.after, "Ecco di cosa tratta ciascuna.")
        : null;

      if (split2 && split3) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <AIQuizDemo />
            <MarkdownContent markdown={split2.before} />
            <AITimelineDiagram />
            <MarkdownContent markdown={split3.before} />
            <CourseRoadmapDiagram />
            <MarkdownContent markdown={split3.after} />
          </>
        );
      }
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <AIQuizDemo />
            <MarkdownContent markdown={split2.before} />
            <AITimelineDiagram />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <AIQuizDemo />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 2: Programming vs ML, then parameter scale ───────────────────
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
            <MarkdownContent markdown={split2.before} />
            <ParameterScaleDiagram />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <ProgrammingVsMLDiagram />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 3: tokenizer diagram + interactive demo ───────────────────────
  if (episodeNumber === 3) {
    const split =
      splitAt(content, "Il tipo di tokenizzatore") ||
      splitAt(content, "I token sono anche la base");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <TokenizerDiagram />
          <TokenizerDemo />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // ── Episode 4: embedding diagram + explorer ───────────────────────────────
  if (episodeNumber === 4) {
    const split1 =
      splitAt(content, "Questa mappa non serve solo a") ||
      splitAt(content, "Lo stesso vale per strumenti");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Anche frasi intere o documenti") ||
        splitAt(split1.after, "È utile, ad esempio");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <EmbeddingDiagram />
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
          <EmbeddingExplorer />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 5: attention diagram + sequential vs parallel ─────────────────
  if (episodeNumber === 5) {
    const placeholder = "[AGGIUNGI VISUAL SUL CALCOLO DELL'ATTENZIONE]";
    if (content.includes(placeholder)) {
      const parts = content.split(placeholder);
      // Also inject SequentialVsParallel before the attention diagram
      const split = splitAt(parts[0], "Il Transformer ha rivoluzionato tutto");
      if (split) {
        return (
          <>
            <MarkdownContent markdown={split.before} />
            <SequentialVsParallelDiagram />
            <MarkdownContent markdown={split.after.trimEnd()} />
            <AttentionDiagram />
            {parts[1] && <MarkdownContent markdown={parts[1].trimStart()} />}
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={parts[0].trimEnd()} />
          <SequentialVsParallelDiagram />
          <AttentionDiagram />
          {parts[1] && <MarkdownContent markdown={parts[1].trimStart()} />}
        </>
      );
    }
    // Fallback: inject both after RNN explanation
    const split = splitAt(content, "Il Transformer ha rivoluzionato tutto");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <SequentialVsParallelDiagram />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // ── Episode 6: training phases diagram + loss curve ───────────────────────
  if (episodeNumber === 6) {
    const split1 =
      splitAt(content, "La prima e più massiccia") ||
      splitAt(content, "Questo processo non avviene");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Quanto costa addestrare") ||
        splitAt(split1.after, "I costi di addestramento") ||
        splitAt(split1.after, "energia") ||
        splitAt(split1.after, "MWh");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <TrainingPhasesDiagram />
            <MarkdownContent markdown={split2.before} />
            <LossCurveDiagram />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <TrainingPhasesDiagram />
          <LossCurveDiagram />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 7: probability chart, temperature demo, chain-of-thought ──────
  if (episodeNumber === 7) {
    // Inject probability chart right after the probability explanation
    const split1 =
      splitAt(content, "### Come controllare l'output") ||
      splitAt(content, "Come controllare l'output");
    // Inject temperature demo after temperature explanation
    const split2T =
      splitAt(content, "Insieme alla temperatura, esistono") ||
      splitAt(content, "### Auto-regressione") ||
      splitAt(content, "Auto-regressione");
    // Inject CoT after prompt engineering intro
    const split3 =
      splitAt(content, "Una tecnica potentissima che sfrutta questa natura") ||
      splitAt(content, "Chain-of-Thought (CoT)");

    if (split1 && split2T && split3) {
      // All three injections: probability → temperature → CoT
      const after1 = split1.after;
      const split2 = splitAt(after1, "Insieme alla temperatura, esistono") ||
        splitAt(after1, "### Auto-regressione") ||
        splitAt(after1, "Auto-regressione");
      const split3b = split2
        ? splitAt(split2.after, "Una tecnica potentissima") || splitAt(split2.after, "Chain-of-Thought (CoT)")
        : null;

      if (split2 && split3b) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <TokenProbabilityDiagram />
            <MarkdownContent markdown={split2.before} />
            <TemperatureDemo />
            <MarkdownContent markdown={split3b.before} />
            <ChainOfThoughtDemo />
            <MarkdownContent markdown={split3b.after} />
          </>
        );
      }
    }
    // Fallback: just temperature demo
    const splitFallback =
      splitAt(content, "Insieme alla temperatura, esistono") ||
      splitAt(content, "### Auto-regressione") ||
      splitAt(content, "Auto-regressione");
    if (splitFallback) {
      return (
        <>
          <MarkdownContent markdown={splitFallback.before} />
          <TemperatureDemo />
          <MarkdownContent markdown={splitFallback.after} />
        </>
      );
    }
  }

  // ── Episode 8: RAG pipeline + chunking + semantic search ──────────────────
  if (episodeNumber === 8) {
    const split1 =
      splitAt(content, "Ma come fa il sistema a cercare") ||
      splitAt(content, "Non può usare una ricerca tradizionale");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Un altro aspetto critico") ||
        splitAt(split1.after, "segmentazione") ||
        splitAt(split1.after, "chunking");
      const split3 = split2
        ? splitAt(split2.after, "Ma il RAG non si limita") ||
          splitAt(split2.after, "Strumenti come Notion AI")
        : null;

      if (split2 && split3) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <RagPipelineDiagram />
            <MarkdownContent markdown={split2.before} />
            <ChunkingDiagram />
            <MarkdownContent markdown={split3.before} />
            <SemanticSearchDemo />
            <MarkdownContent markdown={split3.after} />
          </>
        );
      }
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <RagPipelineDiagram />
            <MarkdownContent markdown={split2.before} />
            <ChunkingDiagram />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <RagPipelineDiagram />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  // ── Episode 9: chatbot vs agent + agent loop ──────────────────────────────
  if (episodeNumber === 9) {
    const split1 =
      splitAt(content, "Un agente, invece, riceve un obiettivo") ||
      splitAt(content, "Un agente è un sistema");
    if (split1) {
      const split2 =
        splitAt(split1.after, "Come funziona, in pratica?") ||
        splitAt(split1.after, "Come funziona in pratica");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <ChatbotVsAgentDiagram />
            <MarkdownContent markdown={split2.before} />
            <AgentLoopDiagram />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <ChatbotVsAgentDiagram />
          <AgentLoopDiagram />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
    // Original fallback
    const split =
      splitAt(content, "Come funziona, in pratica?") ||
      splitAt(content, "Come funziona in pratica");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <AgentLoopDiagram />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // ── Episode 10: model comparison table + selector quiz ────────────────────
  if (episodeNumber === 10) {
    const split1 =
      splitAt(content, "Quando conta questa distinzione?") ||
      splitAt(content, "I modelli open-weight sono quelli");
    if (split1) {
      const split2 =
        splitAt(split1.after, "In sintesi: non farti abbagliare") ||
        splitAt(split1.after, "Hai appena completato");
      if (split2) {
        return (
          <>
            <MarkdownContent markdown={split1.before} />
            <ModelComparisonDiagram />
            <MarkdownContent markdown={split2.before} />
            <ModelSelectorQuiz />
            <MarkdownContent markdown={split2.after} />
          </>
        );
      }
      return (
        <>
          <MarkdownContent markdown={split1.before} />
          <ModelComparisonDiagram />
          <ModelSelectorQuiz />
          <MarkdownContent markdown={split1.after} />
        </>
      );
    }
  }

  return <MarkdownContent markdown={content} />;
}
