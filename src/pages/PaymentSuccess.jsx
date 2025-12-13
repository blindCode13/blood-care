import axios from "axios";
import React, { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const PaymentSuccess = () => {
  const {user} = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId && user) {
      axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/payment-success`,
        { sessionId, userInfo: {name: user.displayName, email: user.email} }
      );
    }
  }, [sessionId, user]);

  if (!sessionId) return <Navigate to={"/"} replace={true}></Navigate>

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-lg text-center border border-gray-100">
        
        <IoBagCheckOutline className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your contribution. Your payment has been processed successfully.
        </p>

        <Link
          to="/"
          className="primary-btn inline-block px-8 py-3 text-white rounded-xl"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;
