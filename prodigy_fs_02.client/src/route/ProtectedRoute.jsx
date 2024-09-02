import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
