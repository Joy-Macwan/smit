import React, { useState } from 'react';
import '../styles/register.css';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirm) {
    setMessage({ text: 'Passwords do not match!', type: 'error' });
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage({ text: data.message, type: 'success' });
      setFullname('');
      setEmail('');
      setPassword('');
      setConfirm('');
    } else {
      setMessage({ text: data.message, type: 'error' });
    }
  } catch (err) {
    setMessage({ text: 'Server error. Please try again.', type: 'error' });
  }
};


  return (
    <div className="r1">
    <div className="Register">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Tom Jerry"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tomjerry@gmail.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          id="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter password"
          required
        />

        {message.text && (
          <div className={`message ${message.type === 'success' ? 'success' : ''}`}>
            {message.text}
          </div>
        )}

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
