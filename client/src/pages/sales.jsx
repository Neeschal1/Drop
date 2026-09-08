import React, { useState, useEffect } from "react";
import Navbar from "../constants/navbar";
import Footer from "../constants/footer";
import { CollectionGrid } from "../ui/collection/collectionLayout";
import { Data } from "../utils/clothesProductsData";

const Sales = () => {
  // Combine popular items from both genders for the sale
  const saleProducts = [
    Data[0].women[0],
    Data[0].men[0],
    Data[0].women[2],
    Data[0].men[3],
    Data[0].women[4],
    Data[0].men[5],
    Data[0].women[6],
    Data[0].men[7],
    Data[0].women[9],
    Data[0].men[9],
    Data[0].women[11],
    Data[0].men[11],
  ];

  // Simulated countdown timer for sale urgency
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-poppins">
      <Navbar bgstate={true} />

      <main className="flex-1 w-full pt-20 sm:pt-24">
        {/* Urgent Promotional Announcement Bar */}
        <div className="w-full bg-red-600 text-white py-3 px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <span>🔥 MID-SEASON ARCHIVE SALE: UP TO 30% OFF</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span>Ends in:</span>
              <span className="bg-black/30 px-2 py-0.5 rounded-xs">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-0.5 rounded-xs">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-0.5 rounded-xs">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="bg-white text-red-600 px-2.5 py-0.5 text-xs rounded-full font-bold uppercase">
              CODE: DROP10
            </span>
          </div>
        </div>

        <CollectionGrid
          products={saleProducts}
          title="Seasonal Sale Drops"
          subtitle="Limited-run archival staples and seasonal favorites at exclusive marked-down prices."
          isSalePage={true}
          availableCategories={["All", "Tops", "Bottoms", "Outerwear"]}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Sales;
