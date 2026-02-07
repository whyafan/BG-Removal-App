import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/admin";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export async function POST(req) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session?.metadata?.userId;
    const creditsToAdd = Number(session?.metadata?.credits || 0);

    if (userId && creditsToAdd > 0) {
      const { data } = await supabaseAdmin
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();

      const existingCredits = Number(data?.credits || 0);
      const nextCredits = existingCredits + creditsToAdd;

      await supabaseAdmin.from("profiles").upsert({ id: userId, credits: nextCredits });
    }
  }

  return NextResponse.json({ received: true });
}
