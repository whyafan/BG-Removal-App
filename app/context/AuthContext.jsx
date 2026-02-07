"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getToken,
    login,
    register,
    logout,
  } = useKindeBrowserClient();

  const getAccessToken = async () => {
    try {
      return await getToken();
    } catch {
      return null;
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading: isLoading,
      login,
      register,
      logout,
      getAccessToken,
    }),
    [user, isAuthenticated, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
