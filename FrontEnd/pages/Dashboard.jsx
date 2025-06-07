import React, { useState, useEffect } from "react";
import axios from "axios";
import NavDash from "../components/NavDash";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://event-sync-x47b.onrender.com/api/events", {
          params: { query: searchQuery },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        window.location.href = "/login";
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [searchQuery]);

  // Filter events based on search query, status, and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? event.status === statusFilter : true;
    const matchesCategory = categoryFilter
      ? event.category === categoryFilter
      : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <NavDash />

      {/* Filters and Search */}
      <div className="p-6 bg-white shadow-md flex flex-wrap items-center gap-4">
        <button
          onClick={() => (window.location.href = "/dashboard/events")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 active:scale-95">
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Host Event</span>
          </span>
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
          <option value="">All Categories</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art">Art</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Event Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))
          : filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
