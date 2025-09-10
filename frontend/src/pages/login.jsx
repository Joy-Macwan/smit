import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage({ text: data.message, type: 'success' });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMessage({ text: data.message, type: 'error' });
    }
  } catch (err) {
    setMessage({ text: 'Something went wrong!', type: 'error' });
  }
};


  return (
    <div className="l1 reveal-up in">
      <div className="Login scale-in lift">
        <h2 className="gradient-text bounce">🔐 Login</h2>
        <form onSubmit={handleSubmit} className="stagger-children">
          <label htmlFor="email" className="gradient-text">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="lift magnetic"
          />

          <label htmlFor="password" className="gradient-text">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="lift magnetic"
          />

          <div className="form-footer lift">
            <a href="/forgotpassword" className="gradient-text">Forgot password?</a>
          </div> 

          {message.text && (
            <div className={`message ${message.type === 'success' ? 'success gradient-text glow-pulse' : 'gradient-text'} bounce`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="btn btn-primary cta lift ripple magnetic glow-pulse bounce">🚀 Login</button>

          <div className="form-footer lift">
            Don't have an account? <a href="/register" className="gradient-text">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
