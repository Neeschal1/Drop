import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-black w-full h-screen items-center justify-center flex-col">
      <h1 className="font-poppins font-bold text-white/40 text-[100px]">
        Payment received :)
      </h1>
      <p className="font-poppins font-regular text-white/20">
       We've charged $99.98 USD and sent a copy of this receipt to test@example.com.
      </p>
      <button onClick={()=>{navigation.navigate("/")}} className="flex border border-white py-4 px-6 text-white mt-20 font-poppins font-medium cursor-pointer hover:bg-white hover:text-black duration-400 hover:font-regular">Take me to Home Screen</button>
    </div>
  );
};

export default SuccessPayment;
