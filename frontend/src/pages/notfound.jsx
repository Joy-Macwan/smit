import React from 'react';
import '../styles/notfound.css';

const NotFound = () => (
  <div className="n1 reveal-up in">
    <div className="not-found scale-in lift bounce">
      <h2 className="gradient-text glow-pulse">🚫 404 - Page Not Found</h2>
      <p className="gradient-text">The page you're looking for doesn't exist or has been moved.</p>
      <a className="btn lift ripple magnetic glow-pulse bounce" href="/">🏠 Go back to Home</a>
    </div>
  </div>
);

export default NotFound;
