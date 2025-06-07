import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/TempLandingPage";
import DashBoard from "../pages/Dashboard";
import EventForm from "../pages/EventForm";
import EventCard from "../components/EventCard";
import LoginSignup from "../components/LoginSignup";
import EventInfo from "../pages/EventInfo";
import Profile from "../pages/Profile";
import "./App.css";
import MailForm from "../components/MailForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/card" element={<EventCard />} />
        {/* <Route path="/eventinfo" element={<EventInfo />} /> */}
        <Route path="/eventinfo/:eventId" element={<EventInfo />} />
        <Route path="/login" element={<LoginSignup flag={true} />} />
        <Route path="/signup" element={<LoginSignup flag={false} />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard/events" element={<EventForm />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/email/:eventId" element={<MailForm />} />
        
         
      </Routes>
    </div>
  );
}

export default App;
