import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../constants/navbar";
import Footer from "../constants/footer";
import { CartItems, OrderSummary } from "../ui/cart/cartLayout";
import useCart from "../hooks/carts";
import { useToast } from "../hooks/toast";
import { Data } from "../utils/clothesProductsData";
import ProductCard from "../ui/collection/productCard";

const Carts = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
  });

  const handleInputChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order placement
    setTimeout(() => {
      const randomOrderId =
        "ORD-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      setIsProcessing(false);
      setIsOrderPlaced(true);
      clearCart();
      showToast("Order placed successfully!", "success");
    }, 1500);
  };

  // Sample recommendations for empty state
  const recommendedEmpty = Data[0].women.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-poppins">
      <Navbar bgstate={true} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        {/* Page title & breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-black cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-black font-medium">Shopping Bag</span>
        </div>

        {cartItems.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-3xl mb-6">
              🛍️
            </div>
            <h1 className="font-poppins font-medium text-2xl sm:text-3xl text-neutral-900 mb-2">
              Your shopping bag is empty
            </h1>
            <p className="font-poppins font-light text-sm sm:text-base text-neutral-600 max-w-md mb-8">
              Looks like you haven't added anything to your bag yet. Discover
              our curated collections and upgrade your wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/women-collection")}
                className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
              >
                Shop Women
              </button>
              <button
                onClick={() => navigate("/men-collection")}
                className="bg-neutral-100 text-black px-8 py-3 text-sm font-medium hover:bg-neutral-200 transition-all duration-300 cursor-pointer"
              >
                Shop Men
              </button>
            </div>

            {/* Recommendations in empty cart */}
            <div className="w-full mt-20 text-left border-t border-black/10 pt-12">
              <h2 className="font-poppins font-medium text-xl text-neutral-900 mb-6">
                Trending Right Now
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {recommendedEmpty.map((product) => (
                  <ProductCard key={product.item} product={product} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Active Cart
          <div>
            <div className="mb-8">
              <h1 className="font-poppins font-medium text-2xl sm:text-3xl lg:text-4xl text-neutral-900">
                Shopping Bag
              </h1>
              <p className="font-poppins font-light text-sm text-neutral-600 mt-1">
                Review your selected items and proceed to secure checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Cart Items Column */}
              <div className="lg:col-span-8">
                <CartItems />
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-4 sticky top-28">
                <OrderSummary onCheckout={() => setIsCheckoutOpen(true)} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {!isOrderPlaced ? (
              <>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-black text-lg cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="mb-6">
                  <h2 className="font-poppins font-medium text-xl sm:text-2xl text-neutral-900">
                    Express Checkout
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Total to pay:{" "}
                    <strong className="text-black">
                      €{getCartTotal().toFixed(2)}
                    </strong>
                  </p>
                </div>

                <form
                  onSubmit={handleCheckoutSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-poppins">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Jane Doe"
                      value={checkoutData.fullName}
                      onChange={handleInputChange}
                      className="border border-black/20 px-3 py-2 text-sm font-poppins focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-poppins">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      className="border border-black/20 px-3 py-2 text-sm font-poppins focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-poppins">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="123 Fashion Blvd, Apt 4B"
                      value={checkoutData.address}
                      onChange={handleInputChange}
                      className="border border-black/20 px-3 py-2 text-sm font-poppins focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-neutral-600 font-poppins">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Paris"
                        value={checkoutData.city}
                        onChange={handleInputChange}
                        className="border border-black/20 px-3 py-2 text-sm font-poppins focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-neutral-600 font-poppins">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        placeholder="75001"
                        value={checkoutData.postalCode}
                        onChange={handleInputChange}
                        className="border border-black/20 px-3 py-2 text-sm font-poppins focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <label className="text-xs text-neutral-600 font-poppins">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["card", "applepay", "cod"].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() =>
                            setCheckoutData({
                              ...checkoutData,
                              paymentMethod: method,
                            })
                          }
                          className={`py-2 px-3 border text-xs font-poppins uppercase tracking-wider transition-colors cursor-pointer ${
                            checkoutData.paymentMethod === method
                              ? "border-black bg-black text-white"
                              : "border-black/20 text-neutral-700 hover:border-black"
                          }`}
                        >
                          {method === "card" && "Credit Card"}
                          {method === "applepay" && "Apple Pay"}
                          {method === "cod" && "Cash on Del."}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="mt-4 bg-black text-white py-3.5 text-sm font-poppins font-medium hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Processing Payment...</span>
                    ) : (
                      <span>Confirm & Pay</span>
                    )}
                  </button>
                </form>
              </>
            ) : (
              // Order Success View
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl flex items-center justify-center mb-4">
                  ✓
                </div>
                <h2 className="font-poppins font-medium text-2xl text-neutral-900 mb-1">
                  Thank You for Your Order!
                </h2>
                <p className="text-xs text-neutral-500 mb-4">
                  Order reference:{" "}
                  <strong className="text-black">{orderId}</strong>
                </p>
                <p className="text-sm text-neutral-600 max-w-sm mb-6 font-light">
                  We've sent a confirmation email to{" "}
                  <strong className="font-medium text-black">
                    {checkoutData.email || "your inbox"}
                  </strong>
                  . Your items will be dispatched shortly.
                </p>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsOrderPlaced(false);
                    navigate("/");
                  }}
                  className="bg-black text-white px-8 py-3 text-sm font-poppins font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Carts;
