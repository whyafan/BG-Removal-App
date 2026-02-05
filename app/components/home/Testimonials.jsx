import React from "react";
import { testimonialsData } from "../../assets/assets";

const Testimonials = () => {
  return (
    <section className="w-full mt-16 sm:mt-20 lg:mt-24">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="bg-[linear-gradient(180deg,#353535,#9B9B9B)] bg-clip-text text-transparent font-semibold text-2xl sm:text-3xl md:text-[34px] lg:text-[38px]">
            Customer Testimonials
          </h2>
        </div>

        <div className="flex flex-wrap items-stretch justify-center gap-6 lg:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-md rounded-2xl border border-[#E6E6E6] bg-white p-6 sm:p-7 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="text-3xl text-[#6D5DF5] leading-none">“</div>
              <p className="mt-3 text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
                {item.text}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.author}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#2E2E2E]">
                    {item.author}
                  </p>
                  <p className="text-[10px] sm:text-xs tracking-wide text-[#9A9A9A] uppercase">
                    {item.jobTitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
