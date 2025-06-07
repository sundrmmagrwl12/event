import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventCardProfileOrg = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const eventDay = new Date(event.date).getDate();
  const eventMonth = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
  });

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

  const categoryStyle = categoryColors[event.category] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    icon: "🔍",
  };

  const handleCardClick = () => {
    navigate(`/eventinfo/${event._id}`);
  };
  const handlemailClick = () => {
    navigate(`/email/${event._id}`);
  };
  const handleDelete = async () => {
    try {
      const eventId = event._id;
      const response = await fetch(
        `http://localhost:9000/api/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        console.log("Event deleted successfully");
        setShowPrompt(false);
        if (onDelete) {
          onDelete(eventId); // Call the parent function to remove the event from the UI
        }
      } else {
        console.error("Failed to delete the event:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting the event:", error);
    }
  };

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

      {/* Banner Image */}
      <div className="relative group">
        {!isImageLoaded && (
          <div className="w-full h-56 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse cursor-pointer" />
        )}
        <motion.img
          onClick={handleCardClick}
          className={`w-full h-56 object-cover transition-transform duration-300 group-hover:z-10 group-hover:scale-105 cursor-pointer ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "z-20 scale-105" : "z-10"}`}
          src={event.banner || "https://via.placeholder.com/400x225?text=Event"}
          alt={event.title}
          onLoad={() => setIsImageLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Event Details */}
      <div className="px-6 py-5">
        <motion.h2
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={handlemailClick}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}>
            Email
          </motion.button>
          <motion.button
            onClick={() => setShowPrompt(true)}
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 shadow-md flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}>
            Delete Event
          </motion.button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrompt(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete "{event.title}"?
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this event? This action cannot
                  be undone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 shadow-md flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}>
                  Yes, Delete
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventCardProfileOrg;
