import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { getKindeUserFromRequest } from "../../supabase-auth";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

const generateConfirmationCode = () =>
  crypto.randomBytes(3).toString("hex").toUpperCase();

export async function POST(req) {
  const user = await getKindeUserFromRequest();
  const userId = user?.id;
  const email = user?.email;

  if (!userId || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing } = await supabaseAdmin
    .from("api_access_requests")
    .select("id,status,confirmation_code,approved_at")
    .or(`user_id.eq.${userId},email.eq.${email}`)
    .maybeSingle();

  if (existing?.status === "approved") {
    return NextResponse.json({
      status: "approved",
      confirmationCode: existing.confirmation_code,
    });
  }

  if (existing?.status === "pending") {
    return NextResponse.json({
      status: "pending",
      confirmationCode: existing.confirmation_code,
    });
  }

  const confirmationCode = generateConfirmationCode();

  const { error } = await supabaseAdmin.from("api_access_requests").insert({
    user_id: userId,
    email,
    status: "pending",
    confirmation_code: confirmationCode,
  });

  if (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (RESEND_API_KEY && RESEND_FROM_EMAIL) {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: email,
      subject: "API access request received",
      text: `Thanks for requesting API access. Your confirmation code is ${confirmationCode}. We'll review your request and get back to you.`,
    });
  }

  return NextResponse.json({ status: "pending", confirmationCode });
}
