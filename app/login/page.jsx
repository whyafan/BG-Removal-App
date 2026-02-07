"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { login, register } = useAuthContext();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E6E6E6] bg-white p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-[#3B3B3B]">Sign in</h1>
        <p className="mt-2 text-sm text-[#8A8A8A]">
          Continue with your Kinde account.
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => login({ redirectTo: redirect })}
            className="w-full rounded-xl bg-[#1F2937] py-3 text-sm font-semibold text-white"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => register({ redirectTo: redirect })}
            className="w-full rounded-xl border border-[#E6E6E6] py-3 text-sm font-semibold text-[#2E2E2E]"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
