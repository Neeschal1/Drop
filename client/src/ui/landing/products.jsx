import React from "react";
import {
  SubHeading,
  DescriptionBlack,
} from "../../components/componentsLayout";
import { Data } from "../../utils/clothesProductsData";

const Products = () => {
  const womenProducts = Data[0].women;
  const menProducts = Data[0].men;

  return (
    <div className="w-full py-20">
      <section className="w-full mb-large">
        <div className="flex flex-row items-center justify-start gap-mid mb-mid pl-mid">
          <SubHeading headingName="Women’s New Arrivals" />
          <DescriptionBlack descriptionTexts="— Fresh fits, made with cotton" />
        </div>
        <div className="flex flex-row gap-mid overflow-x-auto px-large pb-mid scrollbar-hide">
          {womenProducts.map((product) => (
            <div
              key={product.item}
              className="flex flex-col shrink-0 w-70 group"
            >
              <div className="w-full aspect-3/4 overflow-hidden">
                <img
                  src={product.image1}
                  alt={product.itemName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <h3 className="font-poppins font-medium">
                  {product.itemName}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-medium">
                    {product.price}
                  </span>
                  <span className="text-sm"> ★ {product.ratings} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full">
        <div className="flex flex-row items-center justify-start gap-mid mb-mid pl-mid">
          <SubHeading headingName="Men’s New Arrivals" />
          <DescriptionBlack descriptionTexts="— Fresh fits, made with cotton" />
        </div>
        <div className="flex flex-row gap-mid overflow-x-auto px-large pb-mid scrollbar-hide">
          {menProducts.map((product) => (
            <div
              key={product.item}
              className="flex flex-col shrink-0 w-70 group"
            >
              <div className="w-full aspect-3/4 overflow-hidden">
                <img
                  src={product.image1}
                  alt={product.itemName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <h3 className="font-poppins font-medium">
                  {product.itemName}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-medium">
                    {product.price}
                  </span>
                  <span className="text-sm"> ★ {product.ratings} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Products;
