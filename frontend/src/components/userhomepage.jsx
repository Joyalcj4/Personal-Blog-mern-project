import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import CreateBlog from "./createblog";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
  const Navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [create,setcreate] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    // Get user from localStorage
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

    fetchBlogs();
  }, []);
  const handleOpen = () => setcreate(true);
  const handleClose = () => setcreate(false);

  const deletehandle = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5500/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(blogs.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Failed to delete blog", err.response?.data || err.message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
    Navigate("/");
  }
  
  

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <div className="home-container">
        <h1 className="home-title">Welcome 👋</h1>
        <button className="create-blog-button" onClick={handleOpen}>Create a New Blog</button>
        {create && <CreateBlog create={handleClose}/>}
        <div className="blog-grid">
          {blogs.length === 0 ? (
            <p>No blogs yet. Start by creating one!</p>
          ) : (
            blogs.map((post) => (
              <div className="blog-card" key={post._id}>
                <div className="blog-meta">
                  <span className="author">{username}</span>
                  <span className="dot">•</span>
                  <span className="date">Apr 5, 2025</span>
                  <span className="dot">•</span>
                  <button className="delete-button" onClick={() => deletehandle(post._id)}>Delete</button>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-subtitle">{post.content.substring(0, 100)}...</p>
                <div className="blog-stats">
                  <span>0 views</span>
                  <span className="dot">•</span>
                  <span>0 comments</span>
                  <span className="dot">•</span>
                  <span>❤️ 0</span>
                </div>
                <Link to={`/blog/${post._id}`} className="read-link">Read More →</Link>
              </div>
            ))
          )}
        </div>
        <button className="logout" onClick={handleLogout}>logout</button>
      </div>
      <Footer />
    </>
  );
};

export default UserHomePage;
