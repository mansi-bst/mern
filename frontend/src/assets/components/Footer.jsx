import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`mt-9 border-t py-8 text-center text-sm transition-colors duration-300 ${
        darkMode
          ? "border-slate-800 text-slate-500 hover:text-white"
          : "border-slate-200 text-slate-500 hover:text-slate-900"
      }`}
    >
      © 2026 NoteBook. All rights reserved.
    </footer>
  );
};

export default Footer;










