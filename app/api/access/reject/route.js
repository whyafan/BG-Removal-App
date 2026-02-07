import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { requireAdmin } from "../../admin-auth";

export async function POST(req) {
  const { response } = await requireAdmin();
  if (response) return response;

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
    .select("id,status");

  const { data: requestRow, error } = requestId
    ? await query.eq("id", requestId).maybeSingle()
    : await query.eq("email", email).maybeSingle();

  if (error || !requestRow) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (requestRow.status === "rejected") {
    return NextResponse.json({ status: "rejected" });
  }

  const { error: updateError } = await supabaseAdmin
    .from("api_access_requests")
    .update({
      status: "rejected",
      approved_at: null,
      token_hash: null,
      token_last4: null,
    })
    .eq("id", requestRow.id);

  if (updateError) {
    return NextResponse.json({ error: "Unable to reject request" }, { status: 500 });
  }

  return NextResponse.json({ status: "rejected" });
}
