import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getAttendedEvents, getOrganizerEvents, getUserById, getUserProfile, updateUserProfile } from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, getUserProfile);
UserRouter.put("/profile", authenticate, updateUserProfile);
UserRouter.get("/organizer/events", authenticate, getOrganizerEvents);
UserRouter.get("/attended/events", authenticate, getAttendedEvents);
UserRouter.get("/:id", authenticate, getUserById); // Get user by ID


export default UserRouter;