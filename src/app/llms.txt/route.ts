import { LLMS_TXT } from "@/lib/llms";

function wantsMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  return acceptHeader.toLowerCase().includes("text/markdown");
}

export async function GET(request: Request) {
  const accept = request.headers.get("accept");
  const contentType = wantsMarkdown(accept)
    ? "text/markdown; charset=utf-8"
    : "text/plain; charset=utf-8";

  return new Response(LLMS_TXT, {
    headers: {
      "content-type": contentType,
      vary: "Accept",
    },
  });
}

