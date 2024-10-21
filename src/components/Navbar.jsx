import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SpaceXLogo from "../utils/spaceLogo";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "History", path: "/history" },
  { name: "Rockets", path: "/rockets" },
  { name: "Launches", path: "/launches" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Memoizing SpaceXLogo
  const logo = useMemo(() => <SpaceXLogo />, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="w-full bg-black text-yellow-50 p-10 hidden md:grid md:grid-cols-3 items-center navbar sticky top-0 z-50"
        style={{ fontFamily: "Orbitron" }}
      >
        <Link to="/" className="text-3xl " style={{ fontFamily: "Orbitron" }}>
          {logo}
        </Link>
        <ul className="flex justify-center gap-7 sm:gap-12 text-sm sm:text-[16px] font-medium">
          {menuItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${
                  pathname === path ? "text-yellow-300 font-extrabold" : ""
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <nav className="w-full bg-transparent text-yellow-50 p-5 md:hidden flex justify-between items-center ">
        <Link to="/" className="text-xl" style={{ fontFamily: "Orbitron" }}>
          SpaceX Info
        </Link>
        <button className="text-2xl z-20 bg-gray-950 p-2" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-black text-yellow-50 p-10 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        style={{ fontFamily: "Orbitron" }}
      >
        <div className="flex justify-between">
          <ul className="flex flex-col gap-6 text-base ">
            {menuItems.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={toggleMenu}
                  className={`${pathname === path ? "text-yellow-300" : ""}`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <button className="text-2xl z-20 p-2" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
