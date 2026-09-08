import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useToast } from "../hooks/toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(`Welcome back, ${formData.email.split("@")[0]}!`, "success");
      navigate("/");
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-full font-poppins">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/12/e2/9b/12e29bf350f6d1604d32925ae31ffbf0.jpg')",
        }}
      />
      <div className="flex flex-1 flex-col items-center justify-center bg-black px-6 sm:px-12 py-16">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <Link to="/" className="self-center">
            <img
              src={Logo}
              alt="DROPP Logo"
              className="h-7 hover:scale-105 transition-transform"
            />
          </Link>

          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-poppins font-medium text-2xl sm:text-3xl text-white">
              Log In
            </h1>
            <p className="font-poppins font-light text-sm text-white/60">
              Login with your existing account in order to continue!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-poppins text-xs text-white/60"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b border-white/30 py-2 text-sm font-poppins text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors duration-300"
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-poppins text-xs text-white/60"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent border-b border-white/30 py-2 text-sm font-poppins text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors duration-300"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 bg-white text-black font-poppins font-medium text-sm py-3 cursor-pointer transition-all duration-300 ease-out hover:bg-white/85 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="font-poppins font-light text-sm text-white/60 text-center">
            New to Dropp?{" "}
            <Link
              to="/signup"
              className="text-white underline underline-offset-2"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
