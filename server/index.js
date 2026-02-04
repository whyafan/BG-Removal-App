import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, getAuth, clerkClient } from "@clerk/express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

if (!CLERK_SECRET_KEY || !CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk keys. Set CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY in server/.env",
  );
}

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "10mb" }));
app.use(clerkMiddleware());

const requireUser = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.userId = userId;
  next();
};

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

app.get("/api/credits", requireUser, async (req, res) => {
  const user = await clerkClient.users.getUser(req.userId);
  let credits = getCreditsFromUser(user);

  if (credits === null) {
    credits = 5;
    await clerkClient.users.updateUserMetadata(req.userId, {
      privateMetadata: { ...user.privateMetadata, credits },
    });
  }

  return res.json({ credits });
});

app.post("/api/credits/init", requireUser, async (req, res) => {
  const user = await clerkClient.users.getUser(req.userId);
  let credits = getCreditsFromUser(user);

  if (credits === null) {
    credits = 5;
    await clerkClient.users.updateUserMetadata(req.userId, {
      privateMetadata: { ...user.privateMetadata, credits },
    });
  }

  return res.json({ credits });
});

app.post("/api/credits/consume", requireUser, async (req, res) => {
  const user = await clerkClient.users.getUser(req.userId);
  const credits = getCreditsFromUser(user) ?? 0;

  if (credits <= 0) {
    return res.status(402).json({ error: "No credits left", credits: 0 });
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

  await clerkClient.users.updateUserMetadata(req.userId, {
    privateMetadata: {
      ...user.privateMetadata,
      credits: nextCredits,
      history: nextHistory,
    },
  });

  return res.json({ credits: nextCredits });
});

app.get("/api/history", requireUser, async (req, res) => {
  const user = await clerkClient.users.getUser(req.userId);
  const history = Array.isArray(user.privateMetadata?.history)
    ? user.privateMetadata.history
    : [];
  return res.json({ history });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
