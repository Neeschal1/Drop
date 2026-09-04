import React from "react";
import { SimilarProducts } from "../../utils/recommendedProducts";
import {
  SubHeading,
  DescriptionBlack,
  PricingText,
} from "../../components/componentsLayout";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-10 sm:py-16 lg:py-20">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-mid mb-4 sm:mb-mid px-4 sm:pl-mid">
        <SubHeading headingName="Recommended For You" />
        <DescriptionBlack descriptionTexts="— You might also like" />
      </div>

      <div className="flex flex-row gap-3 sm:gap-mid overflow-x-auto px-4 sm:px-large pb-mid scrollbar-hide">
        {SimilarProducts.map((product) => (
          <button
            key={product.item}
            onClick={() =>
              navigate("/product-description", {
                state: { product },
              })
            }
            className="flex flex-col shrink-0 w-40 sm:w-56 md:w-64 lg:w-70 group cursor-pointer text-left"
          >
            <div className="w-full aspect-3/4 overflow-hidden">
              <img
                src={product.image1}
                alt={product.itemName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1 mt-2 sm:mt-3">
              <DescriptionBlack
                descriptionTexts={product.itemName}
              />

              <div className="flex items-center justify-between">
                <PricingText price={product.price} />

                <span className="text-xs sm:text-sm">
                  ★ {product.ratings}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;