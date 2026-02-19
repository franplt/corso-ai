import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const { unlock } = (await request.json()) as { unlock: boolean };
  const cookieStore = await cookies();

  if (unlock) {
    cookieStore.set("dev_unlocked", "1", { path: "/", httpOnly: true, sameSite: "lax" });
  } else {
    cookieStore.delete("dev_unlocked");
  }

  return NextResponse.json({ unlocked: unlock });
}
