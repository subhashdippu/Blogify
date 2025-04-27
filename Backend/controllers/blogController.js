const BlogPost = require("../models/blogPost");

const createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;

  try {
    const blog = await BlogPost.create({
      title,
      content,
      imageUrl,
      author: req.user.name,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;
  try {
    const blog = await BlogPost.findByIdAndUpdate(
      id,
      { title, content, imageUrl },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
};
