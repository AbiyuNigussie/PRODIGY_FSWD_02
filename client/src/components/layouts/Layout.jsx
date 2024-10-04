import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
