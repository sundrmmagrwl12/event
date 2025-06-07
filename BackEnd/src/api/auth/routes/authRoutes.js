import express from 'express';
import sendOtpController from '../controllers/sendOtpController.js';
import verifyOtpController from '../controllers/verifyOtpController.js';



const authRouter = express.Router();

authRouter.post('/otp',sendOtpController);
authRouter.post('/verify',verifyOtpController);



export default authRouter;