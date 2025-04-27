const {
  createBlog,
  getAllBlogs,
  updateBlog,
} = require("../controllers/blogController");
const { isAdmin } = require("../middleware/roleMiddleware");
const { authenticate } = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", authenticate, isAdmin, createBlog);
router.patch("/:id", authenticate, isAdmin, updateBlog);

module.exports = router;
