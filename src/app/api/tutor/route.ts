import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getCurrentUser, isDevUnlocked, userHasAccess } from "@/lib/auth";
import { getEpisodeBySlug } from "@/lib/episodes";
import { getLessonContextAction } from "@/lib/tutor/actions";
import { checkTutorRateLimit } from "@/lib/tutor/rate-limit";
import {
  buildTutorInput,
  buildTutorInstructions,
  tutorRequestSchema,
  tutorSafetyIdentifier,
} from "@/lib/tutor/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

function jsonError(error: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error }, { status, headers });
}

export async function POST(request: Request) {
  const parsed = tutorRequestSchema.safeParse(
    await request.json().catch(() => null),
  );

  if (!parsed.success) {
    return jsonError("Richiesta del tutor non valida.", 400);
  }

  const episode = getEpisodeBySlug(parsed.data.chapterSlug);
  if (!episode || !episode.isPublished) {
    return jsonError("Puntata non trovata.", 404);
  }

  const user = await getCurrentUser();
  const devUnlocked = await isDevUnlocked();

  if (!user && !devUnlocked) {
    return jsonError("Accedi per usare il tutor AI.", 401);
  }

  if (episode.number !== 1 && !devUnlocked) {
    const hasAccess = user ? await userHasAccess(user.id) : false;
    if (!hasAccess) {
      return jsonError("Questa puntata richiede l’accesso al corso completo.", 403);
    }
  }

  const rateLimitKey = user?.id ?? "development-preview";
  const rateLimit = checkTutorRateLimit(rateLimitKey);
  if (!rateLimit.allowed) {
    return jsonError(
      "Hai inviato molte domande in poco tempo. Riprova tra un minuto.",
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonError("Il tutor AI non è ancora configurato.", 503);
  }

  // The entitlement check above must happen before this action reads the full
  // lesson and makes it available to the model.
  const context = await getLessonContextAction.run(
    { slug: parsed.data.chapterSlug },
    {
      caller: "tool",
      actionName: "get-lesson-context",
    },
  );

  const client = new OpenAI({ apiKey });

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Flush the response immediately. This prevents hosting proxies from
      // waiting for the model's first token before opening the event stream.
      controller.enqueue(encoder.encode(": tutor-connected\n\n"));

      try {
        const upstream = await client.responses.create({
          model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
          instructions: buildTutorInstructions(context),
          input: buildTutorInput(parsed.data),
          reasoning: { effort: "low" },
          text: { verbosity: "low" },
          max_output_tokens: 1_200,
          safety_identifier: tutorSafetyIdentifier(rateLimitKey),
          store: false,
          stream: true,
        });

          for await (const event of upstream) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
            );
          }
      } catch (error) {
        console.error("Tutor stream failed", error);
        const fallbackMessage = "Il tutor si è interrotto. Riprova tra poco.";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "response.output_text.delta",
              item_id: "tutor-stream-error",
              delta: fallbackMessage,
            })}\n\ndata: ${JSON.stringify({
              type: "response.output_text.done",
              item_id: "tutor-stream-error",
              text: fallbackMessage,
            })}\n\ndata: ${JSON.stringify({
              type: "response.completed",
              response: { status: "completed" },
            })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}
