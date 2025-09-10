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
    <div className="r1 reveal-up in">
      <div className="Register scale-in lift">
        <h2 className="gradient-text bounce">🎉 Create Account</h2>
        <form onSubmit={handleSubmit} className="stagger-children">
          <label htmlFor="fullname" className="gradient-text">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Tom Jerry"
            required
            className="lift magnetic"
          />

          <label htmlFor="email" className="gradient-text">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tomjerry@gmail.com"
            required
            className="lift magnetic"
          />

          <label htmlFor="password" className="gradient-text">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="lift magnetic"
          />

          <label htmlFor="confirm" className="gradient-text">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter password"
            required
            className="lift magnetic"
          />

          {message.text && (
            <div className={`message ${message.type === 'success' ? 'success gradient-text glow-pulse' : 'gradient-text'} bounce`}>
              {message.text}
            </div>
          )}

          <div className="login-link lift">
            Already have an account? <a href="/login" className="gradient-text">Login</a>
          </div>

          <button type="submit" className="btn btn-primary cta lift ripple magnetic glow-pulse bounce">✨ Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
