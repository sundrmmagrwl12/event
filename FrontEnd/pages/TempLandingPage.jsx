import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Events from "../components/Events";

// import HowItWorks from './HowItWorks';
// import Testimonials from './Testimonials';
// import CallToAction from './CallToAction';
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full font-[Poppins] text-gray-800 bg-white overflow-x-hidden">
      <Navbar />
      <div className="pt-10">
        <Hero />
        <Features id="features" />
        <Events id="events" />

        {/* <HowItWorks />
      <Testimonials />
      <CallToAction /> */}
        <Footer id="contact" />
      </div>
    </div>
  );
};

export default LandingPage;
