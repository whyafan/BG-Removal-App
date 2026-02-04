import { clerkClient, requireAuth } from "../_auth.js";

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const userId = await requireAuth(req, res);
  if (!userId) return;

  const user = await clerkClient.users.getUser(userId);
  let credits = getCreditsFromUser(user);

  if (credits === null) {
    credits = 5;
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { ...user.privateMetadata, credits },
    });
  }

  res.json({ credits });
}
