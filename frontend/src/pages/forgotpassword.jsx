import React, { useState } from 'react';
import '../styles/forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (trimmedEmail === 'user@example.com') {
      setMessage({ text: 'Reset link sent to your email.', type: 'success' });
    } else {
      setMessage({ text: 'Please enter a valid registered email.', type: 'error' });
    }
  };

  return (
  <div className="for1">
  <div className="Forgotpassword scale-in">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your registered email</label>
        <input
          type="email"
          id="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

  <button type="submit" className="btn btn-primary cta lift ripple">Send Reset Link</button>

        <div className="form-footer">
          Remembered your password? <a href="/login">Login</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
