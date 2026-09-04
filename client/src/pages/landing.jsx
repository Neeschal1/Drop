import React from "react";
import Hero from "../ui/landing/hero";
import Welcome from "../ui/landing/welcome";

const Landing = () => {
  return (
    <div className="flex items-center flex-col justify-center w-full h-full">
      <Hero />
      <Welcome />
    </div>
  );
};

export default Landing;
