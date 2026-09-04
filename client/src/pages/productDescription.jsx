import Footer from "../constants/footer";
import Navbar from "../constants/navbar";
import ProductDetails from "../ui/products/productDetails";

const ProductDescription = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar bgstate={true} />
      <ProductDetails />
      <Footer />
    </div>
  );
};

export default ProductDescription;