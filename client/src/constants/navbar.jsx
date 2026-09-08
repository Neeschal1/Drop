import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { AuthButton, CartButton } from "../components/componentsLayout";

const NavElements = [
  { id: 1, name: "WOMEN", navigateTo: "/women-collection" },
  { id: 2, name: "MEN", navigateTo: "/men-collection" },
  { id: 3, name: "COLLECTION", navigateTo: "/collection" },
  { id: 4, name: "SALES", navigateTo: "/sales" },
  { id: 5, name: "ABOUT", navigateTo: "/about" },
];

const Navbar = ({ bgstate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div
      className={`flex fixed top-0 left-0 z-50 items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-3 lg:py-4 transition-colors duration-500 ${
        isScrolled || isMobileMenuOpen || bgstate
          ? "bg-black shadow-lg"
          : "bg-black/30 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-x-8">
          {NavElements.map((item) => {
            const isActive = location.pathname === item.navigateTo;
            return (
              <Link
                key={item.id}
                to={item.navigateTo}
                className={`group relative flex px-2 py-1 text-white font-poppins text-sm tracking-wider font-regular transition-opacity duration-300 hover:opacity-100 ${
                  isActive ? "opacity-100 font-medium" : "opacity-80"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-2 right-2 h-0.5 bg-white transition-transform duration-300 ease-out origin-left ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Brand Logo */}
        <img
          src={Logo}
          alt="DROPP Logo"
          onClick={() => navigate("/")}
          className="h-6 sm:h-7 lg:h-8 w-auto transition-transform duration-300 ease-out hover:scale-105 cursor-pointer absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
        />

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <AuthButton navigateTo="/signup" buttonName="ACCOUNT" />
          <AuthButton navigateTo="/favourites" buttonName="FAVS" />
          <CartButton navigateTo="/carts" />
        </div>

        <div className="lg:hidden w-8 h-8" aria-hidden="true" />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-black transition-transform duration-300 ease-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-y-7 px-6">
          {NavElements.map((item) => (
            <Link
              key={item.id}
              to={item.navigateTo}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-white text-xl font-poppins transition-opacity duration-300 ${
                location.pathname === item.navigateTo
                  ? "font-semibold underline underline-offset-8"
                  : "font-light opacity-80"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-y-3 mt-6 w-full max-w-xs">
            <AuthButton navigateTo="/signup" buttonName="ACCOUNT" />
            <AuthButton navigateTo="/favourites" buttonName="FAVS" />
            <CartButton navigateTo="/carts" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
