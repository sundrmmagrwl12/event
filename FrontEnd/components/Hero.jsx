import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add entrance animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-white py-16 px-4 md:py-24 md:px-8 overflow-hidden">
      {/* Internal CSS for animations */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes floatAnimation {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          .animate-gradientMove {
            background: linear-gradient(120deg, #e0e7ff, #d1dfff, #f0f4ff, #e0e7ff);
            background-size: 300% 300%;
            animation: gradientMove 12s ease infinite;
            position: absolute;
            inset: 0;
            z-index: 0;
            opacity: 0.4;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-float {
            animation: floatAnimation 6s ease-in-out infinite;
          }
          
          .content-delay-1 {
            opacity: 0;
            animation-delay: 0.2s;
          }
          
          .content-delay-2 {
            opacity: 0;
            animation-delay: 0.4s;
          }
          
          .content-delay-3 {
            opacity: 0;
            animation-delay: 0.6s;
          }
          
          .animate-pulse-subtle {
            animation: pulse 6s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
          }
        `}
      </style>

      {/* Enhanced Animated Background */}
      <div className="animate-gradientMove"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 -mt-10 -mr-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 rounded-full opacity-20 -mb-10 -ml-10 blur-2xl"></div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Section */}
        <div
          className={`flex-1 text-center md:text-left ${
            isVisible ? "animate-fadeInUp content-delay-1" : ""
          }`}>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Plan and Manage Events with Ease
          </h1>
          <p
            className={`text-base md:text-lg text-gray-600 mb-8 leading-relaxed ${
              isVisible ? "animate-fadeInUp content-delay-2" : ""
            }`}>
            The all-in-one platform for creating, managing, and promoting your
            events. From small gatherings to large conferences — we've got you
            covered.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start ${
              isVisible ? "animate-fadeInUp content-delay-3" : ""
            }`}>
            <Link
              to="/Signup"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1">
              Get Started Free
            </Link>
          </div>
        </div>

        {/* Image Section with Float Animation */}
        <div
          className={`flex-1 w-full md:w-1/2 ${
            isVisible ? "animate-fadeInUp animate-float" : ""
          }`}>
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-300 rounded-lg opacity-10 blur-md animate-pulse-subtle"></div>
            <img
              src="https://devfolio.co/static/community-4-90a8b18ff177d862991ea8cc7a1de011.png"
              alt="Event Management"
              className="relative w-full h-60 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
