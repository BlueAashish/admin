import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  let role = localStorage.getItem("role");
//   role="admin"
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && role !== allowedRole) {
    // Redirect to correct dashboard if role is wrong
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
