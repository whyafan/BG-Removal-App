"use client";

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const RequireAuth = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={pathname} />
      </SignedOut>
    </>
  );
};

export default RequireAuth;
