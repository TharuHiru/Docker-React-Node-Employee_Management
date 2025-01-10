import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    //axios.post('http://localhost:3001/signup', { email, password })
    //.then(result => console.log(result.result))
    //.catch(error => console.log(error));
    
    // Store user details (you can implement actual storage or backend logic here)
    alert('Signup Successful!');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
