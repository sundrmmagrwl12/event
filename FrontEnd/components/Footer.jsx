import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const footerPosition = document
        .getElementById("contact")
        .getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (footerPosition < windowHeight * 0.9) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation classes
  const fadeInClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";
  const animationTiming = "transition-all duration-700 ease-in-out";

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-indigo-600/10 blur-xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-500/10 blur-xl animate-pulse"
          style={{ animationDuration: "8s" }}></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-blue-500/10 blur-xl animate-pulse"
          style={{ animationDuration: "12s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Column 1: Logo & Description */}
        <div className={`${fadeInClass} ${animationTiming} delay-100`}>
          <h1
            className="text-2xl font-normal text-indigo-400 mb-3 cursor-pointer hover:text-indigo-300 transition-colors duration-300 flex items-center"
            style={{ fontFamily: "Wallpoet, sans-serif" }}
            onClick={scrollToTop}>
            <span className="mr-2">Event-Sync</span>
            <span className="inline-block animate-bounce text-xl">✨</span>
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Simplifying event management and planning with seamless sync across
            platforms. Our mission is to make your events memorable.
          </p>

          {/* Social media icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className={`${fadeInClass} ${animationTiming} delay-300`}>
          <h2 className="text-lg font-semibold mb-4 text-indigo-300">
            Quick Links
          </h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                to="/#Home"
                className="hover:text-white flex items-center"
                onClick={scrollToTop}>
                <span className="text-indigo-400 mr-2">→</span> Home
              </Link>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <a
                href="/#feature"
                className="hover:text-white flex items-center">
                <span className="text-indigo-400 mr-2">→</span> Features
              </a>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <a href="/#event" className="hover:text-white flex items-center">
                <span className="text-indigo-400 mr-2">→</span> Events
              </a>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              <Link
                to="/#contact"
                className="hover:text-white flex items-center">
                <span className="text-indigo-400 mr-2">→</span> About
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className={`${fadeInClass} ${animationTiming} delay-500`}>
          <h2 className="text-lg font-semibold mb-4 text-indigo-300">
            Contact Us
          </h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-300 flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              support@eventsync.com
            </p>
            <p className="text-sm text-gray-300 flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +91-98XXXXXXXX
            </p>

            {/* Newsletter subscription form */}
            {/* <div className="pt-2">
              <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-sm rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white w-full"
                />
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 rounded-r px-3 py-2 text-sm transition-colors duration-300">
                  Subscribe
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Section with animation */}
      <div
        className={`text-center text-sm text-gray-400 mt-12 pt-6 border-t border-gray-700 relative z-10 ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000 delay-700`}>
        <div className="flex justify-center items-center">
          <span>
            © {new Date().getFullYear()} Event-Sync. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="ml-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Scroll to top">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
