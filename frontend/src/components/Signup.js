import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      if (response.status === 201) {
        alert('Signup Successful!');
        navigate('/login'); // Redirect to the login page
      }
    } catch (error) {
      alert('Error signing up. Please try again.');
      console.error('Signup error:', error); // Log the error for debugging
    }
  };

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="formContainer">
        <h2 className="heading">Sign Up</h2>
        <p className="subheading">Create an account to get started</p>
        <form onSubmit={handleSignup} className="form">
          <div className="inputContainer">
            <label className="label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="inputContainer">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
        <p className="linkContainer">
          Already have an account? <a href="/" className="link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
