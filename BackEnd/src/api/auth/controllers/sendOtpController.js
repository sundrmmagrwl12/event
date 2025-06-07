import bcrypt from "bcrypt";

import { sendOtpEmail } from "../../../utils/email-Helper.js";
import Otp from "../../../model/otp.js";
import User from "../../../model/userModel.js";

const sendOtpController = async (req, res) => {
  try {
    console.log("sendOtpController called");

    const { email, username } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const otpExist = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (
      otpExist.length > 0 &&
      otpExist[0].createdAt > Date.now() - 1000 * 60 * 10
    ) {
      return res.status(200).send({
        status: "fail",
        message: `otp already sent minutes ${Math.ceil(
          (-1 * (otpExist[0].createdAt - Date.now())) / 1000 / 60
        )} ago next otp can be sent after 10 minutes`,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendOtpEmail({ otp, email });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(otp + "", salt);
    Otp.create({ email, otp: hash });

    res.status(201).send({
      status: "success",
      message: "otp send successfully",
    });
  } catch (err) {
    console.log("---------------");
    console.log("Error in sendOtpController", err.message);
    console.log("---------------");

    res.status(500);
    res.json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

export default sendOtpController;
