import React from "react";
import Navbar from "../constants/navbar";
import Footer from "../constants/footer";
import { CollectionGrid } from "../ui/collection/collectionLayout";
import { Data } from "../utils/clothesProductsData";
import MenBanner from "../assets/images/menArrivals.jpg";

const Men = () => {
  const menProducts = Data[0].men;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-poppins">
      <Navbar />
      <main className="flex-1 w-full">
        <CollectionGrid
          products={menProducts}
          title="Men's Collection"
          subtitle="Engineered for daily versatility. Clean cuts, heavyweight cottons, and elevated streetwear."
          bannerImage={MenBanner}
          availableCategories={["All", "Tops", "Bottoms", "Outerwear"]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Men;
