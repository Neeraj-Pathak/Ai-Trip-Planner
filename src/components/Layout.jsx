// src/components/Layout.jsx
import React from "react";
import Header from "./components/custom/Header"; // adjust if needed
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div> 
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
