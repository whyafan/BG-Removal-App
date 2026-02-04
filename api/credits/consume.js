import { clerkClient, requireAuth } from "../_auth.js";

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const userId = await requireAuth(req, res);
  if (!userId) return;

  const user = await clerkClient.users.getUser(userId);
  const credits = getCreditsFromUser(user) ?? 0;

  if (credits <= 0) {
    res.status(402).json({ error: "No credits left", credits: 0 });
    return;
  }

  const nextCredits = Math.max(credits - 1, 0);
  const nextHistory = Array.isArray(user.privateMetadata?.history)
    ? user.privateMetadata.history.slice(-49)
    : [];

  nextHistory.push({
    type: "remove_bg",
    at: new Date().toISOString(),
    fileName: req.body?.fileName || null,
  });

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      credits: nextCredits,
      history: nextHistory,
    },
  });

  res.json({ credits: nextCredits });
}
