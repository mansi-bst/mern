import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { successEmitter } from "../../toasttify.Emitter";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setIsDropdownOpen(false);

    successEmitter("Logout successful");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          NOTE<span className="text-blue-500">BOOK</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className="text-sm text-slate-300 transition-colors hover:text-white"
          >
            Features
          </Link>

          <Link
            to="/about"
            className="text-sm text-slate-300 transition-colors hover:text-white"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-sm text-slate-300 transition-colors hover:text-white"
          >
            Contact
          </Link>

          <Link
            to="/notes"
            className="text-sm text-slate-300 transition-colors hover:text-white"
          >
            Notes
          </Link>
        </div>

        {/* Authentication */}
        {!isLoggedIn ? (
          <button
            onClick={() => (window.location.href = "/login")}
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-blue-500"
          >
            Login
          </button>
        ) : (
          <div className="relative">

            {/* User Button */}
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            >
              <User
                size={32}
                className="rounded-full bg-blue-500 p-1 text-white"
              />

              <span className="font-medium">
                {user?.Name || "User"}
              </span>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 w-48 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg">

                {/* User Name */}
                <div className="border-b border-slate-700 px-3 py-2">
                  <p className="text-sm text-slate-400">
                    Logged in as
                  </p>

                  <p className="font-medium text-white">
                    {user?.Name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.Email}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="mt-1 w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-slate-800 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;