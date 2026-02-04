import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const CreditsContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const CreditsProvider = ({ children }) => {
  const { isSignedIn, getToken } = useAuth();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authedFetch = async (path, options = {}) => {
    const token = await getToken();
    if (!token) throw new Error("Missing auth token");
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    return response;
  };

  const initCredits = async () => {
    if (!isSignedIn) return;
    setLoading(true);
    setError("");
    try {
      const response = await authedFetch("/api/credits/init", { method: "POST" });
      const data = await response.json();
      setCredits(data.credits ?? 0);
    } catch (err) {
      setError(err?.message || "Failed to initialize credits");
    } finally {
      setLoading(false);
    }
  };

  const refreshCredits = async () => {
    if (!isSignedIn) return;
    setLoading(true);
    setError("");
    try {
      const response = await authedFetch("/api/credits");
      const data = await response.json();
      setCredits(data.credits ?? 0);
    } catch (err) {
      setError(err?.message || "Failed to load credits");
    } finally {
      setLoading(false);
    }
  };

  const consumeCredit = async (fileName) => {
    if (!isSignedIn) return 0;
    setError("");
    const response = await authedFetch("/api/credits/consume", {
      method: "POST",
      body: JSON.stringify({ fileName }),
    });

    const data = await response.json();
    if (!response.ok) {
      setCredits(0);
      throw new Error(data?.error || "No credits left");
    }
    setCredits(data.credits ?? 0);
    return data.credits ?? 0;
  };

  useEffect(() => {
    if (!isSignedIn) {
      setCredits(null);
      return;
    }
    initCredits();
  }, [isSignedIn]);

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
