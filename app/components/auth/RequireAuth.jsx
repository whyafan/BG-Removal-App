import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={location.pathname} />
      </SignedOut>
    </>
  );
};

export default RequireAuth;
