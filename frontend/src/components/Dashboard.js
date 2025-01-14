import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/1.png';
import { FaUserPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
  },
  cardContainer: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
  },
  cardHover: {
    transform: 'scale(1.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#fff',
  },
  cardText: {
    fontSize: '1.2rem',
    fontWeight: '500',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s, transform 0.3s',
  },
  buttonHover: {
    backgroundColor: '#a71d2a',
    transform: 'scale(1.05)',
  },
};

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
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Dashboard</h1>
      <p style={styles.subheading}>Hello, {username}! Manage your workspace with ease.</p>

      <div style={styles.cardContainer}>
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style = { ...styles.card, ...styles.cardHover })}
          onMouseLeave={(e) => (e.currentTarget.style = styles.card)}
          onClick={() => navigate('/employee-form')}
        >
          <FaUserPlus style={styles.cardIcon} />
          <p style={styles.cardText}>Employee Form</p>
        </div>
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style = { ...styles.card, ...styles.cardHover })}
          onMouseLeave={(e) => (e.currentTarget.style = styles.card)}
          onClick={() => navigate('/employee-table')}
        >
          <FaUsers style={styles.cardIcon} />
          <p style={styles.cardText}>Add Employee</p>
        </div>
      </div>

      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleLogout}
      >
        <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
