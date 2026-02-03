import React from "react";
import Header from "../components/home/Header";
import StepsSection from "../components/home/StepsSection";

import beforeImg from "../assets/image_w_bg.png";
import afterImg from "../assets/image_wo_bg.png";

import BGSlider from "../components/home/BGSlider";
import Testimonials from "../components/home/testimonials";
import Footer from "../components/home/footer";

const Home = () => {
  return (
    <div>
      <Header />
      <StepsSection />
      <BGSlider />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
