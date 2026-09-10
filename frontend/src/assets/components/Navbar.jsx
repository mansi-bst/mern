import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";

import { successEmitter } from "../../toasttify.Emitter";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

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
    <nav
      className={`fixed left-0 right-0 top-0 z-50
                  backdrop-blur-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-slate-950/90"
                      : "bg-white/90"
                  }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          NOTE<span className="text-blue-500">BOOK</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/features"
            className={`text-sm transition-all hover:text-2xl ${
              darkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900 "
            }`}
          >
            Features
          </Link>

          <Link
            to="/about"
            className={`text-sm transition-all hover:text-2xl ${
              darkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`text-sm transition-all hover:text-2xl ${
              darkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Contact
          </Link>

          <Link
            to="/notes"
            className={`text-sm transition-all hover:text-2xl ${
              darkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Notes
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`cursor-pointer rounded-lg p-2
                        transition-all hover:scale-105 ${
                          darkMode
                            ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                            : "text-slate-700 hover:bg-slate-200"
                        }`}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* Authentication */}
          {!isLoggedIn ? (
            <button
              onClick={() => (window.location.href = "/login")}
              className="cursor-pointer rounded-lg bg-blue-600
                         px-5 py-2 text-sm font-medium
                         text-white transition-all duration-200
                         hover:scale-105 hover:bg-blue-500"
            >
              Login
            </button>
          ) : (
            <div className="relative">

              {/* User Button */}
              <button
                onClick={() =>
                  setIsDropdownOpen((prev) => !prev)
                }
                className={`flex cursor-pointer items-center gap-2
                            rounded-lg p-2 transition-all ${
                              darkMode
                                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                                : "text-slate-700 hover:bg-slate-200"
                            }`}
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
                <div
                  className={`absolute right-0 top-14 w-48
                              rounded-lg border p-2 shadow-lg ${
                                darkMode
                                  ? "border-slate-700 bg-slate-900"
                                  : "border-slate-200 bg-white"
                              }`}
                >
                  {/* User Information */}
                  <div
                    className={`border-b px-3 py-2 ${
                      darkMode
                        ? "border-slate-700"
                        : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        darkMode
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >
                      Logged in as
                    </p>

                    <p
                      className={`font-medium ${
                        darkMode
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {user?.Name}
                    </p>

                    <p
                      className={`truncate text-xs ${
                        darkMode
                          ? "text-slate-500"
                          : "text-slate-500"
                      }`}
                    >
                      {user?.Email}
                    </p>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="mt-1 w-full cursor-pointer rounded-md
                               px-3 py-2 text-left text-sm
                               text-red-400 transition-colors
                               hover:bg-red-50 hover:text-red-500
                               dark:hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




































