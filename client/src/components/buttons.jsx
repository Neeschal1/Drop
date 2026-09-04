import useCart from "../hooks/carts";


export const AuthButton = ({ buttonName, navigateTo }) => {
  return (
    <button
      onClick={() => {
        navigation.navigate(navigateTo);
      }}
      className="flex border font-poppins border-white px-3 sm:px-large py-2 sm:py-small text-xs sm:text-sm text-white whitespace-nowrap cursor-pointer transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-0.5 items-center justify-center w-full"
    >
      {buttonName}
    </button>
  );
};


export const PrimaryButton = ({ buttonName, navigateTo }) => {
  return (
    <button
      onClick={() => {
        navigation.navigate(navigateTo);
      }}
      className="flex justify-center font-poppins bg-white px-6 sm:px-extralarge py-3 sm:py-mid text-sm sm:text-base text-black whitespace-nowrap cursor-pointer transition-all duration-300 ease-out hover:bg-black hover:text-white hover:-translate-y-0.5 w-full sm:w-auto"
    >
      {buttonName}
    </button>
  );
};


export const PrimaryBlackButton = ({ buttonName, navigateTo }) => {
  return (
    <button
      onClick={() => {
        navigation.navigate(navigateTo);
      }}
      className="flex lg:px-8 lg:py-4 justify-center font-poppins bg-black px-6 sm:px-extralarge py-3 sm:py-mid text-sm sm:text-base text-white whitespace-nowrap cursor-pointer transition-all duration-300 ease-out hover:bg-amber-400 hover:text-white hover:-translate-y-0.5 w-full sm:w-auto"
    >
      {buttonName}
    </button>
  );
};


export const CartButton = ({ navigateTo }) => {
  const { cartItems } = useCart();
  return (
    <button
      onClick={() => {
        navigation.navigate(navigateTo);
      }}
      className={`flex font-poppins ${
        cartItems.length > 0 ? "bg-primaryred" : "bg-amber-400"
      } px-3 sm:px-large py-2 sm:py-small text-xs sm:text-sm text-white whitespace-nowrap cursor-pointer transition-all duration-300 ease-out hover:bg-primaryred hover:text-white hover:-translate-y-0.5`}
    >
      CART: {cartItems.length}
    </button>
  );
};

export const AddToCartButton = () => {
  const { cartItems } = useCart();
  return (
    <button
      className="flex font-poppins bg-amber-400
      lg:px-8 sm:px-large w-full lg:py-4 sm:py-small text-xs sm:text-sm text-white whitespace-nowrap cursor-pointer transition-all duration-300 ease-out hover:bg-black hover:text-white hover:-translate-y-0.5 items-center justify-center"
    >
      Add to Cart
    </button>
  );
};
