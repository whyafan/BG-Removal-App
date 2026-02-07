import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { getUserIdFromRequest } from "../../supabase-auth";

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

export async function POST(req) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const credits = data?.credits ?? 0;
  if (credits <= 0) {
    return NextResponse.json({ error: "No credits left", credits: 0 }, { status: 402 });
  }

  const body = await req.json().catch(() => ({}));
  const nextCredits = Math.max(credits - 1, 0);

  await supabaseAdmin.from("profiles").upsert({ id: userId, credits: nextCredits });

  await supabaseAdmin.from("conversion_history").insert({
    user_id: userId,
    file_name: body?.fileName || null,
  });

  return NextResponse.json({ credits: nextCredits });
}
