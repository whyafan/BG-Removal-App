"use client";

import React from "react";
import { toast } from "sonner";
import RequireAuth from "../components/auth/RequireAuth";

const AdminPage = () => {
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const loadRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/access/requests");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to load requests");
      }
      setRequests(data.requests || []);
    } catch (err) {
      setError(err?.message || "Unable to load requests");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadRequests();
  }, []);

  const handleDecision = async (requestId, action) => {
    try {
      const response = await fetch(`/api/access/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Action failed");

      toast.success(action === "approve" ? "Request approved" : "Request rejected");
      await loadRequests();
    } catch (err) {
      toast.error("Unable to update request", {
        description: err?.message || "Please try again.",
      });
    }
  };

  return (
    <RequireAuth>
      <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#3B3B3B]">
            API Access Requests
          </h1>
          <button
            onClick={loadRequests}
            className="rounded-full border border-[#E6E6E6] px-4 py-2 text-xs sm:text-sm"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-[#F3D9D9] bg-[#FFF7F7] p-4 text-sm text-[#8A3B3B]">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-sm text-[#6B6B6B]">Loading requests…</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {requests.length === 0 ? (
              <div className="text-sm text-[#6B6B6B]">No requests yet.</div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-2xl border border-[#E6E6E6] bg-white p-5 shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#2E2E2E]">
                        {req.email}
                      </p>
                      <p className="text-xs text-[#8A8A8A]">
                        Status: {req.status}
                        {req.confirmation_code ? ` • Code: ${req.confirmation_code}` : ""}
                        {req.token_last4 ? ` • Token ****${req.token_last4}` : ""}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDecision(req.id, "approve")}
                        className="rounded-xl bg-[#1F2937] px-4 py-2 text-xs sm:text-sm font-semibold text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecision(req.id, "reject")}
                        className="rounded-xl border border-[#E6E6E6] px-4 py-2 text-xs sm:text-sm font-semibold text-[#2E2E2E]"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default AdminPage;
