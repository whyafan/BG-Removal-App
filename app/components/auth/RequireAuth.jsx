"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";

const RequireAuth = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuthContext();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, pathname, router]);

  if (loading) return null;
  if (!user) return null;

  return <>{children}</>;
};

export default RequireAuth;
