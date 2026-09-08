import React, { useState, useMemo } from "react";
import Navbar from "../constants/navbar";
import Footer from "../constants/footer";
import { CollectionGrid } from "../ui/collection/collectionLayout";
import { Data } from "../utils/clothesProductsData";

const Collection = () => {
  const [selectedGender, setSelectedGender] = useState("all");

  const womenProducts = Data[0].women;
  const menProducts = Data[0].men;

  const currentProducts = useMemo(() => {
    if (selectedGender === "women") return womenProducts;
    if (selectedGender === "men") return menProducts;
    return [...womenProducts, ...menProducts];
  }, [selectedGender, womenProducts, menProducts]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-poppins">
      <Navbar bgstate={true} />

      <main className="flex-1 w-full pt-24 sm:pt-28">
        {/* Gender Toggle Selector */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center gap-3 border-b border-black/10 pb-4">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium mr-2">
              View:
            </span>
            <button
              onClick={() => setSelectedGender("all")}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer rounded-full ${
                selectedGender === "all"
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All Drops ({womenProducts.length + menProducts.length})
            </button>
            <button
              onClick={() => setSelectedGender("women")}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer rounded-full ${
                selectedGender === "women"
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Women ({womenProducts.length})
            </button>
            <button
              onClick={() => setSelectedGender("men")}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer rounded-full ${
                selectedGender === "men"
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Men ({menProducts.length})
            </button>
          </div>
        </div>

        <CollectionGrid
          products={currentProducts}
          title="Full Collection"
          subtitle="Explore the complete DROPP catalog across women's and men's seasonal collections."
          availableCategories={["All", "Tops", "Bottoms", "Outerwear"]}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
