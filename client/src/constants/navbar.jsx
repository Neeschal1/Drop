import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { AuthButton, CartButton } from "../components/componentsLayout";

const NavElements = [
  { id: 1, name: "WOMEN", navigateTo: "/women-collection" },
  { id: 2, name: "MEN", navigateTo: "/men-collection" },
  { id: 3, name: "COLLECTION", navigateTo: "/collection" },
  { id: 4, name: "SALES", navigateTo: "/sales" },
  { id: 5, name: "ABOUT", navigateTo: "/about" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
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

  return (
    <div
      className={`flex fixed top-0 left-0 z-50 items-center justify-between w-full px-4 sm:px-6 lg:px-mid py-3 lg:py-4 animate-fade-in transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "bg-black" : "bg-black/10"}`}>
      <div className="flex items-center justify-between w-full">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`block h-px w-6 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}/>
          <span className={`block h-px w-6 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}/>
          <span className={`block h-px w-6 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}/>
        </button>
        <div className="hidden lg:flex items-center gap-x-extralarge">
          {NavElements.map((item) => (
            <a key={item.id} href={item.navigateTo} className="group relative flex px-2 text-white font-poppins font-regular transition-opacity duration-300 hover:opacity-80">
              {item.name}
              <span className="absolute bottom-0 left-2 right-2 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <img
          src={Logo}
          alt="Logo"
          className="h-6 sm:h-7 lg:h-8 w-auto transition-transform duration-300 ease-out hover:scale-105 cursor-pointer absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
        />
        <div className="hidden lg:flex items-center gap-mid">
          <AuthButton navigateTo="/signup" buttonName="ACCOUNT" />
          <AuthButton navigateTo="/favourites" buttonName="FAVS" />
          <CartButton navigateTo="/carts" />
        </div>
        <div className="lg:hidden w-8 h-8" aria-hidden="true" />
      </div>
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-black transition-transform duration-300 ease-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-y-8">
          {NavElements.map((item) => (
            <a
              key={item.id}
              href={item.navigateTo}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-poppins font-regular transition-opacity duration-300 hover:opacity-80"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-x-6 mt-6">
            <AuthButton buttonName="ACCOUNT" />
            <AuthButton buttonName="FAVS" />
            <CartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
