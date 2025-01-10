// filepath: /c:/Users/Hasindu Thirasara/Desktop/employee/Docker-React-Node-Employee_Management/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const EmployeeModel = require('./models/Employee');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use the employee routes
app.use('/api', employeeRoutes);

// Test Route
app.post('/signup', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => {
      console.error('Error creating employee:', err);
      res.status(400).json({ error: 'Error creating employee' });
    });
});

// Start the server
const PORT = parseInt(process.env.PORT, 10) || 5000;
let server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle EADDRINUSE error
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    setTimeout(() => {
      server.close();
      server = app.listen(PORT + 1, () => {
        console.log(`Server running on port ${PORT + 1}`);
      });
    }, 1000);
  } else {
    console.error(err);
  }
});