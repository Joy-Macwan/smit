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
    <div className="l1">
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-footer">
          <a href="/forgotpassword">Forgot password?</a>
        </div> 

        {message.text && (
          <div className={`message ${message.type === 'success' ? 'success' : ''}`}>
            {message.text}
          </div>
        )}

        <button type="submit">Login</button>

        <div className="form-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
