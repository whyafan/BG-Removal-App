import { NextResponse } from "next/server";
import { clerkClient, requireAuth } from "../../_auth.js";

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

export async function POST(req) {
  const { userId, response } = await requireAuth(req);
  if (!userId) return response ?? NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await clerkClient.users.getUser(userId);
  const credits = getCreditsFromUser(user) ?? 0;

  if (credits <= 0) {
    return NextResponse.json({ error: "No credits left", credits: 0 }, { status: 402 });
  }

  const body = await req.json().catch(() => ({}));
  const nextCredits = Math.max(credits - 1, 0);
  const nextHistory = Array.isArray(user.privateMetadata?.history)
    ? user.privateMetadata.history.slice(-49)
    : [];

  nextHistory.push({
    type: "remove_bg",
    at: new Date().toISOString(),
    fileName: body?.fileName || null,
  });

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      credits: nextCredits,
      history: nextHistory,
    },
  });

  return NextResponse.json({ credits: nextCredits });
}
