"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import ParticleBackground from "@/app/components/ParticleBackground";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const { fullname, email, password } = formData;
    if (!fullname || !password || (!isLogin && !email)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Simulate authentication success
      const userData = {
        id: Date.now().toString(),
        name: fullname,
        email: email || `${fullname.toLowerCase().replace(/\s+/g, '')}@example.com`,
        joinedAt: new Date().toISOString()
      };

      login(userData);
      setLoading(false);

      // Show success notification
      const notification = document.createElement('div');
      notification.textContent = isLogin ? 'Welcome back!' : 'Account created successfully!';
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 2000);

      // Redirect to scanner or dashboard
      router.push('/scanner');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 relative overflow-hidden cursor-crosshair">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-5xl min-h-[500px] md:h-[580px] overflow-hidden rounded-2xl bg-[#1a1a1a] border border-purple-900/40 shadow-xl flex flex-col md:flex-row"
      >
        {/* Welcome Panel */}
        <div className="hidden md:flex absolute top-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-700/40 to-indigo-700/40 text-white p-6 lg:p-12 z-20 flex-col justify-center items-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-3">
              {isLogin ? "Welcome Back" : "Join the Revolution"}
            </h2>
            <p className="text-gray-200 text-sm max-w-sm leading-relaxed">
              {isLogin
                ? "Log in to access your AI-powered threat control panel."
                : "Sign up to enter a smarter, more secure world."}
            </p>
          </div>
        </div>

        {/* Mobile Welcome Section */}
        <div className="md:hidden w-full bg-gradient-to-r from-purple-700/30 to-indigo-700/30 p-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Join MamaSecure"}
          </h2>
          <p className="text-gray-200 text-sm">
            {isLogin
              ? "Log in to access your AI-powered scam detection."
              : "Sign up to stay protected from scams."}
          </p>
        </div>

        {/* Form Panel */}
        <div className="relative md:absolute top-0 right-0 w-full md:w-1/2 md:h-full p-4 sm:p-6 md:p-10 z-10 flex items-center justify-center bg-[#0f0f0f] flex-1">
          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-5 ${shake ? "animate-shake" : ""}`}
          >
              <h2 className="text-white text-2xl sm:text-3xl font-semibold">
                {isLogin ? "Login" : "Get Started"}
              </h2>

              {/* Username */}
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-purple-400" />
                <input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              {/* Email */}
              {!isLogin && (
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-purple-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              )}

              {/* Password + Eye Toggle */}
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-purple-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-purple-300 hover:text-purple-100 cursor-pointer focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Button with Spinner */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-bold transition flex items-center justify-center ${
                  loading
                    ? "bg-purple-900 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-600"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    {isLogin ? "Logging in..." : "Creating..."}
                  </>
                ) : isLogin ? (
                  "Log In Securely"
                ) : (
                  "Create Secure Account"
                )}
              </button>

              <p className="text-sm text-gray-400 text-center">
                {isLogin ? "New here?" : "Already a user?"}{" "}
                <button
                  onClick={toggleMode}
                  type="button"
                  className="text-purple-400 underline hover:text-purple-200"
                >
                  {isLogin ? "Create account" : "Log in"}
                </button>
              </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
