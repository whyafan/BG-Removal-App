"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useImageContext } from "../../context/ImageContext";
import { assets } from "../../assets/assets";
import { useCredits } from "../../context/CreditsContext";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const CommonFooter = () => {
  const router = useRouter();
  const { setImageFromFile } = useImageContext();
  const { user, getAccessToken } = useAuthContext();
  const { credits } = useCredits();
  const [requestOpen, setRequestOpen] = React.useState(false);
  const [requesting, setRequesting] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (user && credits <= 0) {
      router.push("/buy");
      return;
    }
    setImageFromFile(file);
    router.push("/result");
  };

  const handleRequestAccess = async () => {
    if (!user) {
      router.push("/login?redirect=/");
      return;
    }
    const token = await getAccessToken?.();
    if (!token) {
      toast.error("Please sign in to request access.");
      return;
    }

    setRequesting(true);
    try {
      const response = await fetch("/api/access/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Request failed");

      toast.success("API access request submitted.", {
        description: data?.confirmationCode
          ? `Confirmation code: ${data.confirmationCode}`
          : "We will get back to you shortly.",
      });
      setRequestOpen(false);
    } catch (err) {
      toast.error("Unable to submit request.", {
        description: err?.message || "Please try again.",
      });
    } finally {
      setRequesting(false);
    }
  };

  return (
    <section className="w-full mt-16 sm:mt-20 lg:mt-24 pb-8 sm:pb-10">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="bg-[linear-gradient(180deg,#353535,#9B9B9B)] bg-clip-text text-transparent font-semibold text-2xl sm:text-3xl md:text-[34px] lg:text-[38px]">
            See the magic. Try now
          </h2>
        </div>

        <div className="flex justify-center mb-12 sm:mb-14">
          <input
            type="file"
            id="footer-upload"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="footer-upload"
            className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#7C48FE,#C849F8)] px-6 sm:px-7 py-2.5 sm:py-3 text-white text-xs sm:text-sm shadow-[0_10px_20px_rgba(124,72,254,0.25)] cursor-pointer"
          >
            <img
              src={assets.upload_btn_icon}
              alt="Upload icon"
              className="h-4 w-4"
            />
            Upload your image
          </label>
        </div>

        <div className="flex flex-col gap-6 border-t border-[#E8E8E8] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 justify-center text-[#6B6B6B]">
            <img src={assets.logo_icon} alt="BG Removal" className="h-8 w-8" />
            <span className="font-semibold text-[#2E2E2E]">bg.removal</span>
            <span className="hidden sm:inline text-[#C2C2C2]">|</span>
            <span className="text-sm">Copyright ©bg removal</span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <AlertDialog
              open={requestOpen}
              onOpenChange={(nextOpen) => {
                if (!user && nextOpen) {
                  router.push("/login?redirect=/");
                  return;
                }
                setRequestOpen(nextOpen);
              }}
            >
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="text-xs sm:text-sm text-[#4B4B4B] underline"
                >
                  Request API Access
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Request API access?</AlertDialogTitle>
                  <AlertDialogDescription>
                    We will review your request and email you a token if approved.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={requesting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRequestAccess} disabled={requesting}>
                    {requesting ? "Submitting..." : "Confirm"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button className="h-9 w-9 rounded-full border border-[#E6E6E6] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="mx-auto h-4 w-4"
              />
            </button>
            <button className="h-9 w-9 rounded-full border border-[#E6E6E6] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="mx-auto h-4 w-4"
              />
            </button>
            <button className="h-9 w-9 rounded-full border border-[#E6E6E6] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
              <img
                src={assets.google_plus_icon}
                alt="Google Plus"
                className="mx-auto h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonFooter;
