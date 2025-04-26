import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import CustomHeader from "../components/banner";
function HomePage() {
  return (
    <div>
      <Navbar />
      <CustomHeader />
      <Outlet />
    </div>
  );
}

export default HomePage;
