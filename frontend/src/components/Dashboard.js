import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import '../styles/dashboard.css';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);
  }, []);

  function handleLogout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/');
      }
    });
  }

  return (
    <div className="container">
      <header>
        <Helmet>
          <title> Dashboard | Employee Management System</title>
          <meta name="description" content="Form to add a new employee" />
        </Helmet>
        <h1 className='heading'>Welcome to the Dashboard</h1>
        <p className='subheading'>Hello, {username}! Manage your workspace with ease.</p>
      </header>
      <main>
        <section>
          <div className="card-container">
            <div className="card" onClick={() => navigate('/employee-form')} role="button" aria-label="Add an employee">
              <FaUserPlus className="card-icon" />
              <p className="card-text">Add Employee</p>
            </div>
            <div className="card" onClick={() => navigate('/employee-table')} role="button" aria-label="View employee list">
              <FaUsers className="card-icon" />
              <p className="card-text">View Employee</p>
            </div>
          </div>
        </section>
        <button className="button" onClick={handleLogout} aria-label="Logout">
          <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
          Logout
        </button>
      </main>
    </div>
  );
}

export default Dashboard;