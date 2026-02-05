import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!CLERK_SECRET_KEY) {
  throw new Error("Missing CLERK_SECRET_KEY in environment");
}

export const clerkClient = createClerkClient({ secretKey: CLERK_SECRET_KEY });

export const requireAuth = async () => {
  const { userId } = auth();
  if (!userId) {
    return {
      userId: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { userId, response: null };
};
