import React, { useState } from 'react';
import api, { setAuthToken } from '../api/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Sign up the user
      const response = await api.post('/auth/signup', { username, email, password });
      
      // Automatically log them in
      const loginResponse = await api.post('/auth/login', { username, password });
      const { token } = loginResponse.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;