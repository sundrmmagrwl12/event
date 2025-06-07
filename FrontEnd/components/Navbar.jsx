import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home"); // Track the active link

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link
    if (isMenuOpen) setIsMenuOpen(false); // Close the menu in mobile view
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
    handleLinkClick("Home"); // Set "Home" as the active link
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="ml-6 text-4xl font-normal text-indigo-600"
            onClick={scrollToTop} // Scroll to the top when the logo is clicked
            style={{ fontFamily: "Wallpoet, sans-serif" }}>
            Event-Sync
          </Link>

          {/* Desktop Center Menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-6 text-lg">
            <Link
              to="/"
              className={`${
                activeLink === "Home"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}
              onClick={scrollToTop} // Scroll to the top when "Home" is clicked
            >
              Home
            </Link>
            <a
              href="#feature"
              className={`${
                activeLink === "Features"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}
              onClick={() => handleLinkClick("Features")}>
              Features
            </a>
            <a
              href="#event"
              className={`${
                activeLink === "Events"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}
              onClick={() => handleLinkClick("Events")}>
              Events
            </a>
            <a
              href="#contact"
              className={`${
                activeLink === "Contact"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}
              onClick={() => handleLinkClick("Contact")}>
              Contact
            </a>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/Login"
              className="text-gray-800 hover:text-indigo-600 text-lg">
              Log In
            </Link>
            <Link
              to="/Signup"
              className="text-gray-800 hover:text-indigo-600 text-lg">
              Sign Up
            </Link>
          </div>

          {/* Mobile Right Section: Log In + Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/Login"
              className="text-gray-800 hover:text-indigo-600 text-sm">
              Log In
            </Link>

            <Link
              to="/Signup"
              className="text-gray-800 hover:text-indigo-600 text-sm">
              Sign Up
            </Link>
            <button onClick={toggleMenu} className="text-gray-800 text-2xl">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg">
            <Link
              to="/"
              onClick={() => {
                scrollToTop();
                setIsMenuOpen(false);
              }}
              className={`block ${
                activeLink === "Home"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}>
              Home
            </Link>
            <a
              href="#feature"
              onClick={() => {
                handleLinkClick("Features");
                setIsMenuOpen(false);
              }}
              className={`block ${
                activeLink === "Features"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}>
              Features
            </a>
            <a
              href="#event"
              onClick={() => {
                handleLinkClick("Events");
                setIsMenuOpen(false);
              }}
              className={`block ${
                activeLink === "Events"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}>
              Events
            </a>
            <a
              href="#contact"
              onClick={() => {
                handleLinkClick("Contact");
                setIsMenuOpen(false);
              }}
              className={`block ${
                activeLink === "Contact"
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800"
              } hover:text-indigo-600`}>
              About
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
