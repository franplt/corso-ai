import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripeClient } from "@/lib/stripe";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function grantCourseAccess(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const userId = session.metadata?.supabase_user_id;
  const expectedPriceId = process.env.STRIPE_PRICE_ID;
  const checkoutPriceId = session.metadata?.stripe_price_id;

  if (!userId || !uuidRegex.test(userId)) {
    console.error("Paid Checkout session has invalid user metadata", session.id);
    return;
  }

  // Older Checkout sessions created before price metadata was added remain
  // valid; new sessions must match the configured course price.
  if (expectedPriceId && checkoutPriceId && checkoutPriceId !== expectedPriceId) {
    console.error("Paid Checkout session has unexpected price metadata", session.id);
    return;
  }

  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;
  const supabaseAdmin = createSupabaseAdminClient();
  const profile = {
    id: userId,
    stripe_customer_id: customerId ?? null,
    has_access: true,
    ...(session.customer_details?.email
      ? { email: session.customer_details.email }
      : {}),
  };

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .upsert(profile);

  if (profileError) {
    throw new Error(`Unable to grant course access: ${profileError.message}`);
  }

  const { error: paymentError } = await supabaseAdmin.from("payments").upsert({
    stripe_checkout_session_id: session.id,
    user_id: userId,
    amount_total: session.amount_total ?? 0,
    currency: session.currency ?? "eur",
  });

  if (paymentError) {
    throw new Error(`Unable to record payment: ${paymentError.message}`);
  }
}

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

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    try {
      await grantCourseAccess(event.data.object as Stripe.Checkout.Session);
    } catch (error) {
      // A non-2xx response tells Stripe to retry instead of silently losing an
      // entitlement when Supabase is temporarily unavailable.
      console.error("Unable to process Stripe webhook", error);
      return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
