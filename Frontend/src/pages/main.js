import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import CustomHeader from "../components/banner";
import Blogs from "./Blogs";
import BlogItem from "../components/BlogItem";

function HomePage() {
  return (
    <div>
      <Navbar />
      <CustomHeader />
      <Blogs />
      {/* <BlogItem /> */}
      <Outlet />
    </div>
  );
}

export default HomePage;
