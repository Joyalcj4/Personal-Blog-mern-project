const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/authmiddleware");
// Fetch the About document
router.get("/", async (req, res) => {
    try {
        const contact= await Contact.getSingleton();
        res.status(200).json({ contact});
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

    const contact = await Contact.getSingleton();
    contact.content = content;
    await contact.save();

    res.status(200).json({ message: "About content updated successfully", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
