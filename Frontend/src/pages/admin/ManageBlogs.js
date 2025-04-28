import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const fetchBlogs = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const { data } = await axios.get("http://localhost:4001/api/blog", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

const deleteBlog = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  await axios.delete(`http://localhost:4001/api/blog/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const ManageBlogs = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch blogs
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Delete blog mutation
  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Deleted!", "Blog has been deleted.", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error.message, "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Error fetching blogs. Please log in again.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-2">{blog.author}</p>
              <div className="flex space-x-4">
                <Link
                  to={`/edit-blog/${blog._id}`}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;
