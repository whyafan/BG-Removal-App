"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useImageContext } from "../context/ImageContext";
import CommonFooter from "../components/common/CommonFooter";
import { removeBackground } from "@imgly/background-removal";
import { useRouter } from "next/navigation";
import { useCredits } from "../context/CreditsContext";
import { toast } from "sonner";

import ResultHeader from "../components/results/ResultHeader";
import RequireAuth from "../components/auth/RequireAuth";

const Result = () => {
  const { imageFile, imageUrl, setImageFromFile } = useImageContext();
  const router = useRouter();
  const { credits, consumeCredit } = useCredits();
  const [resultUrl, setResultUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [downloadName, setDownloadName] = useState("bg-removed");
  const [hasCharged, setHasCharged] = useState(false);
  const [originalReady, setOriginalReady] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const requestIdRef = useRef(0);
  const progressTimerRef = useRef(null);

  const canDownload = status === "done" && resultUrl;
  const statusLabel = useMemo(() => {
    if (status === "processing") return "Processing...";
    if (status === "error") return "Failed";
    if (status === "done") return "Ready";
    return "Idle";
  }, [status]);

  const startProgress = () => {
    setProgress(0);
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 3;
        return next >= 90 ? 90 : next;
      });
    }, 350);
  };

  const stopProgress = (finalValue = 100) => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setProgress(finalValue);
  };

  useEffect(() => {
    let isMounted = true;
    const processImage = async () => {
      if (!imageFile) return;
      if (!originalReady) return;
      if (credits <= 0) {
        router.push("/buy");
        return;
      }
      const requestId = ++requestIdRef.current;
      setStatus("processing");
      setError("");
      setResultUrl("");
      startProgress();
      toast.message("Processing image...", {
        description: `Credits left: ${credits}`,
      });

      try {
        const blob = await removeBackground(imageFile);
        const nextUrl = URL.createObjectURL(blob);

        if (isMounted && requestId === requestIdRef.current) {
          setResultUrl(nextUrl);
          setStatus("done");
          stopProgress(100);
          toast.success("Background removed successfully.");
        }
      } catch (err) {
        if (isMounted && requestId === requestIdRef.current) {
          setStatus("error");
          setError(err?.message || "Background removal failed.");
          stopProgress(0);
          toast.error("Background removal failed.", {
            description: err?.message || "Please try again.",
          });
        }
      }
    };

    processImage();

    return () => {
      isMounted = false;
    };
  }, [imageFile, credits, router, originalReady]);

  useEffect(() => {
    if (!imageFile) return;
    setHasCharged(false);
    setOriginalReady(false);
    setProgress(0);
  }, [imageFile]);

  useEffect(() => {
    if (!imageFile) {
      setLocalPreviewUrl("");
      return;
    }
    const nextPreview = URL.createObjectURL(imageFile);
    setLocalPreviewUrl(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!resultUrl || status !== "done" || hasCharged) return;
    consumeCredit(imageFile?.name).catch(() => {});
    setHasCharged(true);
  }, [consumeCredit, imageFile, resultUrl, status, hasCharged]);

  const handleTryAnother = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (credits <= 0) {
      toast.warning("You have no credits left.", {
        description: "Please purchase more credits to continue.",
      });
      router.push("/buy");
      return;
    }
    setDownloadName(file.name?.replace(/\.[^/.]+$/, "") || "bg-removed");
    setImageFromFile(file);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `${downloadName}-removed.png`;
    link.click();
  };

  return (
    <RequireAuth>
      <div className="w-full">
        <ResultHeader />
        <section className="w-full py-10 sm:py-12">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {!imageUrl ? (
            <div className="rounded-2xl border border-[#E6E6E6] bg-white p-6 text-center shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
              <p className="text-sm text-gray-500">
                No image selected yet. Please upload an image from the home
                page.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 sm:p-6 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-[#2E2E2E]">
                    Original
                  </p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#EAEAEA] bg-white">
                    {!originalReady && (
                      <div className="h-64 w-full animate-pulse bg-slate-100 sm:h-72 lg:h-80" />
                    )}
                    <img
                      src={localPreviewUrl || imageUrl}
                      alt="Original upload"
                      className={`w-full max-h-[22rem] sm:max-h-[24rem] lg:max-h-[26rem] object-contain bg-white ${originalReady ? "block" : "hidden"}`}
                      onLoad={() => setOriginalReady(true)}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#2E2E2E]">
                    Background Removed
                  </p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#EAEAEA] bg-[linear-gradient(45deg,#f1f1f1_25%,transparent_25%),linear-gradient(-45deg,#f1f1f1_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f1f1_75%),linear-gradient(-45deg,transparent_75%,#f1f1f1_75%)] bg-[length:22px_22px] bg-[position:0_0,0_11px,11px_-11px,-11px_0]">
                    {status === "processing" && (
                      <div className="flex h-64 items-center justify-center text-sm text-gray-500 sm:h-72 lg:h-80">
                        Processing...
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex h-64 items-center justify-center text-sm text-red-500 sm:h-72 lg:h-80">
                        {error}
                      </div>
                    )}
                    {status === "done" && resultUrl && (
                      <img
                        src={resultUrl}
                        alt="Background removed"
                        className="w-full max-h-[22rem] sm:max-h-[24rem] lg:max-h-[26rem] object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-[linear-gradient(135deg,#7C48FE,#C849F8)] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Status: {statusLabel}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
                <input
                  type="file"
                  id="try-another"
                  accept="image/*"
                  hidden
                  onChange={handleTryAnother}
                />
                <label
                  htmlFor="try-another"
                  className="inline-flex items-center justify-center rounded-full border border-[#C7A4FF] px-5 py-2 text-xs sm:text-sm text-[#7C48FE] hover:bg-[#F6F0FF] cursor-pointer"
                >
                  Try another image
                </label>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!canDownload}
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C48FE,#C849F8)] px-5 py-2 text-xs sm:text-sm text-white shadow-[0_10px_20px_rgba(124,72,254,0.25)] disabled:opacity-60 cursor-pointer"
                >
                  Download image
                </button>
                <span className="text-[11px] text-gray-400">
                  Status: {statusLabel}
                </span>
              </div>
            </div>
          )}
        </div>
        </section>
        <CommonFooter />
      </div>
    </RequireAuth>
  );
};

export default Result;
