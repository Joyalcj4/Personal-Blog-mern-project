const express = require("express");
const router = express.Router();
const About = require("../models/About");
const authMiddleware = require("../middleware/authmiddleware");
// Fetch the About document
router.get("/", async (req, res) => {
    try {
        const about = await About.getSingleton();
        res.status(200).json({ about });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update the content of the About document
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const about = await About.getSingleton();
    about.content = content;
    await about.save();

    res.status(200).json({ message: "About content updated successfully", about });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
