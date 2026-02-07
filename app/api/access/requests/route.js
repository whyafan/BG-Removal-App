import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { requireAdmin } from "../../admin-auth";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const { data, error } = await supabaseAdmin
    .from("api_access_requests")
    .select("id,email,status,confirmation_code,token_last4,created_at,approved_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ requests: data ?? [] });
}
