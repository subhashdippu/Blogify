import BlogPost from "../models/BlogPost.js";

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

module.exports = {
  createBlog,
};
