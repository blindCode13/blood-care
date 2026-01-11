import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../components/Shared/Loading";
import { saveOrUpdateUser } from "../../utils/utils";
import { useApplyTheme } from "../../hooks/useApplyTheme";

const Login = () => {
  const {user, loading, setLoading, logIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state || "/";
  useApplyTheme();

  if (loading) return <div className='min-h-screen flex items-center'><Loading /></div>
  if (user) return <Navigate to={from} replace={true} />

  const formSubmit = async(data) => {
    const {email, password} = data;

    try {
      await logIn(email, password);
      toast.success("Successfully logged in");
      await saveOrUpdateUser({email});
    }
    catch (err) {
      toast.error(err.message);
    }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-primary-bg shadow-lg rounded-3xl px-12 py-10 w-full max-w-[500px] relative">
        <span className="absolute top-6 left-6 text-primary font-medium cursor-pointer hover:underline flex items-center gap-2" onClick={() => {
          location.state ? navigate(-3) : navigate(-1)
        }}>
            <GoArrowLeft size={26}/>
                Go Back
        </span>
        <h2 className="text-3xl font-bold mt-6 mb-6 text-center">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>

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

          <div className="relative">
            <label className="block mb-1 font-mediu">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-400/50 rounded-xl px-5 py-3 pr-12 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter your password"
              name="password"
              required
              {...register('password', {
                validate: (value) => {
                  if (value.length < 6) return "Password must be at least 6 characters long";
                }
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

          <div>
            <span className="text-primary text-sm font-medium cursor-pointer hover:underline">
              <Link to="/forgot-password" state={watch('email')}>Forgot Password?</Link>
            </span>
          </div>

          <button type="submit" className="primary-btn w-full">
            Login
          </button>

          <p className="text-center text-sm">
            Don’t have an account?
            <span className="text-primary text-sm font-medium cursor-pointer hover:underline ml-1">
              <Link to="/register">Register</Link>
            </span>
          </p>
          <span className="flex items-center justify-center gap-4">
            <p className="text-primary text-sm font-medium cursor-pointer hover:underline" 
            onClick={() => {
              setValue("email", import.meta.env.VITE_DEMO_ADMIN_EMAIL, { shouldValidate: true });
              setValue("password", import.meta.env.VITE_DEMO_ADMIN_PASS, { shouldValidate: true });
              }}>
              Demo Admin</p>

            <p className="text-primary text-sm font-medium cursor-pointer hover:underline"
            onClick={() => {
              setValue("email", import.meta.env.VITE_DEMO_USER_EMAIL, { shouldValidate: true });
              setValue("password", import.meta.env.VITE_DEMO_USER_PASS, { shouldValidate: true });
              }}>
              Demo User</p>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;