import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaMapMarkerAlt, FaCalendarAlt, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/eventinfo/${event._id}`); // Pass event ID as a query parameter
  };

  const [isApplied, setIsApplied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get day and month for the calendar display
  const eventDay = new Date(event.date).getDate();
  const eventMonth = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
  });

  // Define category colors
  const categoryColors = {
    sports: { bg: "bg-blue-100", text: "text-blue-800", icon: "🏆" },
    music: { bg: "bg-purple-100", text: "text-purple-800", icon: "🎵" },
    art: { bg: "bg-pink-100", text: "text-pink-800", icon: "🎨" },
    technology: { bg: "bg-indigo-100", text: "text-indigo-800", icon: "💻" },
    food: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "🍽️" },
    education: { bg: "bg-green-100", text: "text-green-800", icon: "📚" },
    health: { bg: "bg-teal-100", text: "text-teal-800", icon: "🧘" },
    business: { bg: "bg-gray-100", text: "text-gray-800", icon: "💼" },
    travel: { bg: "bg-amber-100", text: "text-amber-800", icon: "✈️" },
  };

  // Get category styling or default
  const categoryStyle = categoryColors[event.category] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    icon: "🔍",
  };

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const eventId = event._id;
        const response = await fetch(
          `http://localhost:9000/api/events/${eventId}/checkIfApplied`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setIsApplied(data.isApplied);
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkIfApplied();
  }, [event._id]);

  const handleApply = async () => {
    try {
      const eventId = event._id;
      const response = await fetch(
        `http://localhost:9000/api/events/${eventId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 202) {
        console.log("You cannot apply to your own event");
        setShowPrompt(false);

        // Show more elegant error notification instead of alert
        const errorNotification = document.createElement("div");
        errorNotification.className =
          "fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50";
        errorNotification.innerHTML = `
          <div class="flex items-center">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>You cannot apply to your own event</div>
          </div>
        `;
        document.body.appendChild(errorNotification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          document.body.removeChild(errorNotification);
        }, 3000);

        return;
      }

      if (response.ok) {
        setIsApplied(true);
        setShowPrompt(false);
      } else {
        console.error("Failed to apply for the event:", await response.json());
      }
    } catch (error) {
      console.error("Error applying for the event:", error);
    }
  };

  // Card hover animations
  const cardVariants = {
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    initial: {
      y: 0,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Modal animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
      },
    },
  };

  // Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Applied button animation
  const appliedVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="w-full sm:w-80 md:w-96 bg-white rounded-2xl overflow-hidden relative"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layoutId={`event-card-${event._id}`}>
      {/* Category Badge */}
      <div
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
        className={`absolute top-4 left-4 ${categoryStyle.bg} ${categoryStyle.text} px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md z-10`}>
        <span className="mr-1">{categoryStyle.icon}</span>
        <span className="capitalize">{event.category}</span>
      </div>

      {/* Date Overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg overflow-hidden shadow-lg z-10">
        <div className="bg-red-500 text-white text-center px-3 py-1">
          <span className="text-xs font-bold">{eventMonth}</span>
        </div>
        <div className="text-center px-3 py-1">
          <span className="text-gray-900 font-bold">{eventDay}</span>
        </div>
      </div>

      {/* Banner Image with Gradient Overlay */}
      <div className="relative group">
        {!isImageLoaded && (
          <div className="w-full h-56 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        )}
        <motion.img
          onClick={handleCardClick}
          className={`w-full h-56 object-cover transition-transform duration-300 group-hover:z-10 group-hover:scale-105 cursor-pointer ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={event.banner || "https://via.placeholder.com/400x225?text=Event"}
          alt={event.title}
          onLoad={() => setIsImageLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      </div>

      {/* Event Details */}
      <div className="px-6 py-5">
        <motion.h2
          onClick={handleCardClick}
          className="font-bold text-xl text-gray-800 mb-2 line-clamp-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}>
          {event.title}
        </motion.h2>

        <motion.div
          className="flex items-center text-gray-600 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}>
          <FaCalendarAlt className="mr-2 text-indigo-500" />
          <span>{formattedDate}</span>
        </motion.div>

        <motion.div
          className="flex items-center text-gray-600 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}>
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span>{event.location}</span>
        </motion.div>

        <motion.p
          className="text-gray-600 mb-6 line-clamp-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}>
          {event.description}
        </motion.p>

        {/* Apply Button */}
        <motion.div
          className="mt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}>
          {isApplied ? (
            <motion.button
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2"
              disabled
              variants={appliedVariants}
              initial="initial"
              animate="animate">
              <FaCheck className="text-lg" />
              <span>Applied Successfully</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setShowPrompt(true)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              <span className="mr-2">Apply Now</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Ripple effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 3 }}
          transition={{ duration: 1 }}
          style={{ borderRadius: "50%", x: "-50%", y: "-50%" }}
        />
      )}

      {/* Prompt Modal */}
      <AnimatePresence>
        {showPrompt && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowPrompt(false)}>
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Apply to "{event.title}"
                  </h3>
                  <p className="text-gray-600">
                    Do you want to apply for this event? Once applied, you will
                    receive updates and important information.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-indigo-500 mr-2" />
                    <span className="text-gray-700">{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={handleApply}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 shadow-md flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}>
                    Yes, Apply Now
                  </motion.button>
                  <motion.button
                    onClick={() => setShowPrompt(false)}
                    className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}>
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventCard;
