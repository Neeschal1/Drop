import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-black w-full min-h-screen items-center justify-center flex-col px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-4xl mb-6">
        ✓
      </div>
      <h1 className="font-poppins font-bold text-white text-4xl sm:text-6xl mb-4">
        Payment Received :)
      </h1>
      <p className="font-poppins font-light text-white/60 max-w-md">
        Your payment was processed successfully. A confirmation receipt has been
        dispatched to your email address.
      </p>
      <button
        onClick={() => navigate("/")}
        className="border border-white py-3.5 px-8 text-white mt-10 font-poppins font-medium cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
      >
        Take me to Home Screen
      </button>
    </div>
  );
};

export default SuccessPayment;
