import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f4f4f4',
    color: '#333',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#444',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  navLink: {
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'background 0.3s',
  },
  navLinkHover: {
    backgroundColor: '#0056b3',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonHover: {
    backgroundColor: '#a71d2a',
  },
};

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Simulate fetching user data
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear stored user data
    navigate('/'); // Redirect to login
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <p style={styles.subheading}>Welcome, {username}! Manage your tasks effectively.</p>
      <nav style={styles.nav}>
        <a href="/employee-list" style={styles.navLink}>
          Employee List
        </a>
        <a href="/add-employee" style={styles.navLink}>
          Add Employee
        </a>
      </nav>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
