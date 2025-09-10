import React from 'react';
import '../styles/header.css';

const Header = () => (
  <header className="header">
    <marquee behavior="scroll" direction="right" scrollamount="6">
    <h1>Retail Billing System</h1>
    </marquee>
  </header>
);

export default Header;