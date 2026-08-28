import "server-only";

import { defineAction } from "@agent-native/core/action";
import { z } from "zod";
import { getEpisodeBySlug, getEpisodes } from "@/lib/episodes";

const lessonSlugSchema = z.object({
  slug: z.string().min(1).max(160).describe("Slug della puntata corrente"),
});

/**
 * Agent-Native action used by the tutor runtime after the route has verified
 * the user's session and course entitlement. It is intentionally not mounted
 * as a public HTTP action: the Next.js route is the security boundary.
 */
export const getLessonContextAction = defineAction({
  description: "Legge la puntata corrente e il catalogo pubblico del corso.",
  schema: lessonSlugSchema,
  outputSchema: z.object({
    lesson: z.object({
      number: z.number().int(),
      title: z.string(),
      slug: z.string(),
      content: z.string(),
    }),
    outline: z.array(
      z.object({
        number: z.number().int(),
        title: z.string(),
        slug: z.string(),
        description: z.string(),
      }),
    ),
  }),
  readOnly: true,
  run: ({ slug }) => {
    const lesson = getEpisodeBySlug(slug);

    if (!lesson || !lesson.isPublished) {
      throw new Error("Puntata non trovata.");
    }

    return {
      lesson: {
        number: lesson.number,
        title: lesson.title,
        slug: lesson.slug,
        content: lesson.content,
      },
      outline: getEpisodes()
        .filter((episode) => episode.isPublished)
        .map((episode) => ({
          number: episode.number,
          title: episode.title,
          slug: episode.slug,
          description: episode.description,
        })),
    };
  },
});

export type TutorLessonContext = Awaited<
  ReturnType<typeof getLessonContextAction.run>
>;
