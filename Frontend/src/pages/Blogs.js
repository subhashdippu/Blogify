import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlogItem from "../components/blogItem";

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
    <div className="container my-5 gap-5">
      <h2 className="text-center mb-4">Latest Blogs</h2>
      <div
        className="d-flex flex-wrap justify-content-start"
        style={{ display: "flex" }}
      >
        {blogs.map((blog, i) => (
          <div key={i} className="px-20" style={{ maxWidth: "50%" }}>
            <BlogItem
              title={blog.title}
              content={blog.content}
              imageUrl={blog.imageUrl}
              date={new Date(blog.createdAt).toLocaleDateString()}
              author={blog.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
