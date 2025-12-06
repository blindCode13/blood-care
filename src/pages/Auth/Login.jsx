import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-3xl px-12 py-10 w-full max-w-[500px] relative">
        <span className="absolute top-6 left-6 text-(--primary-color) font-medium cursor-pointer hover:underline flex items-center gap-2" onClick={() => navigate(-1)}>
            <GoArrowLeft size={26}/>
                Go Back
        </span>
        <h2 className="text-3xl font-bold mt-6 mb-6 text-center">Login</h2>

        <form className="space-y-6">

          <div>
            <label className="block mb-1 font-medium text-gray-800">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              placeholder="yourname@example.com"
            />
          </div>

          {/* Password with eye toggle */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-800">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 pr-12 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              placeholder="Enter your password"
            />

            <span
              className="absolute right-4 top-12 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff size={22} color="var(--primary-color)" />
              ) : (
                <FiEye size={22} color="var(--primary-color)" />
              )}
            </span>
          </div>

          <div>
            <span className="text-(--primary-color) text-sm font-medium cursor-pointer hover:underline">
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>
          </div>

          <button type="submit" className="primary-btn w-full">
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?
            <span className="text-(--primary-color) text-sm font-medium cursor-pointer hover:underline ml-1">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;