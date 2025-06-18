import React from "react";

const AuthCard = ({ children }) => (
  <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md border-t-8 border-blue-600">
    {children}
  </div>
);

export default AuthCard;
