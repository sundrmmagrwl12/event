import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import NavDash from "../components/NavDash";
import EventCardProfileOrg from "../components/EventCardProfileOrg";

const Profile = () => {
  const [user, setUser] = useState({ email: "", username: "" });
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // Fetch user profile data
        const userResponse = await axios.get(
          "https://event-sync-x47b.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(userResponse.data.data);

        // Fetch organized events
        const organizedResponse = await axios.get(
          "https://event-sync-x47b.onrender.com/api/users/organizer/events",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(organizedResponse.data);
        setOrganizedEvents(organizedResponse.data.data);

        // Fetch attended events
        const attendedResponse = await axios.get(
          "https://event-sync-x47b.onrender.com/api/users/attended/events",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAttendedEvents(attendedResponse.data.data);
      } catch (error) {
        window.location.href = "/login";
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <NavDash />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 p-6 md:p-8">
        {/* User Info */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-indigo-100 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">
                  {user.username ? user.username[0].toUpperCase() : "U"}
                </span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 6H3"
                />
              </svg>
              Logout
            </button>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-gray-800 mb-2 flex items-center">
              <span className="font-semibold text-indigo-700 w-24">
                Username:
              </span>
              <span className="ml-2">{user.username}</span>
            </p>
            <p className="text-gray-800 flex items-center">
              <span className="font-semibold text-indigo-700 w-24">Email:</span>
              <span className="ml-2">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Organized Events */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
            <span className="bg-indigo-600 text-white p-1 rounded-md mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </span>
            Organized Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-md animate-pulse border border-gray-100">
                  <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
                </div>
              ))
            ) : organizedEvents.length > 0 ? (
              organizedEvents.map((event) => (
                <EventCardProfileOrg key={event._id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-xl shadow-md border border-dashed border-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-indigo-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-600">
                  You haven't organized any events yet.
                </p>
                <button
                  onClick={() => {
                    window.location.href = "/dashboard/events";
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                  Create Your First Event
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Attended Events */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
            <span className="bg-indigo-600 text-white p-1 rounded-md mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            Attended Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-md animate-pulse border border-gray-100">
                  <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
                </div>
              ))
            ) : attendedEvents.length > 0 ? (
              attendedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-xl shadow-md border border-dashed border-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-indigo-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-600">
                  You haven't attended any events yet.
                </p>
                <button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                  Browse Available Events
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
