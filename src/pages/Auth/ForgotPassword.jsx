import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { FiKey } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import Loading from "../../components/Shared/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isProcessing) return <Loading />

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    try {
      setIsProcessing(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset instructions sent successfully to your email.");
    }
    catch (err) { toast.error(err.message); }
    finally {setIsProcessing(false);}
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-3xl px-12 py-10 w-full max-w-[500px] relative">
        <span className="absolute top-6 left-6 text-(--primary-color) font-medium cursor-pointer hover:underline flex items-center gap-2" onClick={() => navigate(-1)}>
            <GoArrowLeft size={26}/>
                Go Back
        </span>

        <div className="flex flex-col items-center mt-6 mb-6">
          <div className="flex items-center justify-center p-6 rounded-full bg-(--primary-color)/20">
            <FiKey size={48} color="var(--primary-color)" />
          </div>
          <h2 className="text-3xl font-bold mt-3 text-center">Forgot Password?</h2>
          <p className="text-gray-600 text-sm mt-1 text-center">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-800">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              placeholder="yourname@example.com"
              required
              defaultValue={location.state ? location.state : ""}
            />
          </div>

          <button type="submit" className="primary-btn w-full">
            Request Reset
          </button>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;
