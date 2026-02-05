"use client";

import React from "react";
import { assets } from "../../assets/assets";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useCredits } from "../../context/CreditsContext";

const ResultHeader = () => {
  const { user } = useUser();
  const { credits } = useCredits();
  const displayName =
    user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress;

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

            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-full border border-[#E6E6E6] px-4 py-1.5 text-xs sm:text-sm text-[#4B5563] hover:bg-white">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                Hi! {displayName || "there"}
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResultHeader;
