import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { requireAdmin } from "../../admin-auth";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const generateToken = () => crypto.randomBytes(24).toString("hex");
const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

export async function POST(req) {
  const adminHeader = req.headers.get("x-admin-key");
  const canUseAdminKey = ADMIN_API_KEY && adminHeader === ADMIN_API_KEY;

  if (!canUseAdminKey) {
    const { response } = await requireAdmin();
    if (response) return response;
  }

  const body = await req.json().catch(() => ({}));
  const requestId = body?.requestId;
  const email = body?.email;

  if (!requestId && !email) {
    return NextResponse.json(
      { error: "Missing requestId or email" },
      { status: 400 },
    );
  }

  const query = supabaseAdmin
    .from("api_access_requests")
    .select("id,email,status");

  const { data: requestRow, error } = requestId
    ? await query.eq("id", requestId).maybeSingle()
    : await query.eq("email", email).maybeSingle();

  if (error || !requestRow) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (requestRow.status === "approved") {
    return NextResponse.json({ status: "approved" });
  }

  const token = generateToken();
  const tokenHash = hashToken(token);
  const tokenLast4 = token.slice(-4);

  const { error: updateError } = await supabaseAdmin
    .from("api_access_requests")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      token_hash: tokenHash,
      token_last4: tokenLast4,
    })
    .eq("id", requestRow.id);

  if (updateError) {
    return NextResponse.json({ error: "Unable to approve request" }, { status: 500 });
  }

  if (RESEND_API_KEY && RESEND_FROM_EMAIL) {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: requestRow.email,
      subject: "Your API access is approved",
      text: `Your API token is: ${token}\n\nKeep it safe. You can use it as a Bearer token in the Authorization header.`,
    });
  }

  return NextResponse.json({ status: "approved", token });
}
