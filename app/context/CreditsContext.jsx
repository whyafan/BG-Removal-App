"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./AuthContext";

const CreditsContext = createContext(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const CreditsProvider = ({ children }) => {
  const { user, loading: authLoading, getAccessToken } = useAuthContext();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authedFetch = async (path, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const accessToken = await getAccessToken?.();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    return response;
  };

  const initCredits = async () => {
    if (authLoading || !user) return;
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
    if (authLoading || !user) return;
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
    if (authLoading || !user) return 0;
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
    if (authLoading || !user) {
      setCredits(null);
      return;
    }
    initCredits();
  }, [authLoading, user]);

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
