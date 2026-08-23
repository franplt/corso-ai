import { NextResponse } from "next/server";
import { userHasAccess } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";

export async function POST() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: "Supabase non configurato." }, { status: 500 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Devi essere autenticato." }, { status: 401 });
  }

  if (await userHasAccess(user.id)) {
    return NextResponse.json({ url: "/chapters", alreadyActive: true });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const stripe = getStripeClient();

  if (!priceId || !appUrl) {
    return NextResponse.json(
      { error: "Configurazione Stripe incompleta." },
      { status: 500 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel`,
      customer_email: user.email,
      metadata: {
        supabase_user_id: user.id,
        stripe_price_id: priceId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout session", error);
    return NextResponse.json(
      { error: "Impossibile avviare il pagamento. Riprova tra poco." },
      { status: 502 },
    );
  }
}
