import React, { useState } from "react";
import Logo from "../assets/images/logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/12/e2/9b/12e29bf350f6d1604d32925ae31ffbf0.jpg')",
        }}
      />
      <div className="flex flex-1 flex-col items-center justify-center bg-black px-6 sm:px-12 py-16">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <img src={Logo} alt="Logo" className="h-7 self-center" />

          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-poppins font-medium text-2xl sm:text-3xl text-white">
              Create your account
            </h1>
            <p className="font-poppins font-light text-sm text-white/60">
              Sign up to track orders, save favourites, and check out faster.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="font-poppins text-xs text-white/60"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent border-b border-white/30 py-2 text-sm font-poppins text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors duration-300"
                placeholder="Jane Doe"
              />
            </div>

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

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-poppins text-xs text-white/60"
              >
                Confirm Password
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
              className="mt-2 bg-white text-black font-poppins font-medium text-sm py-3 cursor-pointer transition-all duration-300 ease-out hover:bg-white/85 hover:-translate-y-0.5"
            >
              Create account
            </button>
          </form>

          <p className="font-poppins font-light text-sm text-white/60 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-white underline underline-offset-2">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;