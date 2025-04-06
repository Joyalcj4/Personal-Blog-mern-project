import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import './about.css';

const Contact = () => {
    const [contact, setContact] = useState({ content: "" });
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);

        const fetchContact = async () => {
            try {
                const res = await axios.get("http://localhost:5500/api/contact");
                setContact(res.data.contact); // assuming backend returns { contact: { content: "..." } }
            } catch (err) {
                console.error("Failed to fetch contact", err);
            }
        };

        fetchContact();
    }, []);

    const handleEdit = () => {
        const newContent = prompt("Enter new content for the Contact page:", contact.content);
        if (newContent) {
            axios.put(
                "http://localhost:5500/api/contact",
                { content: newContent },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
                .then(response => {
                    setContact(response.data.contact);
                    alert("Contact page updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating contact page:", error);
                    alert("Failed to update contact page.");
                });
        }
    };

    return (
        <>
            <Header />
            <div className="about-container">
                <h1>Contact</h1>
                {contact && contact.content ? (
                    <p>{contact.content}</p>
                ) : (
                    <p>Loading...</p>
                )}

                {loggedIn && <button className="edit-button" onClick={handleEdit}>Edit</button>}
            </div>
            <Footer />
        </>
    );
};

export default Contact;
