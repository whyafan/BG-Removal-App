"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const CreditsContext = createContext(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const CreditsProvider = ({ children }) => {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authedFetch = async (path, options = {}) => {
    // If we're calling a same-origin Next.js route (API_BASE_URL is empty),
    // Clerk auth is already available via cookies. In that case, do NOT
    // force a Bearer token header (many handlers only validate cookie auth).
    const isSameOriginApi = !API_BASE_URL || API_BASE_URL === "";

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (!isSameOriginApi) {
      const token = await getToken();
      if (!token) throw new Error("Missing auth token");
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      // Ensure cookies are sent for same-origin (and if API_BASE_URL is set to same-site)
      credentials: "include",
      headers,
    });

    return response;
  };

  const initCredits = async () => {
    if (!isLoaded || !isSignedIn) return;
    setLoading(true);
    setError("");
    try {
      const response = await authedFetch("/api/credits/init", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unauthorized");
      setCredits(data.credits ?? 0);
    } catch (err) {
      setError(err?.message || "Failed to initialize credits");
    } finally {
      setLoading(false);
    }
  };

  const refreshCredits = async () => {
    if (!isLoaded || !isSignedIn) return;
    setLoading(true);
    setError("");
    try {
      const response = await authedFetch("/api/credits");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unauthorized");
      setCredits(data.credits ?? 0);
    } catch (err) {
      setError(err?.message || "Failed to load credits");
    } finally {
      setLoading(false);
    }
  };

  const consumeCredit = async (fileName) => {
    if (!isLoaded || !isSignedIn) return 0;
    setError("");
    const response = await authedFetch("/api/credits/consume", {
      method: "POST",
      body: JSON.stringify({ fileName }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "No credits left");
    }
    setCredits(data.credits ?? 0);
    return data.credits ?? 0;
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setCredits(null);
      return;
    }
    initCredits();
  }, [isLoaded, isSignedIn]);

  const value = useMemo(
    () => ({
      credits,
      loading,
      error,
      refreshCredits,
      consumeCredit,
    }),
    [credits, loading, error],
  );

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
};

export const useCredits = () => {
  const ctx = useContext(CreditsContext);
  if (!ctx) {
    throw new Error("useCredits must be used within CreditsProvider");
  }
  return ctx;
};
