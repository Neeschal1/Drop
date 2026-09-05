import React, { useEffect } from "react";
import useFavs from "../../hooks/favs";

const FavItems = () => {
  const { favList, setFavList } = useFavs();

  useEffect(() => {
    console.log("Favourite Items: ", favList);
  }, [favList]);

  if (favList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4 px-4">
        <p className="font-poppins text-black text-center">
          Nothing saved here yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="font-poppins text-sm underline underline-offset-2 text-black cursor-pointer"
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-mid py-10 lg:py-16">
      <h1 className="font-poppins font-medium text-2xl sm:text-3xl text-black mb-8 sm:mb-10">
        Favourites
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-mid">
        {favList.map((product, index) => (
          <div key={`${product.item}-${index}`} className="flex flex-col group">
            <div className="relative w-full aspect-3/4 overflow-hidden bg-black/5">
              <button
                onClick={() => handleViewProduct(product)}
                className="w-full h-full cursor-pointer"
              >
                <img
                  src={product.image1}
                  alt={product.itemName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <button
                onClick={() => handleRemove(index)}
                aria-label="Remove from favourites"
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 text-black text-sm cursor-pointer hover:bg-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <h3 className="font-poppins font-medium text-sm sm:text-base truncate">
                {product.itemName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-poppins font-medium text-sm sm:text-base">
                  {product.price}
                </span>
                <span className="text-xs sm:text-sm text-black/60">
                  ★ {product.ratings}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavItems;
