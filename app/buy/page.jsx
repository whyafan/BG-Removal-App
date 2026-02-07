"use client";

import React from "react";
import ResultHeader from "../components/results/ResultHeader";
import CommonFooter from "../components/common/CommonFooter";
import { assets, plans } from "../assets/assets";
import RequireAuth from "../components/auth/RequireAuth";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

const BuyCredit = () => {
  const { getAccessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  const priceMap = {
    Basic: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC,
      credits: 100,
    },
    Advanced: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ADVANCED,
      credits: 500,
    },
    Business: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS,
      credits: 5000,
    },
  };

  const handleCheckout = async (planId) => {
    const plan = priceMap[planId];
    if (!plan?.priceId) {
      toast.error("Missing Stripe price ID.", {
        description: "Please add price IDs to your env vars.",
      });
      return;
    }

    try {
      const token = await getAccessToken?.();
      if (!token) {
        toast.error("Please sign in to continue.");
        return;
      }
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          credits: plan.credits,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Checkout failed.");
      }
      window.location.href = data.url;
    } catch (err) {
      toast.error("Unable to start checkout.", {
        description: err?.message || "Please try again.",
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Payment successful.", {
        description: "Your credits will be updated shortly.",
      });
    }
    if (isCanceled) {
      toast.error("Payment canceled.", {
        description: "No charge was made.",
      });
    }
  }, [isSuccess, isCanceled]);

  return (
    <RequireAuth>
      <div className="w-full">
        <ResultHeader />
        <section className="w-full py-12 sm:py-16">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
            {isSuccess && (
              <div className="mb-6 rounded-2xl border border-[#E6E6E6] bg-white p-4 text-sm text-[#3B3B3B] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                Payment successful. Credits are being added to your account.
              </div>
            )}
            {isCanceled && (
              <div className="mb-6 rounded-2xl border border-[#F3D9D9] bg-[#FFF7F7] p-4 text-sm text-[#8A3B3B]">
                Payment canceled. You can try again anytime.
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <span className="rounded-full border border-[#D9DDE3] bg-white px-6 py-2 text-xs uppercase tracking-wide text-[#5B5B5B] shadow-[0_6px_14px_rgba(0,0,0,0.04)]">
                Our plans
              </span>
              <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-[#4B4B4B]">
                Choose the plan that’s right for you
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-[#8A8A8A]">
                Test card: 4242 4242 4242 4242 • Any future date • Any CVC
              </p>
            </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-3xl border border-[#E6E6E6] bg-white p-6 sm:p-7 shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                    <img
                      src={assets.logo_icon}
                      alt="Plan icon"
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3B3B3B]">
                      {plan.id}
                    </p>
                    <p className="text-xs text-[#8A8A8A]">{plan.desc}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-[#4B4B4B]">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-[#8A8A8A]">
                    / {plan.credits} credits
                  </span>
                </div>

                <button
                  onClick={() => handleCheckout(plan.id)}
                  className="mt-6 w-full rounded-xl bg-[#1F2937] py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,0.12)] hover:bg-[#111827] transition-colors"
                >
                  {plan.id === "Business" ? "Purchase" : "Get started"}
                </button>
              </div>
            ))}
          </div>
        </div>
        </section>
        <CommonFooter />
      </div>
    </RequireAuth>
  );
};

export default BuyCredit;
