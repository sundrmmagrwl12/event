import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
// motion.useAnimation();
const LoginSignup = ({ flag }) => {
  const [isLogin, setIsLogin] = useState(flag);
  const [step, setStep] = useState(1); // Step 1: Name & Email, Step 2: OTP, Step 3: Password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    console.log("Login function called");
    e.preventDefault();
    try {
      const username = e.target.username.value;
      const password = e.target.password.value;
      console.log(username, password);
      if (!username || !password) {
        setError("Please fill in all fields");
        return;
      }
      setIsLoading(true);
      const res = await axios.post("http://localhost:9000/api/user/login", {
        username,
        password,
      });
      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem("token", res.data.token); // Store token in local storage
        window.location.href = "/dashboard"; // Redirect to home page
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { name, email } = formData;
      await axios.post("http://localhost:9000/api/auth/otp", {
        username: name,
        email,
      });
      setStep(2); // Move to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { email, otp } = formData;
      await axios.post("http://localhost:9000/api/auth/verify", { email, otp });
      setStep(3); // Move to password creation step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { password, confirmPassword } = formData;
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await axios.post("http://localhost:9000/api/user/signup", {
        username: formData.name,
        email: formData.email,
        password,
      });
      alert("Signup successful! Redirecting to login...");
      setIsLogin(true); // Switch to login mode
      setStep(1); // Reset to initial step
      setFormData({
        name: "",
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to sign up"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { x: "-100%", opacity: 0, transition: { ease: "easeInOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4 py-12">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full px-10 py-12">
            <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
              {isLogin ? "Login to Event-Sync" : "Create Your Account"}
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {!isLogin && (
              <form
                className="space-y-5"
                onSubmit={
                  step === 1
                    ? handleGenerateOtp
                    : step === 2
                    ? handleVerifyOtp
                    : handleSignup
                }>
                {step === 1 && (
                  <>
                    <div className="relative">
                      <FaUser className="absolute top-4 left-3 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Username"
                        required
                        className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="relative">
                      <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}>
                      {isLoading ? "Generating OTP..." : "Generate OTP"}
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="relative">
                      <FaLock className="absolute top-4 left-3 text-gray-400" />
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        placeholder="Enter OTP"
                        required
                        className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}>
                      {isLoading ? "Verifying OTP..." : "Verify OTP"}
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="relative">
                      <FaLock className="absolute top-4 left-3 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create Password"
                        required
                        className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="relative">
                      <FaLock className="absolute top-4 left-3 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter Password"
                        required
                        className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}>
                      {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                  </>
                )}
              </form>
            )}

            {isLogin && (
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="relative">
                  <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username or Email"
                    className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name="username"
                    id="username"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name="password"
                    id="password"
                  />
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer">
                  Login
                </button>
              </form>
            )}

            <p className="text-center text-gray-600 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-indigo-700 font-bold hover:underline cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginSignup;
