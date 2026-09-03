import { useState } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  return {
    cartItems,
    setCartItems,
  };
};

export default useCart;
