import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>FOODTANDA</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        
        {/* Show only if logged in */}
        {user && (
          <>
            <Link to="/crud" style={styles.link}>Manage Recipes</Link>
            <Link to="/recipes" style={styles.link}>Recipes</Link>
            <Link to="/bookmarks" style={styles.link}>Saved Recipes</Link>

            <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
          </>
        )}

        {/* Show only if not logged in */}
        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#ff007bff',
    color: 'white',
    padding: '15px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  link: {
    color: 'white',
    marginLeft: '15px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginLeft: '15px',
    padding: '5px 10px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Navbar;
