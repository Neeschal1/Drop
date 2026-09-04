import React from "react";
import { Heading, SubHeading } from "../../components/componentsLayout";

const Welcome = () => {
  return (
    <div className="flex flex-col py-10">
      <div className="flex flex-col gap-extrasmall items-center justify-center">
        <Heading headingName="Welcome to the world of DROPP" />
        <div className="flex flex-row gap-mid">
          <a className="underline font-poppins font-light text-[40px] cursor-pointer hover:text-blue-300 duration-300">
            Read our Story
          </a>
          <SubHeading headingName="and" />
          <a className="underline font-poppins font-light text-[40px] cursor-pointer hover:text-blue-300 duration-300">
            Meet the Makers
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
