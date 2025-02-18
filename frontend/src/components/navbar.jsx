import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h2>Stock Management</h2>
      <nav>
        <ul>
          <li><a href="/">Stock</a></li>
          <li><a href="/attendance">Attendance</a></li>
          <li><a href="/price-list">Price List</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
