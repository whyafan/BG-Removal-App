import { NextResponse } from "next/server";
import { clerkClient, requireAuth } from "../_auth.js";

export async function GET(req) {
  const { userId, response } = await requireAuth(req);
  if (!userId) return response ?? NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await clerkClient.users.getUser(userId);
  const history = Array.isArray(user.privateMetadata?.history)
    ? user.privateMetadata.history
    : [];

  return NextResponse.json({ history });
}
