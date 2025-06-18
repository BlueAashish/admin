import React from "react";

const Navbar = ({ title, children }) => (
  <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
    <div className="text-xl font-semibold text-blue-800">{title}</div>
    <div>{children}</div>
  </nav>
);

export default Navbar;
