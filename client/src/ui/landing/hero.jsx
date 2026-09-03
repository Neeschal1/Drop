import React, { useEffect, useState } from "react";
import Navbar from "../../constants/navbar";

const Hero = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/29244128/pexels-photo-29244128.jpeg",
    "https://images.pexels.com/photos/5319503/pexels-photo-5319503.jpeg",
    "https://images.pexels.com/photos/34121563/pexels-photo-34121563.jpeg",
    "https://images.pexels.com/photos/17347429/pexels-photo-17347429.jpeg",
    "https://images.pexels.com/photos/9476356/pexels-photo-9476356.jpeg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleInterval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(handleInterval);
  }, [backgroundImages.length]);

  return (
    <div className="items-center justify-center flex">
      <Navbar />
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}
    </div>
  );
};

export default Hero;
