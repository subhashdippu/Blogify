import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import CustomHeader from "../components/banner";
import Blogs from "./blogs";
import BlogItem from "../components/blogItem";

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
