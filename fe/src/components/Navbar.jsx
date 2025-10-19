import React from 'react';
import { Link } from 'react-router-dom';
import "../main.css"; 

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">FOODTANDA</h2>
      <div>
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
