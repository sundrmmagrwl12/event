import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavDash from "../components/NavDash";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    organizerId: "",
    location: "",
    category: "",
    banner: "",
    status: "upcoming",
  });

  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create an event.");
        window.location.href = "/login";
        return;
      }
      await axios.post(
        "http://localhost:9000/api/events",
        { ...formData, attendees },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success animation
      setFormStep(3);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          date: "",
          organizerId: "",
          location: "",
          category: "",
          banner: "",
          status: "upcoming",
        });
        setAttendees([]);
        setFormStep(1);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextStep = (e) => {
    e.preventDefault();
    setFormStep(2);
  };

  const goToPreviousStep = (e) => {
    e.preventDefault();
    setFormStep(1);
  };

  const categoryIcons = {
    sports: "🏆",
    music: "🎵",
    art: "🎨",
    technology: "💻",
    food: "🍽️",
    education: "📚",
    health: "🧘",
    business: "💼",
    travel: "✈️",
    other: "🔍",
  };

  return (
    <>
      <NavDash />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-indigo-100 h-2">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: "33%" }}
              animate={{
                width: formStep === 1 ? "50%" : formStep === 2 ? "90%" : "100%",
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
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
              </motion.div>
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {formStep === 3 ? "Event Created!" : "Create a New Event"}
              </motion.h2>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-gray-500 mt-2">
                {formStep === 3
                  ? "Your event has been successfully created"
                  : formStep === 1
                  ? "Fill in the basic details of your event"
                  : "Add location and media information"}
              </motion.p>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {formStep === 3 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Event Created Successfully!
                </h3>
                <p className="text-gray-500 mb-8 max-w-md">
                  Your event has been created and is now available for
                  attendees.
                </p>
                <motion.div
                  className="h-2 w-full bg-gray-200 rounded-full max-w-xs"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}>
                  <div className="h-2 bg-green-500 rounded-full"></div>
                </motion.div>
              </motion.div>
            )}

            {/* Form Steps */}
            {formStep !== 3 && (
              <form
                onSubmit={formStep === 1 ? goToNextStep : handleSubmit}
                className="space-y-6">
                {/* Step 1: Basic Details */}
                {formStep === 1 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1 flex items-center">
                        <span className="text-indigo-600 mr-2">
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
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter a catchy title for your event"
                        required
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1 flex items-center">
                        <span className="text-indigo-600 mr-2">
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe what your event is all about"
                        required
                        rows={4}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-none"></textarea>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1 flex items-center">
                        <span className="text-indigo-600 mr-2">
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1 flex items-center">
                        <span className="text-indigo-600 mr-2">
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
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </span>
                        Category
                      </label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                        {Object.entries(categoryIcons).map(([cat, icon]) => (
                          <motion.div
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                category: cat,
                              }))
                            }
                            className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                              formData.category === cat
                                ? "border-indigo-500 bg-indigo-50 shadow-md"
                                : "border-gray-200 hover:border-indigo-300"
                            }`}>
                            <div className="text-2xl mb-1">{icon}</div>
                            <div className="text-sm font-medium capitalize">
                              {cat}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Step 2: Location & Media */}
                {formStep === 2 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1 flex items-center">
                        <span className="text-indigo-600 mr-2">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Where will your event take place?"
                        required
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1 flex items-center">
                        <span className="text-indigo-600 mr-2">
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                        Banner Image URL
                      </label>
                      <input
                        type="text"
                        name="banner"
                        value={formData.banner}
                        onChange={handleInputChange}
                        placeholder="URL to an image that represents your event"
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      />
                      {formData.banner && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                          <img
                            src={formData.banner}
                            alt="Banner preview"
                            className="w-full h-48 object-cover"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/800x400?text=Invalid+Image+URL")
                            }
                          />
                        </div>
                      )}
                    </motion.div>

                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mt-6">
                      <h3 className="font-semibold text-indigo-700 mb-2 flex items-center">
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
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Event Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="text-gray-600">Title:</div>
                        <div className="font-medium text-gray-800">
                          {formData.title}
                        </div>

                        <div className="text-gray-600">Date:</div>
                        <div className="font-medium text-gray-800">
                          {formData.date}
                        </div>

                        <div className="text-gray-600">Category:</div>
                        <div className="font-medium text-gray-800 capitalize">
                          {formData.category && (
                            <span>
                              {categoryIcons[formData.category]}{" "}
                              {formData.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between pt-4">
                  {formStep === 2 ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={goToPreviousStep}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-lg font-medium transition-all duration-200 flex items-center">
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
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold shadow-md transition-all duration-300 ease-in-out flex items-center ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}>
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 mr-3 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                          </>
                        ) : (
                          <>
                            Create Event
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <div></div> {/* Empty div for spacing */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold shadow-md transition-all duration-300 ease-in-out flex items-center">
                        Continue
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default EventForm;
