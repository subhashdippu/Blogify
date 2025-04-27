const { createBlog, getAllBlogs } = require("../controllers/blogController");
const { isAdmin } = require("../middleware/roleMiddleware");
const { authenticate } = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", authenticate, isAdmin, createBlog);

module.exports = router;
