import React, { useEffect, useState } from "react";
import Navbar from "../../constants/navbar";
import { HeroHeading, Description, PrimaryButton } from "../../components/componentsLayout";

const Hero = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/29244128/pexels-photo-29244128.jpeg",
    "https://images.pexels.com/photos/5319503/pexels-photo-5319503.jpeg",
    "https://images.pexels.com/photos/34121563/pexels-photo-34121563.jpeg",
    "https://images.pexels.com/photos/17347429/pexels-photo-17347429.jpeg",
    "https://images.pexels.com/photos/9476356/pexels-photo-9476356.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleInterval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(handleInterval);
  }, [backgroundImages.length]);

  return (
    <div className="items-center justify-center flex w-full">
      <div className="flex w-full" style={{ display: "flex", zIndex: 10 }}>
        <Navbar />
      </div>
      <div>
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            aria-hidden="true"
            className={`flex flex-col gap-large absolute inset-0 items-center justify-center bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="flex items-center justify-center flex-col">
              <HeroHeading headingName="Stay the night" />
              <Description descriptionTexts="JUST DROPPED: FALL / WINTER 2026" />
            </div>
            <div className="flex flex-row gap-mid">
                <PrimaryButton buttonName="Shop Women's" />
                <PrimaryButton buttonName="Shop Men's" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
