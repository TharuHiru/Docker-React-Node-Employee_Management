import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import Helmet
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission refresh
    console.log('Attempting to login with:', { email, password }); // Log input data

    try {
        const response = await fetch('employeemanagement-dkcfbchnaxdqgwbf.centralindia-01.azurewebsites.net/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('Response status:', response.status); // Log response status

        const data = await response.json();

        console.log('Response data:', data); // Log the parsed response

        if (response.ok) {
            console.log('Login successful:', data);
            // Perform actions after successful login, like navigation or token storage
            toast.success("Login successful"); 
            navigate('/Dashboard'); // Example of redirecting

        } else {
            console.error('Login failed:', data.error);
            toast.err("Error log in . Try again"); // Display error message to user
        }
    } catch (err) {
        console.error('Error during login:', err); // Log network or unexpected errors
        alert('An error occurred. Please check your connection and try again.');
    }
};

  return (
    <>
      <Helmet>
        <title>Login | Employee Management System</title>
        <meta name="description" content="Login page for Employee Management System" />
      </Helmet>
      <div className="container">
        <div className="overlay"></div>
        <div className="formContainer">
          <h2 className="heading">Login</h2>
          <p className="subheading">Welcome back! Please login to continue</p>
          <form onSubmit={handleLogin} className="form">
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
              Login
            </button>
          </form>
          <p className="linkContainer">
            Don't have an account? <a href="/signup" className="link">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
