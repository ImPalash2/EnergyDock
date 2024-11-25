import React from "react";
import "../styles/Layout.css";
import Navbar from "../pages/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="navbarContainer">
          <Navbar />
        </div>
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
