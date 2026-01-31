import React, { useState } from "react";
import { assets } from "../../assets/assets";

import "../../index.css";

const BGSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const handleSlider = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div>
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
  );
};

export default BGSlider;
