import React from "react";
import { assets } from "../../assets/assets";

const ResultHeader = () => {
  return (
    <header className="w-full">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5">
          <div className="flex items-center gap-3">
            <img src={assets.logo_icon} alt="bg.removal" className="h-8 w-8" />
            <span className="text-sm sm:text-base font-semibold text-[#1F1F1F]">
              bg.removal
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 rounded-full bg-[#E7F1FF] px-3 py-1 text-xs sm:text-sm text-[#4B5563]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD56A]">
                <img
                  src={assets.credit_icon}
                  alt="Credits"
                  className="h-3 w-3"
                />
              </span>
              Credits left: 4
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
              Hi! Kelvin
              <img
                src={assets.profile_img_1}
                alt="User avatar"
                className="h-7 w-7 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResultHeader;
