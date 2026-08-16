import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  const stripe = getStripeClient();

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.supabase_user_id;
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;

    // The metadata value is attacker-influenced in principle, and it is used as
    // a primary key against the service-role client. Reject anything that is
    // not a well-formed Supabase user id before it reaches the database.
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (userId && uuidRegex.test(userId)) {
      const supabaseAdmin = createSupabaseAdminClient();

      await supabaseAdmin.from("profiles").upsert({
        id: userId,
        email: session.customer_details?.email ?? null,
        stripe_customer_id: customerId ?? null,
        has_access: true,
      });

      await supabaseAdmin.from("payments").upsert({
        stripe_checkout_session_id: session.id,
        user_id: userId,
        amount_total: session.amount_total ?? 0,
        currency: session.currency ?? "eur",
      });
    }
  }

  return NextResponse.json({ received: true });
}
