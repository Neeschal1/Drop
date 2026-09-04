import React from 'react'
import MenArrivals from "../../assets/images/menArrivals.jpg"
import WomenArrivals from "../../assets/images/womenArrivals.jpg"
import { Description } from '../../components/componentsLayout';

const Arrivals = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <button className="relative group overflow-hidden cursor-pointer duration-300">
        <img
          src={MenArrivals}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Description descriptionTexts="Men's New Arrival" />
        </div>
      </button>
      <button className="relative group overflow-hidden cursor-pointer duration-300">
        <img
          src={WomenArrivals}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Description descriptionTexts="Women's New Arrival" />
        </div>
      </button>
    </div>
  );
};

export default Arrivals;

