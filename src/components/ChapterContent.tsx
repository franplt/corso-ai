import { MarkdownContent } from "@/components/MarkdownContent";
import { TokenizerDiagram } from "@/components/diagrams/TokenizerDiagram";
import { EmbeddingDiagram } from "@/components/diagrams/EmbeddingDiagram";
import { AttentionDiagram } from "@/components/diagrams/AttentionDiagram";
import { TrainingPhasesDiagram } from "@/components/diagrams/TrainingPhasesDiagram";
import { RagPipelineDiagram } from "@/components/diagrams/RagPipelineDiagram";
import { AgentLoopDiagram } from "@/components/diagrams/AgentLoopDiagram";
import { TokenizerDemo } from "@/components/interactive/TokenizerDemo";
import { TemperatureDemo } from "@/components/interactive/TemperatureDemo";

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
  // Episode 3: tokenizer diagram + interactive demo
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

  // Episode 4: embedding diagram after conceptual explanation, before practical applications
  if (episodeNumber === 4) {
    const split =
      splitAt(content, "Questa mappa non serve solo a") ||
      splitAt(content, "Lo stesso vale per strumenti");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <EmbeddingDiagram />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // Episode 5: replace the visual placeholder with the actual diagram
  if (episodeNumber === 5) {
    const placeholder = "[AGGIUNGI VISUAL SUL CALCOLO DELL'ATTENZIONE]";
    if (content.includes(placeholder)) {
      const parts = content.split(placeholder);
      return (
        <>
          <MarkdownContent markdown={parts[0].trimEnd()} />
          <AttentionDiagram />
          {parts[1] && <MarkdownContent markdown={parts[1].trimStart()} />}
        </>
      );
    }
  }

  // Episode 6: training phases diagram at the start of the phases section
  if (episodeNumber === 6) {
    const split =
      splitAt(content, "La prima e più massiccia") ||
      splitAt(content, "Questo processo non avviene");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <TrainingPhasesDiagram />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // Episode 8: RAG pipeline diagram after the conceptual intro
  if (episodeNumber === 8) {
    const split =
      splitAt(content, "Ma come fa il sistema a cercare") ||
      splitAt(content, "Non può usare una ricerca tradizionale");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <RagPipelineDiagram />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  // Episode 9: agent loop diagram when the mechanics are introduced
  if (episodeNumber === 9) {
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

  // Episode 7: temperature demo after the temperature explanation
  if (episodeNumber === 7) {
    const split =
      splitAt(content, "Insieme alla temperatura, esistono") ||
      splitAt(content, "### Auto-regressione") ||
      splitAt(content, "Auto-regressione");
    if (split) {
      return (
        <>
          <MarkdownContent markdown={split.before} />
          <TemperatureDemo />
          <MarkdownContent markdown={split.after} />
        </>
      );
    }
  }

  return <MarkdownContent markdown={content} />;
}
