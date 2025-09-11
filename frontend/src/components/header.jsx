import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header bg-spotlight">
    <div className="hero scale-in stagger-children">
      <h1 className="gradient-text">SMIT – Modern Retail System</h1>
      <p className="typing">Fast billing, smart inventory, and beautiful dashboards.</p>
      <div className="actions">
        <Link to="/billing">
          <button className="btn btn-primary btn-lg ripple glow-on-hover">Start Billing</button>
        </Link>
        <Link to="/productlist">
          <button className="btn btn-ghost btn-lg ripple lift">View Products</button>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;