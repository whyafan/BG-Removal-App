"use client";

import React from "react";
import { assets } from "../../assets/assets";
import { useAuthContext } from "../../context/AuthContext";
import { useCredits } from "../../context/CreditsContext";

const ResultHeader = () => {
  const { user, logout } = useAuthContext();
  const { credits } = useCredits();
  const displayName =
    user?.given_name ||
    user?.name ||
    user?.email ||
    "there";

  return (
    <header className="w-full">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5">
          <div className="flex items-center gap-3">
            <img src={assets.logo} alt="bg.removal" className="h-7 sm:h-8" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 rounded-full bg-[#E7F1FF] px-3 py-1 text-xs sm:text-sm text-[#4B5563]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD56A]">
                <img
                  src={assets.credit_icon}
                  alt="Credits"
                  className="h-3 w-3"
                />
              </span>
              Credits left: {credits}
            </div>

            {user ? (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                Hi! {displayName}
                <button
                  onClick={logout}
                  className="rounded-full border border-[#E6E6E6] px-3 py-1 text-[11px] hover:bg-white"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <span className="text-xs sm:text-sm text-[#4B5563]">Not signed in</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResultHeader;
