// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function LoginSignup() {
//   const [isSignUpMode, setIsSignUpMode] = useState(false);

//   const toggleMode = () => {
//     setIsSignUpMode(!isSignUpMode);
//   };

//   return (
//     <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 font-sans p-10">
//       <div
//         className={`relative w-full max-w-5xl h-[600px] md:h-[550px] overflow-hidden rounded-2xl shadow-2xl
//                     ${isSignUpMode ? "sign-up-mode" : ""}`}>
//         {/* Container */}
//         <div className="absolute top-0 left-0 w-full h-full">
//           {/* Forms Container */}
//           <div className="absolute top-0 left-0 w-full h-full flex">
//             {/* Sign In Form */}
//             <div
//               className={`w-full h-full transition-all duration-700 ease-in-out
//                         ${
//                           isSignUpMode
//                             ? "translate-x-0 opacity-0 z-0"
//                             : "translate-x-0 opacity-100 z-10"
//                         }`}>
//               <div className="w-full h-full flex flex-col justify-center items-center bg-white px-6 py-8 md:px-12 md:py-0">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-6 md:mb-10 mt-14 md:mt-0">
//                   Sign In
//                 </h2>

//                 <div className="w-full max-w-md">
//                   <Input icon="user" placeholder="Email" />
//                   <Input icon="lock" placeholder="Password" type="password" />

//                   <a
//                     href="#"
//                     className="text-sm text-gray-500 hover:text-amber-500 block mb-6">
//                     Forgot your password?
//                   </a>

//                   <div className="flex justify-center">
//                     <ActionButton text="Login" />
//                   </div>
//                 </div>

//                 <div className="mt-6 md:mt-8 w-full max-w-md">
//                   <p className="text-gray-600 mb-4 text-center">
//                     Or sign in with social platforms
//                   </p>
//                   <SocialIcons />
//                 </div>
//               </div>
//             </div>

//             {/* Sign Up Form */}
//             <div
//               className={`absolute w-full h-full transition-all duration-700 ease-in-out
//                         ${
//                           isSignUpMode
//                             ? "-translate-x-0 opacity-100 z-10"
//                             : "translate-x-0 opacity-0 z-0"
//                         }`}>
//               <div className="w-full h-full flex flex-col justify-center items-center bg-white p-10">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-6 md:mb-8 mt-14 md:mt-0">
//                   Create Account
//                 </h2>

//                 <div className="w-full max-w-md">
//                   <div className="grid grid-cols-1">
//                     <Input icon="user" placeholder="Name" />
//                     <Input icon="envelope" placeholder="Email" type="email" />
//                     <Input icon="lock" placeholder="Password" type="password" />
//                     <Input
//                       icon="lock"
//                       placeholder="Confirm Password"
//                       type="password"
//                     />
//                   </div>

//                   <div className="flex justify-center mt-6">
//                     <ActionButton text="Sign Up" />
//                   </div>
//                 </div>

//                 <div className="mt-6 md:mt-8 w-full max-w-md">
//                   <p className="text-gray-600 mb-4 text-center">
//                     Or sign up with social platforms
//                   </p>
//                   <SocialIcons />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Panels Container */}
//           <div className="absolute top-0 left-0 w-full h-full">
//             {/* Left Panel */}
//             <motion.div
//               className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-amber-400 to-amber-600
//                         flex flex-col justify-around items-center text-center p-10 text-white
//                         transition-all duration-1000 ease-in-out z-20 hidden md:flex
//                         ${
//                           isSignUpMode
//                             ? "translate-x-full rounded-l-none rounded-r-2xl"
//                             : "rounded-br-full rounded-l-2xl"
//                         }`}
//               animate={{
//                 translateX: isSignUpMode ? "100%" : "0%",
//               }}
//               transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
//               <div className="max-w-md">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{
//                     opacity: isSignUpMode ? 0 : 1,
//                     y: isSignUpMode ? 20 : 0,
//                   }}
//                   transition={{ duration: 0.5, delay: isSignUpMode ? 0 : 0.5 }}
//                   className="space-y-4">
//                   <h3 className="text-3xl font-bold">New here?</h3>
//                   <p className="text-lg">
//                     Sign up and discover a great amount of new opportunities!
//                   </p>
//                   <button
//                     className="mt-4 border-2 border-white text-white hover:bg-white hover:text-amber-500 font-semibold py-2 px-8 rounded-full transition duration-300"
//                     onClick={toggleMode}>
//                     Sign Up
//                   </button>
//                 </motion.div>
//               </div>
//               <motion.img
//                 src="../components/image1.png"
//                 alt="welcome illustration"
//                 className="w-64 h-64"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{
//                   opacity: isSignUpMode ? 0 : 1,
//                   y: isSignUpMode ? 20 : 0,
//                 }}
//                 transition={{ duration: 0.5, delay: isSignUpMode ? 0 : 0.7 }}
//               />
//             </motion.div>

