import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { AuthButton, CartButton } from "../components/componentsLayout";

const NavElements = [
  { id: 1, name: "WOMEN", navigateTo: "#" },
  { id: 2, name: "MEN", navigateTo: "#" },
  { id: 3, name: "COLLECTION", navigateTo: "#" },
  { id: 4, name: "SALES", navigateTo: "#" },
  { id: 5, name: "ABOUT", navigateTo: "#" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
  
  return (
    <div
      className={` flex fixed top-0 left-0 z-50 items-center justify-between p-mid w-full py-4 animate-fade-in transition-colors duration-500 ${isScrolled ? "bg-black" : "bg-black/10"} `}
    >
      <div className="flex items-row items-center gap-x-extralarge justify-between w-full">
        <div className="flex items-row">
          {NavElements.map((items) => (
            <a
              key={items.id}
              href={items.navigateTo}
              className="group relative flex px-2 text-white font-poppins font-regular transition-opacity duration-300 hover:opacity-80"
            >
              {items.name}
              <span className="absolute bottom-0 left-2 right-2 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <img
          src={Logo}
          alt="Logo"
          className="transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
        />
        <div className="flex items-center items-row gap-mid">
          <AuthButton buttonName="ACCOUNT" /> <AuthButton buttonName="FAVS" />
          <CartButton />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
