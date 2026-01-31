import React from "react";
import Header from "../components/home/Header";
import StepsSection from "../components/home/StepsSection";

import beforeImg from "../assets/image_w_bg.png";
import afterImg from "../assets/image_wo_bg.png";

import BGSlider from "../components/home/BGSlider";

const Home = () => {
  return (
    <div>
      <Header />
      <StepsSection />
      <BGSlider />
    </div>
  );
};

export default Home;
