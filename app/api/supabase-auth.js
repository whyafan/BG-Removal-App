import crypto from "crypto";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabaseAdmin } from "../lib/supabase/admin";

const getBearerToken = (req) => {
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim();
};

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const getKindeUserFromRequest = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user || null;
};

export const getKindeUserIdFromRequest = async () => {
  const user = await getKindeUserFromRequest();
  return user?.id || null;
};

export const getUserIdFromRequest = async (req) => {
  const kindeUserId = await getKindeUserIdFromRequest();
  if (kindeUserId) return kindeUserId;

  const token = getBearerToken(req);
  if (!token) return null;

  const tokenHash = hashToken(token);
  const { data: apiRequest } = await supabaseAdmin
    .from("api_access_requests")
    .select("user_id")
    .eq("status", "approved")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  return apiRequest?.user_id || null;
};
