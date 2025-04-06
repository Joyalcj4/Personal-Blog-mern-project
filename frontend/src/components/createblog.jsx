import React, { useState } from "react";
import axios from "axios";
import './CreateBlog.css';

const CreateBlog = ({create}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a blog.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5500/api/blogs",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error creating blog", err);
      alert("Failed to create blog.");
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        ></textarea>
        <button type="submit" onClick={create}>Publish</button>
      <button type="button" onClick={create}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateBlog;
