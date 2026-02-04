import { createClerkClient, verifyToken } from "@clerk/backend";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!CLERK_SECRET_KEY) {
  throw new Error("Missing CLERK_SECRET_KEY in environment");
}

export const clerkClient = createClerkClient({ secretKey: CLERK_SECRET_KEY });

export const requireAuth = async (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  try {
    const { payload } = await verifyToken(token, { secretKey: CLERK_SECRET_KEY });
    return payload?.sub || null;
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
};
