import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect,useState } from "react";
import axios from "axios";
import './about.css'

const About = () => {
    const [about, setAbout] = useState({ content: "" });
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      // Fetch blogs
      const fetchAbout = async () => {
        try {
          const res = await axios.get("https://personal-blog-mern-project.onrender.com/api/about");
          setAbout(res.data.about);
        } catch (err) {
          console.error("Failed to fetch about", err);
        }
      };
        fetchAbout();
    }, []);

    const handleEdit = () => {
        const newContent = prompt("Enter new content for the About page:", about.content);
        if (newContent) {
            axios.put(
                "https://personal-blog-mern-project.onrender.com/api/about",
                { content: newContent },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
              )
                .then(response => {
                    setAbout(response.data.about);
                    alert("About page updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating about page:", error);
                    alert("Failed to update about page.");
                });
        }
    }
    return (
        <>
            <Header />
            <div className="about-container">
                <h1>About</h1>
                <p>
                    {about.content}
                </p>
                {loggedIn &&<button className="edit-button" onClick={handleEdit}>Edit</button>}
            </div>
            <Footer />
        </>
    );
}
export default About;