"use client";

import React from "react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-2xl border border-[#E6E6E6] bg-white p-8 text-center shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-[#3B3B3B]">
          Payment successful
        </h1>
        <p className="mt-3 text-sm text-[#8A8A8A]">
          Your credits will be added shortly. You can return to the plans page
          or continue using the app.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/buy"
            className="rounded-xl bg-[#1F2937] px-6 py-2 text-sm font-semibold text-white"
          >
            Back to plans
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-[#E6E6E6] px-6 py-2 text-sm font-semibold text-[#3B3B3B]"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
