import jwt from "jsonwebtoken";
import User from "../../../model/userModel.js";


export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

import Event from "../../../model/eventModel.js";


const getUserById = async (id) => {
  return await User.findById(id).select("-password"); // Exclude password
};

const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true }).select("-password");
};

const getEventsByOrganizer = async (organizerId) => {
  return await Event.find({ organizerId });
};

const getEventsByAttendee = async (attendeeId) => {
  return await Event.find({ attendees: attendeeId });
};

export default {
  getUserById,
  updateUser,
  getEventsByOrganizer,
  getEventsByAttendee,
};