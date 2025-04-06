import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import './blogview.css';

const Blogview = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);
    }, []);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`https://personal-blog-mern-project.onrender.com/api/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error("Failed to fetch blog", err);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;
    const handleedit = () => {
        const newTitle = prompt("Enter new title for the Blog:", blog.title);
        const newContent = prompt("Enter new content for the Blog:", blog.content);
        if (newTitle && newContent) {
            axios.put(
                `https://personal-blog-mern-project.onrender.com/api/blogs/${id}`,
                { title: newTitle, content: newContent },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
                .then(response => {
                    setBlog(response.data);
                    alert("Blog updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating blog:", error);
                    alert("Failed to update blog.");
                });
        }
    };

    return (
        <>
            <Header loggedIn={loggedIn} />
            <div className="blog-detail-container">
                <h1>{blog.title}</h1>
                <p>{blog.content}</p>
                {loggedIn && <button className="edit-button" onClick={handleedit}>Edit</button>}
            </div>
            <Footer />
        </>
    );
};

export default Blogview;
