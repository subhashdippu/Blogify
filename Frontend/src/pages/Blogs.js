import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../components/BlogItem"; // Component to show single blog

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/blog");
        if (res.data.length === 0) {
          setError("No blogs found.");
        } else {
          setBlogs(res.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading Blogs...</h3>;
  }

  if (error) {
    return <h3 className="text-center mt-5">{error}</h3>;
  }

  return (
    <div className="container my-5 gap-5">
      <h2 className="text-center mb-4 ">Latest Blogs</h2>
      <div
        className="d-flex flex-wrap justify-content-start "
        style={{ display: "flex" }}
      >
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              className="px-20 "
              style={{
                maxWidth: "50%",
              }}
              key={index}
            >
              <BlogItem
                title={blog.title}
                content={blog.content}
                imageUrl={blog.imageUrl}
                date={new Date(blog.createdAt).toLocaleDateString()}
                author={blog.author}
              />
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
