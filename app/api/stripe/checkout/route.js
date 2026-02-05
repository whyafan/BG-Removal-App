import Stripe from "stripe";
import { NextResponse } from "next/server";
import { clerkClient, requireAuth } from "../../_auth.js";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUCCESS_URL = process.env.STRIPE_SUCCESS_URL;
const CANCEL_URL = process.env.STRIPE_CANCEL_URL;

if (!STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export async function POST(req) {
  const { userId, response } = await requireAuth(req);
  if (!userId) return response;

  const body = await req.json().catch(() => ({}));
  const priceId = body?.priceId;
  const credits = Number(body?.credits || 0);

  if (!priceId || credits <= 0) {
    return NextResponse.json(
      { error: "Missing priceId or credits" },
      { status: 400 },
    );
  }

  const user = await clerkClient.users.getUser(userId);
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: SUCCESS_URL || "http://localhost:3000/buy?success=true",
    cancel_url: CANCEL_URL || "http://localhost:3000/buy?canceled=true",
    customer_email: email,
    metadata: {
      userId,
      credits: String(credits),
    },
  });

  return NextResponse.json({ url: session.url });
}
