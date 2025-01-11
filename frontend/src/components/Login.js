import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from '../assets/employeeTeam.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.status === 200) {
        alert('Login Successful!');
        navigate('/EmployeeForm'); // Redirect to the employee list page
      }
    } catch (error) {
      alert('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <p style={styles.subheading}>Welcome back! Please login to continue</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.linkContainer}>
          Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Poppins', sans-serif",
    color: '#080707',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.36)',
  },
  formContainer: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(152, 118, 118, 0.87)',
    padding: '3rem',
    borderRadius: '15px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#fff',
  },
  subheading: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    color: '#fff',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '15px',
    border: 'none',
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.3s ease',
  },
  linkContainer: {
    marginTop: '1rem',
  },
  link: {
    color: '#ff7e5f',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;
