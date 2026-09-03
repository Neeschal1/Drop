import useCart from "../hooks/carts";

export const AuthButton = ({ buttonName }) => {
  return (
    <button className="flex border font-poppins border-white px-large py-small text-white cursor-pointer transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-0.5">
      {buttonName}
    </button>
  );
};

export const PrimaryButton = ({buttonName}) => {
  return (
    <button className="flex font-poppins bg-white px-extralarge py-mid text-black cursor-pointer transition-all duration-300 ease-out hover:bg-black hover:text-white hover:-translate-y-0.5">
      {buttonName}
    </button>
  );
}

export const CartButton = () => {
  const { cartItems } = useCart();
  return (
    <button className={`flex font-poppins ${cartItems.length > 0 ? "bg-primaryred" : "bg-amber-400"} px-large py-small text-white cursor-pointer transition-all duration-300 ease-out hover:bg-primaryred hover:text-white hover:-translate-y-0.5`}>
      CART: {cartItems.length}
    </button>
  );
};
