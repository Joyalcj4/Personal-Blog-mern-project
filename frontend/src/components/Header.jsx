import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({loggedIn}) {
  return (
    <header className="site-header">
      {loggedIn ? (<Link className="logo" to="/userhome">Hello.</Link>):(<Link className="logo" to="/">GAURI E V B</Link>)}
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {!loggedIn && <Link to="/login">Login</Link>}
      </div>
    </header>
  );
}

export default Header;
