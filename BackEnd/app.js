import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./src/config/db.js";
import userRouter from "./src/api/user/routes/userRoutes.js";
import authRouter from "./src/api/auth/routes/authRoutes.js";
import UserRouter from "./src/api/Users/routes/userRoutes.js";
import EventRouter from "./src/api/event/routes/eventRoutes.js";
import EmailRouter from "./src/api/email/routes/mailRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 9000;

connectDb();
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", UserRouter);
app.use("/api/events", EventRouter);
app.use("/api/email", EmailRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
