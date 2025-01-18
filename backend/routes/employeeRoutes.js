const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Employee = require('../models/Employee');
const EmployeeDetails = require('../models/EmployeeDetails');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password before saving
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the employee with the hashed password
    const newEmployee = new Employee({ email, password: hashedPassword });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: 'Error signing up', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful', employee });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// Add a new employee details
router.post('/employees', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body for debugging
    const { empId, firstName, lastName, department, email, mobileNo, country, state, city, dob, dateOfJoining, photo, address, salary, designation } = req.body;
    const newEmployeeDetails = new EmployeeDetails({
      empId,
      firstName,
      lastName,
      department,
      email,
      mobileNo,
      country,
      state,
      city,
      dob,
      dateOfJoining,
      photo,
      address,
      salary,
      designation,
    });
    await newEmployeeDetails.save();
    res.status(201).json(newEmployeeDetails);
  } catch (err) {
    console.error('Error adding employee:', err); // Log the error for debugging
    res.status(400).json({ message: 'Error adding employee', error: err });
  }
});

// Get all employees details
router.get('/employees', async (req, res) => {
  try {
    const employees = await EmployeeDetails.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err });
  }
});

// Update an employee
router.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await EmployeeDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: 'Error updating employee', error: err });
  }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
  try {
    await EmployeeDetails.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting employee', error: err });
  }
});

module.exports = router;
