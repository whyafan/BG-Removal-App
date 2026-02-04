import { clerkClient, requireAuth } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const userId = await requireAuth(req, res);
  if (!userId) return;

  const user = await clerkClient.users.getUser(userId);
  const history = Array.isArray(user.privateMetadata?.history)
    ? user.privateMetadata.history
    : [];

  res.json({ history });
}
