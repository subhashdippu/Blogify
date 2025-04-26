import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// Mock data
const mockBlogs = [
  {
    _id: 1,
    title: "First Blog Post",
    description: "This is the first blog description.",
    image: "https://via.placeholder.com/150",
    author: "Admin",
    date: "2022-01-01",
  },
  {
    _id: 2,
    title: "Second Blog Post",
    description: "This is the second blog description.",
    image: "https://via.placeholder.com/150",
    author: "Admin",
    date: "2022-01-02",
  },
];

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBlogs(mockBlogs);
    }, 1000);
  }, []);

  // Handle delete blog
  const handleDeleteBlog = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
        Swal.fire({
          title: "Deleted!",
          text: "Your blog post has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between m-4">
          <h5>All Blogs</h5>
          <h5>Total Blogs: {blogs.length}</h5>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra md:w-[870px]">
              {/* head */}
              <thead className="bg-green text-white rounded-lg">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>
                      <Link to={`/admin/update-blog/${blog._id}`}>
                        <button className="btn btn-xs btn-circle bg-orange-500 text-white">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="btn btn-xs bg-red text-white ml-2"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
