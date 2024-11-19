import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  const [username, setUsername] = useState(null);

  const handleLogin = (user) => {
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
  };

  return (
    <Router>
      <Navbar username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
      </Routes>
    </Router>
  );
};

export default App;