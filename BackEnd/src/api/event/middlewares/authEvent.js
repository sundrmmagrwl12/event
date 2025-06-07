import jwt from "jsonwebtoken";

const authEvent = (req, res, next) => {

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token || token === "null" || token === "undefined") {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
    // throw new Error("Invalid token");
  }
};

export default authEvent;
