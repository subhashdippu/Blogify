import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import CustomHeader from "../components/banner";
import Blogs from "./blogs";

function HomePage() {
  return (
    <div>
      <Navbar />
      <CustomHeader />
      <Blogs />
      <Outlet />
    </div>
  );
}

export default HomePage;
