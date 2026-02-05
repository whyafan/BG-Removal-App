import React from "react";
import Header from "./components/home/Header";
import StepsSection from "./components/home/StepsSection";
import BGSlider from "./components/home/BGSlider";
import Testimonials from "./components/home/Testimonials";
import CommonFooter from "./components/common/CommonFooter";
import NavBar from "./components/home/NavBar";

const Home = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <NavBar />
      </div>

      <Header />
      <StepsSection />
      <BGSlider />
      <Testimonials />
      <CommonFooter />
    </div>
  );
};

export default Home;
