import React, { useState } from 'react';
import axios from 'axios'; // making http requests to backend API
import { useNavigate } from 'react-router-dom'; // navigation to another page
import '../styles/signup.css'; // import the styling
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'; // Import Helmet

function Signup() { // variables to store email and password
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  //allows to navigate to another page
  const navigate = useNavigate();

  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  //function to handle the signup
  const handleSignup = async (e) => {
    e.preventDefault();
    
    //Basic error handling
    if (password.length <= 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    else if (!emailregex.test(email)){
          toast.error("please insert valid email address")
          return;
        }

    try {
      //send a POST request to the endpoint with the usename and password
      const response = await axios.post('https://emp-mng-gjb7hcf7h2apghcr.centralindia-01.azurewebsites.net/api/signup', { email, password });
      if (response.status === 201) {
        toast.success('Signup Successful!');
        navigate('/'); // Redirect to the login page
      }
      
    } catch (error) {
      // Handle specific error for existing email
        if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
          toast.error('This email is already registered. Please use a different email.');
        } else {
          toast.error('Error signing up. Please try again.');
        }
        console.error('Signup error:', error); // Log the error for debugging
          }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Signup | Employee management system</title>
        <meta name="description" content="Create an account to access MyApp." />
      </Helmet>
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
