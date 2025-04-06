// backend/routes/blogRoutes.js

const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authmiddleware");

// POST - Create Blog (only if logged in)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.id, // from middleware
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
});

// GET - View all blogs (no login required)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "username");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

module.exports = router;
