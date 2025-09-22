import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Users } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const NAVBAR_HEIGHT = 112; 

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-gray-950 shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-full shadow-md">
            <Users className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-2xl">SkillConnect</span>
            <span className="text-xs text-gray-400">Find Experts Near You</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-gray-400 font-medium">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/services" className="hover:text-blue-500 transition">Services</Link>
          <ScrollLink
            to="About"
            smooth={true}
            duration={500}
            offset={-NAVBAR_HEIGHT}
            className="cursor-pointer hover:text-blue-500 transition"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="Contact"
            smooth={true}
            duration={500}
            offset={-NAVBAR_HEIGHT}
            className="cursor-pointer hover:text-blue-500 transition"
          >
            Contact
          </ScrollLink>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-xl hover:bg-gray-700 transition"
              >
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-800 text-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-6 py-4 space-y-4 text-gray-300 border-t border-gray-800">
          <Link to="/" className="block hover:text-blue-500">Home</Link>
          <Link to="/services" className="block hover:text-blue-500">Services</Link>
          <ScrollLink
            to="About"
            smooth={true}
            duration={500}
            offset={-NAVBAR_HEIGHT}
            onClick={() => setIsOpen(false)}
            className="block cursor-pointer hover:text-blue-500"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="Contact"
            smooth={true}
            duration={500}
            offset={-NAVBAR_HEIGHT}
            onClick={() => setIsOpen(false)}
            className="block cursor-pointer hover:text-blue-500"
          >
            Contact
          </ScrollLink>

          <hr className="border-gray-700" />

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
