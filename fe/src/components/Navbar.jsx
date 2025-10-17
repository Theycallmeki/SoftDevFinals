import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>🛒 Masrketpslace</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/items" style={styles.link}>Manage Items</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
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
};

export default Navbar;
