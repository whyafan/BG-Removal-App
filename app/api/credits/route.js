import { NextResponse } from "next/server";
import { clerkClient, requireAuth } from "../_auth.js";

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

export async function GET(req) {
  const { userId, response } = await requireAuth(req);
  if (!userId) return response ?? NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await clerkClient.users.getUser(userId);
  let credits = getCreditsFromUser(user);

  if (credits === null) {
    credits = 5;
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { ...user.privateMetadata, credits },
    });
  }

  return NextResponse.json({ credits });
}
