const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { isAdmin } = require("../middleware/roleMiddleware");
const { authenticate } = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

router.get("/", authenticate, getAllBlogs);
router.post("/", authenticate, isAdmin, createBlog);
router.patch("/:id", authenticate, isAdmin, updateBlog);
router.delete("/:id", authenticate, isAdmin, deleteBlog);

module.exports = router;
