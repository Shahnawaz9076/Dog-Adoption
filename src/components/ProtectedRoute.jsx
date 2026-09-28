
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // User login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role allowed nahi hai
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/dogs" replace />;
  }

  return children;
};

export default ProtectedRoute;

