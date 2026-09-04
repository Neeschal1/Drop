import Footer from "../constants/footer";
import Navbar from "../constants/navbar";
import CustomerReview from "../ui/products/customerReview";
import Navs from "../ui/products/navs";
import ProductDetails from "../ui/products/productDetails";
import RecommendedProducts from "../ui/products/recommended";

const ProductDescription = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar bgstate={true} />
      <Navs />
      <ProductDetails />
      <RecommendedProducts />
      <CustomerReview />
      <Footer />
    </div>
  );
};

export default ProductDescription;