import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddToCartButton,
  PrimaryBlackButton,
} from "../../components/componentsLayout";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedImage, setSelectedImage] = useState(product?.image1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    console.log("Data: ", product);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-6 px-4">
        <Navbar bgstate={true} />
        <p className="font-poppins text-black text-center">
          We couldn't find that product.
        </p>
        <button
          onClick={() => navigate("/")}
          className="font-poppins text-sm underline underline-offset-2 text-black cursor-pointer"
        >
          Back to shop
        </button>
      </div>
    );
  }

  const {
    itemName,
    description,
    image1,
    image2,
    price,
    ratings,
    availableSizes,
  } = product;

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 px-4 sm:px-6 lg:px-mid pt-24 sm:pt-28 lg:pt-32 pb-10 lg:pb-16">
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full h-150 overflow-hidden bg-black/5">
          <img
            src={selectedImage}
            alt={itemName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3">
          {[image1, image2].map((img, index) => (
            <button
              key={img}
              onClick={() => setSelectedImage(img)}
              className={`w-16 sm:w-20 aspect-3/4 overflow-hidden border transition-colors duration-300 cursor-pointer ${
                selectedImage === img ? "border-black" : "border-black/20"
              }`}
            >
              <img
                src={img}
                alt={`${itemName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6 lg:w-10/12">
        <div className="flex flex-col gap-2">
          <h1 className="font-poppins font-medium text-2xl sm:text-3xl text-black">
            {itemName}
          </h1>
          <div className="flex items-center gap-3">
            <span className="font-poppins font-medium text-lg text-black">
              {price}
            </span>
            <span className="font-poppins text-sm text-black/60">
              ★ {ratings}
            </span>
          </div>
        </div>

        <p className="font-poppins font-light text-sm sm:text-base text-black/70 leading-relaxed ">
          {description}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-poppins text-sm text-black">Size</span>
            {sizeError && (
              <span className="font-poppins text-xs text-red-600">
                Select a size to continue
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`flex items-center justify-center w-12 h-12 border font-poppins text-sm cursor-pointer transition-all duration-300 ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-black/30 text-black hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div onClick={handleAddToCart} className="mt-2 flex flex-row gap-mid">
          <AddToCartButton />
          <PrimaryBlackButton buttonName="Add to Fav" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
