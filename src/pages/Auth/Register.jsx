import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";

const Register = () => {
  const navigate = useNavigate();
  const [avatarName, setAvatarName] = useState("No file chosen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-lg rounded-3xl px-12 py-10 w-full max-w-[700px] relative">
        <span className="absolute top-6 left-6 text-(--primary-color) font-medium cursor-pointer hover:underline flex items-center gap-2" onClick={() => navigate(-1)}>
            <GoArrowLeft size={26}/>
            Go Back
        </span>
        <h2 className="text-3xl font-bold mt-6 mb-8 text-center">Create an Account</h2>

        <form className="space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-800">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                placeholder="yourname@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-800">Upload Avatar</label>

              <div
                className="w-full border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer bg-white"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                <span className="text-gray-700 text-sm">{avatarName}</span>

                <span
                  className="px-3 py-1 rounded-lg text-sm text-white"
                  style={{
                    backgroundColor:
                      avatarName === "No file chosen"
                        ? "var(--primary-color)"
                        : "green",
                  }}
                >
                  {avatarName === "No file chosen" ? "Choose" : "Selected"}
                </span>
              </div>

              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setAvatarName(e.target.files[0]?.name || "No file chosen")
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Blood Group</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-800">Upazila</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              >
                <option>Option One</option>
                <option>Option Two</option>
                <option>Option Three</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">District</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              >
                <option>Option One</option>
                <option>Option Two</option>
                <option>Option Three</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-800">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 pr-12 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              placeholder="Enter password"
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

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-800">Confirm Password</label>

            <input
              type={showConfirm ? "text" : "password"}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 pr-12 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              placeholder="Confirm password"
            />

            <span
              className="absolute right-4 top-12 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <FiEyeOff size={22} color="var(--primary-color)" />
              ) : (
                <FiEye size={22} color="var(--primary-color)" />
              )}
            </span>
          </div>

          <button type="submit" className="primary-btn w-full">
            Register
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?
            <span className="text-(--primary-color) text-sm font-medium cursor-pointer hover:underline ml-1">
              <Link to="/login">Login</Link>
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;