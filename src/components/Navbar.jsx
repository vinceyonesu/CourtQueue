import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      padding: '15px 30px',
      backgroundColor: '#1D9E75',
      alignItems: 'center'
    }}>
      <h2 style={{ color: 'white', margin: 0 }}>🎾 CourtQueue</h2>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/queue" style={{ color: 'white', textDecoration: 'none' }}>Queue</Link>
      <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
    </nav>
  );
}

export default Navbar;
