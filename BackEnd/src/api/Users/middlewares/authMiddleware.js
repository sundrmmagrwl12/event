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