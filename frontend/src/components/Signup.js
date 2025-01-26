import React, { useState } from 'react';
import axios from 'axios'; // making http requests to backend API
import { useNavigate } from 'react-router-dom'; // navigation to another page
import '../styles/signup.css'; // import the styling

function Signup() {
  const [email, setEmail] = useState(''); // variables to store email and password

  //Functions to update the variables
  const [password, setPassword] = useState('');

  //allows to navigate to another page
  const navigate = useNavigate();

  //function to handle the signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      //sebd a POST request to the endpoint with the usename and password
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      if (response.status === 201) {
        alert('Signup Successful!');
        navigate('/'); // Redirect to the login page
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
