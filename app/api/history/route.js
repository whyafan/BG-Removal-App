import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/admin";
import { getUserIdFromRequest } from "../supabase-auth";

export async function GET(req) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabaseAdmin
    .from("conversion_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  return NextResponse.json({ history: data ?? [] });
}
