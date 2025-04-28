import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditBlog = () => {
  const { id } = useParams(); // grabs the id from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the blog data when the page loads
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        // Make sure you use the correct API endpoint with the blog id
        const { data } = await axios.get(
          `http://localhost:4001/api/blog/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Populate the form with the fetched data
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.imageUrl);
        setAuthor(data.author);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not load blog.", "error");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Please log in first.", "error");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:4001/api/blog/${id}`, // PATCH request to update the blog
        { title, content, author, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Blog updated!", "success").then(() =>
          navigate("/home")
        );
      }
    } catch (err) {
      console.error("Error updating blog:", err.response || err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Could not update blog.",
        "error"
      );
    }
  };

  if (loading) return <p>Loading blog…</p>;

  return (
    <div className="edit-blog max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Content</label>
          <textarea
            className="w-full border rounded px-2 py-1 h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="url"
            className="w-full border rounded px-2 py-1"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
