import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavDash from "../components/NavDash";

const EventInfo = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://event-sync-x47b.onrender.com/api/events/${eventId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setEventDetails(data.event[0]);
        console.log(eventDetails);
        const organizerResponse = await fetch(
          `https://event-sync-x47b.onrender.com/api/users/${data.event[0].organizerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const organizerData = await organizerResponse.json();
        console.log(organizerData);
        console.log(eventDetails);
        setEventDetails((prevDetails) => ({
          ...prevDetails,
          organizer: organizerData.data.username,
        }));
        setIsLoading(false);

        // Trigger animation after data is loaded
        setTimeout(() => {
          setAnimateIn(true);
        }, 100);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);
  // console.log(eventDetails);

  const handleApplyNow = () => {
    alert("Application submitted!"); // Replace with actual application logic
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <p className="error-message">Event not found or error loading details.</p>
    );
  }

  return (
    <>
      <NavDash />
            <div className={`event-container ${animateIn ? "animate-in" : ""}`}>
        {/* Banner Section */}
        <div
          className="event-banner"
          style={{
            backgroundImage: `url(${
              eventDetails.banner || "/default-banner.jpg"
            })`,
          }}>
          <div className="banner-overlay"></div>
          <h1 className="banner-title">{eventDetails.title}</h1>
        </div>

        {/* Event Details Section */}
        <div className="event-card">
          <div className="event-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">
                {new Date(eventDetails.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span className="meta-text">{eventDetails.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🕒</span>
              <span className="meta-text">{eventDetails.time || "TBD"}</span>
            </div>
          </div>

          <div className="event-description">
            <h2 className="section-title">About the Event</h2>
            <p>{eventDetails.description}</p>
          </div>

          <div className="event-details">
            <h2 className="section-title">Details</h2>
            <ul>
              <li className="detail-item">
                <strong>Organizer:</strong>{" "}
                {eventDetails.organizer || "Not specified"}
              </li>
              <li className="detail-item">
                <strong>Category:</strong> {eventDetails.category || "General"}
              </li>
            </ul>
          </div>

          <div className="button-container">
            <button
              className="button announcement-btn"
              onClick={() =>
                alert(eventDetails.announcements || "No announcements yet.")
              }>
              <span className="btn-icon">📢</span>
              <span className="btn-text">Announcements</span>
            </button>

            <button
              className="button discussion-btn"
              onClick={() =>
                window.open(eventDetails.discussionGroupLink || "#", "_blank")
              }>
              <span className="btn-icon">💬</span>
              <span className="btn-text">Discussion Group</span>
            </button>

            <button className="button apply-btn" onClick={handleApplyNow}>
              <span className="btn-icon">✓</span>
              <span className="btn-text">Apply Now</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border-left-color: #3498db;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .error-message {
          text-align: center;
          color: #e74c3c;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1.2rem;
          margin-top: 2rem;
          padding: 1rem;
          background-color: #fef2f2;
          border-radius: 8px;
          max-width: 600px;
          margin: 2rem auto;
        }

        /* Main Container */
        .event-container {
          max-width: 1000px;
          margin: 0 auto 3rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Banner Section */
        .event-banner {
          margin-top: 1rem;
          height: 350px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          animation: banner-reveal 1.2s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        @keyframes banner-reveal {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
          z-index: 1;
        }

        .banner-title {
          position: relative;
          z-index: 2;
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
          text-align: center;
          padding: 0 1rem;
          animation: title-reveal 1s ease forwards;
          animation-delay: 0.8s;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes title-reveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Event Card */
        .event-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          position: relative;
          animation: card-reveal 0.8s ease forwards;
          animation-delay: 0.5s;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes card-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Section Titles */
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .section-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #3498db, #2ecc71);
          transition: width 0.4s ease;
        }

        .section-title:hover::after {
          width: 120px;
        }

        /* Event Meta */
        .event-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eaeaea;
          animation: fade-in 0.8s ease forwards;
          animation-delay: 0.9s;
          opacity: 0;
        }

        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }

        .meta-item {
          display: flex;
          align-items: center;
          font-size: 1.1rem;
          color: #7f8c8d;
          transition: transform 0.3s ease;
        }

        .meta-item:hover {
          transform: translateY(-3px);
        }

        .meta-icon {
          font-size: 1.5rem;
          margin-right: 0.7rem;
        }

        /* Event Description */
        .event-description {
          margin-bottom: 2.5rem;
          animation: fade-in 0.8s ease forwards;
          animation-delay: 1.1s;
          opacity: 0;
        }

        .event-description p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #34495e;
          padding: 1rem;
          background-color: #f9fafb;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        /* Event Details */
        .event-details {
          margin-bottom: 2.5rem;
          animation: fade-in 0.8s ease forwards;
          animation-delay: 1.3s;
          opacity: 0;
        }

        .event-details ul {
          list-style: none;
          padding: 1rem;
          background-color: #f9fafb;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .detail-item {
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
          color: #34495e;
          transition: transform 0.2s ease;
          padding: 0.5rem 0;
          border-bottom: 1px dashed #e0e0e0;
        }

        .detail-item:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        .detail-item:hover {
          transform: translateX(5px);
        }

        .detail-item strong {
          color: #2c3e50;
          font-weight: 600;
          display: inline-block;
          width: 100px;
        }

        /* Buttons */
        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          animation: fade-in 0.8s ease forwards;
          animation-delay: 1.5s;
          opacity: 0;
        }

        .button {
          flex: 1;
          min-width: 160px;
          padding: 1rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1)
          );
          transition: all 0.6s ease;
        }

        .button:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .button:hover::before {
          left: 100%;
        }

        .button:active {
          transform: scale(0.97);
        }

        .announcement-btn {
          background-color: #3498db;
          color: #fff;
        }

        .announcement-btn:hover {
          background-color: #2980b9;
        }

        .discussion-btn {
          background-color: #9b59b6;
          color: #fff;
        }

        .discussion-btn:hover {
          background-color: #8e44ad;
        }

        .apply-btn {
          background-color: #2ecc71;
          color: #fff;
        }

        .apply-btn:hover {
          background-color: #27ae60;
        }

        .btn-icon {
          font-size: 1.3rem;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .event-container {
            padding: 0 1rem;
          }

          .event-banner {
            height: 250px;
          }

          .banner-title {
            font-size: 2.5rem;
          }

          .event-card {
            padding: 1.5rem;
          }

          .meta-item {
            width: 100%;
          }

          .button-container {
            flex-direction: column;
          }

          .button {
            width: 100%;
          }

          .section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default EventInfo;
