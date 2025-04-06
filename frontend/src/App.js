import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import Login from "./components/Login";
import UserHomePage from "./components/userhomepage";
import Blogview from "./components/blogview";
import About from "./components/about"
import Contact from "./components/contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/blog/:id" element={<Blogview />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;
