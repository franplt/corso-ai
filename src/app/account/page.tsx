import { redirect } from "next/navigation";
import { getCurrentUser, userHasAccess } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const hasAccess = await userHasAccess(user.id);

  async function signOut() {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-xl">
      <h1 className="mb-4 text-3xl font-semibold">Account</h1>
      <div className="card mb-5 p-5">
        <p className="mb-2 text-sm text-neutral-500">Email</p>
        <p className="mb-5">{user.email}</p>
        <p className="mb-2 text-sm text-neutral-500">Accesso corso</p>
        <p className={hasAccess ? "text-green-700" : "text-neutral-700"}>
          {hasAccess ? "Attivo (premium sbloccato)" : "Non attivo"}
        </p>
      </div>
      <form action={signOut}>
        <button type="submit" className="btn btn-outline">
          Logout
        </button>
      </form>
    </main>
  );
}
