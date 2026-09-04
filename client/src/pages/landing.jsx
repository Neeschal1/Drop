import React from "react";
import Hero from "../ui/landing/hero";
import Welcome from "../ui/landing/welcome";
import Arrivals from "../ui/landing/arrivals";
import Products from "../ui/landing/products";

const Landing = () => {
  return (
    <div className="flex items-center flex-col justify-center w-full h-full">
      <Hero />
      <Welcome />
      <Arrivals />
      <Products />
    </div>
  );
};

export default Landing;
