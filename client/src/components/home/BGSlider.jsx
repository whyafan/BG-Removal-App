import React, { useState } from "react";
import { assets } from "../../assets/assets";

import "../../index.css";

const BGSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const handleSlider = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="w-full mt-16 sm:mt-20 lg:mt-24">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="bg-[linear-gradient(180deg,#353535,#9B9B9B)] bg-clip-text text-transparent font-semibold text-2xl sm:text-3xl md:text-[34px] lg:text-[38px]">
            Remove Background With High
            <br />
            Quality and Accuracy
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="bg-slider-container">
            <div
              className="bg-slider-img bg-slider-background"
              role="img"
              aria-label="Background Image"
              style={{ backgroundImage: `url(${assets.image_wo_bg})` }}
            />

            <div
              className="bg-slider-img bg-slider-foreground"
              role="img"
              aria-label="Foreground Image"
              style={{
                backgroundImage: `url(${assets.image_w_bg})`,
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            />

            {/* Vertical divider line */}
            <div className="bg-slider-line" style={{ left: `${sliderPos}%` }} />

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              className="bg-slider-input"
              onInput={handleSlider}
              onChange={handleSlider}
              name="slider"
              id="slider"
              aria-label="Image Comparison Slider"
            />

            <div
              className="bg-slider-button"
              aria-hidden="true"
              style={{ left: `calc(${sliderPos}% - 20px)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BGSlider;
