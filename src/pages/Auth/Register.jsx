import React, { useState } from "react";
import { Link, Navigate, useLoaderData, useLocation, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../../utils/utils";
import Loading from "../../components/Shared/Loading";
import { useApplyTheme } from "../../hooks/useApplyTheme";


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const {user, loading, createUser, updateUserProfile} = useAuth();
  const [avatarName, setAvatarName] = useState("No file chosen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [triggerError, setTriggerError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  useApplyTheme();

  const data = useLoaderData().sort((a, b) => a.district.localeCompare(b.district));

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const { register, handleSubmit, watch, formState: { errors }, } = useForm();

  if (loading || isProcessing) return <div className='min-h-screen flex items-center'><Loading /></div>
  if (user) return <Navigate to={from} replace={true} />


  const formSubmit = async(data) => {
    const image = document.getElementById('avatarInput');
    if (!selectedDistrict || !selectedUpazila) setTriggerError(true);
    if (selectedDistrict && selectedUpazila) {
      setTriggerError(false);
      const {name, email, bloodGroup, password} = data;

      const userData = {
        name,
        email,
        bloodGroup,
        district: selectedDistrict,
        upazila: selectedUpazila
      };

      try {
        setIsProcessing(true);
        let imageURL = "";
        const file = image.files?.[0];
        
        if (file) {
          imageURL = await imageUpload(file);
        }
        await createUser(email, password);
        await updateUserProfile(name, imageURL);
        
        userData.avatar = imageURL;
        await saveOrUpdateUser(userData);

        toast.success("Your account has been registered.");
      }
      catch (err) {toast.error(err.message);}
      finally {setIsProcessing(false);}
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-primary-bg shadow-lg rounded-3xl px-12 py-10 w-full max-w-[700px] relative">

        <span
          className="absolute top-6 left-6 text-primary font-medium cursor-pointer hover:underline flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <GoArrowLeft size={26} />
          Go Back
        </span>

        <h2 className="text-3xl font-bold mt-6 mb-8 text-center">Create an Account</h2>

        <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-400/50 rounded-xl px-5 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Enter your name"
                required
                {...register('name')}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-400/50 rounded-xl px-5 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="yourname@example.com"
                required
                {...register('email')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Upload Avatar</label>

              <div
                className="w-full border border-gray-400/50 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer bg-primary-bg"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                <span className="text-sm line-clamp-1">{avatarName}</span>

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
              <label className="block mb-1 font-medium">Blood Group</label>
              <select
                className="w-full border border-gray-400/50 rounded-xl px-5 py-3 bg-primary-bg outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                {...register('bloodGroup')}
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
              <CustomDropdown
                label="District"
                options={data.map((d) => d.district)}
                selected={selectedDistrict}
                onSelect={(value) => {
                  setSelectedDistrict(value);
                  setSelectedUpazila("");
              }}
            />
            {
              triggerError && !selectedDistrict && <h1 className="text-red-600 mt-1 ml-1">Please select district</h1>
            }
            </div>

            <div>
              <CustomDropdown
              label="Upazila"
              options={
                selectedDistrict
                  ? data.find((d) => d.district === selectedDistrict)?.upazilas || []
                  : []
              }
              selected={selectedUpazila}
              onSelect={setSelectedUpazila}
            />
            {
              triggerError && !selectedUpazila && <h1 className="text-red-600 mt-1 ml-1">Please select upazila</h1>
            }
            </div>
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-400/50 rounded-xl px-5 py-3 pr-12 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter password"
              required
              {...register('password',{
                validate: (value) => {
                  if (value.length < 6) return "Must be at least 6 characters long";
                  if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter (A–Z)";
                  if (!/[a-z]/.test(value)) return "Must contain a lowercase letter (a–z)";
                  if (!/[0-9]/.test(value)) return "Must contain a number (0–9)";
                  if (!/[^A-Za-z0-9]/.test(value)) return "Must contain a special character";
                  return true;
                },
              })}
            />
            {
              errors.password && <h1 className="text-red-600 mt-1 ml-1">{errors.password.message}</h1>
            }

            <span
              className="absolute right-4 top-13 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff size={22} color="var(--primary-color)" />
              ) : (
                <FiEye size={22} color="var(--primary-color)" />
              )}
            </span>
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium">Confirm Password</label>

            <input
              type={showConfirm ? "text" : "password"}
              className="w-full border border-gray-400/50 rounded-xl px-5 py-3 pr-12 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Confirm password"
              required
              {...register('confirmPass', {
                validate: (value) => {
                  return value === watch('password') || 'Password is not matched'
                }
              })}
            />
            {
              errors.confirmPass && <h1 className="text-red-600 mt-1 ml-1">{errors.confirmPass.message}</h1>
            }

            <span
              className="absolute right-4 top-13 transform -translate-y-1/2 cursor-pointer"
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

          <p className="text-center text-sm">
            Already have an account?
            <span className="text-primary text-sm font-medium cursor-pointer hover:underline ml-1">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};


const CustomDropdown = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>

      <div
        className="w-full border border-gray-400/50 rounded-xl px-5 py-3 bg-primary-bg outline-none cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected || "Select an option"}
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 max-h-44 overflow-y-auto bg-primary-bg border border-gray-400/50 rounded-xl shadow-lg z-20">
          {options.length > 0 ? (
            options.map((item) => (
              <div
                key={item}
                className="px-5 py-2 hover:bg-primary-text/8 cursor-pointer"
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-5 py-2">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;