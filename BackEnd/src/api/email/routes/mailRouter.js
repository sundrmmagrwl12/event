import { authenticate } from "../../Users/middlewares/authMiddleware.js";

import express from "express";
import mailController from "../controllers/mailController.js";

const EmailRouter = express.Router();

// Define routes for email-related operations
EmailRouter.post("/send", authenticate, mailController);

// module.exports = EmailRouter;
export default EmailRouter;