import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // no token → send to login
        return navigate("/login");
      }

      try {
        const res = await axios.get("http://localhost:4001/api/blog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.length === 0) {
          setError("No blogs found.");
        } else {
          setBlogs(res.data);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          // token invalid/expired
          localStorage.removeItem("token");
          return navigate("/login");
        }
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  if (loading) return <h3 className="text-center mt-5">Loading Blogs...</h3>;
  if (error) return <h3 className="text-center mt-5">{error}</h3>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Blogs</h1>
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
              <h2 className="text-xl font-semibold mb-2">{blog.content}</h2>

              <p className="text-gray-700 mb-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">{blog.author}</p>
              <div className="flex space-x-4"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
