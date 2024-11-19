import React, { useState, useContext } from 'react';
import api, { setAuthToken } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Assuming a UserContext for global state management

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Context to set logged-in user info

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token } = response.data;

      // Store the token and username in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      // Set the token for future API requests
      setAuthToken(token);

      // Update the global user context
      setUser({ username });

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
      <p className="mt-3">
        Don't have an account?{' '}
        <button
          className="btn btn-link p-0 text-decoration-underline"
          onClick={() => navigate('/signup')}
        >
          Sign-up Now!
        </button>
      </p>
    </div>
  );
};

export default LoginPage;