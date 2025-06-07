import React from "react";
import "../styles/NavDash.css";

const NavDash = () => {
  const navigateToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <nav className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 animate-gradient-x p-4 flex justify-between items-center shadow-md overflow-hidden">
      <h1
        onClick={navigateToDashboard}
        className="ml-6 text-4xl font-medium text-white cursor-pointer hover:text-gray-300 transition-colors"
        style={{ fontFamily: "Wallpoet, sans-serif" }}>
        Event-Sync
      </h1>
      <button
        onClick={() => (window.location.href = "/dashboard/profile")}
        className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
        Profile
      </button>
    </nav>
  );
};

export default NavDash;
