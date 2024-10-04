import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { setAuthToken } from "../../Services/apiService";
import { FaSignOutAlt } from "react-icons/fa";
const NavBar = () => {
  const navigate = useNavigate();

  const { token, logout } = useAuth();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">Employee Management System</span>
      </div>
      <div className="flex-none">
        {!token ? (
          <>
            <button
              className="btn btn-primary btn-outline mx-2"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="btn btn-secondary btn-outline"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-outline mx-2"
              onClick={logout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
            <button
              className="btn btn-secondary btn-outline mx-2"
              onClick={handleDashboard}
            >
              Dasboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
