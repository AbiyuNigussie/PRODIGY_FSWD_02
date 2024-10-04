import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { loginUser, registerUser, setAuthToken } from "../Services/apiService";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      const { token } = data;
      setToken(token);
      localStorage.setItem("token", token);
      setAuthToken(token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const { data } = await registerUser(username, email, password);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider
      value={{ token, login, signUp, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
