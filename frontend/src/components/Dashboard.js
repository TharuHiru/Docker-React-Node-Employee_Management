import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import '../styles/dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container">
  <h1 className="heading">Welcome to the Dashboard</h1>
  <p className="subheading">Hello, {username}! Manage your workspace with ease.</p>

  <div className="card-container">
    <div className="card" onClick={() => navigate('/employee-form')}>
      <FaUserPlus className="card-icon" />
      <p className="card-text">Employee Form</p>
    </div>
    <div className="card" onClick={() => navigate('/employee-table')}>
      <FaUsers className="card-icon" />
      <p className="card-text">Add Employee</p>
    </div>
  </div>

  <button className="button" onClick={handleLogout}>
    <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
    Logout
  </button>
</div>
  );
}

export default Dashboard;
