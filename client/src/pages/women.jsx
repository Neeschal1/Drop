import React from "react";
import Navbar from "../constants/navbar";
import Footer from "../constants/footer";
import { CollectionGrid } from "../ui/collection/collectionLayout";
import { Data } from "../utils/clothesProductsData";
import WomenBanner from "../assets/images/womenArrivals.jpg";

const Women = () => {
  const womenProducts = Data[0].women;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-poppins">
      <Navbar />
      <main className="flex-1 w-full">
        <CollectionGrid
          products={womenProducts}
          title="Women's Collection"
          subtitle="Effortless silhouettes with contemporary tailoring and refined everyday essentials."
          bannerImage={WomenBanner}
          availableCategories={["All", "Tops", "Bottoms", "Outerwear"]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Women;
