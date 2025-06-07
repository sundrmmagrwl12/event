// const Otp = require("../../../model/otp.js");
import Otp from "../../../model/otp.js";
import bcrypt from "bcrypt";

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const otpExist = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (otpExist.length === 0) {
      return res.status(400).json({ message: "No OTP found for this email." });
    }
    if (otpExist[0].createdAt < Date.now() - 1000 * 60 * 10) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }
    const isMatch = await bcrypt.compare(otp.toString(), otpExist[0].otp.toString());
    console.log("Provided OTP:", otp.toString(), "Stored OTP:", otpExist[0].otp.toString());
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    return res.status(200).json({ message: "OTP verified successfully." });
    
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error. in verification"  , m : error.message });
  }
};

// module.exports = verifyOtpController;
export default verifyOtpController;