//             {/* Right Panel */}
//             <motion.div
//               className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-amber-400 to-amber-600
//                         flex flex-col justify-around items-center text-center p-10 text-white
//                         transition-all duration-1000 ease-in-out z-20 hidden md:flex
//                         ${
//                           isSignUpMode
//                             ? "rounded-r-none rounded-bl-full"
//                             : "translate-x-full rounded-r-2xl rounded-l-full"
//                         }`}
//               animate={{
//                 translateX: isSignUpMode ? "0%" : "100%",
//               }}
//               transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
//               <div className="max-w-md">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{
//                     opacity: isSignUpMode ? 1 : 0,
//                     y: isSignUpMode ? 0 : 20,
//                   }}
//                   transition={{ duration: 0.5, delay: isSignUpMode ? 0.5 : 0 }}
//                   className="space-y-4">
//                   <h3 className="text-3xl font-bold">One of us?</h3>
//                   <p className="text-lg">
//                     To keep connected with us please login with your personal
//                     info
//                   </p>
//                   <button
//                     className="mt-4 border-2 border-white text-white hover:bg-white hover:text-amber-500 font-semibold py-2 px-8 rounded-full transition duration-300"
//                     onClick={toggleMode}>
//                     Sign In
//                   </button>
//                 </motion.div>
//               </div>
//               <motion.img
//                 src="../components/image2.png"
//                 alt="login illustration"
//                 className="w-64 h-64"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{
//                   opacity: isSignUpMode ? 1 : 0,
//                   y: isSignUpMode ? 0 : 20,
//                 }}
//                 transition={{ duration: 0.5, delay: isSignUpMode ? 0.7 : 0 }}
//               />
//             </motion.div>

//             {/* Mobile Header - Only visible on mobile */}
//             <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-amber-400 to-amber-600 p-4 flex flex-col items-center justify-center rounded-t-2xl h-14 md:hidden z-20">
//               <h3 className="text-xl font-bold text-white">
//                 {isSignUpMode ? "Create Account" : "Welcome Back"}
//               </h3>
//             </div>

//             {/* Mobile Toggle Button - Only visible on mobile */}
//             <div className="absolute bottom-6 left-0 w-full flex justify-center md:hidden z-20">
//               <button
//                 className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
//                 onClick={toggleMode}>
//                 {isSignUpMode ? "Sign In" : "Sign Up"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Input({ icon, placeholder, type = "text", className = "" }) {
//   return (
//     <div className={`w-full mb-4 ${className}`}>
//       <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
//         <i className={`fas fa-${icon} text-gray-400 mr-3`}></i>
//         <input
//           type={type}
//           placeholder={placeholder}
//           className="bg-transparent outline-none border-none flex-1 text-gray-700"
//         />
//       </div>
//     </div>
//   );
// }

// function ActionButton({ text, className = "" }) {
//   return (
//     <button
//       className={`bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 px-12 rounded-full shadow-md transition duration-300 ${className}`}>
//       {text}
//     </button>
//   );
// }

// function SocialIcons() {
//   const platforms = ["facebook-f", "twitter", "google", "linkedin-in"];
//   return (
//     <div className="flex justify-center space-x-4">
//       {platforms.map((p) => (
//         <a
//           key={p}
//           href="#"
//           className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:text-amber-500 hover:border-amber-500 transition duration-300">
//           <i className={`fab fa-${p}`}></i>
//         </a>
//       ))}
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginSignup = ({ flag }) => {
  const [isLogin, setIsLogin] = useState(flag);

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
              {isLogin ? "Login to Evently" : "Create Your Account"}
            </h2>
            <form className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="pl-10 w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-indigo-700 font-bold hover:underline"
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
