import React, { useEffect, useMemo, useState } from "react";
import { useImageContext } from "../context/ImageContext";
import CommonFooter from "../components/common/CommonFooter";
import { removeBackground } from "@imgly/background-removal";

const Result = () => {
  const { imageFile, imageUrl, setImageFromFile } = useImageContext();
  const [resultUrl, setResultUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [downloadName, setDownloadName] = useState("bg-removed");

  const canDownload = status === "done" && resultUrl;
  const statusLabel = useMemo(() => {
    if (status === "processing") return "Processing...";
    if (status === "error") return "Failed";
    if (status === "done") return "Ready";
    return "Idle";
  }, [status]);

  useEffect(() => {
    let isMounted = true;
    const processImage = async () => {
      if (!imageFile) return;
      setStatus("processing");
      setError("");
      setResultUrl("");

      try {
        const blob = await removeBackground(imageFile);
        const nextUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setResultUrl(nextUrl);
          setStatus("done");
        }
      } catch (err) {
        if (isMounted) {
          setStatus("error");
          setError(err?.message || "Background removal failed.");
        }
      }
    };

    processImage();

    return () => {
      isMounted = false;
    };
  }, [imageFile]);

  const handleTryAnother = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
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
    <div className="w-full">
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
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#EAEAEA]">
                    <img
                      src={imageUrl}
                      alt="Original upload"
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#2E2E2E]">
                    Background Removed
                  </p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#EAEAEA] bg-[linear-gradient(45deg,#f1f1f1_25%,transparent_25%),linear-gradient(-45deg,#f1f1f1_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f1f1_75%),linear-gradient(-45deg,transparent_75%,#f1f1f1_75%)] bg-[length:22px_22px] bg-[position:0_0,0_11px,11px_-11px,-11px_0]">
                    {status === "processing" && (
                      <div className="flex h-64 items-center justify-center text-sm text-gray-500">
                        Processing...
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex h-64 items-center justify-center text-sm text-red-500">
                        {error}
                      </div>
                    )}
                    {status === "done" && resultUrl && (
                      <img
                        src={resultUrl}
                        alt="Background removed"
                        className="w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
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
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C48FE,#C849F8)] px-5 py-2 text-xs sm:text-sm text-white shadow-[0_10px_20px_rgba(124,72,254,0.25)] disabled:opacity-60"
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
  );
};

export default Result;
