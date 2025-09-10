import React from 'react';
import '../styles/header.css';

const Header = () => (
  <header className="header">
    <div className="hero scale-in">
      <h1>SMIT – Modern Retail System</h1>
      <p>Fast billing, smart inventory, and beautiful dashboards.</p>
      <div className="actions">
        <button className="btn-primary cta">Start Billing</button>
        <button className="btn-secondary lift">View Products</button>
      </div>
    </div>
  </header>
);

export default Header;