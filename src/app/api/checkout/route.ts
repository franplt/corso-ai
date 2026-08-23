import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";

export async function POST() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: "Supabase non configurato." }, { status: 500 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  const userEmail = claimsData?.claims?.email;

  if (claimsError || !userId) {
    return NextResponse.json({ error: "Devi essere autenticato." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("has_access")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    console.error("Unable to verify course access before checkout", profileError);
    return NextResponse.json(
      { error: "Impossibile verificare il tuo accesso. Riprova tra poco." },
      { status: 502 },
    );
  }

  if (profile?.has_access) {
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
      locale: "it",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel`,
      customer_email: typeof userEmail === "string" ? userEmail : undefined,
      submit_type: "pay",
      branding_settings: {
        background_color: "#faf8f5",
        border_style: "rounded",
        button_color: "#b45309",
        display_name: SITE_NAME,
        font_family: "noto_sans",
        icon: {
          type: "url",
          url: `${SITE_URL}/checkout-icon.png`,
        },
      },
      custom_text: {
        submit: {
          message:
            "Pagamento unico. Accesso immediato a tutte le puntate. Transazione sicura gestita da Stripe.",
        },
      },
      metadata: {
        supabase_user_id: userId,
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
