import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';


const HomePage = () => {

    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Fetch blogs
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("https://personal-blog-mern-project.onrender.com/api/blogs");
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
    return (
        <>
            <Header />
            <div className="home-container">
                <h1 className="home-title">Welcome 👋</h1>
                <div className="blog-grid">
                    {blogs.map((post) => (
                        <div className="blog-card" key={post._id}>
                            <div className="blog-meta">
                                <span className="author">{username}</span>
                                <span className="dot">•</span>
                                <span className="date">Apr 5, 2025</span>
                                <span className="dot">•</span>
                                <span className="read-time">2 min read</span>
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
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;
