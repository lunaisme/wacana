import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = ["Category 1", "Category 2", "Category 3"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold flex items-center">
          <span className="text-black">⚡</span> Wacana
        </span>
      </div>
      <div className="hidden md:flex space-x-6 text-gray-700">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <div className="relative group">
          <button
            onClick={toggleDropdown}
            onBlur={() => setIsDropdownOpen(false)}
            className="hover:text-black focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Categories <span className="ml-1">▼</span>
          </button>
          <div
            className={`absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        <Link to="/" className="hover:text-black">
          Favorit
        </Link>
        <Link to="/about" className="hover:text-black">
          About
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.name}</span>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-black">
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}