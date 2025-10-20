import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../assets/navbar.css";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo-circle">
          <img src={logo} alt="FoodTanda Logo" className="navbar-logo" />
        </div>
        <h2 className="navbar-title">FOODTANDA</h2>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>

        {user && (
          <>
            <Link to="/crud" className="navbar-link">Manage Recipes</Link>
            <Link to="/recipes" className="navbar-link">Recipes</Link>
            <Link to="/bookmarks" className="navbar-link">Saved Recipes</Link>
            <button onClick={onLogout} className="navbar-logout-btn">Logout</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
