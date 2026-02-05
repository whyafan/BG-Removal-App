import Stripe from "stripe";
import { NextResponse } from "next/server";
import { clerkClient } from "../../_auth.js";

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
      const user = await clerkClient.users.getUser(userId);
      const existingCredits = Number(user?.privateMetadata?.credits || 0);
      const nextCredits = existingCredits + creditsToAdd;

      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          credits: nextCredits,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
