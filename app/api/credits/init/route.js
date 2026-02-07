import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { getKindeUserFromRequest } from "../../supabase-auth";

const getCreditsFromUser = (user) => {
  const credits = user?.privateMetadata?.credits;
  return Number.isFinite(credits) ? credits : null;
};

export async function POST(req) {
  const user = await getKindeUserFromRequest();
  const userId = user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = user?.email || null;

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  let credits = data?.credits;
  if (credits === null || credits === undefined) {
    credits = 5;
    await supabaseAdmin.from("profiles").upsert({ id: userId, credits, email });
  } else if (!data?.email && email) {
    await supabaseAdmin.from("profiles").update({ email }).eq("id", userId);
  }

  return NextResponse.json({ credits });
}
